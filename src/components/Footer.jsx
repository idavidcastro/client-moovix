export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center gap-6 p-6 mt-40 bg-transparent">
      <div>
        <span className="text-2xl font-bold text-white select-none no-underline cursor-default">
          moovix
        </span>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 text-gray-500 text-sm text-center">
        <a href="#" className="hover:text-secondary transition-colors">
          Ayuda
        </a>
        <span className="text-gray-700">•</span>
        <a href="#" className="hover:text-secondary transition-colors">
          Términos y Condiciones
        </a>
        <span className="text-gray-700">•</span>

        <span className="cursor-default">
          © {new Date().getFullYear()} moovix. Todos los derechos reservados.
        </span>
      </div>
    </footer>
  );
}
