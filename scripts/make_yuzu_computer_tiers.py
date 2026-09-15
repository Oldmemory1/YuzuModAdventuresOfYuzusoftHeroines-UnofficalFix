#!/usr/bin/env python3
"""作战电脑(combat computer)的 先进 / 精英 两档：组件、sprite、本地化、科技、科技图标。

数值规则（与武器/推进器两档一致）
--------------------------------
  造价   = Tier1 x1.75 (先进) / x3.25 (精英)   -> 30 -> 53 / 98
  耗电   = Tier1 x1.5  (先进) / x2    (精英)   -> -35 -> -53 / -70
  修正值 = Tier1 的**加成** x1.5 / x2
           (这些 modifier 是加法百分比: 0.30 就是 +30%, 故 0.30 -> 0.45 -> 0.60)
  恒星基地电脑耗电为 0 且无 resources 块, 两档保持原样。

修正值 x1.5 会遇到 .5 / .375 这类小数(tracking 15 -> 22.5, fire_rate 0.25 ->
0.375)。PDX 脚本支持小数(distance/range 本就用 112.5), 故**不做取整**,
保持倍率精确、可反推。

科技花费
--------
必须逐档抬升, 否则"升级"在科技树上读不出意义:
  Tier1  tier 5  @yuzu_tier5cost5 =  64000  weight 18
  先进   tier 5  @yuzu_tier5cost6 =  72000  weight 17
  精英   tier 6  @yuzu_tier6cost5 = 152000  weight 12
先进与 Tier1 同 tier(与武器档位一致), 靠 cost 变量拉开; 精英进 tier 6。

升级链
------
Tier1 -> 先进 -> 精英 一条链。Tier1 的 upgrades_to 由本脚本写进
common/component_templates/yuzu_roles.txt(该文件其余内容仍由人工维护)。

图标
----
7 个 role 图标用 Tier1 同名图标的档位 DDS(由 make_yuzu_computer_icons.py 生成);
恒星基地电脑 Tier1 用原版 GFX_ship_part_computer_default, 两档改用 role_yuzu
的档位图标。

Run:  uv run python scripts/make_yuzu_computer_tiers.py
"""

import colorsys
import os
import re
import sys
from decimal import Decimal, ROUND_HALF_UP

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from make_yuzu_elite import ADV_HUE, ELITE_HUE, dds_bytes, hue_replace  # noqa: E402

from PIL import Image  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COMPUTER_DIR = os.path.join(ROOT, "gfx/interface/icons/ship_parts/computers")
TECH_DIR = os.path.join(ROOT, "gfx/interface/icons/technologies")
LOC = os.path.join(ROOT, "localisation/simp_chinese/yuzu_ship_and_component_l_simp_chinese.yml")
GFX = os.path.join(ROOT, "interface/YUZU_GFX.gfx")
TECH = os.path.join(ROOT, "common/technology/yuzu_tech.txt")
ROLES_T1 = os.path.join(ROOT, "common/component_templates/yuzu_roles.txt")
ROLES_ELITE = os.path.join(ROOT, "common/component_templates/yuzu_roles_elite.txt")

LOC_MARK = "# ===== 先进 / 精英 / 太初 作战电脑 (by scripts/make_yuzu_computer_tiers.py) ====="

# Tier1 基准值
T1_COST = 30
T1_POWER = -35
# 各档倍率: (造价/维护费倍率, 修正值倍率)
TIER_MULT = {
    "ADVANCED": (Decimal("1.75"), Decimal("1.5")),
    "ELITE": (Decimal("3.25"), Decimal("2")),
    "MASTER": (Decimal("5.5"), Decimal("2.5")),
}

TECH_BASE = "tech_computer_role_yuzu"

MASTER_HUE = colorsys.rgb_to_hsv(138 / 255.0, 124 / 255.0, 1.0)[0]   # #8A7CFF

