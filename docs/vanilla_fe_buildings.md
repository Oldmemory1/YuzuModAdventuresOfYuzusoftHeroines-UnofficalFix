# Vanilla Fallen Empire Buildings Reference

Source: `common/buildings/13_fallen_empire_buildings.txt` (Stellaris 4.4.6)

## Variable References

| Variable | Meaning |
|---|---|
| `@fe_jobs` | Standard FE job amount |
| `@fe2_jobs` | Upgraded (T2) FE job amount |
| `@fe_alloy_cost_0/1/2` | Alloy build cost tiers (0=cheap, 1=normal, 2=expensive) |
| `@fe_sr_cost_1/2` | Strategic resource build cost |
| `@fe_rr_cost_0/1/2` | Rare resource build cost (living metal / dark matter / zro) |
| `@fe_sr_upkeep_1/2` | Strategic resource upkeep |
| `@fe_rr_upkeep_1/2` | Rare resource upkeep |
| `@fe_energy_upkeep_1/2/3/5` | Energy upkeep tiers |
| `@fe_automation_worker_1` | Worker automation efficiency = 0.75 |
| `@fe_automation_worker_2` | Worker automation efficiency = 1.00 |
| `@fe_automation_specialist_1` | Specialist automation efficiency = 0.25 |
| `@fe_automation_specialist_2` | Specialist automation efficiency = 0.50 |
| `@b2_*` / `@b3_*` / `@b4_*` | Standard tiered building cost/upkeep values |
| `@building_static_jobs` | Static job count (T1 labs) |
| `@building_static_jobs_high` | Static job count (T2 labs) |

---

## Capital Buildings

These are the central administration buildings for Fallen Empire planets. Capital tier 5.

### `building_ancient_control_center`
- **Category**: `government`
- **Empire**: Machine Fallen Empire (Ancient Caretakers)
- **Planet Modifiers**: `planet_housing_add = 1200
planet_amenities_add = 15000
job_fe_maintenance_bot_add = 400
job_fe_guardian_bot_add = 500`
- **Convert To**: `building_hive_major_capital
		building_machine_major_capital
		building_major_capital
		building_major_capital_wilderness
		building_ancient_palace`

### `building_ancient_hive_capital`
- **Category**: `government`
- **Empire**: Hive Fallen Empire
- **Planet Modifiers**: `planet_housing_add = 1200
planet_amenities_add = 15000
job_logistics_drone_add = 700
job_patrol_drone_add = 400`
- **Convert To**: `building_hive_major_capital
		building_machine_major_capital
		building_major_capital
		building_ancient_palace
		building_ancient_control_center`

### `building_ancient_palace`
- **Category**: `government`
- **Empire**: Spiritualist FE (Holy Guardians)
- **Planet Modifiers**: `planet_housing_add = 1200
planet_amenities_add = 15000`
- **Convert To**: `building_hive_major_capital
		building_machine_major_capital
		building_major_capital
		building_ancient_control_center
		building_major_capital_wilderness`

### `building_fe_xeno_zoo`
- **Category**: `amenity`
- **Empire**: Xenophile FE (Enigmatic Observers)
- **Planet Modifiers**: `planet_amenities_add = 1500
job_fe_xeno_keeper_add = 200
planet_housing_add = 3000`
- **Convert To**: `building_hive_capital
		building_machine_capital
		building_capital`

### `building_hab_fe_capital`
- **Category**: `government`
- **Empire**: All Fallen Empires (Habitat capital)
- **Planet Class**: `pc_habitat`
- **Planet Modifiers**: `planet_housing_add = 500
planet_amenities_add = 2500`

---

## Unique FE Buildings (planet_limit=1, special)

### `building_master_archive`
- **Category**: `research`
- **planet_limit**: 1
- **Country Modifier**: `num_tech_alternatives_add = 2`
- **Planet Modifier**: `potential = {
exists = owner
owner = { is_fallen_empire = yes`
- **Produces**: `physics_research = 100
society_research = 100
engineering_research = 100`

### `building_empyrean_shrine`
- **Category**: `unity`
- **planet_limit**: 1
- **Country Modifier**: `potential = {
has_shroud_dlc = no
exists = owner
owner = {
has_country_flag = breached_shroud`
- **Planet Modifier**: `potential = {
exists = owner
owner = { is_fallen_empire = yes`

