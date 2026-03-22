import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";

interface ProductsNavbarProps {
  search: string;
  setSearch: (v: string) => void;
  totalItems: number;
  onCartOpen: () => void;
  onBack?: () => void;
}

export default function ProductsNavbar({ search, setSearch, totalItems, onCartOpen, onBack }: ProductsNavbarProps) {
  return (
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
          onClick={onCartOpen}
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
  );
}
