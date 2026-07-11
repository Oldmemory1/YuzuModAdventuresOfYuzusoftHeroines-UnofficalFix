import re
import os

filepath = 'D:/SteamLibrary/steamapps/common/Stellaris/common/buildings/13_fallen_empire_buildings.txt'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all building definitions
pattern = re.compile(r'^(building_\w+) = \{', re.MULTILINE)
matches = list(pattern.finditer(content))
print(f"Found {len(matches)} buildings")

buildings = []
for i, m in enumerate(matches):
    name = m.group(1)
    start = m.start()
    end = matches[i + 1].start() if i + 1 < len(matches) else len(content)
    buildings.append((name, content[start:end]))

# Now write the markdown
md = []
md.append("# Vanilla Fallen Empire Buildings Reference\n")
md.append("Source: `common/buildings/13_fallen_empire_buildings.txt` (Stellaris 4.4.6)\n")

md.append("## Variable References\n")
md.append("| Variable | Meaning |")
md.append("|---|---|")
md.append("| `@fe_jobs` | Standard FE job amount |")
md.append("| `@fe2_jobs` | Upgraded (T2) FE job amount |")
md.append("| `@fe_alloy_cost_0/1/2` | Alloy build cost tiers (0=cheap, 1=normal, 2=expensive) |")
md.append("| `@fe_sr_cost_1/2` | Strategic resource build cost |")
md.append("| `@fe_rr_cost_0/1/2` | Rare resource build cost (living metal / dark matter / zro) |")
md.append("| `@fe_sr_upkeep_1/2` | Strategic resource upkeep |")
md.append("| `@fe_rr_upkeep_1/2` | Rare resource upkeep |")
md.append("| `@fe_energy_upkeep_1/2/3/5` | Energy upkeep tiers |")
md.append("| `@fe_automation_worker_1` | Worker automation efficiency = 0.75 |")
md.append("| `@fe_automation_worker_2` | Worker automation efficiency = 1.00 |")
md.append("| `@fe_automation_specialist_1` | Specialist automation efficiency = 0.25 |")
md.append("| `@fe_automation_specialist_2` | Specialist automation efficiency = 0.50 |")
md.append("| `@b2_*` / `@b3_*` / `@b4_*` | Standard tiered building cost/upkeep values |")
md.append("| `@building_static_jobs` | Static job count (T1 labs) |")
md.append("| `@building_static_jobs_high` | Static job count (T2 labs) |")
md.append("")

md.append("---\n")
md.append("## Capital Buildings\n")
md.append("These are the central administration buildings for Fallen Empire planets. Capital tier 5.\n")

capitals = [b for b in buildings if 'capital = yes' in b[1] and not b[0].startswith('building_hab_fe')]
for name, block in capitals:
    cat = re.search(r'category\s*=\s*(\w+)', block).group(1) if re.search(r'category\s*=\s*(\w+)', block) else '?'
    pm = re.search(r'planet_modifier\s*=\s*\{([^}]+)\}', block)
    planet_mod = pm.group(1).strip().replace('\t', '') if pm else ''
    md.append(f"### `{name}`")
    md.append(f"- **Category**: `{cat}`")

    if 'is_fallen_empire_machine = yes' in block:
        md.append("- **Empire**: Machine Fallen Empire (Ancient Caretakers)")
    elif 'is_hive_empire = yes' in block:
        md.append("- **Empire**: Hive Fallen Empire")
    elif 'is_fallen_empire_spiritualist = yes' in block:
        md.append("- **Empire**: Spiritualist FE (Holy Guardians)")
    elif 'is_xenophile = yes' in block:
        md.append("- **Empire**: Xenophile FE (Enigmatic Observers)")
    elif 'is_fallen_empire = yes' in block:
        md.append("- **Empire**: Standard Fallen Empire")

    if planet_mod:
        md.append(f"- **Planet Modifiers**: `{planet_mod}`")

    cv = re.search(r'convert_to\s*=\s*\{([^}]+)\}', block)
    if cv:
        md.append(f"- **Convert To**: `{cv.group(1).strip()}`")
    md.append("")

# Habitat capital
hab_cap = [b for b in buildings if b[0].startswith('building_hab_fe')]
for name, block in hab_cap:
    md.append(f"### `{name}`")
    md.append("- **Category**: `government`")
    md.append("- **Empire**: All Fallen Empires (Habitat capital)")
    md.append("- **Planet Class**: `pc_habitat`")
    pm = re.search(r'planet_modifier\s*=\s*\{([^}]+)\}', block)
    if pm:
        md.append(f"- **Planet Modifiers**: `{pm.group(1).strip().replace(chr(9), '')}`")
    md.append("")

