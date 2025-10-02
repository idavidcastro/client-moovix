import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const links = [
    { name: "Inicio", href: "#" },
    { name: "Películas", href: "#" },
    { name: "Series", href: "#" },
    { name: "Mi lista", href: "#" },
  ];
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="px-[5%] py-4 flex items-center justify-between">
        <div className="text-white text-2xl font-bold">
          moov<span className="text-secondary">i</span>x
        </div>
        <ul className="hidden md:flex gap-8 text-primary font-medium">
          {links.map((link) => (
            <li key={link.name} className="relative group cursor-pointer">
              <a href={link.href}>{link.name}</a>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-secondary transition-all group-hover:w-full"></span>
            </li>
          ))}
        </ul>
        <button
          className="md:hidden text-primary"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      <div
        className={`md:hidden bg-[#000101]/95 transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <ul className="flex flex-col gap-6 py-6 px-6 text-primary font-medium">
          {links.map((link) => (
            <li key={link.name}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
