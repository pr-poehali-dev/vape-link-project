import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

type CartItem = { id: number; name: string; price: number; qty: number };

interface CartDrawerProps {
  cart: CartItem[];
  totalPrice: number;
  onClose: () => void;
  onRemove: (id: number) => void;
  onChangeQty: (id: number, delta: number) => void;
  onCheckout: () => void;
  onGoToCatalog: () => void;
}

export default function CartDrawer({
  cart,
  totalPrice,
  onClose,
  onRemove,
  onChangeQty,
  onCheckout,
  onGoToCatalog,
}: CartDrawerProps) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-md bg-card border-l border-border flex flex-col h-full animate-slide-in-right">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-oswald text-2xl font-bold tracking-wide">КОРЗИНА</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
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
                onClick={onGoToCatalog}
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
                      onClick={() => onChangeQty(item.id, -1)}
                      className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-[#00ff87] transition-colors"
                    >
                      <Icon name="Minus" size={14} />
                    </button>
                    <span className="w-6 text-center font-semibold">{item.qty}</span>
                    <button
                      onClick={() => onChangeQty(item.id, 1)}
                      className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:border-[#00ff87] transition-colors"
                    >
                      <Icon name="Plus" size={14} />
                    </button>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
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
              onClick={onCheckout}
            >
              ОФОРМИТЬ ЗАКАЗ
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
