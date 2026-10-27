"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      scrolled ? "bg-white/90 backdrop-blur-md shadow-soft border-b border-rose-100" : "bg-transparent"
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="XANDZ Beauty home">
            <Image src="/images/xandz-beauty-logo.png" alt="XANDZ Beauty" width={116} height={80} priority className="h-[68px] w-[100px] sm:h-[76px] sm:w-[110px] object-contain drop-shadow-[0_2px_3px_rgba(190,24,93,0.85)]" style={{ filter: "drop-shadow(0 1px 2px rgba(190, 24, 93, 0.55)) drop-shadow(0 2px 3px rgba(0, 0, 0, 0.35))" }} />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link key={l.href} href={l.href} className={`nav-link ${pathname === l.href ? "text-mink-600 after:w-full" : ""}`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full hover:bg-blush-100 transition-colors group"
              aria-label="Open cart"
            >
              <svg className="w-5 h-5 text-mink-600 group-hover:text-mink-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blush-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center animate-wiggle">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            {/* Checkout CTA */}
            {totalItems > 0 && (
              <Link href="/checkout" className="hidden sm:flex btn-primary px-4 py-2 rounded-full text-xs items-center gap-1.5">
                <span>Checkout</span>
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-blush-100 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1.5">
                <span className={`block h-px bg-mink-600 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}/>
                <span className={`block h-px bg-mink-600 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}/>
                <span className={`block h-px bg-mink-600 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}/>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-48 pb-4" : "max-h-0"}`}>
          <div className="border-t border-rose-100 pt-4 flex flex-col gap-1">
            {links.map(l => (
              <Link key={l.href} href={l.href}
                className={`px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  pathname === l.href ? "bg-blush-100 text-mink-600" : "text-mink-500 hover:bg-blush-50"
                }`}
              >
                {l.label}
              </Link>
            ))}
            {totalItems > 0 && (
              <Link href="/checkout" className="btn-primary px-4 py-2.5 rounded-full text-xs text-center mt-2">
                Checkout ({totalItems} items)
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