TECH_DESC = {
    "advanced": "在基础型时空分析接口之上，先进型号进一步提升了时空波动的解析精度，"
                "使舰船的火控与机动响应更为敏捷。",
    "elite": "精英时空分析接口将时空感知推向极致，几乎能够完全预判战场的每一次变化。",
    "master": "太初时空分析接口几乎与战场本身融为一体，敌方的每一次机动都早已在它的预判之中。",
}

# 各档: 档位后缀 / 本地化键中缀 / 中文档位词 / 色相 / 科技参数
#
# 科技花费必须逐档抬升(64000 < 72000 < 152000), 权重逐档下降(18 > 17 > 12):
#   Tier1    tier 5  @yuzu_tier5cost5 =  64000  @yuzu_tier5weight5 = 18
#   先进     tier 5  @yuzu_tier5cost6 =  72000  @yuzu_tier5weight6 = 17
#   精英     tier 6  @yuzu_tier6cost5 = 152000  @yuzu_tier6weight5 = 12
# 先进与 Tier1 同为 tier 5(与武器档位的做法一致), 靠 cost 变量拉开差距;
# 精英进 tier 6。
TIERS = [
    dict(tier="advanced", tag="ADVANCED", cn="先进", hue=ADV_HUE,
         tier_num=5, cost_var="yuzu_tier5cost6", weight_var="yuzu_tier5weight6",
         prereq=TECH_BASE),
    dict(tier="elite", tag="ELITE", cn="精英", hue=ELITE_HUE,
         tier_num=6, cost_var="yuzu_tier6cost5", weight_var="yuzu_tier6weight5",
         prereq="tech_computer_role_yuzu_advanced"),
    # 太初与精英同为 tier 6（CWTools 对 tier 7 报错），靠 cost 变量再上移一档
    dict(tier="master", tag="MASTER", cn="太初", hue=MASTER_HUE,
         tier_num=6, cost_var="yuzu_tier6cost6", weight_var="yuzu_tier6weight6",
         prereq="tech_computer_role_yuzu_elite"),
]

