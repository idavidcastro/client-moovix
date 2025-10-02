import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

function Footer() {
  return (
    <footer className=" text-gray-400 py-8">
      <div className="border-t border-bg  pt-2 text-center text-xs text-gray-500">
        <div className="text-white text-2xl font-bold cursor-pointer">
          m<span className="text-secondary">.</span>
        </div>
        <div> © {new Date().getFullYear()} moovix. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
