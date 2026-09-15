#!/usr/bin/env python3
"""扫描 mod 里**同一个键被定义多次**的地方。

为什么要专门查: 生成器如果"只删自己上一次写的一份", 而文件里已经有重复(历史遗留),
就会变成每跑一遍少删一份、又多插一份, 重复份数永远降不下来 ——
`tech_computer_role_yuzu_master` 就这样被写进 yuzu_tech.txt 7 遍。

Stellaris 对重复定义通常是"后一个覆盖前一个"(还可能刷错误日志), 所以重复本身
不会立刻崩, 但会让改数值时"改了没用"、也让文件无谓膨胀。按**同一个键在同一种
文件类型里出现两次及以上**判定(与原版同名的覆盖**不算**重复 —— 那是 mod 的正常用法)。

Run:  uv run python scripts/check_duplicates.py
"""

import collections
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def files(rel, exts):
    out = []
    for root, _d, fns in os.walk(os.path.join(ROOT, rel)):
        for fn in fns:
            if fn.endswith(exts):
                out.append(os.path.relpath(os.path.join(root, fn), ROOT))
    return sorted(out)


def read(rel):
    with open(os.path.join(ROOT, rel), encoding="utf-8", errors="replace") as f:
        return f.read()


# (分类名, 正则, 文件范围, 扩展名)
SCANS = [
    ("科技", r"^(tech_\w+) = \{", "common/technology", (".txt",)),
    ("组件模板 key", r'^\s+key = "([^"]+)"', "common/component_templates", (".txt",)),
    ("组件套装 key", r'^\s+key = "([^"]+)"', "common/component_sets", (".txt",)),
    ("sprite 名", r'^\s+name = "(GFX_[^"]+)"', "interface", (".gfx",)),
    ("scripted_variables @变量", r"^@(\w+) = ", "common/scripted_variables", (".txt",)),
    ("弹体 projectile name", r'^\tname = "([^"]+)"', "gfx/projectiles", (".txt",)),
]


def scan(regex, rel, exts):
    """{键: [(文件, 行号), ...]}"""
    found = collections.defaultdict(list)
    pat = re.compile(regex, re.M)
    for f in files(rel, exts):
        text = read(f)
        for m in pat.finditer(text):
            line = text.count("\n", 0, m.start()) + 1
            found[m.group(1)].append((f, line))
    return found


def scan_named_blocks(rel, exts, block_kinds):
    """gfx 里的 entity / particle / pdxparticle 名(名字写法各不相同, 单独处理)。"""
    found = collections.defaultdict(list)
    for f in files(rel, exts):
        text = read(f)
        for kind in block_kinds:
            pat = re.compile(r"^\s*%s\s*=\s*\{" % kind, re.M)
            for m in pat.finditer(text):
                tail = text[m.end():m.end() + 400]
                nm = re.search(r'^\s*name\s*=\s*"([^"]+)"', tail, re.M)
                if nm:
                    line = text.count("\n", 0, m.start()) + 1
                    found[nm.group(1)].append((f, line))
    return found


def scan_loc(rel):
    """本地化键: **同一文件内**重复才算问题(跨文件重复在原版覆盖里很常见)。"""
    found = collections.defaultdict(list)
    keys = 0
    for f in files(rel, (".yml",)):
        text = read(f)
        for i, line in enumerate(text.split("\n"), 1):
            s = line.strip()
            if not s or s.startswith("#") or ":" not in s:
                continue
            key = s.split(":")[0].strip()
            if key and not key.startswith("#"):
                found[(f, key)].append((f, i))
                keys += 1
    return found, keys


EVENT_KINDS = ("event|country_event|planet_event|fleet_event|ship_event|pop_event|"
               "observer_event|system_event|leader_event|archaeology_event|"
               "first_contact_event|espionage_operation_event|"
               "espionage_operation_leader_event")


def scan_event_defs(rel):
    """事件 **定义** 的 id —— 顶格写在 `xxx_event = {` 之后的那个 id。

    事件体里 `country_event = { id = ... }` 是**调用**不是定义(而且缩进过),
    `create_point_of_interest = { id = ... }` 的 id 也只是这次创建的名字,
    这两类都不该算重复。
    """
    pat = re.compile(r"^(?:%s)\s*=\s*\{\s*\n\s*id = ([A-Za-z0-9_.]+)" % EVENT_KINDS, re.M)
    found = collections.defaultdict(list)
    for f in files(rel, (".txt",)):
        text = read(f)
        for m in pat.finditer(text):
            found[m.group(1)].append((f, text.count("\n", 0, m.start()) + 1))
    return found


def report(label, dupes):
    if not dupes:
        print("  ✓ %-26s 无重复" % label)
        return 0
    print("  ✗ %-26s %d 个键重复:" % (label, len(dupes)))
    for key, places in sorted(dupes.items(), key=lambda kv: -len(kv[1]))[:20]:
        where = ", ".join("%s:%d" % (f, ln) for f, ln in places[:8])
        more = "" if len(places) <= 8 else " …(共 %d 处)" % len(places)
        print("      %-46s x%d  %s%s" % (key, len(places), where, more))
    return len(dupes)


def report_count(label, found):
    """扫到多少个键 —— 免得"一个都没扫到"被误当成"没有重复"。"""
    dupes = {k: v for k, v in found.items() if len(v) > 1}
    n = len(found)
    if not dupes:
        print("  ✓ %-26s 无重复（扫到 %d 个键）" % (label, n))
        return 0
    print("  ✗ %-26s %d 个键重复（扫到 %d 个键）:" % (label, len(dupes), n))
    for key, places in sorted(dupes.items(), key=lambda kv: -len(kv[1]))[:20]:
        where = ", ".join("%s:%d" % (f, ln) for f, ln in places[:8])
        more = "" if len(places) <= 8 else " …(共 %d 处)" % len(places)
        print("      %-46s x%d  %s%s" % (key, len(places), where, more))
    return len(dupes)


def main():
    total = 0
    print("=" * 78)
    for label, regex, rel, exts in SCANS:
        if not os.path.isdir(os.path.join(ROOT, rel)):
            continue
        found = scan(regex, rel, exts)
        # 同一个键在不同文件里出现也算重复(后者覆盖前者)
        total += report_count(label, found)

    for label, rel in (("gfx entity 名", "gfx/models"),
                       ("gfx 粒子名", "gfx/particles")):
        kinds = ("entity",) if "entity" in label else ("particle",)
        found = scan_named_blocks(rel, (".asset", ".gfx"), kinds)
        total += report_count(label, found)

    found = scan_named_blocks("gfx", (".gfx",), ("pdxparticle",))
    total += report_count("pdxparticle 名", found)

    loc, nkeys = scan_loc("localisation")
    dupes = {k[1]: v for k, v in loc.items() if len(v) > 1}
    if dupes:
        total += report("本地化键(同文件内)", dupes)
    else:
        print("  ✓ %-26s 无重复（扫到 %d 个键）" % ("本地化键(同文件内)", nkeys))

    if os.path.isdir(os.path.join(ROOT, "events")):
        total += report_count("事件定义 id", scan_event_defs("events"))

    print("=" * 78)
    if total:
        print("共发现 %d 个重复键" % total)
        return 1
    print("未发现重复定义 ✓")
    return 0


if __name__ == "__main__":
    sys.exit(main())
