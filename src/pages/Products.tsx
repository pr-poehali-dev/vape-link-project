import { useState, useMemo } from "react";
import { ALL_PRODUCTS, CartItem, Product } from "@/components/products/data";
import ProductsNavbar from "@/components/products/ProductsNavbar";
import ProductCatalog from "@/components/products/ProductCatalog";
import { ProductModal, ProductCartDrawer, ProductOrderModal } from "@/components/products/ProductOverlays";

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
  const [selected, setSelected] = useState<Product | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
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

  const addToCart = (product: Product) => {
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

  const resetFilters = () => {
    setSearch("");
    setCategory("Все");
    setInStockOnly(false);
  };

  return (
    <div className="min-h-screen bg-background font-golos">
      <ProductsNavbar
        search={search}
        setSearch={setSearch}
        totalItems={totalItems}
        onCartOpen={() => setCartOpen(true)}
        onBack={onBack}
      />

      <ProductCatalog
        filtered={filtered}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        inStockOnly={inStockOnly}
        setInStockOnly={setInStockOnly}
        view={view}
        setView={setView}
        cart={cart}
        onAddToCart={addToCart}
        onChangeQty={changeQty}
        onSelectProduct={setSelected}
        onResetFilters={resetFilters}
      />

      {selected && (
        <ProductModal
          selected={selected}
          cart={cart}
          onClose={() => setSelected(null)}
          onAddToCart={addToCart}
          onChangeQty={changeQty}
        />
      )}

      {cartOpen && (
        <ProductCartDrawer
          cart={cart}
          totalPrice={totalPrice}
          totalItems={totalItems}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onChangeQty={changeQty}
          onCheckout={() => { setCartOpen(false); setOrderOpen(true); setOrderDone(false); }}
        />
      )}

      {orderOpen && (
        <ProductOrderModal
          totalPrice={totalPrice}
          totalItems={totalItems}
          orderDone={orderDone}
          form={form}
          onFormChange={setForm}
          onSubmit={handleOrder}
          onClose={() => setOrderOpen(false)}
        />
      )}
    </div>
  );
}
