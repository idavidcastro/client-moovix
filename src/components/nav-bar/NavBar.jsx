// import { useState } from "react";
// import { Menu, X } from "lucide-react";

export default function NavBar() {
  //   const [open, setOpen] = useState(false);
  const links = [
    { name: "Inicio", href: "#" },
    { name: "Películas", href: "#" },
    { name: "Series", href: "#" },
    { name: "Mi lista", href: "#" },
  ];
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent ">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          moov<span className="text-cyan-700">i</span>x
        </div>

        {/* Links desktop */}
        <ul className="hidden md:flex gap-8 text-white font-medium">
          {links.map((link) => (
            <li key={link.name} className="relative group cursor-pointer">
              <a href={link.href}>{link.name}</a>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-cyan-700 transition-all group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Botón menú móvil
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button> */}
      </div>

      {/* Menú móvil
      <div
        className={`md:hidden bg-[#000101]/95 transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <ul className="flex flex-col gap-6 py-6 px-6 text-white font-medium">
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