md.append("---\n")
md.append("## Unique FE Buildings (planet_limit=1, special)\n")

uniques = [b for b in buildings if b[0] in [
    'building_master_archive', 'building_empyrean_shrine', 'building_ancient_cryo_chamber'
]]
for name, block in uniques:
    cat = re.search(r'category\s*=\s*(\w+)', block).group(1)
    md.append(f"### `{name}`")
    md.append(f"- **Category**: `{cat}`")
    md.append("- **planet_limit**: 1")

    cm = re.search(r'country_modifier\s*=\s*\{([^}]+)\}', block)
    if cm:
        md.append(f"- **Country Modifier**: `{cm.group(1).strip().replace(chr(9), '')}`")

    pm = re.search(r'planet_modifier\s*=\s*\{([^}]+)\}', block)
    if pm:
        md.append(f"- **Planet Modifier**: `{pm.group(1).strip().replace(chr(9), '')}`")

    # triggered planet modifiers
    for tpm in re.finditer(r'triggered_planet_modifier\s*=\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}', block):
        tpm_text = tpm.group(1).strip()[:200]
        if 'is_fallen_empire = yes' in tpm_text:
            # Extract job info
            jobs = re.findall(r'job_\w+_add\s*=\s*\d+', tpm_text)
            for j in jobs:
                md.append(f"  - (FE) `{j}`")
        if 'is_fallen_empire = no' in tpm_text:
            md.append("  - (Non-FE) Extra bonuses when captured")

    # Produces
    for prod in re.finditer(r'produces\s*=\s*\{([^}]+)\}', block):
        md.append(f"- **Produces**: `{prod.group(1).strip().replace(chr(9), '')}`")

    md.append("")

md.append("---\n")
md.append("## Non-Capital Buildings (can_build=yes, upgradeable)\n")
md.append("These buildings can be built by both Fallen Empires and players who research the corresponding FE technology. Most have T1 → T2 upgrade paths.\n")

# Find upgrade chains
non_cap = [(n, b) for n, b in buildings if 'capital = yes' not in b and n not in [
    'building_master_archive', 'building_empyrean_shrine', 'building_ancient_cryo_chamber'
]]

# Sort by name to group base+upgrade together
non_cap.sort(key=lambda x: x[0])

i = 0
while i < len(non_cap):
    name, block = non_cap[i]

    # Print base building or standalone
    cat = re.search(r'category\s*=\s*(\w+)', block).group(1)

    md.append(f"### `{name}`")
    md.append(f"- **Category**: `{cat}`")

    # Can build?
    cb = 'yes' if 'can_build = yes' in block else 'no (upgrade only)'
    md.append(f"- **can_build**: {cb}")

    # Planet limit
    pl = re.search(r'planet_limit\s*=\s*(\d+)', block)
    if pl:
        md.append(f"- **planet_limit**: {pl.group(1)}")

    # Empire restrictions
    emps = []
    if 'is_fallen_empire_spiritualist = yes' in block:
        emps.append("Spiritualist FE")
    if 'is_hive_empire = yes' in block:
        emps.append("Hive")
    if 'is_machine_empire = yes' in block:
        emps.append("Machine")
    if 'is_spiritualist = yes' in block:
        emps.append("Spiritualist")
    if 'is_regular_empire = yes' in block:
        emps.append("Regular Empire")
    if 'is_gestalt = yes' in block:
        emps.append("Gestalt")
    if emps:
        md.append(f"- **Empire**: {', '.join(emps)}")

    # Key planet modifiers
    pm = re.search(r'planet_modifier\s*=\s*\{([^}]+)\}', block)
    if pm:
        md.append(f"- **Planet Modifier**: `{pm.group(1).strip().replace(chr(9), '')}`")

    # Country modifiers
    cm = re.search(r'country_modifier\s*=\s*\{([^}]+)\}', block)
    if cm:
        md.append(f"- **Country Modifier**: `{cm.group(1).strip().replace(chr(9), '')}`")

    # Produces
    for prod in re.finditer(r'produces\s*=\s*\{([^}]+)\}', block):
        md.append(f"- **Produces**: `{prod.group(1).strip().replace(chr(9), '')}`")

    # Special properties
    if 'planetary_ftl_inhibitor = yes' in block:
        md.append("- **Special**: FTL Inhibitor")
    if 'destroy_trigger' in block and 'always = no' not in block:
        md.append("- **Note**: Has conditional destroy_trigger")

    # Tech
    tech = re.search(r'show_in_tech\s*=\s*(\w+)', block)
    if tech:
        md.append(f"- **Tech**: `{tech.group(1)}`")

    # Building sets
    sets = re.search(r'building_sets\s*=\s*\{([^}]+)\}', block, re.DOTALL)
    if sets:
        set_list = [s.strip() for s in sets.group(1).split('\n') if s.strip()]
        md.append(f"- **Building Sets**: {', '.join(f'`{s}`' for s in set_list)}")

    # Upgrade info
    upgrades = re.search(r'upgrades\s*=\s*\{([^}]+)\}', block)
    if upgrades:
        md.append(f"- **Upgrades To**: `{upgrades.group(1).strip()}`")

    # Convert to
    cv = re.search(r'convert_to\s*=\s*\{([^}]+)\}', block)
    if cv:
        md.append(f"- **Convert To**: `{cv.group(1).strip()}`")

    md.append("")
    i += 1

