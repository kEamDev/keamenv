export interface Creator {
  name: string;
  role: { ru: string; en: string };
  url: string;
  avatar?: string;
}

export interface Project {
  id: string;
  title: { ru: string; en: string };
  date: string;
  creators: Creator[];
  description: { ru: string; en: string };
  tags: string[];
  images: string[];
  youtubeId?: string; // ID РІРёРґРµРѕ СЃ YouTube (РёР· URL: youtube.com/watch?v=Р­РўРћРў_ID)
  workshopId?: string;
}

export const projects: Project[] = [        
  {
    id: "Crazy",
    title: {
      ru: "CraZy - Horror Map PLUS",
      en: "CraZy - Horror Map PLUS",
    },
    date: "2022-03-13",
    creators: [
      {
        name: "kEam",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ | lvl-РґРёР·Р°Р№РЅ | РђРЅРёРјР°С†РёРё", en: "Environment Artist | LvL-design | Animations" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
      {
        name: "YarFunnyStar",
        role: { ru: "РћСЂРёРіРёРЅР°Р»СЊРЅР°СЏ РёРґРµСЏ | lvl-РґРёР·Р°Р№РЅ | CС†РµРЅР°СЂРёР№", en: "Original idea | LvL-design | Script" },
        url: "https://steamcommunity.com/id/YarFunnyStar",
        avatar: "./images/authors/yarfunnystar_ava.jpg",
      },
    ],
    description: {
      ru: "Р”РµС‚РµРєС‚РёРІ СЂР°СЃР»РµРґСѓРµС‚ СѓР±РёР№СЃС‚РІР°, РїРѕСЃС‚РµРїРµРЅРЅРѕ СЃС…РѕРґСЏ СЃ СѓРјР°",
      en: "A detective investigates murders while gradually going crazy.",
    },
 tags: ["Source1", "Counter-Strike:Global Offensive", "Co-op",],
    images: [
      "./images/Crazy_1.jpg",
      "./images/Crazy_2.jpg",
      "./images/Crazy_3.jpg",
      "./images/Crazy_4.jpg",
    ],
    youtubeId: "4H4dNov8Jak",
    workshopId: "2778021111",
  },
  {
    id: "fnaf_s2",
    title: {
      ru: "Hide and seek | Freddy Fazbear's Pizza [Source 2]",
      en: "Hide and seek | Freddy Fazbear's Pizza [Source 2]",
    },
    date: "2024-01-31",
    creators: [
      {
        name: "kEam",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ | lvl-РґРёР·Р°Р№РЅ | РђРЅРёРјР°С†РёРё", en: "Environment Artist | LvL-design | Animations" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "Р РµРјРµР№Рє РєР°СЂС‚С‹ РёР· CSGO РґР»СЏ CS2. РџРёС†С†РµСЂРёСЏ Р¤СЂРµРґРґРё Р¤Р°Р·Р±РµСЂР°. Р РµР¶РёРј Maniac РЅР° Р»РѕРєР°С†РёРё РёР· РІСЃРµР»РµРЅРЅРѕР№ Five Nights At Freddy's.",
      en: "Remake of CSGO map for CS2. Freddy Fazbear's Pizzeria. Maniac mode in a location from the Five Nights at Freddy's universe.",
    },
    tags: ["Source2", "Counter-Strike 2", "Substaince Painter", "Blender", "Maniac"],
    images: [
      "./images/Fnaf_1.jpg",
      "./images/Fnaf_2.jpg",
      "./images/Fnaf_3.jpg",
      "./images/Fnaf_4.jpg",
      "./images/Fnaf_5.jpg",
    ],
    youtubeId: "C_rRpO0v1cQ",
    workshopId: "3150746597",
  },
  {
    id: "Hotel",
    title: {
      ru: "Hide and seek | Hotel",
      en: "Hide and seek | Hotel",
    },
    date: "2020-04-18",
    creators: [
      {
        name: "kEam",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ | lvl-РґРёР·Р°Р№РЅ | РћСЂРёРіРёРЅР°Р»СЊРЅР°СЏ РёРґРµСЏ", en: "Environment Artist | LvL-design | Original idea" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
      {
        name: "ArtiX",
        role: { ru: "РЎРµРєСЂРµС‚РЅС‹Рµ РјРµСЃС‚Р° (РЅС‹С‡РєРё)", en: "Hiding spots" },
        url: "https://steamcommunity.com/profiles/76561198826516948",
        avatar: "./images/authors/artix_ava.jpg",
      },
    ],
    description: {
      ru: "РџСЂСЏС‚РєРё РІ Р±РѕР»СЊС€РѕРј РѕС‚РµР»Рµ",
      en: "Hide and seek in big hotels",
    },
 tags: ["Source1", "Counter-Strike:Global Offensive","Maniac"],
    images: [
      "./images/Hotel_1.jpg",
      "./images/Hotel_2.jpg",
      "./images/Hotel_3.jpg",
      "./images/Hotel_4.jpg",
      "./images/Hotel_5.jpg",
    ],
    youtubeId: "dYzuMzGtSHo",
    workshopId: "2065143276",
  },
  {
     id: "Pubg",
    title: {
      ru: "PUBG Mobile [РљРѕСЂРѕР»РµРІСЃРєР°СЏ Р±РёС‚РІР° РІ CS2]",
      en: "PUBG Mobile [Battle Royale in CS2]",
    },
    date: "2026-02-20",
    creators: [
      {
        name: "kEam",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ", en: "Environment Artist" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
      {
        name: "denhet",
        role: { ru: "lvl-РґРёР·Р°Р№РЅ | РћСЂРёРіРёРЅР°Р»СЊРЅР°СЏ РёРґРµСЏ | Р“РµР№РјРїР»РµР№", en: "LvL-design | Original idea | Gameplay" },
        url: "https://steamcommunity.com/id/denhetik",
        avatar: "./images/authors/denhet_ava.png",
      },
      {
        name: "twyxe",
        role: { ru: "РЎРєСЂРёРїС‚С‹", en: "Scripts" },
        url: "https://steamcommunity.com/id/twyxe_mapper",
        avatar: "./images/authors/twyxe_ava.jpg",
      },
    ],
    description: {
      ru: "РњС‹ РІРѕСЃСЃРѕР·РґР°Р»Рё РёРіСЂСѓ PUBG РІ Counter-Strike 2. Р’РѕСЃСЃРѕР·РґР°РЅС‹: РїСЂС‹Р¶РѕРє РёР· СЃР°РјРѕР»С‘С‚Р° РІ РЅР°С‡Р°Р»Рµ РёРіСЂС‹; РЎСѓР¶Р°СЋС‰Р°СЏСЃСЏ Р·РѕРЅР°; РѕСЂСѓР¶РёРµ Рё СЃРЅР°СЂСЏР¶РµРЅРёСЏ; Air-РґСЂРѕРї; РњР°С€РёРЅС‹ Рё РјРЅРѕРіРѕРµ РґСЂСѓРіРѕРµ",
      en: "We've recreated PUBG in Counter-Strike 2. This includes: the jump from the plane at the beginning of the game; the Shrinking Zone; weapons and equipment; Airdrops; cars and much more.",
    },
    tags: ["Source2", "Counter-Strike 2", "Battle Royale"],
    images: [
      "./images/pubg_1.jpg",
      "./images/pubg_2.jpg",
      "./images/pubg_3.jpg",
      "./images/pubg_4.jpg",
      "./images/pubg_5.jpg",
      "./images/pubg_6.jpg",
      "./images/pubg_7.jpg",
    ],
    youtubeId: "dZChFBhbAss",
    workshopId: "3670050075",
  },
  {
   id: "School",
    title: {
      ru: "Hide and seek | РЁРєРѕР»Р°",
      en: "Hide and seek | School",
    },
    date: "2018-12-08",
    creators: [
      {
        name: "kEam",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ | lvl-РґРёР·Р°Р№РЅ | РћСЂРёРіРёРЅР°Р»СЊРЅР°СЏ РёРґРµСЏ", en: "Environment Artist | LvL-design | Original idea" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "РџСЂСЏС‚РєРё РІ С€РєРѕР»Рµ",
      en: "Hide and seek in the School",
    },
    tags: ["Source1", "Counter-Strike:Global Offensive", "Maniac"],
    images: [
      "./images/School_1.jpg",
      "./images/School_2.jpg",
      "./images/School_3.jpg",
      "./images/School_4.jpg",
      "./images/School_5.jpg",
      "./images/School_6.jpg",
      "./images/School_7.jpg",
    ],
    youtubeId: "UDBzh2O-rjo",
    workshopId: "1585452846",
  },
  {
    id: "fnaf_s1",
    title: {
      ru: "Hide and seek | Freddy Fazbear's Pizza [Source1]",
      en: "Hide and seek | Freddy Fazbear's Pizza [Source1]",
    },
    date: "2022-01-29",
    creators: [
      {
        name: "kEam",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ | lvl-РґРёР·Р°Р№РЅ | РћСЂРёРіРёРЅР°Р»СЊРЅР°СЏ РёРґРµСЏ", en: "Environment Artist | LvL-design | Original idea" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "РџРёС†С†РµСЂРёСЏ Р¤СЂРµРґРґРё Р¤Р°Р·Р±РµСЂР°. Р РµР¶РёРј Maniac РЅР° Р»РѕРєР°С†РёРё РёР· РІСЃРµР»РµРЅРЅРѕР№ Five Nights At Freddy's.",
      en: "Freddy Fazbear's Pizzeria. Maniac mode in a location from the Five Nights at Freddy's universe.",
    },
    tags: ["Source1", "Counter-Strike:Global Offensive", "Maniac"],
    images: [
      "./images/Fnaf_s1_1.jpg",
      "./images/Fnaf_s1_2.jpg",
      "./images/Fnaf_s1_3.jpg",
      "./images/Fnaf_s1_4.jpg",
      "./images/Fnaf_s1_5.jpg",
    ],
    youtubeId: "FO7BjJ82RNQ",
    workshopId: "1585452846",
  },
  {
    id: "Haze_bot_training",
    title: {
      ru: "Haze Bot Aim Training",
      en: "Haze Bot Aim Training",
    },
    date: "2025-10-08",
    creators: [
      {
        name: "kEam",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ | lvl-РґРёР·Р°Р№РЅ | РћСЂРёРіРёРЅР°Р»СЊРЅР°СЏ РёРґРµСЏ", en: "Environment Artist | LvL-design | Original idea" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "РўСЂРµРЅРёСЂРѕРІРєР° СЃС‚СЂРµР»СЊР±С‹ РїРѕ Р±РѕС‚Р°Рј, РєРѕС‚РѕСЂС‹Рµ РІС‹Р±РµРіР°СЋС‚ РёР· С‚СѓРјР°РЅР°.",
      en: "Practice shooting at bots that run out of the fog.",
    },
    tags: ["Source2", "Counter-Strike 2", "Blender", "Substaince Painter", "Gaea", "Training",],
    images: [
      "./images/Haze_training_1.jpg",
      "./images/Haze_training_2.jpg",
      "./images/Haze_training_3.jpg",
      "./images/Haze_training_4.jpg",
    ],
    workshopId: "3582858327",
  },
  {
    id: "hns_it",
    title: {
      ru: "Hide And Seek [IT]",
      en: "Hide And Seek [IT]",
    },
    date: "2019-09-26",
    creators: [
      {
        name: "kEam",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ | lvl-РґРёР·Р°Р№РЅ", en: "Environment Artist | LvL-design" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
      {
        name: "Danber",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ | lvl-РґРёР·Р°Р№РЅ", en: "Environment Artist | LvL-design" },
        url: "https://steamcommunity.com/id/Danber221",
        avatar: "./images/authors/danber_ava.gif",
      },
    ],
    description: {
      ru: "РљР°СЂС‚Р° РїРѕ С„РёР»СЊРјСѓ РћРЅРѕ. РџСЂСЏС‚РєРё РІ РњСЂР°С‡РЅРѕРј Рё С‚Р°РёРЅСЃС‚РІРµРЅРЅРѕРј РґРѕРјРµ РџРµРЅРЅРёРІР°Р№Р·Р°",
      en: "Map of the film It. Hide and Seek in Pennywise's Dark and Mysterious House",
    },
    tags: ["Source1", "Counter-Strike:Global Offensive", "Maniac"],
    images: [
      "./images/IT_1.jpg",
      "./images/IT_2.jpg",
      "./images/IT_3.jpg",
      "./images/IT_4.jpg",
      "./images/IT_5.jpg",
    ],
    youtubeId: "zc5c82BXQmk",
    workshopId: "1872577617",
  },
  {
    id: "hns_knuckles_Sonic",
    title: {
      ru: "Hide and seek | Knuckles VS Sonic",
      en: "Hide and seek | Knuckles VS Sonic",
    },
    date: "2019-08-30",
    creators: [
      {
        name: "kEam",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ | lvl-РґРёР·Р°Р№РЅ", en: "Environment Artist | LvL-design" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "РџСЂСЏС‚РєРё РІ РґРѕРјРµ: РљРЅР°РєР»СЃ РїСЂРѕС‚РёРІ РЎРѕРЅРёРєР°",
      en: "Hide and Seek in the House: Knuckles vs Sonic",
    },
    tags: ["Source1", "Counter-Strike:Global Offensive",],
    images: [
      "./images/hns_knucles_1.jpg",
      "./images/hns_knucles_2.jpg",
      "./images/hns_knucles_3.jpg",
      "./images/hns_knucles_4.jpg",
      "./images/hns_knucles_5.jpg",
    ],
    youtubeId: "RENtJekcWw0",
    workshopId: "1848889629",
  },
  {
    id: "hns_factory",
    title: {
      ru: "Hide and seek | Р¤Р°Р±СЂРёРєР°",
      en: "Hide and seek | Factory",
    },
    date: "2019-04-23",
    creators: [
      {
        name: "kEam",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ | lvl-РґРёР·Р°Р№РЅ | РћСЂРёРіРёРЅР°Р»СЊРЅР°СЏ РёРґРµСЏ", en: "Environment Artist | LvL-design | Original idea" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
      {
        name: "ArtiX",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ | lvl-РґРёР·Р°Р№РЅ", en: "Environment Artist | LvL-design" },
        url: "https://steamcommunity.com/profiles/76561198826516948",
        avatar: "./images/authors/artix_ava.jpg",
      },
    ],
    description: {
      ru: "РџСЂСЏС‚РєРё РЅР° Р±РѕР»СЊС€РѕР№ Р¤Р°Р±СЂРёРєРµ. РџРµСЂРµСЂР°Р±РѕС‚Р°РЅРЅР°СЏ РєР°СЂС‚Р° 'Р¤Р°Р±СЂРёРєР°' РёР· РёРіСЂС‹ Warface",
      en: "Hide and Seek in the Big Factory. A reworked version of the 'Factory' map from Warface.",
    },
    tags: ["Source1", "Counter-Strike:Global Offensive", "Maniac"],
    images: [
      "./images/hns_factory_1.jpg",
      "./images/hns_factory_2.jpg",
      "./images/hns_factory_3.jpg",
      "./images/hns_factory_4.jpg",
      "./images/hns_factory_5.jpg",
      "./images/hns_factory_6.jpg",
    ],
    youtubeId: "AddR8daJeuY",
    workshopId: "1721181696",
  },
  {
    id: "aim_training_dots",
    title: {
      ru: "Aim Reflex Training DOTS",
      en: "Aim Reflex Training DOTS",
    },
    date: "2025-12-29",
    creators: [
      {
        name: "kEam",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ | lvl-РґРёР·Р°Р№РЅ | РћСЂРёРіРёРЅР°Р»СЊРЅР°СЏ РёРґРµСЏ ", en: "Environment Artist | LvL-design | Original idea" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "РўСЂРµРЅРёСЂРѕРІРєР° РЎС‚СЂРµР»СЊР±С‹, СЂРµР°РєС†РёРё Рё РєРѕРЅС‚СЂРѕР»СЏ РѕС‚РґР°С‡Рё РїРѕ СЃС„РµСЂР°Рј",
      en: "Shooting, Reaction, and Recoil Control Training on DOTs",
    },
    tags: ["Source2", "Counter-Strike 2", "Training",],
    images: [
      "./images/aim_training_dots_1.jpg",
      "./images/aim_training_dots_2.jpg",
      "./images/aim_training_dots_3.jpg",
      "./images/aim_training_dots_4.jpg",
      "./images/aim_training_dots_5.jpg",
    ],
    workshopId: "1721181696",
  },
  {
    id: "hns_hawkins_lab",
    title: {
      ru: "Hide and seek | Р›Р°Р±РѕСЂР°С‚РѕСЂРёСЏ РҐРѕСѓРєРёРЅСЃР° [РћС‡РµРЅСЊ РЎС‚СЂР°РЅРЅС‹Рµ Р”РµР»Р°]",
      en: "Hide and seek | Hawkins Laboratory [Stranger Things]",
    },
    date: "2022-06-06",
    creators: [
      {
        name: "kEam",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ | lvl-РґРёР·Р°Р№РЅ | РћСЂРёРіРёРЅР°Р»СЊРЅР°СЏ РёРґРµСЏ ", en: "Environment Artist | LvL-design | Original idea" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "РџСЂСЏС‚РєРё РІ Р›Р°Р±РѕСЂР°С‚РѕСЂРёРё РҐРѕСѓРєРёРЅСЃР°. Р Р°Р±РѕС‚РЅРёРєРё Р»Р°Р±РѕСЂР°С‚РѕСЂРёРё РїС‹С‚Р°СЋС‚СЃСЏ РІС‹Р¶РёС‚СЊ, СѓР±РµРіР°СЏ РѕС‚ РґРµРјРѕРіРѕСЂРіР°РЅР°",
      en: "Hide and Seek at Hawkins Laboratory. Lab workers try to survive while running from a demogorgan.",
    },
    tags: ["Source1", "Counter-Strike:Global Offensive", "Maniac"],
    images: [
      "./images/hns_howkins_lab_1.jpg",
      "./images/hns_howkins_lab_2.jpg",
      "./images/hns_howkins_lab_3.jpg",
      "./images/hns_howkins_lab_4.jpg",
      "./images/hns_howkins_lab_5.jpg",
      "./images/hns_howkins_lab_6.jpg",
      "./images/hns_howkins_lab_7.jpg",
    ],
    youtubeId: "dodbPDi2pkA",
    workshopId: "2817678729",
  },
  {
    id: "hns_harmless_joke",
    title: {
      ru: "Hide and seek | Р‘РµР·РѕР±РёРґРЅР°СЏ С€СѓС‚РєР°",
      en: "Hide and seek | Harmless Joke",
    },
    date: "2021-09-01",
    creators: [
      {
        name: "kEam",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ | lvl-РґРёР·Р°Р№РЅ", en: "Environment Artist | LvL-design" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
      {
        name: "PakaJI",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ | lvl-РґРёР·Р°Р№РЅ | РћСЂРёРіРёРЅР°Р»СЊРЅР°СЏ РёРґРµСЏ ", en: "Environment Artist | LvL-design | Original idea" },
        url: "https://steamcommunity.com/id/pakajimapmaker",
        avatar: "./images/authors/pakaJl_ava.jpg",
      },
    ],
    description: {
      ru: "РџСЂСЏС‚РєРё РІ Р±СѓРЅРєРµСЂРµ. РџРѕР»РёС†РёСЏ РїСЂРёРµС…Р°Р»Р° РЅР° РІС‹Р·РѕРІ. РЎРѕРѕР±С‰Р°СЋС‚ Рѕ РјР°СЃСЃРѕРІРѕРј СѓР±РёР№СЃС‚РІРµ РІ Р·Р°Р±СЂРѕС€РµРЅРЅРѕРј Р±СѓРЅРєРµСЂРµ. РћРґРёРЅ РёР· РѕС‡РµРІРёРґС†РµРІ РІРёРґРµР» С‡РµР»РѕРІРµРєР° РІ РєРѕСЃС‚СЋРјРµ РєР»РѕСѓРЅР°.",
      en: "Hide and seek in a bunker. The police responded to a call about a mass murder in an abandoned bunker. One witness saw a man dressed as a clown.",
    },
    tags: ["Source1", "Counter-Strike:Global Offensive", "Maniac"],
    images: [
      "./images/hns_harml_joke_1.jpg",
      "./images/hns_harml_joke_2.jpg",
      "./images/hns_harml_joke_3.jpg",
      "./images/hns_harml_joke_4.jpg",
      "./images/hns_harml_joke_5.jpg",
      "./images/hns_harml_joke_6.jpg",
      "./images/hns_harml_joke_7.jpg",
      "./images/hns_harml_joke_8.jpg",
      "./images/hns_harml_joke_9.jpg",
    ],
    youtubeId: "nlJgGxFQ-S4",
    workshopId: "1721181696",
  },
  {
    id: "hns_grinch_madness",
    title: {
      ru: "Р‘РµР·СѓРјРёРµ Р“СЂРёРЅС‡Р° | Hide and seek",
      en: "Grinch Madness | Hide and seek",
    },
    date: "2025-12-25",
    creators: [
      {
        name: "kEam",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ | lvl-РґРёР·Р°Р№РЅ", en: "Environment Artist | LvL-design" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "РќРѕРІРѕРіРѕРґРЅРёРµ РїСЂСЏС‚РєРё РІ РґРѕРјРµ. Р“СЂРёРЅС‡ СЃРѕС€С‘Р» СЃ СѓРјР° Рё РЅР°С‡Р°Р» РіРѕРЅСЏС‚СЊСЃСЏ Р·Р° СЃРІРѕРёРј РїСЃРѕРј",
      en: "New Year's hide-and-seek in the house. The Grinch went crazy and started chasing his dog.",
    },
    tags: ["Source2", "Counter-Strike 2", "Maniac"],
    images: [
      "./images/hns_grinch_madness_1.jpg",
      "./images/hns_grinch_madness_2.jpg",
      "./images/hns_grinch_madness_3.jpg",
      "./images/hns_grinch_madness_4.jpg",
      "./images/hns_grinch_madness_5.jpg",
      "./images/hns_grinch_madness_6.jpg",
    ],
    youtubeId: "JKjjWlIwrZs",
    workshopId: "3630823778",
  },
  {
    id: "Dropper",
    title: {
      ru: "TheDropper [Dima MapINK Contest]",
      en: "TheDropper [Dima MapINK Contest]",
    },
    date: "2025-07-12",
    creators: [
      {
        name: "kEam",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ | lvl-РґРёР·Р°Р№РЅ", en: "Environment Artist | LvL-design" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
      {
        name: "denhet",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ | lvl-РґРёР·Р°Р№РЅ | РћСЂРёРіРёРЅР°Р»СЊРЅР°СЏ РёРґРµСЏ", en: "Environment Artist | LvL-design | Original idea" },
        url: "https://steamcommunity.com/id/denhetik",
        avatar: "./images/authors/denhet_ava.png",
      },
    ],
    description: {
      ru: "Р’РѕcСЃРѕР·РґР°РЅ Р›РµРіРµРЅРґР°СЂРЅС‹Р№ СЂРµР¶РёРј РёР· РњР°Р№РЅРєСЂР°С„С‚Р° РІ CS2. РќР° РєР°СЂС‚Рµ 32 СѓРЅРёРєР°Р»СЊРЅС‹С… СѓСЂРѕРІРЅСЏ Рё РєР°Р¶РґС‹Р№ СЃС‚Р°РЅРѕРІРёС‚СЃСЏ РІСЃРµ СЃР»РѕР¶РЅРµРµ Рё СЃР»РѕР¶РЅРµРµ. РҐРѕСЂРѕС€РёР№ СЃРїРѕСЃРѕР± РїСЂРѕРІРµСЂРёС‚СЊ Рё РїСЂРѕРєР°С‡Р°С‚СЊ СЃРІРѕРё РЅР°РІС‹РєРё РІ CS2",
      en: "Minecraft's Legendary Mode has been recreated for CS2. The map features 32 unique levels, each one getting progressively more challenging. It's a great way to test and improve your CS2 skills.",
    },
    tags: ["Source2", "Counter-Strike 2", "Dropper"],
    images: [
      "./images/dropper_1.jpg",
      "./images/dropper_2.jpg",
      "./images/dropper_3.jpg",
      "./images/dropper_4.jpg",
      "./images/dropper_5.jpg",
      "./images/dropper_6.jpg",
      "./images/dropper_7.jpg",
      "./images/dropper_8.jpg",
      "./images/dropper_9.jpg",
      "./images/dropper_10.jpg",
    ],
    youtubeId: "JJQrEVXRka8",
    workshopId: "3523065572",
  },
  {
    id: "hns_industry_town",
    title: {
      ru: "Hide and seek | РџСЂРѕРјС‹С€Р»РµРЅРЅС‹Р№ Р“РѕСЂРѕРґ",
      en: "Hide and seek | Industry Town",
    },
    date: "2025-09-21",
    creators: [
      {
        name: "kEam",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ | lvl-РґРёР·Р°Р№РЅ", en: "Environment Artist | LvL-design" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "РџСЂСЏС‚РєРё РІ РїСЂРѕРјС‹С€Р»РµРЅРЅРѕРј РіРѕСЂРѕРґРµ",
      en: "Hide and Seek in an Industry Town",
    },
    tags: ["Source2", "Counter-Strike 2", "Maniac"],
    images: [
      "./images/hns_industry_town_1.jpg",
      "./images/hns_industry_town_2.jpg",
      "./images/hns_industry_town_3.jpg",
      "./images/hns_industry_town_4.jpg",
      "./images/hns_industry_town_5.jpg",
      "./images/hns_industry_town_6.jpg",
    ],
    workshopId: "3572232928",
  },
  {
    id: "Aquapark_s2",
    title: {
      ru: "Hide and seek | РђРєРІР°РїР°СЂРє [Source 2]",
      en: "Hide and seek | Aquapark [Source 2]",
    },
    date: "2025-07-12",
    creators: [
      {
        name: "kEam",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ | lvl-РґРёР·Р°Р№РЅ", en: "Environment Artist | LvL-design" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "Р РµРјРµР№Рє СЃС‚Р°СЂРѕР№ РєР°СЂС‚С‹ РёР· CSGO",
      en: "Remake Of old map from CSGO",
    },
    tags: ["Source2", "Counter-Strike 2", "Maniac",],
    images: [
      "./images/hns_aquapark_s2_1.jpg",
      "./images/hns_aquapark_s2_2.jpg",
      "./images/hns_aquapark_s2_3.jpg",
      "./images/hns_aquapark_s2_4.jpg",
      "./images/hns_aquapark_s2_5.jpg",
      "./images/hns_aquapark_s2_6.jpg",
    ],
    youtubeId: "LUQaZ8GT3bA",
    workshopId: "3437683011",
  },
  {
    id: "Aquapark_s2",
    title: {
      ru: "Hide and seek | Coziness",
      en: "Hide and seek | Coziness",
    },
    date: "2023-09-25",
    creators: [
      {
        name: "kEam",
        role: { ru: "РҐСѓРґРѕР¶РЅРёРє РїРѕ РѕРєСЂСѓР¶РµРЅРёСЋ | lvl-РґРёР·Р°Р№РЅ", en: "Environment Artist | LvL-design" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "РџСЂСЏС‚РєРё РІ СѓСЋС‚РЅРѕРј РђРјРµСЂРёРєР°РЅСЃРєРѕРј РґРѕРјРµ.",
      en: "Hide and seek in a cozy American home.",
    },
    tags: ["Source1", "Counter-Strike:Global Offensive", "Maniac"],
    images: [
      "./images/hns_coziness_1.jpg",
      "./images/hns_coziness_2.jpg",
      "./images/hns_coziness_3.jpg",
      "./images/hns_coziness_4.jpg",
    ],
    workshopId: "3041135279",
  },
];

export function getAllTags(): string[] {
  const tagsSet = new Set<string>();
  projects.forEach((p) => p.tags.forEach((t) => tagsSet.add(t)));
  return Array.from(tagsSet).sort();
}

