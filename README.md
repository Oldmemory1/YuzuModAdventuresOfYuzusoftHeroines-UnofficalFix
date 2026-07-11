# Yuzu Mod — 柚子社少女们的奇妙冒险（4.0 兼容版）

Stellaris 4.4.x 版本兼容移植，基于 [Steam Workshop 原版](https://steamcommunity.com/sharedfiles/filedetails/?id=3315878856) 的 3.12 修复版进行二度修复。

## 移植内容

### 已修复的兼容性问题

| 文件 | 修改前 | 修改后 | 原因 |
|---|---|---|---|
| `common/ascension_perks/yuzu_ascension_perks.txt` | `planet_pop_assembly_organic_mult` | `planet_pop_assembly_mult` | vanilla 中不存在带 `_organic` 后缀的 modifier |
| `common/buildings/yuzu_buildings.txt` | `planet_pop_assembly_organic_add` | `planet_pop_assembly_add` | 同上 |
| `common/buildings/yuzu_buildings.txt` | `count_owned_pop` | `count_owned_pop_amount` | 4.0 后 vanilla 重命名了此触发器 |
| `common/buildings/yuzu_buildings.txt` | `num_pops` | `count_owned_pop_amount = { count > 10 }` | `num_pops` 在 4.0 后已移除，改用 `count_owned_pop_amount`（支持 planet scope） |
| `common/colony_types/00_yuzu_colony_types.txt` | 完整旧版副本 | 基于 vanilla 4.4.6 重建 | 4.0 后殖民类型系统完全重写（inline_script、complex_trigger_modifier），保留所有 Yuzu 世界排除规则 |
| `common/colony_types/yuzu_city_colony_types.txt` | `trade_value_mult` | `planet_jobs_trade_produces_mult` | 4.0 后贸易值 modifier 改名 |
| `common/colony_types/yuzu_city_colony_types.txt` | `planet_administrators_produces_mult` | `planet_bureaucrats_produces_mult` | Administrators 职业已重命名为 Bureaucrats |
| `common/colony_types/yuzu_city_colony_types.txt` | `planet_administrators_upkeep_mult` | `planet_bureaucrats_upkeep_mult` | 同上 |
| `common/name_lists/ABYSS1.txt` | 直接中文文本 | 本地化键 + YAML（145 条） | 消除 ~500KB CW100 警告，支持多语言翻译 |
| `common/name_lists/YUZUGIRL1.txt` | 直接中文文本 + A0-Z9 | 本地化键 + YAML（330 条） | 同上 |
| `common/name_lists/ABYSS1.txt` + `YUZUGIRL1.txt` | `yuzu_reaper_scythe` 舰船名条目 | 移除 | 该舰船类型未在 `ship_sizes/` 中定义 |
| `common/component_templates/yuzu_weapons.txt` | `use_ship_kill_target = no` | `use_ship_main_target = no`（6 处） | 旧键已移除，对照 vanilla Arc Emitter / Particle Lance |
| `common/technology/yuzu_tech.txt` | `@ap_technological_ascendancy_rare_tech` | `factor = 9`（48 处） | 该 scripted variable 在 4.0 后已移除 |

### 已排除的文件

- `gfx/` — 大型二进制纹理文件（375 个 `.dds`），不纳入 git 版本管理
- `.idea/` `.vscode/` — IDE 配置文件

## 开发环境

- **Python 3.11**（通过 `uv` 管理虚拟环境）
- 运行脚本：`uv run python main.py`
- 安装依赖：`uv add <package>`
- **参考原版**：`D:\SteamLibrary\steamapps\common\Stellaris\`（Stellaris 安装目录）

## 模组结构

```
├── common/                  # 游戏数据定义
│   ├── ascension_perks/     # 飞升天赋
│   ├── buildings/           # 建筑
│   ├── decisions/           # 决议
│   ├── deposits/            # 地块沉积
│   ├── districts/           # 区划
│   ├── edicts/              # 法令
│   ├── governments/         # 政体/起源/国民理念
│   ├── planet_classes/      # 行星类型
│   ├── pop_jobs/            # 人口职业
│   ├── scripted_effects/    # 脚本化效果
│   ├── scripted_triggers/   # 脚本化触发器
│   ├── ship_sizes/          # 舰船类型
│   ├── static_modifiers/    # 静态修正
│   ├── technology/          # 科技
│   ├── traditions/          # 传统
│   └── traits/              # 特质
├── events/                  # 事件脚本
├── gfx/                     # 纹理素材（git 排除）
├── interface/               # UI 定义
├── localisation/            # 本地化文本（简体中文）
└── main.py                  # Python 辅助脚本
```

## 已知问题

- 4.0 人口统计方式变更后，模组特有巨像清除人口不会被统计在武灾（ genocide）进度内
- 更多兼容性问题待发现和修复

## 许可

原作版权归原 mod 作者所有。本仓库仅为兼容性移植。