### `building_ancient_cryo_chamber`
- **Category**: `government`
- **planet_limit**: 1
- **Country Modifier**: `category_biology_research_speed_mult = 0.1`

---

## Non-Capital Buildings (can_build=yes, upgradeable)

These buildings can be built by both Fallen Empires and players who research the corresponding FE technology. Most have T1 → T2 upgrade paths.

### `building_affluence_center`
- **Category**: `manufacturing`
- **can_build**: no (upgrade only)
- **planet_limit**: 1
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Produces**: `consumer_goods = 35`
- **Tech**: `tech_fe_affluence_2`
- **Building Sets**: `fallen_empire`, `industrial`, `factory`

### `building_affluence_emporium`
- **Category**: `manufacturing`
- **can_build**: yes
- **planet_limit**: 1
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Tech**: `tech_fe_affluence_1`
- **Building Sets**: `fallen_empire`, `industrial`, `factory`
- **Upgrades To**: `building_affluence_center`

### `building_class_3_singularity`
- **Category**: `resource`
- **can_build**: yes
- **planet_limit**: 1
- **Empire**: Spiritualist FE
- **Planet Modifier**: `potential = {
exists = owner
owner = { is_fallen_empire_spiritualist = yes`
- **Produces**: `energy = 75`
- **Tech**: `tech_fe_singularity_1`
- **Building Sets**: `fallen_empire`, `fallen_empire_generator`
- **Upgrades To**: `building_class_4_singularity`

### `building_class_4_singularity`
- **Category**: `resource`
- **can_build**: no (upgrade only)
- **planet_limit**: 1
- **Empire**: Spiritualist FE
- **Planet Modifier**: `potential = {
exists = owner
owner = { is_fallen_empire_spiritualist = yes`
- **Produces**: `energy = 200`
- **Tech**: `tech_fe_singularity_2`
- **Building Sets**: `fallen_empire`, `fallen_empire_generator`

### `building_dimensional_fabricator`
- **Category**: `manufacturing`
- **can_build**: no (upgrade only)
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Produces**: `rare_crystals = 25
exotic_gases = 25
volatile_motes = 25
sr_zro = 5
sr_dark_matter = 5
sr_living_metal = 5
nanites = 5`
- **Tech**: `tech_fe_fabricator_2`
- **Building Sets**: `fallen_empire`, `industrial`, `factory`, `foundry`

### `building_dimensional_replicator`
- **Category**: `manufacturing`
- **can_build**: yes
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Produces**: `rare_crystals = 10
exotic_gases = 10
volatile_motes = 10`
- **Tech**: `tech_fe_fabricator_1`
- **Building Sets**: `fallen_empire`, `industrial`, `factory`, `foundry`
- **Upgrades To**: `building_dimensional_fabricator`

### `building_fe_administration_1`
- **Category**: `unity`
- **can_build**: yes
- **planet_limit**: 1
- **Empire**: Spiritualist
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Note**: Has conditional destroy_trigger
- **Tech**: `tech_fe_administration_1`
- **Building Sets**: `fallen_empire`, `unity`
- **Upgrades To**: `building_fe_administration_2`
- **Convert To**: `building_fe_administration_hive_1
		building_fe_temple_1
		building_fe_administration_machine_1`

### `building_fe_administration_2`
- **Category**: `unity`
- **can_build**: no (upgrade only)
- **planet_limit**: 1
- **Empire**: Spiritualist
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Produces**: `unity = 20`
- **Note**: Has conditional destroy_trigger
- **Tech**: `tech_fe_administration_2`
- **Building Sets**: `fallen_empire`, `unity`
- **Convert To**: `building_fe_administration_hive_2
		building_fe_temple_2
		building_fe_administration_machine_2`

### `building_fe_administration_hive_1`
- **Category**: `unity`
- **can_build**: yes
- **planet_limit**: 1
- **Empire**: Hive
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Note**: Has conditional destroy_trigger
- **Tech**: `tech_fe_administration_1`
- **Building Sets**: `fallen_empire`, `unity`
- **Upgrades To**: `building_fe_administration_hive_2`
- **Convert To**: `building_fe_administration_1
		building_fe_temple_1
		building_fe_administration_machine_1`

