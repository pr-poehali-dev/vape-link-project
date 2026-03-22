import Icon from "@/components/ui/icon";

type Section = "home" | "about" | "promos" | "faq";

interface NavbarProps {
  activeSection: Section;
  setActiveSection: (s: Section) => void;
  totalItems: number;
  onCartOpen: () => void;
}

const navItems = [
  { id: "home" as Section, label: "Главная" },
  { id: "about" as Section, label: "О нас" },
  { id: "promos" as Section, label: "Акции" },
  { id: "faq" as Section, label: "FAQ" },
];

export default function Navbar({ activeSection, setActiveSection, totalItems, onCartOpen }: NavbarProps) {
  return (
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
  );
}
