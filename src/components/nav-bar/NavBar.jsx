// import { useState } from "react";
// import { Menu, X } from "lucide-react";
import React from "react";
import SplitText from "../ui/SplitText";

export default function NavBar() {
  //   const [open, setOpen] = useState(false);
  const links = [
    { name: "Inicio", href: "#" },
    { name: "Películas", href: "#" },
    { name: "Series", href: "#" },
    { name: "Mi lista", href: "#" },
  ];
  const [splitKey, setSplitKey] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSplitKey((k) => k + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent ">
      <div className="px-20 py-4 flex items-center justify-between">
        <div className="inline-block">
          <SplitText
            key={splitKey}
            text={"moovix"}
            className="text-2xl font-bold cursor-pointer"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            tag="div"
            charStyles={(char) =>
              char === "i"
                ? {
                    color: "#06b6d4",
                    transition: "color 0.2s",
                  }
                : { color: "#fff" }
            }
          />
        </div>
        <ul className="hidden md:flex gap-8 text-primary font-medium">
          {links.map((link) => (
            <li key={link.name} className="relative group cursor-pointer">
              <a href={link.href}>{link.name}</a>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-cyan-700 transition-all group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Botón menú móvil
        <button className="md:hidden text-primary" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button> */}
      </div>

      {/* Menú móvil
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
      </div> */}
    </nav>
  );
}