### `building_fe_administration_hive_2`
- **Category**: `unity`
- **can_build**: no (upgrade only)
- **planet_limit**: 1
- **Empire**: Hive
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Produces**: `unity = 20`
- **Note**: Has conditional destroy_trigger
- **Tech**: `tech_fe_administration_2`
- **Building Sets**: `fallen_empire`, `unity`
- **Convert To**: `building_fe_administration_2
		building_fe_temple_2
		building_fe_administration_machine_2`

### `building_fe_administration_machine_1`
- **Category**: `unity`
- **can_build**: yes
- **planet_limit**: 1
- **Empire**: Machine
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Note**: Has conditional destroy_trigger
- **Tech**: `tech_fe_administration_1`
- **Building Sets**: `fallen_empire`, `unity`
- **Upgrades To**: `building_fe_administration_machine_2`
- **Convert To**: `building_fe_administration_1
		building_fe_temple_1
		building_fe_administration_hive_1`

### `building_fe_administration_machine_2`
- **Category**: `unity`
- **can_build**: no (upgrade only)
- **planet_limit**: 1
- **Empire**: Machine
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Produces**: `unity = 20`
- **Note**: Has conditional destroy_trigger
- **Tech**: `tech_fe_administration_2`
- **Building Sets**: `fallen_empire`, `unity`
- **Convert To**: `building_fe_administration_2
		building_fe_temple_2
		building_fe_administration_hive_2`

### `building_fe_assembly_1`
- **Category**: `pop_assembly`
- **can_build**: yes
- **planet_limit**: 1
- **Empire**: Machine, Regular Empire
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Note**: Has conditional destroy_trigger
- **Tech**: `tech_fe_assembly_1`
- **Building Sets**: `fallen_empire`, `urban`
- **Upgrades To**: `building_fe_assembly_2`

### `building_fe_assembly_2`
- **Category**: `pop_assembly`
- **can_build**: no (upgrade only)
- **planet_limit**: 1
- **Empire**: Machine, Regular Empire
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Note**: Has conditional destroy_trigger
- **Tech**: `tech_fe_assembly_2`
- **Building Sets**: `fallen_empire`, `urban`

### `building_fe_clinic_1`
- **Category**: `amenity`
- **can_build**: yes
- **planet_limit**: 1
- **Empire**: Hive, Machine, Regular Empire
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Country Modifier**: `leader_lifespan_add = 1`
- **Note**: Has conditional destroy_trigger
- **Tech**: `tech_fe_clinic_1`
- **Building Sets**: `fallen_empire`, `urban`
- **Upgrades To**: `building_fe_clinic_2`

### `building_fe_clinic_2`
- **Category**: `amenity`
- **can_build**: no (upgrade only)
- **planet_limit**: 1
- **Empire**: Hive, Machine, Regular Empire
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Country Modifier**: `leader_lifespan_add = 2`
- **Note**: Has conditional destroy_trigger
- **Tech**: `tech_fe_clinic_2`
- **Building Sets**: `fallen_empire`, `urban`

### `building_fe_dome`
- **Category**: `amenity`
- **can_build**: no (upgrade only)
- **Planet Modifier**: `planet_housing_add = 5000
planet_amenities_add = 7500
planet_pops_upkeep_mult = -0.05`
- **Note**: Has conditional destroy_trigger
- **Tech**: `tech_fe_dome_2`
- **Building Sets**: `fallen_empire`, `bio_trophy`, `ark_forever_cruise_passengers`, `urban`, `resort`

### `building_fe_entertainment_1`
- **Category**: `amenity`
- **can_build**: yes
- **planet_limit**: 1
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Note**: Has conditional destroy_trigger
- **Tech**: `tech_fe_entertainment_1`
- **Building Sets**: `fallen_empire`, `urban`
- **Upgrades To**: `building_fe_entertainment_2`

### `building_fe_entertainment_2`
- **Category**: `amenity`
- **can_build**: no (upgrade only)
- **planet_limit**: 1
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Note**: Has conditional destroy_trigger
- **Tech**: `tech_fe_entertainment_2`
- **Building Sets**: `fallen_empire`, `urban`

### `building_fe_fortress`
- **Category**: `army`
- **can_build**: yes
- **planet_limit**: 1
- **Planet Modifier**: `potential = {
exists = owner
owner = { is_wilderness_empire = no`
- **Tech**: `tech_fe_fortress_1`
- **Building Sets**: `fallen_empire`, `fortress`
- **Upgrades To**: `building_fe_stronghold`