# Tier1 (common/component_templates/yuzu_roles.txt) 的角色表。
# modifier  -> 组件自身的 modifier 块(影响舰船以上一级的实体)
# ship_modifier -> 组件作用到舰船上的修正
# potential 原样照抄 Tier1, 不改语义。
ROLES = [
    dict(
        role="SWARM", cn="蜂拥", icon="swarm", behavior="swarm",
        ai_tags="gunship brawler",
        potential="""	potential = {
		ship_uses_swarm_role = yes
	}""",
        modifier=[("ship_evasion_mult", 0.30), ("ship_speed_mult", 0.20)],
        ship_modifier=[("ship_fire_rate_mult", 0.20)],
    ),
    dict(
        role="TORPEDO", cn="攻城", icon="swarm", behavior="torpedo",
        ai_tags="explosive",
        potential="""	potential = {
		ship_uses_torpedo_role = yes
	}""",
        prereq_extra='"tech_torpedoes_1" ',
        modifier=[("weapon_type_explosive_weapon_damage_mult", 0.20),
                  ("ship_tracking_add", 15), ("ship_evasion_mult", 0.10)],
        ship_modifier=[],
    ),
    dict(
        role="PICKET", cn="哨戒", icon="picket", behavior="picket",
        ai_tags="screen",
        potential="""	potential = {
		ship_uses_picket_role = yes
	}""",
        modifier=[("ship_evasion_mult", 0.10)],
        ship_modifier=[("ship_fire_rate_mult", 0.25), ("ship_tracking_add", 50)],
    ),
    dict(
        role="LINE", cn="线列", icon="line", behavior="line",
        ai_tags="gunship",
        potential="""	potential = {
		OR ={
			ship_uses_line_role = yes
			is_ship_size = yuzu_star_eater
		}
	}""",
        modifier=[],
        ship_modifier=[("ship_fire_rate_mult", 0.25), ("ship_accuracy_add", 25),
                       ("ship_tracking_add", 10)],
    ),
    dict(
        role="ARTILLERY", cn="炮击", icon="artillery", behavior="artillery",
        ai_tags="artillery energy_torpedoes",
        potential="""	potential = {
		OR ={
			ship_uses_artillery_role = yes
			is_ship_size = yuzu_star_eater
		}
	}""",
        modifier=[],
        ship_modifier=[("ship_fire_rate_mult", 0.25), ("ship_weapon_range_mult", 0.25),
                       ("ship_tracking_add", 10)],
    ),
    dict(
        role="CARRIER", cn="航母", icon="carrier", behavior="carrier",
        ai_tags="carrier",
        potential="""	potential = {
		OR ={
			ship_uses_carrier_role = yes
			is_ship_size = yuzu_star_eater
		}
	}""",
        modifier=[],
        ship_modifier=[("ship_engagement_range_mult", 1.25), ("ship_tracking_add", 10)],
    ),
    dict(
        role="PLATFORM", cn="平台", icon="platform", behavior="platform",
        ai_tags=None,
        potential="""	potential = {
		ship_uses_platform_computers = yes
	}""",
        modifier=[],
        ship_modifier=[("ship_fire_rate_mult", 0.40), ("ship_tracking_add", 40),
                       ("ship_accuracy_add", 10)],
    ),
    dict(
        role="STARBASE", cn="恒星基地", icon="yuzu", behavior="platform",
        ai_tags=None,
        # Tier1 的 key 前缀位置与其余角色不同, 且图标用 role_yuzu 的档位版
        key="STARBASE_COMBAT_COMPUTER_YUZU_%s",
        key_t1="STARBASE_COMBAT_COMPUTER_YUZU",
        sprite="GFX_ship_part_computer_yuzu_%s",
        tex="ship_part_computer_role_yuzu_%s.dds",
        loc_name="恒星基地火控系统",
        power=0, no_resources=True,
        potential="""	potential = {
		ship_uses_starbase_components = yes
	}""",
        modifier=[],
        ship_modifier=[("ship_fire_rate_mult", 0.25), ("ship_tracking_add", 50),
                       ("ship_accuracy_add", 20)],
    ),
]


def read_text(path):
    """按通用换行读入(文本里的换行统一是 \\n)"""
    with open(path, encoding="utf-8") as f:
        return f.read()


def newline_of(path):
    """探测文件原有的换行风格。yuzu_roles.txt 与 YUZU_GFX.gfx 是 CRLF,
    yuzu_tech.txt 与本地化文件是 LF —— 回写时必须保持原样,
    否则整个文件会被改写成另一种换行, diff 全部炸开。"""
    with open(path, "rb") as f:
        return "\r\n" if b"\r\n" in f.read() else "\n"


def write_text(path, text, nl):
    with open(path, "w", encoding="utf-8", newline=nl) as f:
        f.write(text)


def fmt(v):
    """格式化成 PDX 能读的数: 整数不带小数点, 小数至少保留两位(与 Tier1 的 0.30 写法一致)"""
    d = Decimal(str(v))
    if d == d.to_integral_value():
        return str(int(d))
    s = format(d.normalize(), "f")
    if "." in s:
        whole, frac = s.split(".")
        s = whole + "." + frac.ljust(2, "0")
    return s


def scale(v, f):
    return Decimal(str(v)) * Decimal(str(f))


def round_cost(v):
    return int(Decimal(str(v)).quantize(Decimal("1"), rounding=ROUND_HALF_UP))


def key_of(role, tag):
    """组件 key。tag 为 None 时返回 Tier1 的 key。
    恒星基地电脑 Tier1 叫 STARBASE_COMBAT_COMPUTER_YUZU, 前缀位置与其余角色不同,
    故走 role 自带的模板。"""
    if tag is None:
        return role.get("key_t1", "COMBAT_COMPUTER_%s_YUZU" % role["role"])
    return role.get("key", "COMBAT_COMPUTER_%s_YUZU_%%s" % role["role"]) % tag


