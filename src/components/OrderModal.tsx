import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CartItem = { id: number; name: string; price: number; qty: number };

interface OrderModalProps {
  cart: CartItem[];
  totalPrice: number;
  orderDone: boolean;
  form: { name: string; phone: string; address: string };
  onFormChange: (form: { name: string; phone: string; address: string }) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default function OrderModal({
  cart,
  totalPrice,
  orderDone,
  form,
  onFormChange,
  onSubmit,
  onClose,
}: OrderModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => !orderDone && onClose()} />
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
              onClick={onClose}
            >
              ОТЛИЧНО!
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-oswald text-2xl font-bold tracking-wide">ОФОРМЛЕНИЕ</h3>
              <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Ваше имя</label>
                <Input
                  placeholder="Иван Иванов"
                  value={form.name}
                  onChange={e => onFormChange({ ...form, name: e.target.value })}
                  className="bg-background border-border focus:border-[#00ff87] transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Телефон</label>
                <Input
                  placeholder="+7 (999) 000-00-00"
                  value={form.phone}
                  onChange={e => onFormChange({ ...form, phone: e.target.value })}
                  className="bg-background border-border focus:border-[#00ff87] transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Адрес доставки</label>
                <Input
                  placeholder="Улица, дом, квартира"
                  value={form.address}
                  onChange={e => onFormChange({ ...form, address: e.target.value })}
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
              onClick={onSubmit}
              disabled={!form.name || !form.phone || !form.address}
            >
              ПОДТВЕРДИТЬ ЗАКАЗ
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
