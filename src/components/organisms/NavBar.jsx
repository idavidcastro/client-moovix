import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const links = [
    { name: "Inicio", href: "#" },
    { name: "Películas", href: "#" },
    { name: "Series", href: "#" },
    { name: "Mi lista", href: "/favorites" },
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
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300${
        scrolled
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
              <a href={link.href}>{link.name}</a>
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
        <ul className="flex flex-col gap-6 px-6 py-6 font-medium text-primary">
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
