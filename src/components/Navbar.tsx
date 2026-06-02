import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, MessageCircle, PhoneCall, X } from "lucide-react";
import { cn } from "@/lib/utils";
import RevealText from "@/components/RevealText";
import hyperawareLogo from "@/assets/hyperaware-logo.png";
import { contact } from "@/content/hyperaware";

const LEFT_ITEMS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
];

const RIGHT_ITEMS = [
  { label: "Work", to: "/work" },
  { label: "Clients", to: "/clients" },
  { label: "Contact Us", to: "/contact" },
];

const MOBILE_ITEMS = [...LEFT_ITEMS, ...RIGHT_ITEMS];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    cn("mars-nav-link", isActive && "mars-nav-link--active");

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 mars-nav", scrolled && "mars-nav--scrolled")}>
      <div className="mx-auto w-full max-w-[68rem] px-4 md:px-6">
        <nav
          aria-label="Primary"
          className={cn(
            "mars-nav-shell mt-4 flex items-center justify-between md:justify-center rounded-full border relative w-full md:w-fit md:mx-auto",
            scrolled ? "px-4 py-2.5 md:px-14 md:py-3" : "px-4 py-3 md:px-14 md:py-4",
          )}
        >
          {/* Mobile Left WhatsApp Icon */}
          <a
            href={contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book consultation on WhatsApp"
            className="mars-mobile-action inline-flex h-9 w-9 items-center justify-center rounded-full transition md:hidden text-[hsl(266_70%_18%)] bg-purple-50/40 border border-purple-100/10 active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
          </a>

          <div className="hidden items-center gap-5 md:flex lg:gap-6">
            <ul className="flex items-center gap-5 lg:gap-6">
              {LEFT_ITEMS.map((item) => (
                <li key={item.label}>
                  <NavLink to={item.to} className={navClass}>
                    <RevealText as="span" mode="text">{item.label}</RevealText>
                  </NavLink>
                </li>
              ))}
            </ul>

            <Link
              to="/"
              className="mars-logo-mark mx-1 flex shrink-0 items-center justify-center"
              aria-label="Hyperaware home"
            >
              <img
                src={hyperawareLogo}
                alt="Hyperaware"
                className="h-12 w-24 object-contain lg:h-16 lg:w-32"
                draggable={false}
              />
            </Link>

            <ul className="flex items-center gap-5 lg:gap-6">
              {RIGHT_ITEMS.map((item) => (
                <li key={item.label}>
                  <NavLink to={item.to} className={navClass}>
                    <RevealText as="span" mode="text">{item.label}</RevealText>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Centered Logo on Mobile */}
          <Link
            to="/"
            className="mars-logo-mark flex shrink-0 items-center justify-center md:hidden mx-auto"
            aria-label="Hyperaware home"
          >
            <img src={hyperawareLogo} alt="Hyperaware" className="h-8 w-18 object-contain" draggable={false} />
          </Link>

          {/* Mobile Right Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full transition md:hidden text-[hsl(266_70%_18%)] bg-purple-50/40 border border-purple-100/10 active:scale-95"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>

        {/* Upgraded Mobile Menu */}
        <div
          className={cn(
            "mars-nav-shell mars-mobile-menu mt-2 overflow-hidden rounded-3xl border md:hidden bg-white/95 backdrop-blur-lg shadow-xl border-purple-100/20",
            mobileOpen ? "max-h-[28rem] opacity-100 py-3 animate-in fade-in slide-in-from-top-2 duration-200" : "pointer-events-none max-h-0 opacity-0 py-0",
            "transition-all duration-300 ease-in-out",
          )}
        >
          <ul className="flex flex-col gap-1 px-4 py-2">
            {MOBILE_ITEMS.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 active:bg-purple-100/80 border border-transparent",
                      isActive 
                        ? "text-purple-950 bg-purple-100/80 font-extrabold border-purple-200/50" 
                        : "text-[hsl(266_35%_24%)] hover:text-purple-900 hover:bg-purple-50/30"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{item.label}</span>
                      <span className={cn("text-xs transition-opacity", isActive ? "opacity-70 text-purple-900" : "opacity-30")}>→</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
          
          <div className="mt-4 px-8 pb-3">
            <a 
              href={contact.whatsappHref} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => setMobileOpen(false)}
              className="hyper-button w-full justify-center text-xs py-2.5 shadow-xs shadow-purple-500/10"
            >
              <MessageCircle className="h-4 w-4 mr-1.5" />
              Book Consultation
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