def sprite_name(role, tier):
    """sprite 名。恒星基地电脑用 role_yuzu 的档位图标, 其余用各自 role 图标。"""
    return role.get("sprite", "GFX_ship_part_computer_%s_yuzu_%%s" % role["icon"]) % tier


def texture_name(role, tier):
    return role.get("tex", "ship_part_computer_role_%s_yuzu_%%s.dds" % role["icon"]) % tier


def build_rules(tag):
    """按倍率表算出某档的造价与耗电。"""
    factor, valf = TIER_MULT[tag]
    cost = round_cost(scale(T1_COST, factor))
    power = round_cost(scale(T1_POWER, valf))
    return factor, valf, cost, power


def render(role, tier, tag, cn, cost, power, valf):
    key = key_of(role, tag)
    lines = []
    lines.append("utility_component_template = {")
    lines.append('\tkey = "%s"' % key)
    lines.append("\tsize = small")
    lines.append('\ticon = "%s"' % sprite_name(role, tier))
    lines.append("\ticon_frame = 1")
    lines.append("\tpower = %d" % role.get("power", power))
    if not role.get("no_resources"):
        lines.append("\tresources = {")
        lines.append("\t\tcategory = ship_components")
        lines.append("\t\tcost = {")
        lines.append("\t\t\talloys = %d" % cost)
        lines.append("\t\t}")
        lines.append("\t}")
    lines.append('\tcomponent_set = "combat_computers"')
    lines.append('\tship_behavior = "%s"' % role["behavior"])
    extra = role.get("prereq_extra", "")
    lines.append('\tprerequisites = { "%s_%s" %s}' % (TECH_BASE, tier, extra))
    # 升级链: Tier1 -> 先进 -> 精英 -> 太初; 太初是顶档, 不带 upgrades_to
    nxt = {"ADVANCED": "ELITE", "ELITE": "MASTER"}.get(tag)
    if nxt:
        lines.append('\tupgrades_to = "%s"' % key_of(role, nxt))
    if role["ai_tags"]:
        lines.append("\tai_tags = { %s }" % role["ai_tags"])
        lines.append("\tai_tag_weight = 0")
    lines.append("")
    lines.append(role["potential"])
    lines.append("")
    if role["modifier"]:
        lines.append("\tmodifier = {")
        for name, val in role["modifier"]:
            lines.append("\t\t%s = %s" % (name, fmt(scale(val, valf))))
        lines.append("\t}")
    if role["ship_modifier"]:
        lines.append("\tship_modifier = {")
        for name, val in role["ship_modifier"]:
            lines.append("\t\t%s = %s" % (name, fmt(scale(val, valf))))
        lines.append("\t}")
    lines.append("")
    lines.append("\tai_weight = {")
    lines.append("\t\tweight = 50")
    lines.append("\t\tmodifier = {")
    lines.append("\t\t\tfactor = 0.0")
    lines.append("\t\t\tis_YUZU = no")
    lines.append("\t\t}")
    lines.append("\t}")
    lines.append("}")
    return "\n".join(lines)


def write_upgrade_chain():
    """把四档串成一条链: 给 Tier1 补 upgrades_to -> 先进, 给精英补 -> 太初。

    Tier1 与精英的文件由**人工维护**(不像两档生成文件那样整体重写), 所以只往里
    插一行 upgrades_to, 插在 prerequisites 之后; 已有则先删再按当前位置重插,
    保证字段顺序稳定、可重复运行。
    """
    for src_path, src_tag, dst_tag, label in (
            (ROLES_T1, None, "ADVANCED", "Tier1 -> 先进"),
            (ROLES_ELITE, "ELITE", "MASTER", "精英 -> 太初")):
        _write_chain(src_path, src_tag, dst_tag, label)


