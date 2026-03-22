import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Product, CartItem } from "./data";

// ─── PRODUCT MODAL ───────────────────────────────────────────────────────────

interface ProductModalProps {
  selected: Product;
  cart: CartItem[];
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onChangeQty: (id: number, delta: number) => void;
}

function inCartCount(cart: CartItem[], id: number) {
  return cart.find(i => i.id === id)?.qty ?? 0;
}

export function ProductModal({ selected, cart, onClose, onAddToCart, onChangeQty }: ProductModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in-up"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-background/80 border border-border flex items-center justify-center hover:border-[#00ff87] transition-colors">
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
            {selected.puffs && (
              <div className="flex items-center gap-2 bg-[rgba(0,255,135,0.05)] border border-[#00ff87]/20 rounded-xl px-4 py-2">
                <Icon name="Wind" size={16} className="text-[#00ff87]" />
                <div><div className="text-xs text-muted-foreground">Затяжек</div><div className="font-oswald font-bold text-[#00ff87]">{selected.puffs}</div></div>
              </div>
            )}
            {selected.nicotine && (
              <div className="flex items-center gap-2 bg-[rgba(0,255,135,0.05)] border border-[#00ff87]/20 rounded-xl px-4 py-2">
                <Icon name="Droplets" size={16} className="text-[#00ff87]" />
                <div><div className="text-xs text-muted-foreground">Никотин</div><div className="font-oswald font-bold text-[#00ff87]">{selected.nicotine}</div></div>
              </div>
            )}
            {selected.power && (
              <div className="flex items-center gap-2 bg-[rgba(0,255,135,0.05)] border border-[#00ff87]/20 rounded-xl px-4 py-2">
                <Icon name="Zap" size={16} className="text-[#00ff87]" />
                <div><div className="text-xs text-muted-foreground">Мощность</div><div className="font-oswald font-bold text-[#00ff87]">{selected.power}</div></div>
              </div>
            )}
            <div className="flex items-center gap-2 bg-[rgba(0,255,135,0.05)] border border-[#00ff87]/20 rounded-xl px-4 py-2">
              <Icon name={selected.inStock ? "CheckCircle" : "XCircle"} size={16} className={selected.inStock ? "text-[#00ff87]" : "text-red-400"} />
              <div>
                <div className="text-xs text-muted-foreground">Наличие</div>
                <div className={`font-oswald font-bold text-sm ${selected.inStock ? "text-[#00ff87]" : "text-red-400"}`}>{selected.inStock ? "В наличии" : "Нет"}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-oswald text-3xl font-bold">{selected.price.toLocaleString()} ₽</span>
              {selected.oldPrice && <span className="text-muted-foreground line-through ml-3 text-lg">{selected.oldPrice.toLocaleString()} ₽</span>}
            </div>
            {selected.inStock ? (
              inCartCount(cart, selected.id) > 0 ? (
                <div className="flex items-center gap-2 border border-[#00ff87] rounded-xl overflow-hidden">
                  <button onClick={() => onChangeQty(selected.id, -1)} className="px-3 py-2.5 hover:bg-[#00ff87]/10 transition-colors text-[#00ff87]"><Icon name="Minus" size={16} /></button>
                  <span className="px-3 font-oswald text-lg text-[#00ff87] font-bold">{inCartCount(cart, selected.id)}</span>
                  <button onClick={() => onAddToCart(selected)} className="px-3 py-2.5 hover:bg-[#00ff87]/10 transition-colors text-[#00ff87]"><Icon name="Plus" size={16} /></button>
                </div>
              ) : (
                <button onClick={() => { onAddToCart(selected); onClose(); }} className="flex items-center gap-2 bg-[#00ff87] text-black px-6 py-3 rounded-xl font-oswald text-base font-bold hover:bg-[#00dd6f] transition-colors">
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
  );
}

// ─── CART DRAWER ─────────────────────────────────────────────────────────────

interface CartDrawerProps {
  cart: CartItem[];
  totalPrice: number;
  totalItems: number;
  onClose: () => void;
  onRemove: (id: number) => void;
  onChangeQty: (id: number, delta: number) => void;
  onCheckout: () => void;
}

export function ProductCartDrawer({ cart, totalPrice, totalItems, onClose, onRemove, onChangeQty, onCheckout }: CartDrawerProps) {
  return (
    <div className="fixed inset-0 z-50 flex" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="ml-auto relative bg-card border-l border-border w-full max-w-md h-full flex flex-col animate-slide-in-right" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-oswald text-xl tracking-wider">КОРЗИНА</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><Icon name="X" size={20} /></button>
        </div>
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-3">
            <Icon name="ShoppingCart" size={48} className="opacity-20" />
            <p className="font-oswald tracking-wider">КОРЗИНА ПУСТА</p>
            <button onClick={onClose} className="text-sm text-[#00ff87] hover:underline">Перейти в каталог</button>
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
                    <button onClick={() => onChangeQty(item.id, -1)} className="px-2 py-1 hover:bg-muted transition-colors"><Icon name="Minus" size={14} /></button>
                    <span className="px-2 text-sm font-bold">{item.qty}</span>
                    <button onClick={() => onChangeQty(item.id, 1)} className="px-2 py-1 hover:bg-muted transition-colors"><Icon name="Plus" size={14} /></button>
                  </div>
                  <div className="text-right">
                    <p className="font-oswald font-bold text-sm">{(item.price * item.qty).toLocaleString()} ₽</p>
                    <button onClick={() => onRemove(item.id)} className="text-xs text-muted-foreground hover:text-red-400 transition-colors"><Icon name="Trash2" size={12} /></button>
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
                onClick={onCheckout}
                className="w-full bg-[#00ff87] text-black py-3 rounded-xl font-oswald text-base font-bold tracking-wider hover:bg-[#00dd6f] transition-colors"
              >
                ОФОРМИТЬ ЗАКАЗ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── ORDER MODAL ─────────────────────────────────────────────────────────────

interface OrderModalProps {
  totalPrice: number;
  totalItems: number;
  orderDone: boolean;
  form: { name: string; phone: string; address: string };
  onFormChange: (form: { name: string; phone: string; address: string }) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export function ProductOrderModal({ totalPrice, totalItems, orderDone, form, onFormChange, onSubmit, onClose }: OrderModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative bg-card border border-border rounded-2xl max-w-md w-full p-8 animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><Icon name="X" size={20} /></button>
        {orderDone ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-[rgba(0,255,135,0.1)] border border-[#00ff87] flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={32} className="text-[#00ff87]" />
            </div>
            <h3 className="font-oswald text-2xl font-bold mb-2">ЗАКАЗ ПРИНЯТ!</h3>
            <p className="text-muted-foreground">Свяжемся с вами в течение 30 минут для подтверждения.</p>
            <button onClick={onClose} className="mt-6 bg-[#00ff87] text-black px-8 py-2.5 rounded-xl font-oswald font-bold hover:bg-[#00dd6f] transition-colors">
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
                <Input value={form.name} onChange={e => onFormChange({...form, name: e.target.value})} placeholder="Ваше имя" className="bg-background border-border focus:border-[#00ff87]" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Телефон *</label>
                <Input value={form.phone} onChange={e => onFormChange({...form, phone: e.target.value})} placeholder="+7 (___) ___-__-__" className="bg-background border-border focus:border-[#00ff87]" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Адрес доставки</label>
                <Input value={form.address} onChange={e => onFormChange({...form, address: e.target.value})} placeholder="Улица, дом, квартира" className="bg-background border-border focus:border-[#00ff87]" />
              </div>
              <button
                onClick={onSubmit}
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
  );
}
