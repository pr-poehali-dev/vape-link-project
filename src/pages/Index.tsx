import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const PRODUCTS = [
  {
    id: 1,
    name: "VapeLink Pro X",
    category: "Устройства",
    price: 3490,
    oldPrice: 4200,
    badge: "ХИТ",
    image: "https://cdn.poehali.dev/projects/2facb984-376b-48d9-8e80-012b07d1cc87/files/0719ff84-f1b1-4068-a437-1722e063652b.jpg",
    desc: "Мощный под-мод с регулировкой мощности до 80Вт",
  },
  {
    id: 2,
    name: "Liquid Premium Set",
    category: "Жидкости",
    price: 890,
    oldPrice: null,
    badge: "НОВИНКА",
    image: "https://cdn.poehali.dev/projects/2facb984-376b-48d9-8e80-012b07d1cc87/files/3a6bb0b9-6043-470b-8c52-69b05e987496.jpg",
    desc: "Набор из 5 премиальных жидкостей с никотином 20мг",
  },
  {
    id: 3,
    name: "Neon Disposable",
    category: "Одноразовые",
    price: 650,
    oldPrice: 750,
    badge: "−13%",
    image: "https://cdn.poehali.dev/projects/2facb984-376b-48d9-8e80-012b07d1cc87/files/51f62dee-27b7-4ac4-8001-f422f1053178.jpg",
    desc: "3500 затяжек, 15 вкусов, светящийся корпус",
  },
  {
    id: 4,
    name: "Pod Starter Kit",
    category: "Стартовые",
    price: 1990,
    oldPrice: null,
    badge: null,
    image: "https://cdn.poehali.dev/projects/2facb984-376b-48d9-8e80-012b07d1cc87/files/0719ff84-f1b1-4068-a437-1722e063652b.jpg",
    desc: "Идеально для новичков — компактный и простой",
  },
  {
    id: 5,
    name: "Ice Blend Juice",
    category: "Жидкости",
    price: 490,
    oldPrice: 590,
    badge: "−17%",
    image: "https://cdn.poehali.dev/projects/2facb984-376b-48d9-8e80-012b07d1cc87/files/3a6bb0b9-6043-470b-8c52-69b05e987496.jpg",
    desc: "Ледяная свежесть с нотками арбуза и мяты",
  },
  {
    id: 6,
    name: "Ultra Slim Puff",
    category: "Одноразовые",
    price: 590,
    oldPrice: null,
    badge: null,
    image: "https://cdn.poehali.dev/projects/2facb984-376b-48d9-8e80-012b07d1cc87/files/51f62dee-27b7-4ac4-8001-f422f1053178.jpg",
    desc: "Ультратонкий дизайн, 2000 затяжек, 8 вкусов",
  },
];

const PROMOTIONS = [
  { title: "−20% на все жидкости", desc: "При покупке от 3 флаконов", expires: "до 31 марта", color: "from-emerald-900/60 to-emerald-950/80" },
  { title: "Стартовый набор", desc: "Устройство + 2 жидкости + картриджи", expires: "Постоянная акция", color: "from-blue-900/60 to-blue-950/80" },
  { title: "Бесплатная доставка", desc: "При заказе от 2 000 ₽", expires: "Всегда", color: "from-violet-900/60 to-violet-950/80" },
];

const FAQS = [
  { q: "Как оформить заказ?", a: "Выберите товар, нажмите «В корзину», заполните данные в форме заказа. Мы свяжемся с вами в течение 30 минут для подтверждения." },
  { q: "Какие способы оплаты?", a: "Принимаем оплату картой онлайн, наличными при получении и переводом на карту." },
  { q: "Как быстро доставите?", a: "Доставка по городу — 1–2 часа курьером. В регионы — 2–5 рабочих дней транспортными компаниями." },
  { q: "Есть ли гарантия на устройства?", a: "Да, на все устройства действует гарантия 6 месяцев. При поломке привезите устройство в магазин или свяжитесь с нами." },
  { q: "Можно ли вернуть товар?", a: "Возврат устройств — в течение 14 дней при сохранении упаковки. Жидкости и расходники возврату не подлежат." },
];

type CartItem = { id: number; name: string; price: number; qty: number };

