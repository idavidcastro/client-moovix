import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const links = [
    { name: "Inicio", href: "/" },
    { name: "Populares", href: "/allmovies?category=popular" },
    { name: "Recomendadas", href: "/allmovies?category=top-rated" },
    { name: "Próximamente", href: "/allmovies?category=upcoming" },
    { name: "Mi Lista", href: "/favorites" },
  ];
  const [scrolled, setScrolled] = useState(false);

  const handleLinkClick = (e, href) => {
    if (href.startsWith("/")) return;

    e.preventDefault();
    setOpen(false);

    const target = document.querySelector(href);
    if (target) {
      const navHeight = 80;
      const targetPosition = target.offsetTop - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-transparent backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="px-[5%] py-2 lg:py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-white cursor-pointer">
            m<span className="text-secondary">oo</span>vix
          </a>
          <ul className="hidden gap-8 font-medium lg:flex text-primary">
            {links.map((link) => (
              <li key={link.name} className="relative cursor-pointer group">
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <button
            className={`lg:hidden  flex rounded-md px-2 py-2 gap-1 font-bold text-base lg:text-lg items-center ${
              open ? "bg-primary text-bg-secondary" : "text-primary "
            }`}
            onClick={() => setOpen(!open)}
          >
            Menú
            {open ? (
              <ChevronUp size={18} strokeWidth={3} />
            ) : (
              <ChevronDown size={18} strokeWidth={3} />
            )}
          </button>
        </div>

        {open && (
          <div className="relative lg:hidden">
            <div className="absolute right-[5%] top-2 p-2 bg-bg/80 text-primary rounded-xl py-3 w-auto z-90 backdrop-blur-md shadow-lg transition-colors duration-300 ">
              <ul className="flex flex-col text-base md:text-lg font-bold">
                {links.map((link, index) => (
                  <li key={link.name} className="py-1">
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`block px-5 py-2 hover:bg-primary hover:text-bg-secondary rounded-lg transition-colors ${
                        index === links.length - 1
                          ? "bg-secondary text-primary"
                          : ""
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </nav>

      {/* Overlay con blur para toda la página */}
      {open && (
        <div
          className="fixed inset-0 bg-transparent backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