def _write_chain(path, src_tag, dst_tag, label):
    text = read_text(path)
    nl = newline_of(path)
    added, fixed = [], []
    for role in ROLES:
        t1_key = key_of(role, src_tag)
        want = key_of(role, dst_tag)
        m = re.search(r'key = "%s"\n' % re.escape(t1_key), text)
        if not m:
            raise SystemExit("%s 里找不到组件 %s" % (path, t1_key))
        # 块首是 key 之前最近的那个 utility_component_template = {，
        # 不能直接用 m.start() —— block_end 会先撞上 prerequisites 的 '{'。
        head = text.rindex("utility_component_template = {", 0, m.start())
        end = block_end(text, head)
        block = text[head:end]
        line = '\tupgrades_to = "%s"\n' % want
        pm = re.search(r'^\tprerequisites = \{[^}]*\}\n', block, re.M)
        if not pm:
            raise SystemExit("%s 没有 prerequisites 行" % t1_key)
        if "\tupgrades_to" in block:
            # 已有则先删掉再按当前位置重插, 保证字段顺序稳定
            if line in block:
                continue
            block = re.sub(r'^\tupgrades_to = "[^"]*"\n', "", block, flags=re.M)
            fixed.append(t1_key)
        new_block = block[:pm.end()] + line + block[pm.end():]
        text = text[:head] + new_block + text[end:]
        added.append(t1_key)
    write_text(path, text, nl)
    print("升级链: %-44s %s %d 个%s"
          % (os.path.relpath(path, ROOT), label, len(added),
             "（修正 %d 个已存在的）" % len(fixed) if fixed else ""))


def write_components():
    for spec in TIERS:
        tier, tag, cn = spec["tier"], spec["tag"], spec["cn"]
        factor, valf, cost, power = build_rules(tag)
        head = [
            "# %s版作战电脑 (%s) —— 由 Tier1 派生 (common/component_templates/yuzu_roles.txt)" % (cn, tag),
            "# 造价 = Tier1 x%s (%d -> %d); 耗电 = Tier1 x%s (%d -> %d)" % (
                fmt(factor), T1_COST, cost, fmt(valf), T1_POWER, power),
            "# 修正值 = Tier1 的加成 x%s (加法百分比: 0.30 -> %s)" % (
                fmt(valf), fmt(scale(0.30, valf))),
            "# 恒星基地电脑耗电 0 且无 resources 块, 与 Tier1 一致",
            "# 升级链: Tier1 -> ADVANCED -> ELITE -> MASTER"
            " (Tier1 与 ELITE 的 upgrades_to 由本脚本写入各自文件)",
        ]
        head += [
            "# 本文件由 scripts/make_yuzu_computer_tiers.py 生成, 勿手改",
            "",
        ]
        body = []
        for role in ROLES:
            body.append(render(role, tier, tag, cn, cost, power, valf))
            body.append("")
        text = "\n".join(head) + "\n".join(body).rstrip() + "\n"
        path = os.path.join(ROOT, "common/component_templates/yuzu_roles_%s.txt" % tier)
        write_text(path, text, newline_of(path))
        print("组件: %-46s %d 个" % (os.path.relpath(path, ROOT), len(ROLES)))