md.append("---\n")
md.append("## Complete Building Index\n")
md.append("| # | Building | Tier | Category | Empire | Key Effects |")
md.append("|---|---|---|---|---|---|")

for idx, (name, block) in enumerate(buildings, 1):
    # Determine tier
    if name in ['building_master_archive', 'building_empyrean_shrine', 'building_ancient_cryo_chamber']:
        tier = "Unique"
    elif 'capital = yes' in block:
        tier = "Capital"
    elif '_2' in name:
        tier = "T2"
    elif '_1' in name:
        tier = "T1"
    else:
        tier = "—"

    cat = re.search(r'category\s*=\s*(\w+)', block)
    cat = cat.group(1) if cat else "?"

    if 'is_fallen_empire_machine = yes' in block:
        emp = "Machine FE"
    elif 'is_hive_empire = yes' in block and 'is_fallen_empire = yes' in block:
        emp = "Hive FE"
    elif 'is_fallen_empire_spiritualist' in block:
        emp = "Spir. FE"
    elif 'is_xenophile = yes' in block and 'is_fallen_empire = yes' in block:
        emp = "Xeno FE"
    elif 'is_fallen_empire = yes' in block:
        emp = "All FE"
    elif 'is_spiritualist = yes' in block:
        emp = "Spiritualist"
    elif 'is_hive_empire = yes' in block:
        emp = "Hive"
    elif 'is_machine_empire = yes' in block:
        emp = "Machine"
    elif 'is_regular_empire = yes' in block:
        emp = "Regular"
    else:
        emp = "Any"

    # Key effects
    effects = []
    pm = re.search(r'planet_modifier\s*=\s*\{([^}]+)\}', block)
    if pm:
        lines = pm.group(1).strip().split('\n')
        for line in lines:
            line = line.strip().replace('\t', '')
            if line and not line.startswith('#'):
                effects.append(line)
                if len(effects) >= 2:
                    break
    cm = re.search(r'country_modifier\s*=\s*\{([^}]+)\}', block)
    if cm:
        lines = cm.group(1).strip().split('\n')
        for line in lines:
            line = line.strip().replace('\t', '')
            if line and not line.startswith('#'):
                effects.append("(country) " + line)
                break
    for prod in re.finditer(r'produces\s*=\s*\{([^}]+)\}', block):
        lines = prod.group(1).strip().split('\n')
        for line in lines:
            line = line.strip().replace('\t', '')
            if line:
                effects.append(f"(produces) {line}")

    effect_str = '; '.join(effects[:2])
    if len(effect_str) > 70:
        effect_str = effect_str[:67] + '...'

    md.append(f"| {idx} | `{name}` | {tier} | {cat} | {emp} | {effect_str} |")

md.append("")
md.append("---")
md.append("*Generated from vanilla Stellaris 4.4.6 `common/buildings/13_fallen_empire_buildings.txt`*")
md.append(f"*Total: {len(buildings)} buildings*")

# Write to file
output_path = 'D:/SteamLibrary/steamapps/workshop/content/281990/3530566279/docs/vanilla_fe_buildings.md'
os.makedirs(os.path.dirname(output_path), exist_ok=True)
with open(output_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(md))

print(f"Written to {output_path}")
print(f"Total lines: {len(md)}")
