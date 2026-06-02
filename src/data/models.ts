export interface ModelCreator {
  name: string;
  role: { ru: string; en: string };
  url: string;
  avatar?: string;
}

export interface Model3D {
  id: string;
  title: { ru: string; en: string };
  date: string;
  creators: ModelCreator[];
  description: { ru: string; en: string };
  tags: string[];
  sketchfabId: string; // ID РјРѕРґРµР»Рё СЃРѕ Sketchfab (РёР· URL)
}

export const models: Model3D[] = [
  {
    id: "Wooden_Book_Shelf",
    title: {
      ru: "Р”РµСЂРµРІСЏРЅРЅР°СЏ РєРЅРёР¶РЅР°СЏ РїРѕР»РєР° | Low-Poly | Game-ready",
      en: "Wooden Book Shelf | Low-Poly | Game-ready",
    },
    date: "2025-04-29",
    creators: [
      {
        name: "kEam",
        role: { ru: "3D С…СѓРґРѕР¶РЅРёРє", en: "3D Artist" },
        url: "https://sketchfab.com/keam.wf",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "",
      en: "",
    },
    tags: ["Blender", "Substance Painter", "PBR", "Game Ready"],
    sketchfabId: "4520493dab504eb2ac0d4d64848d0878", // РџСЂРёРјРµСЂ ID
  },
  {
    id: "Wooden_Table_Chair",
    title: {
      ru: "Р”РµСЂРµРІСЏРЅРЅС‹Р№ СЃС‚РѕР» СЃРѕ СЃС‚СѓР»СЊСЏРјРё | Low-Poly | Game-ready",
      en: "Wooden Table/Chair | Low-Poly | Game-ready",
    },
    date: "2025-01-15",
    creators: [
      {
        name: "kEam",
        role: { ru: "3D С…СѓРґРѕР¶РЅРёРє", en: "3D Artist" },
        url: "https://sketchfab.com/keam.wf",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "",
      en: "",
    },
    tags: ["Blender", "Substance Painter", "PBR", "Game Ready"],
    sketchfabId: "d2b7e1dcfcc94f9bb015d01aad7e6ee8", // РџСЂРёРјРµСЂ ID
  },
  {
    id: "Stone_Wall",
    title: {
      ru: "РљР°РјРµРЅРЅР°СЏ СЃС‚РµРЅР° | Low Poly | Game Ready",
      en: "Stone Wall | Low Poly | Game Ready",
    },
    date: "2025-04-28",
    creators: [
      {
        name: "kEam",
        role: { ru: "3D С…СѓРґРѕР¶РЅРёРє", en: "3D Artist" },
        url: "https://sketchfab.com/keam.wf",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "",
      en: "",
    },
    tags: ["Blender", "Substance Painter", "PBR", "Game Ready"],
    sketchfabId: "53b1128497e34d4b9766dcde10df230b", // РџСЂРёРјРµСЂ ID
  },
  {
    id: "Bathroom_Sink",
    title: {
      ru: "Р Р°РєРѕРІРёРЅР° РІ РІР°РЅРЅРѕР№ | Low-Poly | Game-Ready",
      en: "Bathroom Sink | Low-Poly | Game-Ready",
    },
    date: "2025-04-30",
    creators: [
      {
        name: "kEam",
        role: { ru: "3D С…СѓРґРѕР¶РЅРёРє", en: "3D Artist" },
        url: "https://sketchfab.com/keam.wf",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "",
      en: "",
    },
    tags: ["Blender", "Substance Painter", "PBR", "Game Ready"],
    sketchfabId: "45a6ab5e5a1a40b8913ab14314734ce8", // РџСЂРёРјРµСЂ ID
  },
  {
    id: "Mossy_Stone_Arch",
    title: {
      ru: "РЎС†РµРЅР° СЃ Р·Р°РјС€РµР»РѕР№ РєР°РјРµРЅРЅРѕР№ Р°СЂРєРѕР№ | Low-Poly",
      en: "Mossy Stone Arch Scene | Low-Poly",
    },
    date: "2025-04-30",
    creators: [
      {
        name: "kEam",
        role: { ru: "3D С…СѓРґРѕР¶РЅРёРє", en: "3D Artist" },
        url: "https://sketchfab.com/keam.wf",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "",
      en: "",
    },
    tags: ["Blender", "Substance Painter", "PBR", "Game Ready"],
    sketchfabId: "363750ab46b34b579041fe90fb350e53", // РџСЂРёРјРµСЂ ID
  },
  {
    id: "Cliff",
    title: {
      ru: "РЎРєР°Р»Р° | Low-Poly | Game-ready",
      en: "Cliff | Low-Poly | Game-ready",
    },
    date: "2025-04-08",
    creators: [
      {
        name: "kEam",
        role: { ru: "3D С…СѓРґРѕР¶РЅРёРє", en: "3D Artist" },
        url: "https://sketchfab.com/keam.wf",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "",
      en: "",
    },
    tags: ["Blender", "Substance Painter", "PBR", "Game Ready"],
    sketchfabId: "918dc8e1b1f0443993a251c1302510bf", // РџСЂРёРјРµСЂ ID
  },
  {
    id: "Furniture_Pack",
    title: {
      ru: "РќР°Р±РѕСЂ РјРµР±РµР»Рё | Low-Poly | Game-Ready",
      en: "Furniture Pack | Low-Poly | Game-Ready",
    },
    date: "2025-05-05",
    creators: [
      {
        name: "kEam",
        role: { ru: "3D С…СѓРґРѕР¶РЅРёРє", en: "3D Artist" },
        url: "https://sketchfab.com/keam.wf",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "",
      en: "",
    },
    tags: ["Blender", "Substance Painter", "PBR", "Game Ready"],
    sketchfabId: "1bfa5e4878eb4a9f83f3cbec80022b5d", // РџСЂРёРјРµСЂ ID
  },
  {
    id: "Wooden_Door",
    title: {
      ru: "Р”РµСЂРµРІСЏРЅРЅР°СЏ РґРІРµСЂСЊ | Low-Poly | Game-ready",
      en: "Wooden Door | Low-Poly | Game-ready",
    },
    date: "2025-05-05",
    creators: [
      {
        name: "kEam",
        role: { ru: "3D С…СѓРґРѕР¶РЅРёРє", en: "3D Artist" },
        url: "https://sketchfab.com/keam.wf",
        avatar: "./images/authors/keam_ava.png",
      },
    ],
    description: {
      ru: "",
      en: "",
    },
    tags: ["Blender", "Substance Painter", "PBR", "Game Ready"],
    sketchfabId: "f5c93a53f5e245c78ce4bbdd6130c4f9", // РџСЂРёРјРµСЂ ID
  },
];