def write_sprites():
    text = read_text(GFX)
    nl = newline_of(GFX)
    anchor = ('\tspriteType = {\n'
              '\t\tname = "GFX_ship_part_computer_carrier_yuzu"\n'
              '\t\ttexturefile = "gfx/interface/icons/ship_parts/computers/'
              'ship_part_computer_role_carrier_yuzu.dds"\n'
              '\t}\n')
    if anchor not in text:
        raise SystemExit("找不到 carrier sprite 锚点, interface/YUZU_GFX.gfx 结构已变")
    # 去重: TORPEDO 与 SWARM 共用 swarm 图标(沿用 Tier1 的做法), 只出一个 sprite
    add, seen = [], set()
    for spec in TIERS:
        tier = spec["tier"]
        for role in ROLES:
            name = sprite_name(role, tier)
            if name in seen:
                continue
            seen.add(name)
            add.append('\tspriteType = {')
            add.append('\t\tname = "%s"' % name)
            add.append('\t\ttexturefile = "gfx/interface/icons/ship_parts/computers/%s"'
                       % texture_name(role, tier))
            add.append('\t}')
    # 幂等: 先删掉本脚本上次生成的 sprite 块再插入。
    # 按**贴图路径**匹配而不是按 sprite 名 —— 早期写错名的块(…_yuzu_yuzu_…)改名后
    # 就再也匹配不到, 会留在文件里。
    for spec in TIERS:
        tier = spec["tier"]
        for role in ROLES:
            tex = "gfx/interface/icons/ship_parts/computers/" + texture_name(role, tier)
            text = re.sub(
                r'\tspriteType = \{\n\t\tname = "[^"]*"\n\t\ttexturefile = "%s"\n\t\}\n'
                % re.escape(tex), "", text)
    text = text.replace(anchor, anchor + "\n".join(add) + "\n", 1)
    write_text(GFX, text, nl)
    print("sprite: interface/YUZU_GFX.gfx  新增 %d 个" % len(seen))


def block_end(text, pos):
    """返回 pos 处起第一个 '{' 所配对 '}' 之后的索引。"""
    depth = 0
    for j in range(text.index("{", pos), len(text)):
        if text[j] == "{":
            depth += 1
        elif text[j] == "}":
            depth -= 1
            if depth == 0:
                return j + 1
    raise SystemExit("大括号不配对")


def tech_block(suffix, cn, tag, tier, cost_var, weight_var, prereq):
    return """tech_computer_role_yuzu_%(suffix)s = {
	cost = @%(cost)s
	area = physics
	tier = %(tier)d
	category = { computing }
	ai_update_type = military
	is_rare = yes
	is_reverse_engineerable = no
	prerequisites = { "%(prereq)s" }
	weight = @%(weight)s

	potential = {
		is_YUZU = yes
	}

	prereqfor_desc = {
		hide_prereq_for_desc = component
		custom = {
			title = "TECH_UNLOCK_COMBAT_COMPUTERS_YUZU_%(tag)s_TITLE"
			desc = "TECH_UNLOCK_COMBAT_COMPUTERS_YUZU_%(tag)s_DESC"
		}
	}

	weight_modifier = {
		factor = 0.25
		modifier = {
			factor = 9
			has_ascension_perk = ap_technological_ascendancy
		}
	}

	ai_weight = {
		factor = 50
	}
}""" % dict(suffix=suffix, cn=cn, tag=tag, tier=tier, cost=cost_var,
            weight=weight_var, prereq=prereq)


def write_techs():
    text = read_text(TECH)
    nl = newline_of(TECH)
    # 现有 Tier1 电脑科技的 weight 误写成了 cost 变量(64000), 顺手修正为 weight 变量
    wrong = "\tweight = @yuzu_tier5cost5\n"
    right = "\tweight = @yuzu_tier5weight5\n"
    if wrong in text:
        text = text.replace(wrong, right, 1)
        print("修正: tech_computer_role_yuzu 的 weight 由 @yuzu_tier5cost5 改为 @yuzu_tier5weight5")
    # 幂等: 删掉本脚本上次插入的档位科技块。前缀用 \n+ 连同块前的空行一起吃掉,
    # 否则块之间的空行会逐次累积(只按块删除时每次多留两个空行)。
    # 必须**循环删干净**: 早先只删一次, 一旦文件里已经有重复(历史遗留),
    # 每跑一遍就少删一份、却又重新插一份, 重复份数就永远降不下来
    # (yuzu_tech.txt 里的 tech_computer_role_yuzu_master 曾这样堆到 7 份)。
    for spec in TIERS:
        suffix = spec["tier"]
        while True:
            m = re.search(r'\n+tech_computer_role_yuzu_%s = \{' % suffix, text)
            if not m:
                break
            text = text[:m.start()] + text[block_end(text, m.start()):]
    # 定位 Tier1 电脑科技的收尾大括号
    start = text.index("\ntech_computer_role_yuzu = {")
    end = block_end(text, start)
    blocks = [tech_block(spec["tier"], spec["cn"], spec["tag"], spec["tier_num"],
                         spec["cost_var"], spec["weight_var"], spec["prereq"])
              for spec in TIERS]
    # 尾部的空行统一在这里归一化(lstrip), 否则反复运行会越积越多
    text = (text[:end] + "\n\n" + "\n\n".join(blocks) + "\n\n"
            + text[end:].lstrip("\n"))
    write_text(TECH, text, nl)
    print("科技: common/technology/yuzu_tech.txt  新增 2 个 (%s)"
          % " / ".join("tier %d cost @%s" % (s["tier_num"], s["cost_var"])
                       for s in TIERS))