### `building_fe_lab_1`
- **Category**: `research`
- **can_build**: yes
- **planet_limit**: 1
- **Empire**: Gestalt
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Tech**: `tech_fe_lab_1`
- **Building Sets**: `fallen_empire`, `research`, `physics`, `society`, `engineering`
- **Upgrades To**: `building_fe_lab_2`

### `building_fe_lab_2`
- **Category**: `research`
- **can_build**: no (upgrade only)
- **planet_limit**: 1
- **Empire**: Gestalt
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Produces**: `physics_research = 20
society_research = 20
engineering_research = 20`
- **Tech**: `tech_fe_lab_2`
- **Building Sets**: `fallen_empire`, `research`, `physics`, `society`, `engineering`

### `building_fe_market_1`
- **Category**: `trade`
- **can_build**: yes
- **planet_limit**: 1
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Note**: Has conditional destroy_trigger
- **Tech**: `tech_fe_market_1`
- **Building Sets**: `fallen_empire`, `trade`
- **Upgrades To**: `building_fe_market_2`

### `building_fe_market_2`
- **Category**: `trade`
- **can_build**: no (upgrade only)
- **planet_limit**: 1
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Country Modifier**: `country_trade_produces_mult = 0.01`
- **Note**: Has conditional destroy_trigger
- **Tech**: `tech_fe_market_2`
- **Building Sets**: `fallen_empire`, `trade`

### `building_fe_mine_1`
- **Category**: `resource`
- **can_build**: yes
- **planet_limit**: 1
- **Empire**: Spiritualist FE
- **Planet Modifier**: `potential = {
NOT = { is_planet_class = pc_shattered_ring_habitable`
- **Produces**: `minerals = 50`
- **Tech**: `tech_fe_mine_1`
- **Building Sets**: `fallen_empire`, `fallen_empire_mining`
- **Upgrades To**: `building_fe_mine_2`

### `building_fe_mine_2`
- **Category**: `resource`
- **can_build**: no (upgrade only)
- **planet_limit**: 1
- **Empire**: Spiritualist FE
- **Planet Modifier**: `potential = {
NOT = { is_planet_class = pc_shattered_ring_habitable`
- **Produces**: `minerals = 150`
- **Tech**: `tech_fe_mine_2`
- **Building Sets**: `fallen_empire`, `fallen_empire_mining`

### `building_fe_security_1`
- **Category**: `government`
- **can_build**: yes
- **planet_limit**: 1
- **Empire**: Regular Empire, Gestalt
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Tech**: `tech_fe_security_1`
- **Building Sets**: `fallen_empire`, `urban`
- **Upgrades To**: `building_fe_security_2`

### `building_fe_security_2`
- **Category**: `government`
- **can_build**: no (upgrade only)
- **planet_limit**: 1
- **Empire**: Regular Empire, Gestalt
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Country Modifier**: `country_edict_fund_add = 10`
- **Tech**: `tech_fe_security_2`
- **Building Sets**: `fallen_empire`, `urban`

### `building_fe_silo_1`
- **Category**: `resource`
- **can_build**: yes
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Country Modifier**: `country_resource_max_add = 50000
country_resource_max_minor_artifacts_add = 500`
- **Tech**: `tech_fe_silo_1`
- **Building Sets**: `fallen_empire`, `generator`, `mining`, `farming`
- **Upgrades To**: `building_fe_silo_2`

### `building_fe_silo_2`
- **Category**: `resource`
- **can_build**: no (upgrade only)
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Country Modifier**: `country_resource_max_add = 100000
country_resource_max_minor_artifacts_add = 1000`
- **Tech**: `tech_fe_silo_2`
- **Building Sets**: `fallen_empire`, `generator`, `mining`, `farming`

### `building_fe_sky_dome`
- **Category**: `amenity`
- **can_build**: yes
- **Planet Modifier**: `planet_housing_add = 2500
planet_amenities_add = 3750`
- **Note**: Has conditional destroy_trigger
- **Tech**: `tech_fe_dome_1`
- **Building Sets**: `fallen_empire`, `bio_trophy`, `ark_forever_cruise_passengers`, `urban`, `resort`
- **Upgrades To**: `building_fe_dome`

