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
| `common/ship_sizes/yuzu_other_ship_sizes.txt` | `titan_yards` / `colossus_yards` 硬编码建造条件 | 调用 vanilla scripted triggers（3 个舰种） | 4.4.6 中泰坦组装厂和巨像组装厂合并为 `capital_yards`（主力舰组装厂），改用 `titan/colossus/juggernaut_possible_construction` 同步原版 |
| `common/ship_sizes/yuzu_ship_sizes.txt` | `colossus_yards` 硬编码建造条件 | 调用 `colossus_possible_construction` | 对照 vanilla 4.4.6 `star_eater`（焚天神兵）建造条件同步；yuzu_star_eater 继承 colossus 建造触发 |
| `common/pop_jobs/yuzu_jobs.txt` | `trade_value_add` / `has_job` / `job_weights_modifier` / `pop_modifier` | 移除或同步 vanilla 4.4.6 写法 | `trade_value_add`→`trade=8`（对照 clerk）；`has_job`/`job_weights_modifier` 在 4.4.6 中不存在；`pop_modifier`→`planet_modifier`+`planet_defense_armies_add`（对照 soldier） |
| `gfx/models/ships/starbases/yuzu_starbase_entities.asset` | `energy_core_purple_effect`（10 处） | `energy_core_effect` | 该粒子在 vanilla 4.4.6 中不存在；对照 vanilla `fallen_empire_01` 星垒实体使用 `energy_core_effect` |
| `gfx/projectiles/fallen_yuzu_abyss_empire_01_titan_lance.txt` | `purple_titan_laser_hit/shield/muzzle/windup_entity`（4 处） | `titan_laser_*_entity` | 这些 `purple_*` 实体在 vanilla 4.4.6 中不存在；对照 vanilla `titan_laser` 投射物使用标准实体 |
| `events/Yuzu_origin_event.txt` | `planet_event` 在 `capital_scope`（Colony 作用域）/ `district_farming_uncapped` / `random_owned_pop` 在 `while` 中 / 虚空居者判断 / `create_pop` | 修复 5 处 CWTools 错误 + 同步 vanilla 模式 | `capital_scope` → `planet = { planet_event }`（4.4.6 中 capital_scope 为 Colony 作用域）；`district_farming_uncapped` → `district_farming`；`while` + `random_owned_pop` → `every_owned_pop` + `count = 5`（对照 vanilla 红巨星起源）；虚空居者判断 → `is_nomadic = no` + `NOR(origin_void_dwellers, origin_void_machines)`；`create_pop` → `create_pop_group`（对照 vanilla `d_decrepit_dwellings` 的 `on_cleared` 效果，每清除贫民窟释放 1 人口=100 pop_amount） |
| `common/planet_classes/yuzu_planet_classes.txt` | `pop_growth_speed` / `planet_pop_assembly_organic_mult` | `bonus_pop_growth_mult` / `planet_pop_assembly_mult`（4 处） | 对照 vanilla 4.4.6 都市星球（`pc_city`）使用 `bonus_pop_growth_mult = 0.15` + `planet_pop_assembly_mult = 0.15`；盖亚星球使用 `logistic_growth_mult`；`_organic` 后缀已移除 |
| `common/scripted_effects/yuzu_other_effects.txt` | `random_owned_pop` / `create_pop` + `last_created_pop` 在 `while` 中（5 处） | `while` + `random_owned_pop_group` + `kill_single_pop` / `create_pop_group` + `effect` | 对照 vanilla 4.4.6 `random_owned_pop_group` in `while`（参考 mod 3081699910 `plnmg_kill_with_mwc`）；ghost_signal 使用 `add_modifier` 在 pop_group 上；`create_pop` → `create_pop_group` + `size`（1 旧 pop = 100 pop_amount） |
| `common/pop_categories/yuzu_categories.txt` | `pop_modifier` / `inline_script "pop_categories/regular_upkeep"` / `inline_script "pop_categories/cyborg_upkeep"`（3 处） | `pop_group_modifier` / 移除（2 处） | 对照 vanilla 4.4.6 `xeno_ward`（`02_other_categories.txt:605-649`）：`pop_modifier` 已重命名为 `pop_group_modifier`；`regular_upkeep` 和 `cyborg_upkeep` inline scripts 不存在（食物/矿物/能源维护费由生活标准系统处理） |
| `common/districts/yuzu_city_districts.txt` — `district_yuzu_city_housing` | 无 zone_slots，直接 `job_*_add` + designation 切换（pre-4.4.6 模式） | 使用 4.4.6 zone 系统：`slot_city_government` + `slot_yuzu_city_01` + `slot_yuzu_city_02`（新增 `common/zone_slots/yuzu_zone_slots.txt`） | 对照 vanilla `district_arcology_housing`（`01_arcology_districts.txt`）；Yuzu zone slots 使用 `urban` 集但排除 `zone_spawning`（蜂巢）和 `zone_machine_replication`（机械世界） |
| `common/districts/yuzu_city_districts.txt` — 迁移至 4.4.6 zone 系统 | 5 个区划使用 pre-4.4.6 模式直接加岗位 + designation 切换 | 新增 3 个 `district_yuzu_city_urban_1/2/3`（对标 `district_arcology_urban_1/2/3`）；旧 `industry`/`administrative`/`religious`/`refinery` 转为 swap district（`slot_empty`，纯视觉）；`district_yuzu_city_dream` 保留 | 对照 vanilla 4.4.6 普世城 + 参考 mod 2660548454；同步更新 `yuzu_city_colony_types.txt`、`yuzu_other_effects.txt`（`save_city_district_num`/`set_yuzu_city_district`）、`Yuzu_abyss_crisis_event.txt`、localisation |
| `common/zones/yuzu_zones.txt` + `common/zone_slots/yuzu_zone_slots.txt`（新增） | — | 自定义 Yuzu zone 系统：3 个 arcology zone（`zone_yuzu_industrial/foundry/factory_arcology`，`yuzu_arcology` zone set）+ 3 个 dream zone（`zone_yuzu_energy/minerals/food_city_dream`，`yuzu_arcology_dream` zone set）；2 个 `slot_yuzu_city_01/02`（urban 集）+ 3 个 `slot_yuzu_arcology_urban_01/02/03` | 所有 Yuzu zone 使用 `zone_yuzu_*` 前缀避免覆盖原版；arcology zone 通过 `swap_type` 指向 Yuzu swap district 实现视觉切换；dream zone 为 sunset 世界专属（`planet_max_districts_add = 1`） |
| `common/inline_scripts/jobs/yuzu_zone_job_*.txt`（新增，6 个） | — | 自定义 inline_scripts 按帝国类型分发岗位（`yuzu_zone_job_alloy/goods/energy/minerals/food/unity`） | 4.4.6 zone 系统通过 inline_script 提供岗位；每个 script 根据 `is_regular_empire`/`is_hive_empire`/`is_machine_empire`/`is_spiritualist` 分配合适的岗位类型 |
| `common/districts/yuzu_city_districts.txt` — 梦境区划修复 | 建筑图标缺失、zone_slot 为空 | 添加缺失的 `slot_yuzu_city_dream_01` 及对应 zone | 对照 vanilla pattern 补充 dream zone slot 定义 |
| `common/game_rules/zzz_yuzu_rules.txt` | 规则参数错误 | 修复 game rule | 同步 vanilla 4.4.6 规则格式 |
| `localisation/simp_chinese/yuzu_planet_l_simp_chinese.yml` | — | 新增 24 条 arcology zone 本地化 + 6 条 dream zone 本地化；恢复旧区划的本地化条目 | zone 名称引用 `$zone_*$` 变量或自定义中文翻译（dream zone 使用幻梦境主题） |

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
│   ├── colony_types/        # 殖民类型
│   ├── decisions/           # 决议
│   ├── deposits/            # 地块沉积
│   ├── districts/           # 区划
│   ├── edicts/              # 法令
│   ├── game_rules/          # 游戏规则
│   ├── governments/         # 政体/起源/国民理念
│   ├── inline_scripts/      # 内联脚本（jobs/ 等）
│   ├── planet_classes/      # 行星类型
│   ├── pop_categories/      # 人口类别
│   ├── pop_jobs/            # 人口职业
│   ├── scripted_effects/    # 脚本化效果
│   ├── scripted_triggers/   # 脚本化触发器
│   ├── ship_sizes/          # 舰船类型
│   ├── static_modifiers/    # 静态修正
│   ├── technology/          # 科技
│   ├── traditions/          # 传统
│   ├── traits/              # 特质
│   ├── zone_slots/          # Zone 插槽定义
│   └── zones/               # Zone 定义
├── events/                  # 事件脚本
├── gfx/                     # 纹理素材（git 排除）
├── interface/               # UI 定义
├── localisation/            # 本地化文本（简体中文）
├── docs/                    # 参考文档
├── scripts/                 # Python 辅助脚本
└── main.py                  # Python 辅助脚本
```

## 已知问题

- 4.0 人口统计方式变更后，模组特有巨像清除人口不会被统计在武灾（ genocide）进度内
- 更多兼容性问题待发现和修复

## 许可

原作版权归原 mod 作者所有。本仓库仅为兼容性移植。
