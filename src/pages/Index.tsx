import { useState } from "react";
import Navbar from "@/components/Navbar";
import HomeSections from "@/components/HomeSections";
import CartDrawer from "@/components/CartDrawer";
import OrderModal from "@/components/OrderModal";

type CartItem = { id: number; name: string; price: number; qty: number };
type Section = "home" | "about" | "promos" | "faq";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderDone, setOrderDone] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [filter, setFilter] = useState("Все");
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (product: { id: number; name: string; price: number }) => {
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

  return (
    <div className="min-h-screen bg-background font-golos">
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        totalItems={totalItems}
        onCartOpen={() => setCartOpen(true)}
      />

      <HomeSections
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        filter={filter}
        setFilter={setFilter}
        openFaq={openFaq}
        setOpenFaq={setOpenFaq}
        onAddToCart={addToCart}
      />

      {cartOpen && (
        <CartDrawer
          cart={cart}
          totalPrice={totalPrice}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onChangeQty={changeQty}
          onCheckout={() => { setCartOpen(false); setOrderOpen(true); }}
          onGoToCatalog={() => { setCartOpen(false); setActiveSection("home"); }}
        />
      )}

      {orderOpen && (
        <OrderModal
          cart={cart}
          totalPrice={totalPrice}
          orderDone={orderDone}
          form={form}
          onFormChange={setForm}
          onSubmit={handleOrder}
          onClose={() => { setOrderOpen(false); setOrderDone(false); }}
        />
      )}
    </div>
  );
}