### `building_fe_stronghold`
- **Category**: `army`
- **can_build**: no (upgrade only)
- **planet_limit**: 1
- **Planet Modifier**: `potential = {
exists = owner
owner = { is_wilderness_empire = no`
- **Special**: FTL Inhibitor
- **Tech**: `tech_fe_fortress_2`
- **Building Sets**: `fallen_empire`, `fortress`

### `building_fe_temple_1`
- **Category**: `unity`
- **can_build**: yes
- **planet_limit**: 1
- **Empire**: Spiritualist
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Note**: Has conditional destroy_trigger
- **Tech**: `tech_fe_administration_1`
- **Building Sets**: `fallen_empire`, `unity`
- **Upgrades To**: `building_fe_temple_2`
- **Convert To**: `building_fe_administration_1
		building_fe_administration_machine_1
		building_fe_administration_hive_1`

### `building_fe_temple_2`
- **Category**: `unity`
- **can_build**: no (upgrade only)
- **planet_limit**: 1
- **Empire**: Spiritualist
- **Planet Modifier**: `potential = {
exists = owner
owner = {
is_wilderness_empire = yes
has_tradition = tr_purity_finish`
- **Produces**: `unity = 25`
- **Note**: Has conditional destroy_trigger
- **Tech**: `tech_fe_administration_2`
- **Building Sets**: `fallen_empire`, `unity`
- **Convert To**: `building_fe_administration_2
		building_fe_administration_machine_2
		building_fe_administration_hive_2`

### `building_micro_forge`
- **Category**: `manufacturing`
- **can_build**: yes
- **planet_limit**: 1
- **Planet Modifier**: `potential = {
exists = owner
owner = { is_wilderness_empire = no`
- **Tech**: `tech_fe_forge_1`
- **Building Sets**: `fallen_empire`, `industrial`, `foundry`
- **Upgrades To**: `building_nano_forge`

### `building_nano_forge`
- **Category**: `manufacturing`
- **can_build**: no (upgrade only)
- **planet_limit**: 1
- **Planet Modifier**: `planet_structures_upkeep_mult = -0.05`
- **Produces**: `alloys = 25`
- **Tech**: `tech_fe_forge_2`
- **Building Sets**: `fallen_empire`, `industrial`, `foundry`

### `building_nourishment_center`
- **Category**: `resource`
- **can_build**: no (upgrade only)
- **planet_limit**: 1
- **Empire**: Spiritualist FE
- **Planet Modifier**: `pop_environment_tolerance = 0.05`
- **Produces**: `food = 150`
- **Tech**: `tech_fe_nourishment_2`
- **Building Sets**: `fallen_empire`, `fallen_empire_farming`

### `building_nourishment_complex`
- **Category**: `resource`
- **can_build**: yes
- **planet_limit**: 1
- **Empire**: Spiritualist FE
- **Planet Modifier**: `potential = {
exists = owner
owner = { is_fallen_empire_spiritualist = yes`
- **Produces**: `food = 40`
- **Tech**: `tech_fe_nourishment_1`
- **Building Sets**: `fallen_empire`, `fallen_empire_farming`
- **Upgrades To**: `building_nourishment_center`

---

## Complete Building Index

