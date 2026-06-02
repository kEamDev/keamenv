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
  youtubeId?: string; // ID видео с YouTube (из URL: youtube.com/watch?v=ЭТОТ_ID)
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
        role: { ru: "Художник по окружению | lvl-дизайн | Анимации", en: "Environment Artist | LvL-design | Animations" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
      {
        name: "YarFunnyStar",
        role: { ru: "Оригинальная идея | lvl-дизайн | Cценарий", en: "Original idea | LvL-design | Script" },
        url: "https://steamcommunity.com/id/YarFunnyStar",
        avatar: "./images/authors/yarfunnystar_ava.jpg",
      },
    ],
    description: {
      ru: "Детектив расследует убийства, постепенно сходя с ума",
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
        role: { ru: "Художник по окружению | lvl-дизайн | Анимации", en: "Environment Artist | LvL-design | Animations" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "Ремейк карты из CSGO для CS2. Пиццерия Фредди Фазбера. Режим Maniac на локации из вселенной Five Nights At Freddy's.",
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
        role: { ru: "Художник по окружению | lvl-дизайн | Оригинальная идея", en: "Environment Artist | LvL-design | Original idea" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
      {
        name: "ArtiX",
        role: { ru: "Секретные места (нычки)", en: "Hiding spots" },
        url: "https://steamcommunity.com/profiles/76561198826516948",
        avatar: "./images/authors/artix_ava.jpg",
      },
    ],
    description: {
      ru: "Прятки в большом отеле",
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
      ru: "PUBG Mobile [Королевская битва в CS2]",
      en: "PUBG Mobile [Battle Royale in CS2]",
    },
    date: "2026-02-20",
    creators: [
      {
        name: "kEam",
        role: { ru: "Художник по окружению", en: "Environment Artist" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
      {
        name: "denhet",
        role: { ru: "lvl-дизайн | Оригинальная идея | Геймплей", en: "LvL-design | Original idea | Gameplay" },
        url: "https://steamcommunity.com/id/denhetik",
        avatar: "./images/authors/denhet_ava.png",
      },
      {
        name: "twyxe",
        role: { ru: "Скрипты", en: "Scripts" },
        url: "https://steamcommunity.com/id/twyxe_mapper",
        avatar: "./images/authors/twyxe_ava.jpg",
      },
    ],
    description: {
      ru: "Мы воссоздали игру PUBG в Counter-Strike 2. Воссозданы: прыжок из самолёта в начале игры; Сужающаяся зона; оружие и снаряжения; Air-дроп; Машины и многое другое",
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
      ru: "Hide and seek | Школа",
      en: "Hide and seek | School",
    },
    date: "2018-12-08",
    creators: [
      {
        name: "kEam",
        role: { ru: "Художник по окружению | lvl-дизайн | Оригинальная идея", en: "Environment Artist | LvL-design | Original idea" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "Прятки в школе",
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
        role: { ru: "Художник по окружению | lvl-дизайн | Оригинальная идея", en: "Environment Artist | LvL-design | Original idea" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "Пиццерия Фредди Фазбера. Режим Maniac на локации из вселенной Five Nights At Freddy's.",
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
        role: { ru: "Художник по окружению | lvl-дизайн | Оригинальная идея", en: "Environment Artist | LvL-design | Original idea" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "Тренировка стрельбы по ботам, которые выбегают из тумана.",
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
        role: { ru: "Художник по окружению | lvl-дизайн", en: "Environment Artist | LvL-design" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
      {
        name: "Danber",
        role: { ru: "Художник по окружению | lvl-дизайн", en: "Environment Artist | LvL-design" },
        url: "https://steamcommunity.com/id/Danber221",
        avatar: "./images/authors/danber_ava.gif",
      },
    ],
    description: {
      ru: "Карта по фильму Оно. Прятки в Мрачном и таинственном доме Пеннивайза",
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
        role: { ru: "Художник по окружению | lvl-дизайн", en: "Environment Artist | LvL-design" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "Прятки в доме: Кнаклс против Соника",
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
      ru: "Hide and seek | Фабрика",
      en: "Hide and seek | Factory",
    },
    date: "2019-04-23",
    creators: [
      {
        name: "kEam",
        role: { ru: "Художник по окружению | lvl-дизайн | Оригинальная идея", en: "Environment Artist | LvL-design | Original idea" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
      {
        name: "ArtiX",
        role: { ru: "Художник по окружению | lvl-дизайн", en: "Environment Artist | LvL-design" },
        url: "https://steamcommunity.com/profiles/76561198826516948",
        avatar: "./images/authors/artix_ava.jpg",
      },
    ],
    description: {
      ru: "Прятки на большой Фабрике. Переработанная карта 'Фабрика' из игры Warface",
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
        role: { ru: "Художник по окружению | lvl-дизайн | Оригинальная идея ", en: "Environment Artist | LvL-design | Original idea" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "Тренировка Стрельбы, реакции и контроля отдачи по сферам",
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
      ru: "Hide and seek | Лаборатория Хоукинса [Очень Странные Дела]",
      en: "Hide and seek | Hawkins Laboratory [Stranger Things]",
    },
    date: "2022-06-06",
    creators: [
      {
        name: "kEam",
        role: { ru: "Художник по окружению | lvl-дизайн | Оригинальная идея ", en: "Environment Artist | LvL-design | Original idea" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "Прятки в Лаборатории Хоукинса. Работники лаборатории пытаются выжить, убегая от демогоргана",
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
      ru: "Hide and seek | Безобидная шутка",
      en: "Hide and seek | Harmless Joke",
    },
    date: "2021-09-01",
    creators: [
      {
        name: "kEam",
        role: { ru: "Художник по окружению | lvl-дизайн", en: "Environment Artist | LvL-design" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
      {
        name: "PakaJI",
        role: { ru: "Художник по окружению | lvl-дизайн | Оригинальная идея ", en: "Environment Artist | LvL-design | Original idea" },
        url: "https://steamcommunity.com/id/pakajimapmaker",
        avatar: "./images/authors/pakaJl_ava.jpg",
      },
    ],
    description: {
      ru: "Прятки в бункере. Полиция приехала на вызов. Сообщают о массовом убийстве в заброшенном бункере. Один из очевидцев видел человека в костюме клоуна.",
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
      ru: "Безумие Гринча | Hide and seek",
      en: "Grinch Madness | Hide and seek",
    },
    date: "2025-12-25",
    creators: [
      {
        name: "kEam",
        role: { ru: "Художник по окружению | lvl-дизайн", en: "Environment Artist | LvL-design" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "Новогодние прятки в доме. Гринч сошёл с ума и начал гоняться за своим псом",
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
        role: { ru: "Художник по окружению | lvl-дизайн", en: "Environment Artist | LvL-design" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
      {
        name: "denhet",
        role: { ru: "Художник по окружению | lvl-дизайн | Оригинальная идея", en: "Environment Artist | LvL-design | Original idea" },
        url: "https://steamcommunity.com/id/denhetik",
        avatar: "./images/authors/denhet_ava.png",
      },
    ],
    description: {
      ru: "Воcсоздан Легендарный режим из Майнкрафта в CS2. На карте 32 уникальных уровня и каждый становится все сложнее и сложнее. Хороший способ проверить и прокачать свои навыки в CS2",
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
      ru: "Hide and seek | Промышленный Город",
      en: "Hide and seek | Industry Town",
    },
    date: "2025-09-21",
    creators: [
      {
        name: "kEam",
        role: { ru: "Художник по окружению | lvl-дизайн", en: "Environment Artist | LvL-design" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "Прятки в промышленном городе",
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
      ru: "Hide and seek | Аквапарк [Source 2]",
      en: "Hide and seek | Aquapark [Source 2]",
    },
    date: "2025-07-12",
    creators: [
      {
        name: "kEam",
        role: { ru: "Художник по окружению | lvl-дизайн", en: "Environment Artist | LvL-design" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "Ремейк старой карты из CSGO",
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
        role: { ru: "Художник по окружению | lvl-дизайн", en: "Environment Artist | LvL-design" },
        url: "https://steamcommunity.com/id/keam16/",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "Прятки в уютном Американском доме.",
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


