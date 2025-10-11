import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const links = [
    { name: "Populares", href: "#popular" },
    { name: "Recomendadas", href: "#top-rated" },
    { name: "Próximamente", href: "#upcoming" },
    { name: "Mi Lista", href: "/favorites" },
  ];
  const [scrolled, setScrolled] = useState(false);

  const handleLinkClick = (e, href) => {
    // Si es un link a otra página, deja que navegue normalmente
    if (href.startsWith("/")) return;

    // Si es un anchor link (#), prevenir el comportamiento por defecto y hacer scroll suave
    e.preventDefault();
    setOpen(false); // Cerrar menú móvil

    const target = document.querySelector(href);
    if (target) {
      const navHeight = 80; // Altura del navbar + margen extra
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
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-background/80 backdrop-blur-md shadow-lg rounded-b-md"
          : "bg-transparent"
      }`}
    >
      <div className="px-[5%] py-4 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-white cursor-pointer">
          moov<span className="text-secondary">i</span>x
        </a>
        <ul className="hidden gap-8 font-medium md:flex text-primary">
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
          className="md:hidden text-primary"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <MdMenu size={24} />}
        </button>
      </div>
      <div
        className={`md:hidden transition-all duration-300 items-center flex justify-center ${
          open
            ? "bg-background/80 backdrop-blur-md shadow-lg rounded-b-md opacity-100"
            : "max-h-0 opacity-0"
        } overflow-hidden h-screen`}
      >
        <ul className="flex flex-col gap-6 font-medium text-primary text-center">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