| # | Building | Tier | Category | Empire | Key Effects |
|---|---|---|---|---|---|
| 1 | `building_ancient_control_center` | Capital | government | Machine FE | planet_housing_add = 1200; planet_amenities_add = 15000 |
| 2 | `building_ancient_hive_capital` | Capital | government | Hive FE | planet_housing_add = 1200; planet_amenities_add = 15000 |
| 3 | `building_ancient_palace` | Capital | government | Spir. FE | planet_housing_add = 1200; planet_amenities_add = 15000 |
| 4 | `building_fe_xeno_zoo` | Capital | amenity | Xeno FE | planet_amenities_add = 1500; job_fe_xeno_keeper_add = 200 |
| 5 | `building_hab_fe_capital` | Capital | government | Machine FE | planet_housing_add = 500; planet_amenities_add = 2500 |
| 6 | `building_master_archive` | Unique | research | All FE | potential = {; exists = owner |
| 7 | `building_empyrean_shrine` | Unique | unity | All FE | potential = {; exists = owner |
| 8 | `building_ancient_cryo_chamber` | Unique | government | Any | (country) category_biology_research_speed_mult = 0.1 |
| 9 | `building_affluence_emporium` | — | manufacturing | All FE | potential = {; exists = owner |
| 10 | `building_affluence_center` | — | manufacturing | All FE | potential = {; exists = owner |
| 11 | `building_nourishment_complex` | — | resource | Spir. FE | potential = {; exists = owner |
| 12 | `building_nourishment_center` | — | resource | Spir. FE | pop_environment_tolerance = 0.05; (produces) food = 150 |
| 13 | `building_dimensional_replicator` | — | manufacturing | All FE | potential = {; exists = owner |
| 14 | `building_dimensional_fabricator` | — | manufacturing | All FE | potential = {; exists = owner |
| 15 | `building_class_3_singularity` | — | resource | Spir. FE | potential = {; exists = owner |
| 16 | `building_class_4_singularity` | — | resource | Spir. FE | potential = {; exists = owner |
| 17 | `building_micro_forge` | — | manufacturing | All FE | potential = {; exists = owner |
| 18 | `building_nano_forge` | — | manufacturing | All FE | planet_structures_upkeep_mult = -0.05; (produces) alloys = 25 |
| 19 | `building_fe_sky_dome` | — | amenity | All FE | planet_housing_add = 2500; planet_amenities_add = 3750 |
| 20 | `building_fe_dome` | — | amenity | All FE | planet_housing_add = 5000; planet_amenities_add = 7500 |
| 21 | `building_fe_fortress` | — | army | All FE | potential = {; exists = owner |
| 22 | `building_fe_stronghold` | — | army | All FE | potential = {; exists = owner |
| 23 | `building_fe_administration_1` | T1 | unity | All FE | potential = {; exists = owner |
| 24 | `building_fe_administration_2` | T2 | unity | All FE | potential = {; exists = owner |
| 25 | `building_fe_administration_hive_1` | T1 | unity | Hive FE | potential = {; exists = owner |
| 26 | `building_fe_administration_hive_2` | T2 | unity | Hive FE | potential = {; exists = owner |
| 27 | `building_fe_administration_machine_1` | T1 | unity | All FE | potential = {; exists = owner |
| 28 | `building_fe_administration_machine_2` | T2 | unity | All FE | potential = {; exists = owner |
| 29 | `building_fe_temple_1` | T1 | unity | All FE | potential = {; exists = owner |
| 30 | `building_fe_temple_2` | T2 | unity | All FE | potential = {; exists = owner |
| 31 | `building_fe_assembly_1` | T1 | pop_assembly | All FE | potential = {; exists = owner |
| 32 | `building_fe_assembly_2` | T2 | pop_assembly | All FE | potential = {; exists = owner |
| 33 | `building_fe_clinic_1` | T1 | amenity | Hive FE | potential = {; exists = owner |
| 34 | `building_fe_clinic_2` | T2 | amenity | Hive FE | potential = {; exists = owner |
| 35 | `building_fe_security_1` | T1 | government | All FE | potential = {; exists = owner |
| 36 | `building_fe_security_2` | T2 | government | All FE | potential = {; exists = owner |
| 37 | `building_fe_market_1` | T1 | trade | All FE | potential = {; exists = owner |
| 38 | `building_fe_market_2` | T2 | trade | All FE | potential = {; exists = owner |
| 39 | `building_fe_silo_1` | T1 | resource | All FE | potential = {; exists = owner |
| 40 | `building_fe_silo_2` | T2 | resource | All FE | potential = {; exists = owner |
| 41 | `building_fe_entertainment_1` | T1 | amenity | All FE | potential = {; exists = owner |
| 42 | `building_fe_entertainment_2` | T2 | amenity | All FE | potential = {; exists = owner |
| 43 | `building_fe_lab_1` | T1 | research | All FE | potential = {; exists = owner |
| 44 | `building_fe_lab_2` | T2 | research | All FE | potential = {; exists = owner |
| 45 | `building_fe_mine_1` | T1 | resource | Spir. FE | potential = {; NOT = { is_planet_class = pc_shattered_ring_habitable |
| 46 | `building_fe_mine_2` | T2 | resource | Spir. FE | potential = {; NOT = { is_planet_class = pc_shattered_ring_habitable |

---
*Generated from vanilla Stellaris 4.4.6 `common/buildings/13_fallen_empire_buildings.txt`*
*Total: 46 buildings*