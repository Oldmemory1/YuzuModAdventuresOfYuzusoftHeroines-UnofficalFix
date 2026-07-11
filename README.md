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
| `gfx/portraits/portraits/yuzu_portraits.txt` | `hair_selector` | `attachment_selector`（69 处） | 4.0 后 hair_selector 已重命名 |
| `common/colony_types/yuzu_city_colony_types.txt` | 缺失 `_tt` 本地化键 | 新增 19 条 tooltip 标签 | 对照 vanilla col_city_tt 模式补充 |
| `common/component_templates/yuzu_others.txt` | `use_ship_kill_target = no` | `use_ship_main_target = no`（2 处） | 对照 vanilla 星爆器/巨像武器 |
| `common/component_templates/yuzu_roles.txt` | `size_restriction` 含 `yuzu_reaper_scythe` | 移除（2 处） | 该舰船类型未定义 |
| `common/name_lists/YUZUGIRL1.txt` | 缺失 `yuzu_star_eater_plural` | 新增 | 自定义舰船类型必需 _plural 本地化键 |
| `common/decisions/yuzu_decisions.txt` | `num_pops` | `pop_amount`（2 处） | 4.0 后人口统计改为 pop_amount（100/人） |
| `common/decisions/yuzu_decisions.txt` | `planet_event` / `set_industrial_focus_flags` / `set_ecu_industrial_districts_effect` | 替换为 `carrier_event` / 移除 / 移除 | 对照 vanilla 4.4.6 理想城计划：旧脚本效果已移除，事件改用 carrier_event |
| `common/decisions/yuzu_decisions.txt` | 缺少 `important` / `on_queued` / `on_unqueued` / `save_deposits` | 新增 | 对照 vanilla 4.4.6 理想城计划结构 |
| `common/decisions/yuzu_decisions.txt` | `district_*_uncapped` 检查 | 移除 | `_uncapped` 区划类型在 4.4.6 中不存在 |
| `common/decisions/yuzu_decisions.txt` | `any_owned_pop` | `any_owned_pop_group`（含 `country = owner`） | 4.0 后人口系统改动 |
| `common/decisions/yuzu_special_decisions.txt` | 同上所有问题 + Yuzu 定制理想城 | 同对照 vanilla 更新 | 保留 Yuzu 独有条件（is_YUZU、特殊资源花费、abyss/sunset 城市） |
| `common/deposits/Yuzu_deposits.txt` | `trade_value_mult` | `planet_jobs_trade_produces_mult`（2 处） | 4.0 后贸易值 modifier 改名，对照 vanilla event_planetary_deposits |
| `common/districts/yuzu_city_districts.txt` | `job_priest_add` / `job_death_priest_add` | `job_bureaucrat_add`（4 处） | 4.4.6 中祭司/死亡祭司已合并为 bureaucrat 变体（`bureaucrat_is_priest`/`bureaucrat_is_death_priest`） |
| `common/governments/authorities/Yuzu_authorities.txt` | `emergency_election_cost` / `pop_demotion_time_mult` / `local_trade_protection_add` | 移除（3 处） | 这三个 key 在 4.4.6 中不存在：选举费用改用 game_rule + `country_election_cost_mult`；人口降级机制已变更；贸易保护机制已重做 |
| `common/game_rules/zzz_yuzu_rules.txt` | `can_orbital_bombard` / `can_species_be_assembled` 两规则 | 与 vanilla 4.4.6 同步 + 柚子 mod 补充 | 移除废弃 tradition/policy_flag 引用，修复 `has_population_control` 格式，新增 vanilla 4.4.6 的 country_type（formless/frenzied_voidworms 等），保留 `new_abyss_empire` 和 `building_yuzu_clone_vats` |
| `common/scripted_effects/yuzu_leader_effects.txt` | `add_trait_no_notify` | `add_trait`（5 处） | 4.4.6 中静默添加特质使用 `add_trait = trait_name`，`_no_notify` 后缀已移除；移除空的 `else_if` 块 |

### 版本管理

- `gfx/` 仅排除 `.dds` 纹理文件，`.txt`/`.asset`/`.gfx`/`.png` 等定义文件均纳入 git 跟踪

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