export default function Index() {
  const [activeSection, setActiveSection] = useState<"home" | "about" | "promos" | "faq">("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [filter, setFilter] = useState("Все");
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  const categories = ["Все", "Устройства", "Жидкости", "Одноразовые", "Стартовые"];
  const filtered = filter === "Все" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (product: typeof PRODUCTS[0]) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.id !== id));
  const changeQty = (id: number, delta: number) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };

  const handleOrder = () => {
    setOrderDone(true);
    setCart([]);
    setForm({ name: "", phone: "", address: "" });
  };

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "about", label: "О нас" },
    { id: "promos", label: "Акции" },
    { id: "faq", label: "FAQ" },
  ] as const;

  return (
    <div className="min-h-screen bg-background font-golos">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <button
            onClick={() => setActiveSection("home")}
            className="font-oswald text-2xl font-bold tracking-widest neon-text neon-glow-text"
          >
            VAPELINK
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`font-oswald text-sm tracking-widest uppercase transition-colors ${
                  activeSection === item.id ? "neon-text" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
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

        <div className="md:hidden flex border-t border-border">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex-1 py-2 text-xs font-oswald tracking-wider uppercase transition-colors ${
                activeSection === item.id ? "text-[#00ff87] border-b-2 border-[#00ff87]" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="pt-20 md:pt-16">

        {/* === HOME === */}
        {activeSection === "home" && (
          <div>
            <section className="relative overflow-hidden min-h-[70vh] flex items-center">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-background to-[#0d1a12]" />
              <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-[rgba(0,255,135,0.08)] blur-[100px]" />
              <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-[rgba(0,255,135,0.05)] blur-[80px]" />

              <div className="relative max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="mb-6 bg-[rgba(0,255,135,0.1)] text-[#00ff87] border-[#00ff87] border font-oswald tracking-widest">
                    ПРЕМИУМ ВЕЙП-ШОП
                  </Badge>
                  <h1 className="font-oswald text-5xl md:text-7xl font-bold leading-none mb-6 animate-fade-in-up">
                    ПОЧУВСТВУЙ
                    <br />
                    <span className="text-[#00ff87]" style={{ textShadow: "0 0 20px rgba(0,255,135,0.6)" }}>ВКУС</span>
                    <br />
                    СВОБОДЫ
                  </h1>
                  <p className="text-muted-foreground text-lg mb-8 max-w-md animate-fade-in-up delay-200">
                    Лучшие устройства, жидкости и одноразки. Быстрая доставка, честные цены, живая поддержка.
                  </p>
                  <div className="flex gap-4 animate-fade-in-up delay-300">
                    <Button
                      onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}
                      className="bg-[#00ff87] text-black font-oswald tracking-wider hover:opacity-90 px-8 py-6 text-base"
                      style={{ boxShadow: "0 0 20px rgba(0,255,135,0.2)" }}
                    >
                      СМОТРЕТЬ КАТАЛОГ
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setActiveSection("promos")}
                      className="border-border font-oswald tracking-wider px-8 py-6 text-base hover:border-[#00ff87] hover:text-[#00ff87]"
                    >
                      АКЦИИ
                    </Button>
                  </div>
                </div>
                <div className="hidden md:flex justify-end">
                  <div className="relative w-72 h-72">
                    <div className="absolute inset-0 rounded-full bg-[rgba(0,255,135,0.08)] blur-3xl animate-pulse-neon" />
                    <img
                      src="https://cdn.poehali.dev/projects/2facb984-376b-48d9-8e80-012b07d1cc87/files/0719ff84-f1b1-4068-a437-1722e063652b.jpg"
                      alt="VapeLink Pro X"
                      className="relative z-10 w-full h-full object-cover rounded-2xl border border-[#00ff87]/20"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="border-y border-border bg-card/40">
              <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { num: "500+", label: "товаров в наличии" },
                  { num: "10K+", label: "довольных клиентов" },
                  { num: "1-2ч", label: "доставка по городу" },
                  { num: "6 мес", label: "гарантия на устройства" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="font-oswald text-3xl font-bold text-[#00ff87]">{s.num}</div>
                    <div className="text-muted-foreground text-sm mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            <section id="catalog" className="max-w-6xl mx-auto px-4 py-16">
              <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                <h2 className="font-oswald text-3xl font-bold tracking-wide">КАТАЛОГ</h2>
                <div className="flex gap-2 flex-wrap">
                  {categories.map(c => (
                    <button
                      key={c}
                      onClick={() => setFilter(c)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                        filter === c
                          ? "bg-[#00ff87] text-black border-[#00ff87] font-semibold"
                          : "border-border text-muted-foreground hover:border-[#00ff87] hover:text-foreground"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product, i) => (
                  <div
                    key={product.id}
                    className="card-hover bg-card rounded-2xl overflow-hidden border border-border group"
                  >
                    <div className="relative overflow-hidden h-52">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {product.badge && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold font-oswald tracking-wider bg-[#00ff87] text-black">
                          {product.badge}
                        </span>
                      )}
                      <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs text-muted-foreground bg-black/50 border border-border">
                        {product.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="font-oswald text-xl font-semibold mb-1">{product.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{product.desc}</p>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-oswald text-2xl font-bold text-[#00ff87]">
                            {product.price.toLocaleString("ru")} ₽
                          </span>
                          {product.oldPrice && (
                            <span className="ml-2 text-sm text-muted-foreground line-through">
                              {product.oldPrice.toLocaleString("ru")} ₽
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="flex items-center gap-2 px-4 py-2 bg-[rgba(0,255,135,0.1)] text-[#00ff87] rounded-lg border border-[#00ff87]/30 hover:bg-[#00ff87] hover:text-black transition-colors font-medium text-sm"
                        >
                          <Icon name="Plus" size={16} />
                          В корзину
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* === ABOUT === */}
        {activeSection === "about" && (
          <section className="max-w-6xl mx-auto px-4 py-16 animate-fade-in-up">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <Badge className="mb-6 bg-[rgba(0,255,135,0.1)] text-[#00ff87] border-[#00ff87] border font-oswald tracking-widest">
                  О НАС
                </Badge>
                <h2 className="font-oswald text-4xl md:text-5xl font-bold leading-tight mb-6">
                  VAPELINK —<br />
                  <span className="text-[#00ff87]">БОЛЬШЕ ЧЕМ</span><br />
                  МАГАЗИН
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  Мы работаем с 2019 года и знаем всё о вейпинге. Наша команда отбирает только проверенные устройства и жидкости от лучших производителей.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Мы не просто продаём — мы помогаем выбрать. Каждый покупатель получает консультацию и поддержку после покупки.
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    { icon: "Shield", text: "Только оригинальные товары с сертификатами" },
                    { icon: "Zap", text: "Доставка в течение 1–2 часов по городу" },
                    { icon: "HeartHandshake", text: "Поддержка клиентов 7 дней в неделю" },
                    { icon: "Star", text: "Рейтинг 4.9 на картах — более 1200 отзывов" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[rgba(0,255,135,0.1)] border border-[#00ff87]/20 flex items-center justify-center flex-shrink-0">
                        <Icon name={item.icon} size={18} className="text-[#00ff87]" />
                      </div>
                      <span className="text-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden aspect-square">
                  <img
                    src="https://cdn.poehali.dev/projects/2facb984-376b-48d9-8e80-012b07d1cc87/files/0719ff84-f1b1-4068-a437-1722e063652b.jpg"
                    alt="Устройства"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square mt-8">
                  <img
                    src="https://cdn.poehali.dev/projects/2facb984-376b-48d9-8e80-012b07d1cc87/files/3a6bb0b9-6043-470b-8c52-69b05e987496.jpg"
                    alt="Жидкости"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square">
                  <img
                    src="https://cdn.poehali.dev/projects/2facb984-376b-48d9-8e80-012b07d1cc87/files/51f62dee-27b7-4ac4-8001-f422f1053178.jpg"
                    alt="Одноразки"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl bg-[rgba(0,255,135,0.08)] border border-[#00ff87]/20 aspect-square flex flex-col items-center justify-center p-4">
                  <span className="font-oswald text-5xl font-bold text-[#00ff87]">5+</span>
                  <span className="text-sm text-muted-foreground text-center mt-2">лет на рынке</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* === PROMOS === */}
        {activeSection === "promos" && (
          <section className="max-w-6xl mx-auto px-4 py-16 animate-fade-in-up">
            <Badge className="mb-6 bg-[rgba(0,255,135,0.1)] text-[#00ff87] border-[#00ff87] border font-oswald tracking-widest">
              АКЦИИ
            </Badge>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mb-12">
              ТЕКУЩИЕ<br /><span className="text-[#00ff87]">ПРЕДЛОЖЕНИЯ</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {PROMOTIONS.map((promo, i) => (
                <div
                  key={i}
                  className={`card-hover relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${promo.color} p-8`}
                >
                  <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/5 blur-xl" />
                  <div className="relative">
                    <h3 className="font-oswald text-2xl font-bold mb-3 text-[#00ff87] leading-tight">
                      {promo.title}
                    </h3>
                    <p className="text-foreground/80 mb-6 leading-relaxed">{promo.desc}</p>
                    <span className="inline-block px-3 py-1.5 rounded-md bg-black/30 text-xs text-muted-foreground border border-border">
                      {promo.expires}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-[#0d1a12] to-card border border-[#00ff87]/20 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-oswald text-3xl font-bold mb-4">
                    ПОДПИШИСЬ И ПОЛУЧИ<br />
                    <span className="text-[#00ff87]">−10% НА ПЕРВЫЙ ЗАКАЗ</span>
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Оставь email — пришлём промокод и будем рассказывать о новинках и акциях первым.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Input
                    placeholder="Ваш email"
                    className="bg-black/30 border-border focus:border-[#00ff87] transition-colors"
                  />
                  <Button className="bg-[#00ff87] text-black font-oswald tracking-wider hover:opacity-90 whitespace-nowrap px-6">
                    ПОДПИСАТЬСЯ
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* === FAQ === */}
        {activeSection === "faq" && (
          <section className="max-w-3xl mx-auto px-4 py-16 animate-fade-in-up">
            <Badge className="mb-6 bg-[rgba(0,255,135,0.1)] text-[#00ff87] border-[#00ff87] border font-oswald tracking-widest">
              FAQ
            </Badge>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold mb-12">
              ЧАСТЫЕ<br /><span className="text-[#00ff87]">ВОПРОСЫ</span>
            </h2>

            <div className="flex flex-col gap-3">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className={`rounded-2xl border transition-all cursor-pointer overflow-hidden ${
                    openFaq === i ? "border-[#00ff87] bg-[rgba(0,255,135,0.05)]" : "border-border bg-card hover:border-[#00ff87]/40"
                  }`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <div className="p-6 flex items-center justify-between gap-4">
                    <h3 className="font-oswald text-lg font-semibold tracking-wide">{faq.q}</h3>
                    <Icon
                      name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                      size={20}
                      className={`flex-shrink-0 transition-colors ${openFaq === i ? "text-[#00ff87]" : "text-muted-foreground"}`}
                    />
                  </div>
                  {openFaq === i && (
                    <div className="px-6 pb-6 text-muted-foreground leading-relaxed animate-fade-in-up">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-2xl bg-card border border-border p-8 text-center">
              <Icon name="MessageCircle" size={32} className="mx-auto mb-4 text-[#00ff87]" />
              <h3 className="font-oswald text-2xl font-bold mb-2">ОСТАЛИСЬ ВОПРОСЫ?</h3>
              <p className="text-muted-foreground mb-6">Напишите нам — ответим быстро</p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button className="bg-[#00ff87] text-black font-oswald tracking-wider hover:opacity-90 px-8">
                  НАПИСАТЬ В TELEGRAM
                </Button>
                <Button variant="outline" className="border-border font-oswald tracking-wider hover:border-[#00ff87] hover:text-[#00ff87] px-8">
                  ПОЗВОНИТЬ
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t border-border mt-8">
          <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-oswald text-xl font-bold tracking-widest text-[#00ff87]" style={{ textShadow: "0 0 16px rgba(0,255,135,0.5)" }}>VAPELINK</span>
            <span className="text-muted-foreground text-sm">Продажа только лицам старше 18 лет</span>
            <span className="text-muted-foreground text-sm">© 2025 VapeLink. Все права защищены.</span>
          </div>
        </footer>
      </main>

      {/* === CART DRAWER === */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative ml-auto w-full max-w-md bg-card border-l border-border flex flex-col h-full animate-slide-in-right">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-oswald text-2xl font-bold tracking-wide">КОРЗИНА</h2>
              <button onClick={() => setCartOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Icon name="ShoppingCart" size={48} className="text-muted-foreground mb-4" />
                  <p className="text-muted-foreground font-oswald text-lg tracking-wide">КОРЗИНА ПУСТА</p>
                  <p className="text-muted-foreground text-sm mt-2">Добавьте товары из каталога</p>
                  <Button
                    onClick={() => { setCartOpen(false); setActiveSection("home"); }}
                    className="mt-6 bg-[#00ff87] text-black font-oswald tracking-wider hover:opacity-90"
                  >
                    В КАТАЛОГ
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{item.name}</p>
                        <p className="text-sm text-[#00ff87] font-oswald font-semibold">{item.price.toLocaleString("ru")} ₽</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => changeQty(item.id, -1)}
                          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-[#00ff87] transition-colors"
                        >
                          <Icon name="Minus" size={14} />
                        </button>
                        <span className="w-6 text-center font-semibold">{item.qty}</span>
                        <button
                          onClick={() => changeQty(item.id, 1)}
                          className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-[#00ff87] transition-colors"
                        >
                          <Icon name="Plus" size={14} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Итого:</span>
                  <span className="font-oswald text-2xl font-bold text-[#00ff87]">{totalPrice.toLocaleString("ru")} ₽</span>
                </div>
                <Button
                  className="w-full bg-[#00ff87] text-black font-oswald tracking-widest hover:opacity-90 py-6 text-base"
                  style={{ boxShadow: "0 0 20px rgba(0,255,135,0.2)" }}
                  onClick={() => { setCartOpen(false); setOrderOpen(true); }}
                >
                  ОФОРМИТЬ ЗАКАЗ
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* === ORDER MODAL === */}
      {orderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => !orderDone && setOrderOpen(false)} />
          <div className="relative w-full max-w-md bg-card border border-border rounded-2xl p-8 animate-fade-in-up">
            {orderDone ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-[rgba(0,255,135,0.1)] border border-[#00ff87]/30 flex items-center justify-center mx-auto mb-6">
                  <Icon name="CheckCircle" size={32} className="text-[#00ff87]" />
                </div>
                <h3 className="font-oswald text-3xl font-bold mb-3">ЗАКАЗ ПРИНЯТ!</h3>
                <p className="text-muted-foreground mb-8">Мы свяжемся с вами в ближайшие 30 минут для подтверждения заказа.</p>
                <Button
                  className="bg-[#00ff87] text-black font-oswald tracking-wider hover:opacity-90 px-10"
                  onClick={() => { setOrderOpen(false); setOrderDone(false); }}
                >
                  ОТЛИЧНО!
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-oswald text-2xl font-bold tracking-wide">ОФОРМЛЕНИЕ</h3>
                  <button onClick={() => setOrderOpen(false)} className="text-muted-foreground hover:text-foreground">
                    <Icon name="X" size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-4 mb-6">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Ваше имя</label>
                    <Input
                      placeholder="Иван Иванов"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="bg-background border-border focus:border-[#00ff87] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Телефон</label>
                    <Input
                      placeholder="+7 (999) 000-00-00"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="bg-background border-border focus:border-[#00ff87] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Адрес доставки</label>
                    <Input
                      placeholder="Улица, дом, квартира"
                      value={form.address}
                      onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                      className="bg-background border-border focus:border-[#00ff87] transition-colors"
                    />
                  </div>
                </div>

                <div className="rounded-xl bg-background border border-border p-4 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm mb-2 last:mb-0">
                      <span className="text-muted-foreground">{item.name} × {item.qty}</span>
                      <span className="font-medium">{(item.price * item.qty).toLocaleString("ru")} ₽</span>
                    </div>
                  ))}
                  <div className="border-t border-border mt-3 pt-3 flex justify-between font-bold">
                    <span>Итого</span>
                    <span className="text-[#00ff87] font-oswald text-lg">{totalPrice.toLocaleString("ru")} ₽</span>
                  </div>
                </div>

                <Button
                  className="w-full bg-[#00ff87] text-black font-oswald tracking-widest hover:opacity-90 py-6 text-base"
                  style={{ boxShadow: "0 0 20px rgba(0,255,135,0.2)" }}
                  onClick={handleOrder}
                  disabled={!form.name || !form.phone || !form.address}
                >
                  ПОДТВЕРДИТЬ ЗАКАЗ
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}