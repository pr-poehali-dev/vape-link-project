import { useState, useMemo } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const ALL_PRODUCTS = [
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

const CATEGORIES = ["Все", "Устройства", "Жидкости", "Одноразовые", "Стартовые"];
const SORT_OPTIONS = [
  { value: "popular", label: "По популярности" },
  { value: "price_asc", label: "Цена: по возрастанию" },
  { value: "price_desc", label: "Цена: по убыванию" },
  { value: "rating", label: "По рейтингу" },
];

type CartItem = { id: number; name: string; price: number; qty: number };

interface ProductsProps {
  onBack?: () => void;
}

export default function Products({ onBack }: ProductsProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Все");
  const [sort, setSort] = useState("popular");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [selected, setSelected] = useState<typeof ALL_PRODUCTS[0] | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const filtered = useMemo(() => {
    let result = ALL_PRODUCTS;
    if (category !== "Все") result = result.filter(p => p.category === category);
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase()));
    if (inStockOnly) result = result.filter(p => p.inStock);
    if (sort === "price_asc") result = [...result].sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") result = [...result].sort((a, b) => b.price - a.price);
    else if (sort === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [category, search, inStockOnly, sort]);

  const addToCart = (product: typeof ALL_PRODUCTS[0]) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };
  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.id !== id));
  const changeQty = (id: number, delta: number) =>
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));

  const handleOrder = () => {
    setOrderDone(true);
    setCart([]);
    setForm({ name: "", phone: "", address: "" });
  };

  const inCartCount = (id: number) => cart.find(i => i.id === id)?.qty ?? 0;

  return (
    <div className="min-h-screen bg-background font-golos">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-3">
            {onBack && (
              <button onClick={onBack} className="text-muted-foreground hover:text-[#00ff87] transition-colors">
                <Icon name="ArrowLeft" size={20} />
              </button>
            )}
            <span className="font-oswald text-2xl font-bold tracking-widest" style={{ color: "#00ff87", textShadow: "0 0 16px rgba(0,255,135,0.5)" }}>
              VAPELINK
            </span>
            <span className="hidden md:block text-muted-foreground font-oswald tracking-widest text-sm">/ КАТАЛОГ</span>
          </div>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Поиск по каталогу..."
                className="pl-9 bg-card border-border focus:border-[#00ff87] text-sm"
              />
            </div>
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-[#00ff87] transition-colors"
          >
            <Icon name="ShoppingCart" size={18} />
            <span className="hidden md:block text-sm font-medium">Корзина</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#00ff87] text-black text-xs font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      <main className="pt-16 max-w-7xl mx-auto px-4 py-8">
        {/* HERO LINE */}
        <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
          <div>
            <h1 className="font-oswald text-4xl md:text-5xl font-bold text-foreground">
              КАТАЛОГ <span style={{ color: "#00ff87" }}>ТОВАРОВ</span>
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Найдено: <span className="text-foreground font-medium">{filtered.length}</span> позиций
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg border transition-colors ${view === "grid" ? "border-[#00ff87] text-[#00ff87]" : "border-border text-muted-foreground hover:border-foreground"}`}
            >
              <Icon name="LayoutGrid" size={18} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg border transition-colors ${view === "list" ? "border-[#00ff87] text-[#00ff87]" : "border-border text-muted-foreground hover:border-foreground"}`}
            >
              <Icon name="List" size={18} />
            </button>
          </div>
        </div>

        {/* MOBILE SEARCH */}
        <div className="md:hidden mb-4 relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск..."
            className="pl-9 bg-card border-border focus:border-[#00ff87]"
          />
        </div>

        {/* CATEGORIES STRIP */}
        <div className="flex gap-2 flex-wrap mb-6">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-oswald tracking-wider border transition-all ${
                category === cat
                  ? "bg-[#00ff87] text-black border-[#00ff87] font-bold"
                  : "bg-transparent border-border text-muted-foreground hover:border-[#00ff87] hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
              <div
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`w-9 h-5 rounded-full transition-colors relative flex-shrink-0 ${inStockOnly ? "bg-[#00ff87]" : "bg-border"}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${inStockOnly ? "translate-x-4" : "translate-x-0.5"}`} />
              </div>
              В наличии
            </label>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="text-sm bg-card border border-border rounded-lg px-3 py-1.5 text-foreground focus:outline-none focus:border-[#00ff87]"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* GRID */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <Icon name="PackageSearch" size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-oswald tracking-wider">Ничего не найдено</p>
            <p className="text-sm mt-1">Попробуйте другой запрос или сбросьте фильтры</p>
            <button onClick={() => { setSearch(""); setCategory("Все"); setInStockOnly(false); }} className="mt-4 text-[#00ff87] hover:underline text-sm">
              Сбросить все фильтры
            </button>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-[#00ff87]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,255,135,0.08)] animate-fade-in-up flex flex-col"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="relative overflow-hidden cursor-pointer" onClick={() => setSelected(product)}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                      <span className="font-oswald text-sm tracking-widest text-muted-foreground border border-border px-3 py-1 rounded-full">НЕТ В НАЛИЧИИ</span>
                    </div>
                  )}
                  {product.badge && product.inStock && (
                    <span className={`absolute top-3 left-3 font-oswald text-xs tracking-widest px-2.5 py-1 rounded-full font-bold ${
                      product.badge === "ХИТ" ? "bg-[#00ff87] text-black" :
                      product.badge === "НОВИНКА" ? "bg-blue-500 text-white" :
                      "bg-orange-500 text-white"
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={e => { e.stopPropagation(); setSelected(product); }}
                      className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:border-[#00ff87] transition-colors"
                    >
                      <Icon name="Expand" size={14} />
                    </button>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <Icon name="Star" size={12} className="text-[#00ff87]" />
                    <span className="text-xs text-[#00ff87] font-medium">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    <span className="ml-auto text-xs text-muted-foreground font-oswald tracking-wider">{product.category}</span>
                  </div>
                  <h3 className="font-oswald text-base font-bold tracking-wide text-foreground mb-1 cursor-pointer hover:text-[#00ff87] transition-colors" onClick={() => setSelected(product)}>
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">{product.desc}</p>

                  {/* SPECS */}
                  <div className="flex gap-2 flex-wrap mb-3">
                    {product.puffs && (
                      <span className="text-xs bg-[rgba(0,255,135,0.08)] border border-[#00ff87]/20 text-[#00ff87] px-2 py-0.5 rounded-full">{product.puffs} затяжек</span>
                    )}
                    {product.nicotine && (
                      <span className="text-xs bg-[rgba(0,255,135,0.08)] border border-[#00ff87]/20 text-[#00ff87] px-2 py-0.5 rounded-full">{product.nicotine}</span>
                    )}
                    {product.power && (
                      <span className="text-xs bg-[rgba(0,255,135,0.08)] border border-[#00ff87]/20 text-[#00ff87] px-2 py-0.5 rounded-full">{product.power}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="font-oswald text-xl font-bold text-foreground">{product.price.toLocaleString()} ₽</span>
                      {product.oldPrice && (
                        <span className="text-xs text-muted-foreground line-through ml-2">{product.oldPrice.toLocaleString()} ₽</span>
                      )}
                    </div>
                    {product.inStock ? (
                      inCartCount(product.id) > 0 ? (
                        <div className="flex items-center gap-1 border border-[#00ff87] rounded-lg overflow-hidden">
                          <button onClick={() => changeQty(product.id, -1)} className="px-2 py-1 hover:bg-[#00ff87]/10 transition-colors text-[#00ff87]">
                            <Icon name="Minus" size={14} />
                          </button>
                          <span className="px-2 text-sm font-oswald text-[#00ff87] font-bold">{inCartCount(product.id)}</span>
                          <button onClick={() => addToCart(product)} className="px-2 py-1 hover:bg-[#00ff87]/10 transition-colors text-[#00ff87]">
                            <Icon name="Plus" size={14} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(product)}
                          className="flex items-center gap-1.5 bg-[#00ff87] text-black px-3 py-1.5 rounded-lg font-oswald text-sm font-bold hover:bg-[#00dd6f] transition-colors"
                        >
                          <Icon name="ShoppingCart" size={14} />
                          В корзину
                        </button>
                      )
                    ) : (
                      <button className="text-xs text-muted-foreground border border-border px-3 py-1.5 rounded-lg cursor-not-allowed opacity-50">
                        Нет в наличии
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-[#00ff87]/50 transition-all duration-300 hover:shadow-[0_4px_24px_rgba(0,255,135,0.06)] animate-fade-in-up flex gap-0"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="relative w-32 md:w-48 flex-shrink-0 overflow-hidden cursor-pointer" onClick={() => setSelected(product)}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                      <span className="font-oswald text-xs text-muted-foreground">Нет</span>
                    </div>
                  )}
                  {product.badge && product.inStock && (
                    <span className={`absolute top-2 left-2 font-oswald text-xs px-2 py-0.5 rounded-full font-bold ${
                      product.badge === "ХИТ" ? "bg-[#00ff87] text-black" :
                      product.badge === "НОВИНКА" ? "bg-blue-500 text-white" : "bg-orange-500 text-white"
                    }`}>{product.badge}</span>
                  )}
                </div>
                <div className="flex-1 p-4 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted-foreground font-oswald tracking-wider">{product.brand} · {product.category}</span>
                      <span className="flex items-center gap-0.5 text-xs text-[#00ff87]">
                        <Icon name="Star" size={11} />
                        {product.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                    <h3 className="font-oswald text-lg font-bold cursor-pointer hover:text-[#00ff87] transition-colors" onClick={() => setSelected(product)}>
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1 md:line-clamp-none">{product.desc}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {product.puffs && <span className="text-xs bg-[rgba(0,255,135,0.08)] border border-[#00ff87]/20 text-[#00ff87] px-2 py-0.5 rounded-full">{product.puffs} затяжек</span>}
                      {product.nicotine && <span className="text-xs bg-[rgba(0,255,135,0.08)] border border-[#00ff87]/20 text-[#00ff87] px-2 py-0.5 rounded-full">{product.nicotine}</span>}
                      {product.power && <span className="text-xs bg-[rgba(0,255,135,0.08)] border border-[#00ff87]/20 text-[#00ff87] px-2 py-0.5 rounded-full">{product.power}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 md:flex-col md:items-end flex-shrink-0">
                    <div className="text-right">
                      <div className="font-oswald text-xl font-bold">{product.price.toLocaleString()} ₽</div>
                      {product.oldPrice && <div className="text-xs text-muted-foreground line-through">{product.oldPrice.toLocaleString()} ₽</div>}
                    </div>
                    {product.inStock ? (
                      inCartCount(product.id) > 0 ? (
                        <div className="flex items-center gap-1 border border-[#00ff87] rounded-lg overflow-hidden">
                          <button onClick={() => changeQty(product.id, -1)} className="px-2 py-1.5 hover:bg-[#00ff87]/10 transition-colors text-[#00ff87]"><Icon name="Minus" size={14} /></button>
                          <span className="px-2 font-oswald text-[#00ff87] font-bold">{inCartCount(product.id)}</span>
                          <button onClick={() => addToCart(product)} className="px-2 py-1.5 hover:bg-[#00ff87]/10 transition-colors text-[#00ff87]"><Icon name="Plus" size={14} /></button>
                        </div>
                      ) : (
                        <button onClick={() => addToCart(product)} className="flex items-center gap-1.5 bg-[#00ff87] text-black px-4 py-2 rounded-lg font-oswald text-sm font-bold hover:bg-[#00dd6f] transition-colors whitespace-nowrap">
                          <Icon name="ShoppingCart" size={14} />В корзину
                        </button>
                      )
                    ) : (
                      <span className="text-xs text-muted-foreground border border-border px-3 py-2 rounded-lg opacity-50">Нет в наличии</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* PRODUCT MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up"
            onClick={e => e.stopPropagation()}
          >
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-background/80 border border-border flex items-center justify-center hover:border-[#00ff87] transition-colors">
              <Icon name="X" size={16} />
            </button>
            <img src={selected.image} alt={selected.name} className="w-full h-64 object-cover rounded-t-2xl" />
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-muted-foreground font-oswald tracking-wider">{selected.brand} · {selected.category}</span>
                {selected.badge && (
                  <span className={`font-oswald text-xs px-2 py-0.5 rounded-full font-bold ${
                    selected.badge === "ХИТ" ? "bg-[#00ff87] text-black" :
                    selected.badge === "НОВИНКА" ? "bg-blue-500 text-white" : "bg-orange-500 text-white"
                  }`}>{selected.badge}</span>
                )}
              </div>
              <h2 className="font-oswald text-3xl font-bold mb-2">{selected.name}</h2>
              <div className="flex items-center gap-2 mb-4">
                {[1,2,3,4,5].map(s => (
                  <Icon key={s} name="Star" size={16} className={s <= Math.round(selected.rating) ? "text-[#00ff87]" : "text-border"} />
                ))}
                <span className="text-sm text-muted-foreground">{selected.rating} · {selected.reviews} отзывов</span>
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed">{selected.desc}</p>
              <div className="flex gap-3 flex-wrap mb-6">
                {selected.puffs && <div className="flex items-center gap-2 bg-[rgba(0,255,135,0.05)] border border-[#00ff87]/20 rounded-xl px-4 py-2"><Icon name="Wind" size={16} className="text-[#00ff87]" /><div><div className="text-xs text-muted-foreground">Затяжек</div><div className="font-oswald font-bold text-[#00ff87]">{selected.puffs}</div></div></div>}
                {selected.nicotine && <div className="flex items-center gap-2 bg-[rgba(0,255,135,0.05)] border border-[#00ff87]/20 rounded-xl px-4 py-2"><Icon name="Droplets" size={16} className="text-[#00ff87]" /><div><div className="text-xs text-muted-foreground">Никотин</div><div className="font-oswald font-bold text-[#00ff87]">{selected.nicotine}</div></div></div>}
                {selected.power && <div className="flex items-center gap-2 bg-[rgba(0,255,135,0.05)] border border-[#00ff87]/20 rounded-xl px-4 py-2"><Icon name="Zap" size={16} className="text-[#00ff87]" /><div><div className="text-xs text-muted-foreground">Мощность</div><div className="font-oswald font-bold text-[#00ff87]">{selected.power}</div></div></div>}
                <div className="flex items-center gap-2 bg-[rgba(0,255,135,0.05)] border border-[#00ff87]/20 rounded-xl px-4 py-2"><Icon name={selected.inStock ? "CheckCircle" : "XCircle"} size={16} className={selected.inStock ? "text-[#00ff87]" : "text-red-400"} /><div><div className="text-xs text-muted-foreground">Наличие</div><div className={`font-oswald font-bold text-sm ${selected.inStock ? "text-[#00ff87]" : "text-red-400"}`}>{selected.inStock ? "В наличии" : "Нет"}</div></div></div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-oswald text-3xl font-bold">{selected.price.toLocaleString()} ₽</span>
                  {selected.oldPrice && <span className="text-muted-foreground line-through ml-3 text-lg">{selected.oldPrice.toLocaleString()} ₽</span>}
                </div>
                {selected.inStock ? (
                  inCartCount(selected.id) > 0 ? (
                    <div className="flex items-center gap-2 border border-[#00ff87] rounded-xl overflow-hidden">
                      <button onClick={() => changeQty(selected.id, -1)} className="px-3 py-2.5 hover:bg-[#00ff87]/10 transition-colors text-[#00ff87]"><Icon name="Minus" size={16} /></button>
                      <span className="px-3 font-oswald text-lg text-[#00ff87] font-bold">{inCartCount(selected.id)}</span>
                      <button onClick={() => addToCart(selected)} className="px-3 py-2.5 hover:bg-[#00ff87]/10 transition-colors text-[#00ff87]"><Icon name="Plus" size={16} /></button>
                    </div>
                  ) : (
                    <button onClick={() => { addToCart(selected); setSelected(null); }} className="flex items-center gap-2 bg-[#00ff87] text-black px-6 py-3 rounded-xl font-oswald text-base font-bold hover:bg-[#00dd6f] transition-colors">
                      <Icon name="ShoppingCart" size={18} />В корзину
                    </button>
                  )
                ) : (
                  <span className="text-muted-foreground border border-border px-6 py-3 rounded-xl opacity-50 font-oswald">Нет в наличии</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex" onClick={() => setCartOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="ml-auto relative bg-card border-l border-border w-full max-w-md h-full flex flex-col animate-slide-in-right" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-oswald text-xl tracking-wider">КОРЗИНА</h2>
              <button onClick={() => setCartOpen(false)} className="text-muted-foreground hover:text-foreground"><Icon name="X" size={20} /></button>
            </div>
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-3">
                <Icon name="ShoppingCart" size={48} className="opacity-20" />
                <p className="font-oswald tracking-wider">КОРЗИНА ПУСТА</p>
                <button onClick={() => setCartOpen(false)} className="text-sm text-[#00ff87] hover:underline">Перейти в каталог</button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border">
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.price.toLocaleString()} ₽ / шт</p>
                      </div>
                      <div className="flex items-center gap-1 border border-border rounded-lg overflow-hidden">
                        <button onClick={() => changeQty(item.id, -1)} className="px-2 py-1 hover:bg-muted transition-colors"><Icon name="Minus" size={14} /></button>
                        <span className="px-2 text-sm font-bold">{item.qty}</span>
                        <button onClick={() => changeQty(item.id, 1)} className="px-2 py-1 hover:bg-muted transition-colors"><Icon name="Plus" size={14} /></button>
                      </div>
                      <div className="text-right">
                        <p className="font-oswald font-bold text-sm">{(item.price * item.qty).toLocaleString()} ₽</p>
                        <button onClick={() => removeFromCart(item.id)} className="text-xs text-muted-foreground hover:text-red-400 transition-colors"><Icon name="Trash2" size={12} /></button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t border-border space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Итого:</span>
                    <span className="font-oswald text-xl font-bold text-[#00ff87]">{totalPrice.toLocaleString()} ₽</span>
                  </div>
                  <button
                    onClick={() => { setCartOpen(false); setOrderOpen(true); setOrderDone(false); }}
                    className="w-full bg-[#00ff87] text-black py-3 rounded-xl font-oswald text-base font-bold tracking-wider hover:bg-[#00dd6f] transition-colors"
                  >
                    ОФОРМИТЬ ЗАКАЗ
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ORDER MODAL */}
      {orderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setOrderOpen(false)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="relative bg-card border border-border rounded-2xl max-w-md w-full p-8 animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <button onClick={() => setOrderOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><Icon name="X" size={20} /></button>
            {orderDone ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-[rgba(0,255,135,0.1)] border border-[#00ff87] flex items-center justify-center mx-auto mb-4">
                  <Icon name="Check" size={32} className="text-[#00ff87]" />
                </div>
                <h3 className="font-oswald text-2xl font-bold mb-2">ЗАКАЗ ПРИНЯТ!</h3>
                <p className="text-muted-foreground">Свяжемся с вами в течение 30 минут для подтверждения.</p>
                <button onClick={() => setOrderOpen(false)} className="mt-6 bg-[#00ff87] text-black px-8 py-2.5 rounded-xl font-oswald font-bold hover:bg-[#00dd6f] transition-colors">
                  ЗАКРЫТЬ
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-oswald text-2xl font-bold mb-1">ОФОРМЛЕНИЕ ЗАКАЗА</h3>
                <p className="text-muted-foreground text-sm mb-6">Итого: {totalPrice.toLocaleString()} ₽ · {totalItems} товаров</p>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Имя *</label>
                    <Input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Ваше имя" className="bg-background border-border focus:border-[#00ff87]" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Телефон *</label>
                    <Input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="+7 (___) ___-__-__" className="bg-background border-border focus:border-[#00ff87]" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Адрес доставки</label>
                    <Input value={form.address} onChange={e => setForm({...form, address: e.target.value})} placeholder="Улица, дом, квартира" className="bg-background border-border focus:border-[#00ff87]" />
                  </div>
                  <button
                    onClick={handleOrder}
                    disabled={!form.name || !form.phone}
                    className="w-full bg-[#00ff87] text-black py-3 rounded-xl font-oswald text-base font-bold tracking-wider hover:bg-[#00dd6f] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ПОДТВЕРДИТЬ ЗАКАЗ
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
