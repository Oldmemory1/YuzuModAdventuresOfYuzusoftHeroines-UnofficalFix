/* Generated from traditions.json for file:// compatible loading. */
window.YUZU_TRADITION_DATA = {
  "meta": {
    "title": "柚子传统与议程档案",
    "version": "Stellaris 4.4.6 移植线",
    "updated": "2026-10-22",
    "treeCount": 9,
    "projectCount": 45,
    "implementedAgendaCount": 0,
    "agendaNote": "当前移植没有定义任何柚子议会议程。设计稿中的候选议程尚未写入 common/council_agendas，不属于游戏内可玩内容。"
  },
  "trees": [
    {
      "id": "production-innovation",
      "order": "01",
      "name": "生产技术革新",
      "english": "PRODUCTION INNOVATION",
      "code": "tradition_yuzu_production_innovation",
      "treeTemplate": "tree_yuzu_131",
      "icon": "images/trees/tradition_icon_yuzu_production_innovation.png",
      "tile": "images/trees/tradition_category_tile_yuzu_production_innovation.png",
      "accent": "#b87a35",
      "description": "将飞速进步的科学技术应用于最基础的行业，让每一名劳动者都能成为先进生产体系的一部分。",
      "eligibility": ["柚子帝国", "普通帝国"],
      "agenda": {
        "name": "无议程",
        "status": "none",
        "note": "当前脚本未提供专属议会议程。"
      },
      "adoption": {
        "id": "tr_yuzu_production_innovation_adopt",
        "name": "采纳：生产技术革新",
        "description": "把先进技术直接用于基础资源生产，并扩建行星居住空间。",
        "requires": [],
        "effectGroups": [
          {
            "label": "岗位产出",
            "items": [
              "技工产出的能量币 +2",
              "矿工产出的矿物 +2",
              "农夫产出的食物 +2"
            ]
          },
          {
            "label": "住房",
            "items": [
              "每颗行星住房 +6"
            ]
          }
        ]
      },
      "finish": {
        "id": "tr_yuzu_production_innovation_finish",
        "name": "完成：生产技术革新",
        "description": "完成整棵传统树后，基础岗位获得更高的固定产出。",
        "requires": [
          "tr_yuzu_production_innovation_safety",
          "tr_yuzu_production_innovation_energy",
          "tr_yuzu_production_innovation_farming",
          "tr_yuzu_production_innovation_mining",
          "tr_yuzu_production_innovation_research"
        ],
        "effectGroups": [
          {
            "label": "岗位产出",
            "items": [
              "技工产出的能量币 +3",
              "矿工产出的矿物 +3",
              "农夫产出的食物 +3"
            ]
          },
          {
            "label": "帝国",
            "items": [
              "飞升天赋 +1"
            ]
          }
        ]
      },
      "nodes": [
        {
          "id": "tr_yuzu_production_innovation_safety",
          "name": "生产安全改进",
          "image": "images/nodes/tradition_yuzu_production_innovation_safety.png",
          "description": "稳定而舒适的工作环境，才能让后续改革有序推进。",
          "row": 1,
          "col": 3,
          "requires": [],
          "effectGroups": [
            {
              "label": "行星",
              "items": [
                "行星稳定度 +10",
                "人口舒适度占用 −0.5"
              ]
            }
          ]
        },
        {
          "id": "tr_yuzu_production_innovation_energy",
          "name": "电力系统拓建",
          "image": "images/nodes/tradition_yuzu_production_innovation_energy.png",
          "description": "物理学的进步能让我们的能源生产更上一层楼。",
          "row": 2,
          "col": 1,
          "requires": ["tr_yuzu_production_innovation_safety"],
          "effectGroups": [
            {
              "label": "岗位产出",
              "items": [
                "技工产出的能量币 +20%",
                "技工产出的能量币 +3"
              ]
            }
          ]
        },
        {
          "id": "tr_yuzu_production_innovation_farming",
          "name": "农业设备革新",
          "image": "images/nodes/tradition_yuzu_production_innovation_farming.png",
          "description": "工程学的进步被反哺到最基础的农业生产中。民以食为天，怎样追求效率都不过分。",
          "row": 2,
          "col": 3,
          "requires": ["tr_yuzu_production_innovation_safety"],
          "effectGroups": [
            {
              "label": "岗位产出",
              "items": [
                "农夫产出的食物 +20%",
                "农夫产出的食物 +3"
              ]
            }
          ]
        },
        {
          "id": "tr_yuzu_production_innovation_mining",
          "name": "更新开采设备",
          "image": "images/nodes/tradition_yuzu_production_innovation_mining.png",
          "description": "工程与物理学的共同进步催生了更精细的开采和扫描设备，让我们发现曾经被忽略的矿藏。",
          "row": 2,
          "col": 5,
          "requires": ["tr_yuzu_production_innovation_safety"],
          "effectGroups": [
            {
              "label": "岗位产出",
              "items": [
                "矿工产出的合金 +1",
                "矿工产出的稀有水晶 +1",
                "矿工产出的异星天然气 +1",
                "矿工产出的易爆微粒 +1"
              ]
            }
          ]
        },
        {
          "id": "tr_yuzu_production_innovation_research",
          "name": "科研民主化",
          "image": "images/nodes/tradition_yuzu_production_innovation_research.png",
          "description": "远离一线的科研人员有时不如一线技工有经验。汇集劳动者的想法，同样能改进生产技术。",
          "row": 3,
          "col": 3,
          "requires": [
            "tr_yuzu_production_innovation_energy",
            "tr_yuzu_production_innovation_farming",
            "tr_yuzu_production_innovation_mining"
          ],
          "effectGroups": [
            {
              "label": "岗位研究产出",
              "items": [
                "技工产出的物理学研究 +2",
                "农夫产出的社会学研究 +2",
                "矿工产出的工程学研究 +2"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "energy",
      "order": "02",
      "name": "电业",
      "english": "ENERGY",
      "code": "tradition_yuzu_energy",
      "treeTemplate": "tree_11_111",
      "icon": "images/trees/tradition_icon_yuzu_energy.png",
      "tile": "images/trees/tradition_category_tile_yuzu_energy.png",
      "accent": "#c39a37",
      "description": "能量币是国家命脉。我们必须提升技工的能力与地位，才能满足时代发展的需要。",
      "eligibility": ["柚子帝国", "普通帝国"],
      "agenda": {
        "name": "无议程",
        "status": "none",
        "note": "当前脚本未提供专属议会议程。"
      },
      "adoption": {
        "id": "tr_yuzu_energy_adopt",
        "name": "采纳：电业",
        "description": "把电力生产纳入国家发展重点，为每颗殖民地增加基础技工岗位。",
        "requires": [],
        "effectGroups": [
          {
            "label": "岗位",
            "items": ["每颗殖民地岗位：技工 +1"]
          }
        ]
      },
      "finish": {
        "id": "tr_yuzu_energy_finish",
        "name": "完成：电业",
        "description": "完成整棵传统树后，技工的固定能量币产出继续提高。",
        "requires": [
          "tr_yuzu_energy_1",
          "tr_yuzu_energy_2",
          "tr_yuzu_energy_3",
          "tr_yuzu_energy_4",
          "tr_yuzu_energy_5"
        ],
        "effectGroups": [
          {
            "label": "岗位产出",
            "items": ["技工产出的能量币 +1"]
          },
          {
            "label": "帝国",
            "items": ["飞升天赋 +1"]
          }
        ]
      },
      "nodes": [
        {
          "id": "tr_yuzu_energy_1",
          "name": "电力革新",
          "image": "images/nodes/tradition_yuzu_energy_1.png",
          "description": "全新的技术打造了全新的设备。哪怕人员没有质变，我们的产出也能大幅提升。",
          "row": 1,
          "col": 1,
          "requires": [],
          "effectGroups": [
            {
              "label": "岗位产出",
              "items": ["技工产出的能量币 +15%"]
            }
          ]
        },
        {
          "id": "tr_yuzu_energy_2",
          "name": "电厂扩建",
          "image": "images/nodes/tradition_yuzu_energy_2.png",
          "description": "现有的生产规模无法满足需求。我们的人民需要更多岗位，我们的国家需要更多能量币。",
          "row": 2,
          "col": 1,
          "requires": ["tr_yuzu_energy_1"],
          "effectGroups": [
            {
              "label": "区划",
              "items": ["发电区划上限 +3"]
            }
          ]
        },
        {
          "id": "tr_yuzu_energy_3",
          "name": "技工培训",
          "image": "images/nodes/tradition_yuzu_energy_3.png",
          "description": "技工完全可以承担更多任务。为此，我们需要进行专门培训，拓宽他们的思维。",
          "row": 1,
          "col": 3,
          "requires": [],
          "effectGroups": [
            {
              "label": "岗位产出",
              "items": ["技工产出的能量币 +0.2"]
            }
          ]
        },
        {
          "id": "tr_yuzu_energy_4",
          "name": "物理实验",
          "image": "images/nodes/tradition_yuzu_energy_4.png",
          "description": "电力生产过程中可以进行一些简单的物理实验，而我们的精英技工完全可以承担这一任务。",
          "row": 2,
          "col": 3,
          "requires": ["tr_yuzu_energy_3"],
          "effectGroups": [
            {
              "label": "岗位研究产出",
              "items": ["技工产出的物理学研究 +1"]
            }
          ]
        },
        {
          "id": "tr_yuzu_energy_5",
          "name": "研究式电厂",
          "image": "images/nodes/tradition_yuzu_energy_5.png",
          "description": "旧式电厂只生产能量币，这显然是极大的浪费。经过改造，它完全可以成为特殊的物理实验室。",
          "row": 3,
          "col": 3,
          "requires": ["tr_yuzu_energy_4"],
          "effectGroups": [
            {
              "label": "岗位研究产出",
              "items": ["技工产出的物理学研究 +2"]
            }
          ]
        }
      ]
    },
    {
      "id": "mining",
      "order": "03",
      "name": "矿业",
      "english": "MINING",
      "code": "tradition_yuzu_mining",
      "treeTemplate": "tree_11_111",
      "icon": "images/trees/tradition_icon_yuzu_mining.png",
      "tile": "images/trees/tradition_category_tile_yuzu_mining.png",
      "accent": "#9b6641",
      "description": "地表之下蕴藏的资源超出我们的想象。改革矿业，尽可能发掘这些宝藏吧。",
      "eligibility": ["柚子帝国", "普通帝国"],
      "agenda": {
        "name": "无议程",
        "status": "none",
        "note": "当前脚本未提供专属议会议程。"
      },
      "adoption": {
        "id": "tr_yuzu_mining_adopt",
        "name": "采纳：矿业",
        "description": "把矿业改革纳入国家议程，为每颗殖民地增加基础矿工岗位。",
        "requires": [],
        "effectGroups": [
          {
            "label": "岗位",
            "items": ["每颗殖民地岗位：矿工 +1"]
          }
        ]
      },
      "finish": {
        "id": "tr_yuzu_mining_finish",
        "name": "完成：矿业",
        "description": "完成整棵传统树后，矿工的固定矿物产出继续提高。",
        "requires": [
          "tr_yuzu_mining_1",
          "tr_yuzu_mining_2",
          "tr_yuzu_mining_3",
          "tr_yuzu_mining_4",
          "tr_yuzu_mining_5"
        ],
        "effectGroups": [
          {
            "label": "岗位产出",
            "items": ["矿工产出的矿物 +1"]
          },
          {
            "label": "帝国",
            "items": ["飞升天赋 +1"]
          }
        ]
      },
      "nodes": [
        {
          "id": "tr_yuzu_mining_1",
          "name": "深层矿物",
          "image": "images/nodes/tradition_yuzu_mining_1.png",
          "description": "我们的钻机可以进入更深的地方，越来越多的矿物将得到开采。",
          "row": 1,
          "col": 1,
          "requires": [],
          "effectGroups": [
            {
              "label": "岗位产出",
              "items": ["矿工产出的矿物 +15%"]
            }
          ]
        },
        {
          "id": "tr_yuzu_mining_2",
          "name": "高品矿物",
          "image": "images/nodes/tradition_yuzu_mining_2.png",
          "description": "地表下藏着极高品质的矿物，这些矿物可以就地冶炼成合金。",
          "row": 2,
          "col": 1,
          "requires": ["tr_yuzu_mining_1"],
          "effectGroups": [
            {
              "label": "岗位产出",
              "items": ["矿工产出的合金 +0.2"]
            }
          ]
        },
        {
          "id": "tr_yuzu_mining_3",
          "name": "精细作业",
          "image": "images/nodes/tradition_yuzu_mining_3.png",
          "description": "稀有资源往往潜藏在细碎矿物之中。更仔细地挖掘将能搜寻到这些宝贝。",
          "row": 1,
          "col": 3,
          "requires": [],
          "effectGroups": [
            {
              "label": "岗位产出",
              "items": [
                "矿工产出的稀有水晶 +0.2",
                "矿工产出的异星天然气 +0.2",
                "矿工产出的易爆微粒 +0.2"
              ]
            }
          ]
        },
        {
          "id": "tr_yuzu_mining_4",
          "name": "就地实践",
          "image": "images/nodes/tradition_yuzu_mining_4.png",
          "description": "坚固的矿石拥有各不相同的可塑性，而矿工本身也可以承担一定的实验任务。",
          "row": 2,
          "col": 3,
          "requires": ["tr_yuzu_mining_3"],
          "effectGroups": [
            {
              "label": "岗位研究产出",
              "items": ["矿工产出的工程学研究 +1"]
            }
          ]
        },
        {
          "id": "tr_yuzu_mining_5",
          "name": "庞大工厂",
          "image": "images/nodes/tradition_yuzu_mining_5.png",
          "description": "我们的矿场越来越大，工厂也越来越先进。除了基础矿业，它们还能承担工程研究。",
          "row": 3,
          "col": 3,
          "requires": ["tr_yuzu_mining_4"],
          "effectGroups": [
            {
              "label": "岗位研究产出",
              "items": ["矿工产出的工程学研究 +2"]
            }
          ]
        }
      ]
    },
    {
      "id": "agriculture",
      "order": "04",
      "name": "农业",
      "english": "AGRICULTURE",
      "code": "tradition_yuzu_agriculture",
      "treeTemplate": "tree_11_111",
      "icon": "images/trees/tradition_icon_yuzu_agriculture.png",
      "tile": "images/trees/tradition_category_tile_yuzu_agriculture.png",
      "accent": "#648a4f",
      "description": "民以食为天，这是亘古不变的道理，起码现在依然如此。",
      "eligibility": ["柚子帝国", "普通帝国"],
      "agenda": {
        "name": "无议程",
        "status": "none",
        "note": "当前脚本未提供专属议会议程。"
      },
      "adoption": {
        "id": "tr_yuzu_agriculture_adopt",
        "name": "采纳：农业",
        "description": "以现代农业改革保障食物供应，为每颗殖民地增加基础农夫岗位。",
        "requires": [],
        "effectGroups": [
          {
            "label": "岗位",
            "items": ["每颗殖民地岗位：农夫 +1"]
          }
        ]
      },
      "finish": {
        "id": "tr_yuzu_agriculture_finish",
        "name": "完成：农业",
        "description": "完成整棵传统树后，农夫的固定食物产出继续提高。",
        "requires": [
          "tr_yuzu_agriculture_1",
          "tr_yuzu_agriculture_2",
          "tr_yuzu_agriculture_3",
          "tr_yuzu_agriculture_4",
          "tr_yuzu_agriculture_5"
        ],
        "effectGroups": [
          {
            "label": "岗位产出",
            "items": ["农夫产出的食物 +1"]
          },
          {
            "label": "帝国",
            "items": ["飞升天赋 +1"]
          }
        ]
      },
      "nodes": [
        {
          "id": "tr_yuzu_agriculture_1",
          "name": "高效生产",
          "image": "images/nodes/tradition_yuzu_agriculture_1.png",
          "description": "现代技术将重新定义农作物的生产方式，这将大大提升我们的效率。",
          "row": 1,
          "col": 1,
          "requires": [],
          "effectGroups": [
            {
              "label": "岗位产出",
              "items": ["农夫产出的食物 +15%"]
            }
          ]
        },
        {
          "id": "tr_yuzu_agriculture_2",
          "name": "高产作物",
          "image": "images/nodes/tradition_yuzu_agriculture_2.png",
          "description": "得益于基因技术，我们能够随心所欲地定义农作物形态，源源不断地提供食物。",
          "row": 2,
          "col": 1,
          "requires": ["tr_yuzu_agriculture_1"],
          "effectGroups": [
            {
              "label": "帝国产出",
              "items": ["全国食物产出 +15%"]
            }
          ]
        },
        {
          "id": "tr_yuzu_agriculture_3",
          "name": "超凡脱俗",
          "image": "images/nodes/tradition_yuzu_agriculture_3.png",
          "description": "自然与人完美融洽地共处。每一名农夫都可以是卓越的哲学家。",
          "row": 1,
          "col": 3,
          "requires": [],
          "effectGroups": [
            {
              "label": "岗位产出",
              "items": ["农夫产出的凝聚力 +0.5"]
            }
          ]
        },
        {
          "id": "tr_yuzu_agriculture_4",
          "name": "杂交技术",
          "image": "images/nodes/tradition_yuzu_agriculture_4.png",
          "description": "我们需要什么设备、需要什么技术，农田中的农夫最有发言权。",
          "row": 2,
          "col": 3,
          "requires": ["tr_yuzu_agriculture_3"],
          "effectGroups": [
            {
              "label": "岗位研究产出",
              "items": ["农夫产出的社会学研究 +1"]
            }
          ]
        },
        {
          "id": "tr_yuzu_agriculture_5",
          "name": "自然思维",
          "image": "images/nodes/tradition_yuzu_agriculture_5.png",
          "description": "我们曾经想要征服自然，现在却发现自然无需征服，我们本是一体。",
          "row": 3,
          "col": 3,
          "requires": ["tr_yuzu_agriculture_4"],
          "effectGroups": [
            {
              "label": "岗位研究产出",
              "items": ["农夫产出的社会学研究 +2"]
            }
          ]
        }
      ]
    },
    {
      "id": "research",
      "order": "05",
      "name": "聚焦科研",
      "english": "RESEARCH",
      "code": "tradition_yuzu_research",
      "treeTemplate": "tree_21_11",
      "icon": "images/trees/tradition_icon_yuzu_research.png",
      "tile": "images/trees/tradition_category_tile_yuzu_research.png",
      "accent": "#477da8",
      "description": "科研领域需要大量投入，但为了未来，这一切都是值得的。",
      "eligibility": ["柚子帝国", "普通帝国"],
      "agenda": {
        "name": "无议程",
        "status": "none",
        "note": "当前脚本未提供专属议会议程。"
      },
      "adoption": {
        "id": "tr_yuzu_research_adopt",
        "name": "采纳：聚焦科研",
        "description": "把科研部门的日常运行纳入国家长期规划。",
        "requires": [],
        "effectGroups": [
          {
            "label": "岗位维护",
            "items": ["研究员岗位维护费 −5%"]
          }
        ]
      },
      "finish": {
        "id": "tr_yuzu_research_finish",
        "name": "完成：聚焦科研",
        "description": "完成整棵传统树后，三类研究员的岗位产出得到强化。",
        "requires": [
          "tr_yuzu_research_1",
          "tr_yuzu_research_2",
          "tr_yuzu_research_3",
          "tr_yuzu_research_4",
          "tr_yuzu_research_5"
        ],
        "effectGroups": [
          {
            "label": "岗位产出",
            "items": [
              "研究员产出的物理学研究 +15%",
              "研究员产出的社会学研究 +15%",
              "研究员产出的工程学研究 +15%"
            ]
          },
          {
            "label": "帝国",
            "items": ["飞升天赋 +1"]
          }
        ]
      },
      "nodes": [
        {
          "id": "tr_yuzu_research_1",
          "name": "智能协助",
          "image": "images/nodes/tradition_yuzu_research_1.png",
          "description": "人工智能的广泛应用节省了大量成本，让我们能把注意力集中在真正重要的事物上。",
          "row": 1,
          "col": 1,
          "requires": [],
          "effectGroups": [
            {
              "label": "岗位维护",
              "items": ["研究员岗位维护费 −5%"]
            }
          ]
        },
        {
          "id": "tr_yuzu_research_2",
          "name": "人员培训",
          "image": "images/nodes/tradition_yuzu_research_2.png",
          "description": "良莠不齐的科研团队阻碍了进一步发展，投入更多资源将能改善这一现状。",
          "row": 1,
          "col": 3,
          "requires": [],
          "effectGroups": [
            {
              "label": "岗位产出",
              "items": [
                "研究员产出的物理学研究 +5%",
                "研究员产出的社会学研究 +5%",
                "研究员产出的工程学研究 +5%"
              ]
            }
          ]
        },
        {
          "id": "tr_yuzu_research_3",
          "name": "广泛讨论",
          "image": "images/nodes/tradition_yuzu_research_3.png",
          "description": "科研项目不应只停留在上层。它也可以成为茶余饭后的谈资，让每一个人都参与进来。",
          "row": 1,
          "col": 5,
          "requires": [],
          "effectGroups": [
            {
              "label": "科技",
              "items": ["科技选项 +1"]
            }
          ]
        },
        {
          "id": "tr_yuzu_research_4",
          "name": "领袖培养",
          "image": "images/nodes/tradition_yuzu_research_4.png",
          "description": "确立一套完善的人才培养制度，将为我们的国家提供源源不断的优质领袖。",
          "row": 2,
          "col": 2,
          "requires": ["tr_yuzu_research_1", "tr_yuzu_research_2"],
          "effectGroups": [
            {
              "label": "领袖",
              "items": ["领袖经验获取 +50%"]
            }
          ]
        },
        {
          "id": "tr_yuzu_research_5",
          "name": "全民科研",
          "image": "images/nodes/tradition_yuzu_research_5.png",
          "description": "得益于社会氛围和基础教育，我们的人民能够参与到一切力所能及的项目之中。",
          "row": 2,
          "col": 5,
          "requires": ["tr_yuzu_research_3"],
          "effectGroups": [
            {
              "label": "研究",
              "items": ["全局科技研究速度 +15%"]
            }
          ]
        }
      ]
    },
    {
      "id": "festival",
      "order": "06",
      "name": "祭典",
      "english": "FESTIVAL",
      "code": "tradition_yuzu_festival",
      "treeTemplate": "tree_21_11",
      "icon": "images/trees/tradition_icon_yuzu_festival.png",
      "tile": "images/trees/tradition_category_tile_yuzu_festival.png",
      "accent": "#b9575c",
      "description": "各种各样的祭典是我们日常生活的重要组成部分。",
      "eligibility": ["柚子帝国"],
      "agenda": {
        "name": "无议程",
        "status": "none",
        "note": "当前脚本未提供专属议会议程。"
      },
      "adoption": {
        "id": "tr_yuzu_festival_adopt",
        "name": "采纳：祭典",
        "description": "让庆典成为社会生活的一部分，改善幸福度与舒适度消耗。",
        "requires": [],
        "effectGroups": [
          {
            "label": "人口",
            "items": [
              "人口幸福度 +5%",
              "人口舒适度占用 −10%"
            ]
          }
        ]
      },
      "finish": {
        "id": "tr_yuzu_festival_finish",
        "name": "完成：祭典",
        "description": "完成整棵传统树后，庆典文化转化为持久的国家凝聚力。",
        "requires": [
          "tr_yuzu_festival_dance",
          "tr_yuzu_festival_murasamemaru",
          "tr_yuzu_festival_associations",
          "tr_yuzu_festival_spring",
          "tr_yuzu_festival_school"
        ],
        "effectGroups": [
          {
            "label": "帝国产出",
            "items": ["全国凝聚力产出 +20%"]
          },
          {
            "label": "帝国",
            "items": ["飞升天赋 +1"]
          }
        ]
      },
      "nodes": [
        {
          "id": "tr_yuzu_festival_dance",
          "name": "神乐舞",
          "image": "images/nodes/tradition_yuzu_festival_dance.png",
          "description": "神乐舞是祓除污秽的仪式。代代朝武家的公主通过奉纳舞蹈，来祓除穗织土地上的污秽。在没有污秽需要祓除的现在，这种舞蹈似乎能够带来丰收。",
          "row": 1,
          "col": 1,
          "requires": [],
          "effectGroups": [
            {
              "label": "帝国产出",
              "items": ["全国食物产出 +20%"]
            }
          ]
        },
        {
          "id": "tr_yuzu_festival_murasamemaru",
          "name": "拔刀挑战",
          "image": "images/nodes/tradition_yuzu_festival_murasamemaru.png",
          "description": "穗织为吸引游客而在春日祭举办的特殊活动。如今各地祭典都会设计全新的仿制丛雨丸机关，让挑战者为神明认可的传说继续流传。",
          "row": 1,
          "col": 3,
          "requires": [],
          "effectGroups": [
            {
              "label": "帝国研究",
              "items": ["全国工程学研究产出 +20%"]
            }
          ]
        },
        {
          "id": "tr_yuzu_festival_associations",
          "name": "社团活动",
          "image": "images/nodes/tradition_yuzu_festival_associations.png",
          "description": "经常开展的社团活动增加了魔女们收集心之碎片的效率。",
          "row": 1,
          "col": 5,
          "requires": [],
          "effectGroups": [
            {
              "label": "岗位产出",
              "items": ["魔女额外产生 0.5 心之碎片"]
            }
          ]
        },
        {
          "id": "tr_yuzu_festival_spring",
          "name": "春日祭",
          "image": "images/nodes/tradition_yuzu_festival_spring.png",
          "description": "穗织为庆祝战国时代一场战争的胜利而诞生的祭典，现在已经演变为全国范围的重要祭典。祭典举办时街道上人来人往，各种店铺生意兴隆。",
          "row": 2,
          "col": 1,
          "requires": ["tr_yuzu_festival_dance", "tr_yuzu_festival_murasamemaru"],
          "effectGroups": [
            {
              "label": "贸易与思潮",
              "items": [
                "全国贸易值产出 +10%",
                "人口主流思潮吸引力 +25%"
              ]
            }
          ]
        },
        {
          "id": "tr_yuzu_festival_school",
          "name": "学园祭",
          "image": "images/nodes/tradition_yuzu_festival_school.png",
          "description": "由学生会主办，学校各个班级或社团展示自己的祭典。祭典的活动完全是学生自己创办的，能够大幅提高学生们的创造性。在学园祭当天，校外人员也可以参加。",
          "row": 2,
          "col": 5,
          "requires": ["tr_yuzu_festival_associations"],
          "effectGroups": [
            {
              "label": "岗位产出",
              "items": ["全岗位产出 +5%"]
            }
          ]
        }
      ]
    },
    {
      "id": "preparewar",
      "order": "07",
      "name": "备战",
      "english": "PREPARATION FOR WAR",
      "code": "tradition_yuzu_preparewar",
      "treeTemplate": "tree_11_111",
      "icon": "images/trees/tradition_icon_yuzu_preparewar.png",
      "tile": "images/trees/tradition_category_tile_yuzu_preparewar.png",
      "accent": "#a8574a",
      "description": "为了应对可能到来的危机，我们必须提前做好准备。",
      "eligibility": ["柚子帝国", "普通帝国"],
      "agenda": {
        "name": "无议程",
        "status": "none",
        "note": "当前脚本未提供专属议会议程。"
      },
      "adoption": {
        "id": "tr_yuzu_preparewar_adopt",
        "name": "采纳：备战",
        "description": "把军工生产纳入国家长期规划。",
        "requires": [],
        "effectGroups": [
          {
            "label": "岗位产出",
            "items": ["全岗位合金产出 +5%"]
          }
        ]
      },
      "finish": {
        "id": "tr_yuzu_preparewar_finish",
        "name": "完成：备战",
        "description": "完成整棵传统树后，按帝国使用的舰船组强化对应研究领域。",
        "requires": [
          "tr_yuzu_preparewar_1",
          "tr_yuzu_preparewar_2",
          "tr_yuzu_preparewar_3",
          "tr_yuzu_preparewar_4",
          "tr_yuzu_preparewar_5"
        ],
        "effectGroups": [
          {
            "label": "舰船研究",
            "items": [
              "使用生物舰船时：生物学研究速度 +15%",
              "使用其他舰船时：宇航技术研究速度 +15%"
            ]
          },
          {
            "label": "帝国",
            "items": ["飞升天赋 +1"]
          }
        ]
      },
      "nodes": [
        {
          "id": "tr_yuzu_preparewar_1",
          "name": "聚焦合金",
          "image": "images/nodes/tradition_yuzu_preparewar_1.png",
          "description": "在可能的危机来临之前，我们需要尽可能多地冶炼合金，以备不时之需。",
          "row": 1,
          "col": 1,
          "requires": [],
          "effectGroups": [
            {
              "label": "岗位产出",
              "items": ["全岗位合金产出 +10%"]
            }
          ]
        },
        {
          "id": "tr_yuzu_preparewar_2",
          "name": "强化船体",
          "image": "images/nodes/tradition_yuzu_preparewar_2.png",
          "description": "专业的科研团队与熟练的劳工队伍对我们的舰船进行了强化。",
          "row": 2,
          "col": 1,
          "requires": ["tr_yuzu_preparewar_1"],
          "effectGroups": [
            {
              "label": "舰船",
              "items": ["舰船船体值 +25%"]
            }
          ]
        },
        {
          "id": "tr_yuzu_preparewar_3",
          "name": "强化武器",
          "image": "images/nodes/tradition_yuzu_preparewar_3.png",
          "description": "旧有武器将得到大幅改良，以便尽可能彻底地摧毁危险的敌人。",
          "row": 1,
          "col": 3,
          "requires": [],
          "effectGroups": [
            {
              "label": "舰船",
              "items": ["舰船武器伤害 +25%"]
            }
          ]
        },
        {
          "id": "tr_yuzu_preparewar_4",
          "name": "舰队扩容",
          "image": "images/nodes/tradition_yuzu_preparewar_4.png",
          "description": "为了整个国家的安全，舰队扩张必须提上日程。",
          "row": 2,
          "col": 3,
          "requires": ["tr_yuzu_preparewar_3"],
          "effectGroups": [
            {
              "label": "舰队",
              "items": ["海军容量 +10%"]
            }
          ]
        },
        {
          "id": "tr_yuzu_preparewar_5",
          "name": "高效扩军",
          "image": "images/nodes/tradition_yuzu_preparewar_5.png",
          "description": "即使是在星际时代，陆军建设也依旧无比重要。我们必须能够快速完成部署。",
          "row": 3,
          "col": 3,
          "requires": ["tr_yuzu_preparewar_4"],
          "effectGroups": [
            {
              "label": "陆军",
              "items": ["陆军建造速度 +50%"]
            }
          ]
        }
      ]
    },
    {
      "id": "relic",
      "order": "08",
      "name": "文物",
      "english": "RELICS",
      "code": "tradition_yuzu_relic",
      "treeTemplate": "tree_21_11",
      "icon": "images/trees/tradition_icon_yuzu_relic.png",
      "tile": "images/trees/tradition_category_tile_yuzu_relic.png",
      "accent": "#a8792b",
      "description": "在我们的文明探索太空之前，这片寰宇便已经存在了无数先驱。他们留下了无数文物，也留下了蕴藏着无穷知识的历史。",
      "eligibility": ["柚子帝国", "普通帝国", "远古遗迹故事包"],
      "agenda": {
        "name": "无议程",
        "status": "none",
        "note": "当前脚本未提供专属议会议程。"
      },
      "adoption": {
        "id": "tr_yuzu_relic_adopt",
        "name": "采纳：文物",
        "description": "把先驱文明留下的遗物当作国家知识体系的一部分。",
        "requires": [],
        "effectGroups": [
          {
            "label": "科研舰",
            "items": ["科研舰调查速度 +15%"]
          }
        ]
      },
      "finish": {
        "id": "tr_yuzu_relic_finish",
        "name": "完成：文物",
        "description": "完成整棵传统树后，调查与考古活动获得显著强化。",
        "requires": [
          "tr_yuzu_relic_1",
          "tr_yuzu_relic_2",
          "tr_yuzu_relic_3",
          "tr_yuzu_relic_4",
          "tr_yuzu_relic_5"
        ],
        "effectGroups": [
          {
            "label": "探索与考古",
            "items": [
              "科研舰异常现象生成概率 +50%",
              "考古遗址发掘速度 +25%"
            ]
          },
          {
            "label": "帝国",
            "items": ["飞升天赋 +1"]
          }
        ]
      },
      "nodes": [
        {
          "id": "tr_yuzu_relic_1",
          "name": "全民鉴赏",
          "image": "images/nodes/tradition_yuzu_relic_1.png",
          "description": "文物不应束之高阁。每个人都可以观赏它们，欣赏其中的美丽，感悟先驱文明的璀璨。",
          "row": 1,
          "col": 1,
          "requires": [],
          "effectGroups": [
            {
              "label": "解锁文物行动",
              "items": [
                "全民鉴赏：消耗 200 稀有文物",
                "10 年内公民幸福度 +5%"
              ]
            }
          ]
        },
        {
          "id": "tr_yuzu_relic_2",
          "name": "高调展览",
          "image": "images/nodes/tradition_yuzu_relic_2.png",
          "description": "文物背后充满故事，或是启迪，或是警醒。我们应当将其公开展示，广泛昭示其中的奥妙。",
          "row": 1,
          "col": 3,
          "requires": [],
          "effectGroups": [
            {
              "label": "解锁文物行动",
              "items": [
                "高调展览：消耗 500 稀有文物",
                "立即获得 50 影响力",
                "10 年内影响力产出 +10%"
              ]
            }
          ]
        },
        {
          "id": "tr_yuzu_relic_3",
          "name": "考古培训",
          "image": "images/nodes/tradition_yuzu_relic_3.png",
          "description": "考古发掘要求非常精细的技术。我们很有必要在实战之前训练科学家，让他们能够妥善处理所有问题。",
          "row": 1,
          "col": 5,
          "requires": [],
          "effectGroups": [
            {
              "label": "考古",
              "items": ["考古遗址发掘速度 +25%"]
            }
          ]
        },
        {
          "id": "tr_yuzu_relic_4",
          "name": "先驱经验",
          "image": "images/nodes/tradition_yuzu_relic_4.png",
          "description": "先驱留下的知识蕴藏在文物之中，对它们的研究将推动我们自身科技的发展。",
          "row": 2,
          "col": 2,
          "requires": ["tr_yuzu_relic_1", "tr_yuzu_relic_2"],
          "effectGroups": [
            {
              "label": "解锁文物行动",
              "items": [
                "先驱经验：消耗 200 稀有文物",
                "10 年内全局科技研究速度 +30%"
              ]
            }
          ]
        },
        {
          "id": "tr_yuzu_relic_5",
          "name": "深入探索",
          "image": "images/nodes/tradition_yuzu_relic_5.png",
          "description": "曾经，我们对星球的探索无比草率，也许错过了不少遗址。现在我们完全可以组织一批装备精良的探索队，深入寻找可能存在的遗址。",
          "row": 2,
          "col": 5,
          "requires": ["tr_yuzu_relic_3"],
          "effectGroups": [
            {
              "label": "解锁星球决议",
              "items": [
                "深入探索：消耗 1000 能量币",
                "在符合条件的星球生成一处随机考古遗址"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "develop",
      "order": "09",
      "name": "培养",
      "english": "DEVELOPMENT",
      "code": "tradition_yuzu_develop",
      "treeTemplate": "tree_21_11",
      "icon": "images/trees/tradition_icon_yuzu_develop.png",
      "tile": "images/trees/tradition_category_tile_yuzu_develop.png",
      "accent": "#6a6da9",
      "description": "领袖指引人民的前进方向。我们必须确保他们出类拔萃。",
      "eligibility": ["柚子帝国", "普通帝国"],
      "agenda": {
        "name": "无议程",
        "status": "none",
        "note": "当前脚本未提供专属议会议程。"
      },
      "adoption": {
        "id": "tr_yuzu_develop_adopt",
        "name": "采纳：培养",
        "description": "建立面向全体领袖的长期培养体系。",
        "requires": [],
        "effectGroups": [
          {
            "label": "领袖",
            "items": ["领袖维护费 −25%"]
          }
        ]
      },
      "finish": {
        "id": "tr_yuzu_develop_finish",
        "name": "完成：培养",
        "description": "完成整棵传统树后，所有领袖获得更多成长经验。",
        "requires": [
          "tr_yuzu_develop_1",
          "tr_yuzu_develop_2",
          "tr_yuzu_develop_3",
          "tr_yuzu_develop_4",
          "tr_yuzu_develop_5"
        ],
        "effectGroups": [
          {
            "label": "领袖",
            "items": ["领袖经验获取 +50%"]
          },
          {
            "label": "帝国",
            "items": ["飞升天赋 +1"]
          }
        ]
      },
      "nodes": [
        {
          "id": "tr_yuzu_develop_1",
          "name": "突破上限",
          "image": "images/nodes/tradition_yuzu_develop_1.png",
          "description": "领袖的成长没有止境。持续探索与训练，将让他们达到前所未有的高度。",
          "row": 1,
          "col": 1,
          "requires": [],
          "effectGroups": [
            {
              "label": "十级领袖内阁特质",
              "items": [
                "科学家：全局研究速度 +25%，研究员产出 +25%",
                "指挥官：力量投射影响力 +1，军用舰船建造速度 +50%",
                "行政官：全岗位产出 +10%，议程进度速度 +50%",
                "行政官：议程完成效果持续时间 +25%",
                "上述特质仅在对应领袖担任内阁成员时生效"
              ]
            }
          ]
        },
        {
          "id": "tr_yuzu_develop_2",
          "name": "学习交流",
          "image": "images/nodes/tradition_yuzu_develop_2.png",
          "description": "除了单独培训，我们的领袖还将相互讨论、交流经验，共同取得进步。",
          "row": 1,
          "col": 3,
          "requires": [],
          "effectGroups": [
            {
              "label": "领袖",
              "items": ["领袖经验获取 +25%"]
            }
          ]
        },
        {
          "id": "tr_yuzu_develop_3",
          "name": "扩大基础",
          "image": "images/nodes/tradition_yuzu_develop_3.png",
          "description": "所有人都有成为领袖的潜质。扩大选拔规模，才能避免错过可能的人才。",
          "row": 1,
          "col": 5,
          "requires": [],
          "effectGroups": [
            {
              "label": "领袖",
              "items": ["领袖候选池规模 +1"]
            }
          ]
        },
        {
          "id": "tr_yuzu_develop_4",
          "name": "特殊培养",
          "image": "images/nodes/tradition_yuzu_develop_4.png",
          "description": "政府精心准备了一套培养方案。它耗资甚大，却能培养出惊人的天才。",
          "row": 2,
          "col": 2,
          "requires": ["tr_yuzu_develop_1", "tr_yuzu_develop_2"],
          "effectGroups": [
            {
              "label": "领袖",
              "items": [
                "领袖特质选项 +1",
                "领袖负面特质数量 −2"
              ]
            }
          ]
        },
        {
          "id": "tr_yuzu_develop_5",
          "name": "全民领袖",
          "image": "images/nodes/tradition_yuzu_develop_5.png",
          "description": "领袖并没有无法跨越的门槛。严苛的旧选拔机制已经不适应现今局势，我们应当进一步扩大规模。",
          "row": 2,
          "col": 5,
          "requires": ["tr_yuzu_develop_3"],
          "effectGroups": [
            {
              "label": "领袖容量",
              "items": [
                "指挥官上限 +1",
                "行政官上限 +1",
                "科学家上限 +1"
              ]
            }
          ]
        }
      ]
    }
  ]
}
;
