/* Generated from yuzu_planet.json and yuzu_districts.json for file:// compatible loading. */
window.YUZU_DISTRICT_DATA = {
  "meta": {
    "title": "特殊星球与区划图鉴",
    "subtitle": "Yuzu City Worlds · District & Zone Archive",
    "version": "Stellaris 4.4.6 移植线",
    "updated": "2026-10-22",
    "jobUnitNote": "Zone 的岗位数值直接采用脚本中的 AMOUNT 原值。"
  },
  "categories": [
    {
      "id": "all",
      "label": "全部塔楼特化"
    },
    {
      "id": "industry",
      "label": "工业"
    },
    {
      "id": "research",
      "label": "科研"
    },
    {
      "id": "unity",
      "label": "行政与唯心"
    },
    {
      "id": "defense",
      "label": "防御"
    },
    {
      "id": "trade",
      "label": "贸易"
    },
    {
      "id": "health",
      "label": "医疗"
    },
    {
      "id": "dream",
      "label": "梦境"
    }
  ],
  "planets": [
    {
      "id": "abyss",
      "name": "深渊之城",
      "code": "pc_yuzu_abyss_city",
      "image": "images/planet_abyss.jpg",
      "accent": "abyss",
      "eyebrow": "ABYSS CITY · 工业都市星球",
      "description": "整个星球都被都市与工业集群覆盖，并利用深渊之息辅助生产。从太空中已经无法辨认其地壳的自然形态。",
      "highlights": [
        "岗位产出 +50%",
        "人口消费品维护 +50%",
        "人口增长速度 +50%",
        "固定城市等级 6"
      ],
      "facts": [
        "可殖民理想星球，不会自然随机生成",
        "每个空闲区划提供 1,200 人口承载",
        "使用独立的 yuzu_abyss_city_world 区划集合",
        "可建造居住理想城、未分配塔楼与全部塔楼特化"
      ]
    },
    {
      "id": "sunset",
      "name": "夕阳之城",
      "code": "pc_yuzu_sunset_city",
      "image": "images/planet_sunset.jpg",
      "accent": "sunset",
      "eyebrow": "SUNSET CITY · 梦境都市星球",
      "description": "整个星球都被都市与工业集群覆盖，并与幻梦境中自身的投影重叠。城市与梦境共用同一片天际线。",
      "highlights": [
        "岗位产出 +30%",
        "人口增长速度 +150%",
        "固定城市等级 6",
        "每空闲区划承载 1,200 人口"
      ],
      "facts": [
        "可殖民理想星球，不会自然随机生成",
        "使用独立的 yuzu_sunset_city_world 区划集合",
        "可使用全部普通塔楼与塔楼特化",
        "独有梦境区划及能源、矿物、农业三种梦境特化"
      ]
    }
  ],
  "baseDistricts": [
    {
      "id": "housing",
      "name": "居住理想城",
      "code": "district_arcology_housing",
      "image": "images/district_housing.png",
      "kind": "住房区划",
      "summary": "承担城市主体住房，并开放政府槽与两个城市 Zone 槽。",
      "description": "这些特殊的巨城区划利用整合式垂直建筑，可实现地表面积人口密度最大化。",
      "cost": "500 合金",
      "time": "600 天",
      "upkeep": "5 能量",
      "zones": "3 个 Zone 槽：政府、城市 I、城市 II",
      "effects": [
        "基础住房 +1,500",
        "公共利益传统：额外 +300 住房",
        "住房科技 I：额外 +300 住房",
        "住房科技 II：额外 +300 住房（田园牧歌除外）",
        "拥有「罐中之体」或企业版「企业脑罐」国民理念：100 个产量监督者岗位"
      ],
      "note": "技术上使用原版 district_arcology_housing。旧 ID district_yuzu_city_housing 仅保留给危机脚本与兼容逻辑，不会作为重复建筑显示。"
    },
    {
      "id": "tower",
      "name": "未分配塔楼",
      "code": "district_yuzu_city_urban_1 / _2 / _3",
      "image": "images/district_tower.png",
      "kind": "塔楼区划",
      "variants": [
        "塔楼槽位 01",
        "塔楼槽位 02",
        "塔楼槽位 03"
      ],
      "summary": "三座塔楼功能相同，每座提供一个 yuzu_arcology 塔楼 Zone 槽。",
      "description": "这些巨型塔楼可以根据需求灵活配置，用于工业、科研、行政、贸易或军事等多种特化用途。",
      "cost": "500 合金",
      "time": "600 天",
      "upkeep": "5 能量",
      "zones": "1 个塔楼 Zone 槽",
      "effects": [
        "基础住房 +1,500",
        "公共利益传统：额外 +300 住房",
        "住房科技 I：额外 +300 住房",
        "住房科技 II：额外 +300 住房（田园牧歌除外）",
        "安装普通塔楼 Zone 后：建筑槽 +3、住房 -600"
      ],
      "note": "三个 ID 分别对应原版三座理想城塔楼槽位，当前建筑数值相同；区分主要用于转换与兼容。"
    },
    {
      "id": "dream",
      "name": "梦境区划",
      "code": "district_yuzu_city_dream",
      "image": "images/district_dream.png",
      "kind": "基础资源区划",
      "summary": "夕阳之城专属，可继续选择能源、矿物或农业 Zone。",
      "description": "这座区划并不存在于现实，而是存在于幻梦境中。在这片丰饶而广袤的梦境世界里，建筑设施产出着大量基础资源。",
      "cost": "1,000 矿物 + 50 稀有水晶",
      "time": "600 天",
      "upkeep": "5 能量 + 1 稀有水晶",
      "zones": "1 个梦境 Zone 槽",
      "effects": [
        "行星最大区划数 +1",
        "区划本身不提供住房",
        "区划本身不提供岗位",
        "仅夕阳之城可建造"
      ],
      "note": "梦境区划会补回自身占用的区划上限，因此不会挤掉普通塔楼的可建数量。"
    }
  ],
  "zones": [
    {
      "id": "mixed-industry",
      "category": "industry",
      "group": "tower",
      "name": "工业区",
      "code": "zone_yuzu_industrial_arcology",
      "resultDistrict": "工业理想城",
      "resultCode": "district_yuzu_city_industry",
      "image": "images/district_industry.png",
      "badge": "images/badge_industrial.png",
      "summary": "合金与消费品各占一半的混合工业塔楼。",
      "description": "熔炉、工厂、生产设备和工匠工坊蔓生如城市一般，这座理想城可以产出一切、满足一切。",
      "zoneCost": "1,000 矿物",
      "zoneTime": "360 天",
      "baseCost": "500 合金",
      "baseUpkeep": "5 能量",
      "zoneUpkeep": "无额外维护",
      "housing": "-600",
      "buildingSlots": "+3",
      "jobs": [
        "工匠 600（格式塔：工匠无人机 600）",
        "冶金师 600（格式塔：铸造工蜂 600）"
      ],
      "modifiers": [
        "允许工业、自动化，以及当前起源解锁的专属建筑",
        "替换为工业理想城外观"
      ],
      "eligibility": "常规帝国与格式塔通用"
    },
    {
      "id": "foundry",
      "category": "industry",
      "group": "tower",
      "name": "重工业",
      "code": "zone_yuzu_foundry_arcology",
      "resultDistrict": "工业理想城",
      "resultCode": "district_yuzu_city_industry",
      "image": "images/district_industry.png",
      "badge": "images/badge_foundry.png",
      "summary": "专精合金生产的重工业塔楼。",
      "description": "这些金属的熔炉里火星飞溅，将恒星之枯骨铸造着明天的利刃。",
      "zoneCost": "1,000 矿物",
      "zoneTime": "360 天",
      "baseCost": "500 合金",
      "baseUpkeep": "5 能量",
      "zoneUpkeep": "无额外维护",
      "housing": "-600",
      "buildingSlots": "+3",
      "jobs": [
        "冶金师 1200（格式塔：铸造工蜂 1200）"
      ],
      "modifiers": [
        "允许铸造、自动化，以及当前起源解锁的专属建筑",
        "与混合工业共用工业理想城外观"
      ],
      "eligibility": "常规帝国与格式塔通用"
    },
    {
      "id": "factory",
      "category": "industry",
      "group": "tower",
      "name": "民用工业",
      "code": "zone_yuzu_factory_arcology",
      "resultDistrict": "工业理想城",
      "resultCode": "district_yuzu_city_industry",
      "image": "images/district_industry.png",
      "badge": "images/badge_factory.png",
      "summary": "专精消费品生产的民用工业塔楼。",
      "description": "这里的装配线不停地运转，从简单的工具到现代设计的奇迹都从这里源源不断地生产出来。",
      "zoneCost": "1,000 矿物",
      "zoneTime": "360 天",
      "baseCost": "500 合金",
      "baseUpkeep": "5 能量",
      "zoneUpkeep": "无额外维护",
      "housing": "-600",
      "buildingSlots": "+3",
      "jobs": [
        "工匠 1200（格式塔：工匠无人机 1200）"
      ],
      "modifiers": [
        "允许工厂、自动化，以及当前起源解锁的专属建筑",
        "与混合工业共用工业理想城外观"
      ],
      "eligibility": "需要消费品经济；常规帝国与格式塔通用"
    },
    {
      "id": "research",
      "category": "research",
      "group": "tower",
      "name": "科研聚落",
      "code": "zone_yuzu_research_arcology",
      "resultDistrict": "科研理想城",
      "resultCode": "district_yuzu_city_research",
      "image": "images/district_research.png",
      "badge": "images/badge_research.png",
      "summary": "同时提供物理、社会与工程三类研究岗位。",
      "description": "这些玻璃高楼和量子实验室中，好奇心就是力量，知识就是主权。",
      "zoneCost": "1,000 矿物",
      "zoneTime": "360 天",
      "baseCost": "500 合金",
      "baseUpkeep": "5 能量",
      "zoneUpkeep": "无额外维护",
      "housing": "-600",
      "buildingSlots": "+3",
      "jobs": [
        "物理学家 400 · 生物学家 400 · 工程师 400",
        "格式塔：物理 / 生物 / 工程计算单元各 400"
      ],
      "modifiers": [
        "允许科研、自动化，以及当前起源解锁的专属建筑"
      ],
      "eligibility": "常规帝国与格式塔通用"
    },
    {
      "id": "physics",
      "category": "research",
      "group": "tower",
      "name": "物理学研究特化",
      "code": "zone_yuzu_research_physics_arcology",
      "resultDistrict": "物理理想城",
      "resultCode": "district_yuzu_city_research_physics",
      "image": "images/district_research_physics.png",
      "badge": "images/badge_physics.png",
      "summary": "把研究岗位集中到物理学。",
      "description": "街道下的粒子加速器如同古时候的下水道一般，量子计算机和场操控器如摩天楼般高耸入云。",
      "zoneCost": "1,000 矿物",
      "zoneTime": "360 天",
      "baseCost": "500 合金",
      "baseUpkeep": "5 能量",
      "zoneUpkeep": "无额外维护",
      "housing": "-600",
      "buildingSlots": "+3",
      "jobs": [
        "物理学家 1200",
        "格式塔：物理学计算单元 1200"
      ],
      "modifiers": [
        "允许物理、科研、自动化，以及当前起源解锁的专属建筑"
      ],
      "eligibility": "常规帝国与格式塔通用"
    },
    {
      "id": "society",
      "category": "research",
      "group": "tower",
      "name": "社会学研究特化",
      "code": "zone_yuzu_research_society_arcology",
      "resultDistrict": "生物理想城",
      "resultCode": "district_yuzu_city_research_society",
      "image": "images/district_research_society.png",
      "badge": "images/badge_society.png",
      "summary": "把研究岗位集中到社会学。",
      "description": "穿过这座理想城中无边无际的自然保护区就像在逛动物园，连访客本身也是被观测的对象。",
      "zoneCost": "1,000 矿物",
      "zoneTime": "360 天",
      "baseCost": "500 合金",
      "baseUpkeep": "5 能量",
      "zoneUpkeep": "无额外维护",
      "housing": "-600",
      "buildingSlots": "+3",
      "jobs": [
        "生物学家 1200",
        "格式塔：生物学计算单元 1200"
      ],
      "modifiers": [
        "允许社会、科研、自动化，以及当前起源解锁的专属建筑"
      ],
      "eligibility": "常规帝国与格式塔通用"
    },
    {
      "id": "engineering",
      "category": "research",
      "group": "tower",
      "name": "工程学研究特化",
      "code": "zone_yuzu_research_engineering_arcology",
      "resultDistrict": "工程理想城",
      "resultCode": "district_yuzu_city_research_engineering",
      "image": "images/district_research_engineering.png",
      "badge": "images/badge_engineering.png",
      "summary": "把研究岗位集中到工程学。",
      "description": "一座永恒运动的理想城，建筑永远在变换，天空充斥着实验性建造物。",
      "zoneCost": "1,000 矿物",
      "zoneTime": "360 天",
      "baseCost": "500 合金",
      "baseUpkeep": "5 能量",
      "zoneUpkeep": "无额外维护",
      "housing": "-600",
      "buildingSlots": "+3",
      "jobs": [
        "工程师 1200",
        "格式塔：工程学计算单元 1200"
      ],
      "modifiers": [
        "允许工程、科研、自动化，以及当前起源解锁的专属建筑"
      ],
      "eligibility": "常规帝国与格式塔通用"
    },
    {
      "id": "administrative",
      "category": "unity",
      "group": "tower",
      "name": "行政中心",
      "code": "zone_yuzu_unity_arcology",
      "resultDistrict": "行政理想城",
      "resultCode": "district_yuzu_city_administrative",
      "image": "images/district_administrative.png",
      "badge": "images/badge_unity.png",
      "summary": "提供官僚与协调岗位的行政特化。",
      "description": "这颗静默而高效的星球是民政机构的脉动核心。",
      "zoneCost": "1,000 矿物",
      "zoneTime": "360 天",
      "baseCost": "500 合金",
      "baseUpkeep": "5 能量",
      "zoneUpkeep": "无额外维护",
      "housing": "-600",
      "buildingSlots": "+3",
      "jobs": [
        "官僚 1200",
        "格式塔：协调者 1200",
        "完成虚拟传统后额外增加 600 个对应岗位（基础岗位的 50%）"
      ],
      "modifiers": [
        "允许统一、自动化，以及当前起源解锁的专属建筑"
      ],
      "eligibility": "非唯心、非机仆、非荒野帝国"
    },
    {
      "id": "spiritualist",
      "category": "unity",
      "group": "tower",
      "name": "唯心聚落",
      "code": "zone_yuzu_unity_spiritualist_arcology",
      "resultDistrict": "教会理想城",
      "resultCode": "district_yuzu_city_religious",
      "image": "images/district_spiritualist.png",
      "badge": "images/badge_priest.png",
      "summary": "唯心帝国的行政与信仰特化。",
      "description": "庙宇、广播台和民政大厅里脉动着意识形态，将万千众人凝成一颗心。",
      "zoneCost": "1,000 矿物",
      "zoneTime": "360 天",
      "baseCost": "500 合金",
      "baseUpkeep": "5 能量",
      "zoneUpkeep": "无额外维护",
      "housing": "-600",
      "buildingSlots": "+3",
      "jobs": [
        "官僚 1200（唯心政体显示为祭司变体）"
      ],
      "modifiers": [
        "允许统一、自动化，以及当前起源解锁的专属建筑",
        "可与行政中心互相转换"
      ],
      "eligibility": "仅唯心帝国"
    },
    {
      "id": "fortress",
      "category": "defense",
      "group": "tower",
      "name": "军事防御工事",
      "code": "zone_yuzu_fortress_arcology",
      "resultDistrict": "堡垒理想城",
      "resultCode": "district_yuzu_city_fortress",
      "image": "images/district_fortress.png",
      "badge": "images/badge_fortress.png",
      "summary": "提供士兵、防御部队与舰队容量的军事塔楼。",
      "description": "一座拥有铁的纪律和动力威慑的堡垒，这里的士兵像钢铁一样，不屈而锋利。",
      "zoneCost": "1,000 矿物",
      "zoneTime": "360 天",
      "baseCost": "500 合金",
      "baseUpkeep": "5 能量",
      "zoneUpkeep": "无额外维护",
      "housing": "-600",
      "buildingSlots": "+3",
      "jobs": [
        "士兵 1200",
        "格式塔：战士无人机 1200"
      ],
      "modifiers": [
        "奴隶星球：奴隶兵团 1200",
        "骑士团星球：骑士 600（基础岗位的 50%）",
        "允许堡垒、自动化，以及当前起源解锁的专属建筑"
      ],
      "eligibility": "常规帝国与格式塔通用"
    },
    {
      "id": "trade",
      "category": "trade",
      "group": "tower",
      "name": "贸易枢纽",
      "code": "zone_yuzu_trade_arcology",
      "resultDistrict": "商业理想城",
      "resultCode": "district_yuzu_city_trade",
      "image": "images/district_trade.png",
      "badge": "images/badge_trade.png",
      "summary": "提供大量商贩岗位的贸易塔楼。",
      "description": "在繁荣的光鲜外表之下，是由野心、谈判和不小的风险驱动着的市场。",
      "zoneCost": "1,000 矿物",
      "zoneTime": "360 天",
      "baseCost": "500 合金",
      "baseUpkeep": "5 能量",
      "zoneUpkeep": "无额外维护",
      "housing": "-600",
      "buildingSlots": "+3",
      "jobs": [
        "商贩 1200",
        "格式塔：后勤工蜂 1200"
      ],
      "modifiers": [
        "允许贸易、自动化，以及当前起源解锁的专属建筑"
      ],
      "eligibility": "常规帝国与格式塔通用"
    },
    {
      "id": "healthcare",
      "category": "health",
      "group": "tower",
      "name": "医疗中心",
      "code": "zone_yuzu_healthcare_arcology",
      "resultDistrict": "医疗理想城",
      "resultCode": "district_yuzu_city_healthcare",
      "image": "images/district_healthcare.png",
      "badge": "images/badge_healthcare.png",
      "summary": "通过医务工作者推动人口增长、组装与舒适度。",
      "description": "先进医学与令人安心的设计在此协调一致，医务工作者在安静的疗愈空间里照料居民。",
      "zoneCost": "1,000 矿物",
      "zoneTime": "360 天",
      "baseCost": "500 合金",
      "baseUpkeep": "5 能量",
      "zoneUpkeep": "无额外维护",
      "housing": "-600",
      "buildingSlots": "+3",
      "jobs": [
        "医务工作者 300"
      ],
      "modifiers": [
        "允许医疗、娱乐、自动化，以及当前起源解锁的专属建筑"
      ],
      "eligibility": "仅非格式塔帝国"
    },
    {
      "id": "dream-energy",
      "category": "dream",
      "group": "dream",
      "name": "梦境能源区",
      "code": "zone_yuzu_energy_city_dream",
      "resultDistrict": "梦境发电区划",
      "resultCode": "district_yuzu_city_dream_energy",
      "image": "images/district_dream.png",
      "badge": "images/badge_energy.png",
      "summary": "把梦境区划转化为 1200 个能源岗位。",
      "description": "从幻梦境的混沌中提取纯粹的能量，发电机的嗡鸣与虚幻的雷鸣在此交织。",
      "zoneCost": "1,000 矿物",
      "zoneTime": "360 天",
      "baseCost": "1,000 矿物 + 50 稀有水晶",
      "baseUpkeep": "5 能量 + 1 稀有水晶",
      "zoneUpkeep": "无额外维护",
      "housing": "不变",
      "buildingSlots": "不增加",
      "jobs": [
        "技工 1200",
        "唯心堕落帝国：发电侍从 1200",
        "格式塔：技工无人机 1200"
      ],
      "modifiers": [
        "允许发电机、堕落帝国发电机、自动化建筑"
      ],
      "eligibility": "仅夕阳之城的梦境区划"
    },
    {
      "id": "dream-minerals",
      "category": "dream",
      "group": "dream",
      "name": "梦境矿区",
      "code": "zone_yuzu_minerals_city_dream",
      "resultDistrict": "梦境采矿区划",
      "resultCode": "district_yuzu_city_dream_minerals",
      "image": "images/district_dream.png",
      "badge": "images/badge_minerals.png",
      "summary": "把梦境区划转化为 1200 个矿物岗位。",
      "description": "幻梦境的大地深处埋藏着无尽的矿物，只需轻轻叩击便会浮现于眼前。",
      "zoneCost": "1,000 矿物",
      "zoneTime": "360 天",
      "baseCost": "1,000 矿物 + 50 稀有水晶",
      "baseUpkeep": "5 能量 + 1 稀有水晶",
      "zoneUpkeep": "无额外维护",
      "housing": "不变",
      "buildingSlots": "不增加",
      "jobs": [
        "矿工 1200",
        "格式塔：采矿无人机 1200"
      ],
      "modifiers": [
        "允许采矿、堕落帝国采矿、自动化建筑"
      ],
      "eligibility": "仅夕阳之城的梦境区划"
    },
    {
      "id": "dream-food",
      "category": "dream",
      "group": "dream",
      "name": "梦境农场",
      "code": "zone_yuzu_food_city_dream",
      "resultDistrict": "梦境农业区划",
      "resultCode": "district_yuzu_city_dream_food",
      "image": "images/district_dream.png",
      "badge": "images/badge_food.png",
      "summary": "把梦境区划转化为 1200 个食物岗位。",
      "description": "梦境中的土地永不贫瘠，只需播下思想的种子就能收获丰饶的作物。",
      "zoneCost": "1,000 矿物",
      "zoneTime": "360 天",
      "baseCost": "1,000 矿物 + 50 稀有水晶",
      "baseUpkeep": "5 能量 + 1 稀有水晶",
      "zoneUpkeep": "无额外维护",
      "housing": "不变",
      "buildingSlots": "不增加",
      "jobs": [
        "农夫 1200",
        "唯心堕落帝国：农业侍从 1200",
        "格式塔：农业无人机 1200"
      ],
      "modifiers": [
        "允许农业、水培、堕落帝国农业、自动化建筑"
      ],
      "eligibility": "仅夕阳之城的梦境区划"
    }
  ]
};
