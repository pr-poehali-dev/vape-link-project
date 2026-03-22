import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Product, CartItem, CATEGORIES, SORT_OPTIONS } from "./data";

interface ProductCatalogProps {
  filtered: Product[];
  search: string;
  setSearch: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  sort: string;
  setSort: (v: string) => void;
  inStockOnly: boolean;
  setInStockOnly: (v: boolean) => void;
  view: "grid" | "list";
  setView: (v: "grid" | "list") => void;
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
  onChangeQty: (id: number, delta: number) => void;
  onSelectProduct: (product: Product) => void;
  onResetFilters: () => void;
}

function badgeClass(badge: string) {
  if (badge === "ХИТ") return "bg-[#00ff87] text-black";
  if (badge === "НОВИНКА") return "bg-blue-500 text-white";
  return "bg-orange-500 text-white";
}

function inCartCount(cart: CartItem[], id: number) {
  return cart.find(i => i.id === id)?.qty ?? 0;
}

export default function ProductCatalog({
  filtered,
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  inStockOnly,
  setInStockOnly,
  view,
  setView,
  cart,
  onAddToCart,
  onChangeQty,
  onSelectProduct,
  onResetFilters,
}: ProductCatalogProps) {
  return (
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

      {/* EMPTY STATE */}
      {filtered.length === 0 ? (
        <div className="text-center py-24 text-muted-foreground">
          <Icon name="PackageSearch" size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-oswald tracking-wider">Ничего не найдено</p>
          <p className="text-sm mt-1">Попробуйте другой запрос или сбросьте фильтры</p>
          <button onClick={onResetFilters} className="mt-4 text-[#00ff87] hover:underline text-sm">
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
              <div className="relative overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
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
                  <span className={`absolute top-3 left-3 font-oswald text-xs tracking-widest px-2.5 py-1 rounded-full font-bold ${badgeClass(product.badge)}`}>
                    {product.badge}
                  </span>
                )}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={e => { e.stopPropagation(); onSelectProduct(product); }}
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
                <h3
                  className="font-oswald text-base font-bold tracking-wide text-foreground mb-1 cursor-pointer hover:text-[#00ff87] transition-colors"
                  onClick={() => onSelectProduct(product)}
                >
                  {product.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">{product.desc}</p>

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
                    inCartCount(cart, product.id) > 0 ? (
                      <div className="flex items-center gap-1 border border-[#00ff87] rounded-lg overflow-hidden">
                        <button onClick={() => onChangeQty(product.id, -1)} className="px-2 py-1 hover:bg-[#00ff87]/10 transition-colors text-[#00ff87]">
                          <Icon name="Minus" size={14} />
                        </button>
                        <span className="px-2 text-sm font-oswald text-[#00ff87] font-bold">{inCartCount(cart, product.id)}</span>
                        <button onClick={() => onAddToCart(product)} className="px-2 py-1 hover:bg-[#00ff87]/10 transition-colors text-[#00ff87]">
                          <Icon name="Plus" size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onAddToCart(product)}
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
              <div className="relative w-32 md:w-48 flex-shrink-0 overflow-hidden cursor-pointer" onClick={() => onSelectProduct(product)}>
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                    <span className="font-oswald text-xs text-muted-foreground">Нет</span>
                  </div>
                )}
                {product.badge && product.inStock && (
                  <span className={`absolute top-2 left-2 font-oswald text-xs px-2 py-0.5 rounded-full font-bold ${badgeClass(product.badge)}`}>
                    {product.badge}
                  </span>
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
                  <h3 className="font-oswald text-lg font-bold cursor-pointer hover:text-[#00ff87] transition-colors" onClick={() => onSelectProduct(product)}>
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
                    inCartCount(cart, product.id) > 0 ? (
                      <div className="flex items-center gap-1 border border-[#00ff87] rounded-lg overflow-hidden">
                        <button onClick={() => onChangeQty(product.id, -1)} className="px-2 py-1.5 hover:bg-[#00ff87]/10 transition-colors text-[#00ff87]"><Icon name="Minus" size={14} /></button>
                        <span className="px-2 font-oswald text-[#00ff87] font-bold">{inCartCount(cart, product.id)}</span>
                        <button onClick={() => onAddToCart(product)} className="px-2 py-1.5 hover:bg-[#00ff87]/10 transition-colors text-[#00ff87]"><Icon name="Plus" size={14} /></button>
                      </div>
                    ) : (
                      <button onClick={() => onAddToCart(product)} className="flex items-center gap-1.5 bg-[#00ff87] text-black px-4 py-2 rounded-lg font-oswald text-sm font-bold hover:bg-[#00dd6f] transition-colors whitespace-nowrap">
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
  );
}
