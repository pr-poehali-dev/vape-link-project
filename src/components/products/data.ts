export type Product = {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  oldPrice: number | null;
  badge: string | null;
  rating: number;
  reviews: number;
  puffs: number | null;
  nicotine: string | null;
  power: string | null;
  image: string;
  desc: string;
  inStock: boolean;
};

export type CartItem = { id: number; name: string; price: number; qty: number };

export const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "VapeLink Pro X",
    category: "Устройства",
    brand: "VapeLink",
    price: 3490,
    oldPrice: 4200,
    badge: "ХИТ",
    rating: 4.9,
    reviews: 234,
    puffs: null,
    nicotine: null,
    power: "80Вт",
    image: "https://cdn.poehali.dev/projects/2facb984-376b-48d9-8e80-012b07d1cc87/files/0719ff84-f1b1-4068-a437-1722e063652b.jpg",
    desc: "Мощный под-мод с регулировкой мощности до 80Вт. OLED-дисплей, защита от перегрева.",
    inStock: true,
  },
  {
    id: 2,
    name: "Liquid Premium Set",
    category: "Жидкости",
    brand: "LiquidArt",
    price: 890,
    oldPrice: null,
    badge: "НОВИНКА",
    rating: 4.7,
    reviews: 89,
    puffs: null,
    nicotine: "20мг",
    power: null,
    image: "https://cdn.poehali.dev/projects/2facb984-376b-48d9-8e80-012b07d1cc87/files/3a6bb0b9-6043-470b-8c52-69b05e987496.jpg",
    desc: "Набор из 5 премиальных жидкостей с солевым никотином 20мг. Тропик, ягоды, десерт.",
    inStock: true,
  },
  {
    id: 3,
    name: "Neon Disposable",
    category: "Одноразовые",
    brand: "Neon",
    price: 650,
    oldPrice: 750,
    badge: "−13%",
    rating: 4.5,
    reviews: 412,
    puffs: 3500,
    nicotine: "20мг",
    power: null,
    image: "https://cdn.poehali.dev/projects/2facb984-376b-48d9-8e80-012b07d1cc87/files/51f62dee-27b7-4ac4-8001-f422f1053178.jpg",
    desc: "3500 затяжек, 15 вкусов на выбор. Светящийся корпус, встроенный аккумулятор 600мАч.",
    inStock: true,
  },
  {
    id: 4,
    name: "Pod Starter Kit",
    category: "Стартовые",
    brand: "VapeLink",
    price: 1990,
    oldPrice: null,
    badge: null,
    rating: 4.8,
    reviews: 156,
    puffs: null,
    nicotine: null,
    power: "25Вт",
    image: "https://cdn.poehali.dev/projects/2facb984-376b-48d9-8e80-012b07d1cc87/files/0719ff84-f1b1-4068-a437-1722e063652b.jpg",
    desc: "Идеально для новичков — компактный и простой в использовании. В комплекте 2 картриджа.",
    inStock: true,
  },
  {
    id: 5,
    name: "Ice Blend Juice",
    category: "Жидкости",
    brand: "FreshLab",
    price: 490,
    oldPrice: 590,
    badge: "−17%",
    rating: 4.6,
    reviews: 203,
    puffs: null,
    nicotine: "12мг",
    power: null,
    image: "https://cdn.poehali.dev/projects/2facb984-376b-48d9-8e80-012b07d1cc87/files/3a6bb0b9-6043-470b-8c52-69b05e987496.jpg",
    desc: "Ледяная свежесть с нотками арбуза и мяты. 30мл, никотин 12мг, PG/VG 30/70.",
    inStock: false,
  },
  {
    id: 6,
    name: "Ultra Slim Puff",
    category: "Одноразовые",
    brand: "Neon",
    price: 590,
    oldPrice: null,
    badge: null,
    rating: 4.4,
    reviews: 97,
    puffs: 2000,
    nicotine: "20мг",
    power: null,
    image: "https://cdn.poehali.dev/projects/2facb984-376b-48d9-8e80-012b07d1cc87/files/51f62dee-27b7-4ac4-8001-f422f1053178.jpg",
    desc: "Ультратонкий дизайн, 2000 затяжек, 8 вкусов. Вес всего 18г.",
    inStock: true,
  },
  {
    id: 7,
    name: "MaxCloud Mod",
    category: "Устройства",
    brand: "CloudKing",
    price: 5990,
    oldPrice: 7200,
    badge: "−17%",
    rating: 4.9,
    reviews: 67,
    puffs: null,
    nicotine: null,
    power: "200Вт",
    image: "https://cdn.poehali.dev/projects/2facb984-376b-48d9-8e80-012b07d1cc87/files/0719ff84-f1b1-4068-a437-1722e063652b.jpg",
    desc: "Флагманский мод для любителей густого пара. Двойной аккумулятор, дисплей 1.3 дюйма.",
    inStock: true,
  },
  {
    id: 8,
    name: "Salt Berry Mix",
    category: "Жидкости",
    brand: "LiquidArt",
    price: 390,
    oldPrice: null,
    badge: "НОВИНКА",
    rating: 4.8,
    reviews: 44,
    puffs: null,
    nicotine: "20мг",
    power: null,
    image: "https://cdn.poehali.dev/projects/2facb984-376b-48d9-8e80-012b07d1cc87/files/3a6bb0b9-6043-470b-8c52-69b05e987496.jpg",
    desc: "Солевой никотин, микс ягод — черника, малина, клубника. 30мл, 20мг.",
    inStock: true,
  },
  {
    id: 9,
    name: "Glow Bar 5000",
    category: "Одноразовые",
    brand: "GlowVape",
    price: 850,
    oldPrice: 950,
    badge: "ХИТ",
    rating: 4.7,
    reviews: 521,
    puffs: 5000,
    nicotine: "20мг",
    power: null,
    image: "https://cdn.poehali.dev/projects/2facb984-376b-48d9-8e80-012b07d1cc87/files/51f62dee-27b7-4ac4-8001-f422f1053178.jpg",
    desc: "5000 затяжек, перезаряжаемый через Type-C, 20 вкусов. Самая долгая одноразка.",
    inStock: true,
  },
];

export const CATEGORIES = ["Все", "Устройства", "Жидкости", "Одноразовые", "Стартовые"];

export const SORT_OPTIONS = [
  { value: "popular", label: "По популярности" },
  { value: "price_asc", label: "Цена: по возрастанию" },
  { value: "price_desc", label: "Цена: по убыванию" },
  { value: "rating", label: "По рейтингу" },
];