def strip_section(text, marker):
    """删掉 marker 开头的那一段 —— 到**下一条 '# =====' 标记或文件尾**为止。

    不能用「从我的标记删到文件尾」: 同一个文件里可能有别的生成器写的区块排在
    后面(本地化与套装文件就是), 那样会把它们的成果一起删掉。

    注意要**循环删干净**: 反复执行后同一文件里可能残留多份同名区块。
    """
    pat = re.compile(r"\n*" + re.escape(marker) + r".*?(?=\n# =====|\Z)", re.S)
    while True:
        m = pat.search(text)
        if not m:
            return text
        text = text[: m.start()] + text[m.end():]

def write_loc():
    text = read_text(LOC)
    nl = newline_of(LOC)
    # 幂等: 先删掉上次追加的整段
    text = strip_section(text, LOC_MARK)
    lines = ["", LOC_MARK]
    for spec in TIERS:
        tier, cn, tag = spec["tier"], spec["cn"], spec["tag"]
        for role in ROLES:
            key = key_of(role, tag)
            name = role.get("loc_name")
            if name:
                lines.append(' %s:0"%s%s"' % (key, cn, name))
            else:
                lines.append(' %s:0"%s时空分析接口（%s）"' % (key, cn, role["cn"]))
        lines.append(' tech_computer_role_yuzu_%s:0"%s时空分析接口"' % (tier, cn))
        lines.append(' tech_computer_role_yuzu_%s_desc:0"%s"' % (tier, TECH_DESC[tier]))
        lines.append(' TECH_UNLOCK_COMBAT_COMPUTERS_YUZU_%s_TITLE:0"$TECH_UNLOCK_COMPONENT_LINE$ '
                     '$tech_computer_role_yuzu_%s$"' % (tag, tier))
        lines.append(' TECH_UNLOCK_COMBAT_COMPUTERS_YUZU_%s_DESC:0"§H$tech_computer_role_yuzu_%s$§!\\n'
                     '$tech_computer_role_yuzu_%s_desc$"' % (tag, tier, tier))
        # 组件描述沿用对应档位科技的描述
        for role in ROLES:
            lines.append(' %s_DESC:0"$tech_computer_role_yuzu_%s_desc$"'
                         % (key_of(role, tag), tier))
    text = text.rstrip("\n") + "\n" + "\n".join(lines) + "\n"
    write_text(LOC, text, nl)
    print("本地化: %s  追加 %d 行" % (os.path.relpath(LOC, ROOT), len(lines) - 1))


def write_tech_icons():
    src = os.path.join(TECH_DIR, TECH_BASE + ".dds")
    base = Image.open(src)
    for spec in TIERS:
        tier, hue = spec["tier"], spec["hue"]
        dest = os.path.join(TECH_DIR, "%s_%s.dds" % (TECH_BASE, tier))
        data = dds_bytes(hue_replace(base, hue))
        with open(dest, "wb") as f:
            f.write(data)
        print("科技图标: %-44s %d bytes" % (os.path.basename(dest), len(data)))


def main():
    write_upgrade_chain()
    write_components()
    write_sprites()
    write_techs()
    write_loc()
    write_tech_icons()


if __name__ == "__main__":
    main()
