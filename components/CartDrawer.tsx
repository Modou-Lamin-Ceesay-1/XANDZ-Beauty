"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, totalPrice, totalItems } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen && items.length === 0) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 cart-overlay transition-opacity duration-300"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] z-50 bg-ivory-50 shadow-2xl flex flex-col transition-transform duration-400 ease-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-rose-100">
          <div>
            <h2 className="font-serif text-2xl font-light text-mink-700">Your Bag</h2>
            <p className="text-xs text-mink-400 mt-0.5">{totalItems} item{totalItems !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-full bg-blush-100 flex items-center justify-center hover:bg-blush-200 transition-colors"
          >
            <svg className="w-4 h-4 text-mink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="text-5xl mb-4 animate-float">🌸</div>
              <p className="font-serif text-xl text-mink-600 font-light">Your bag is empty</p>
              <p className="text-xs text-mink-400 mt-2 mb-6">Discover our luxurious collection</p>
              <button onClick={closeCart}>
                <Link href="/shop" className="btn-primary px-6 py-2.5 rounded-full text-sm">
                  Shop Now
                </Link>
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-3 bg-white rounded-2xl p-3 shadow-card">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-blush-50">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px"/>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm font-medium text-mink-700 leading-tight truncate">{item.name}</h4>
                  <p className="text-mink-500 font-semibold text-sm mt-0.5">${item.price}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 bg-blush-50 rounded-full px-1 py-0.5">
                      <button
                        onClick={() => updateQty(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-blush-200 transition-colors text-mink-600"
                      >−</button>
                      <span className="text-xs font-semibold text-mink-700 w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-blush-200 transition-colors text-mink-600"
                      >+</button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-mink-400 hover:text-blush-500 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-rose-100 space-y-4 bg-white/60 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-mink-500">Subtotal</span>
              <span className="font-serif text-xl font-light text-mink-700">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-[11px] text-mink-400 text-center">Shipping calculated at checkout</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full py-3.5 rounded-full text-sm text-center block"
            >
              Proceed to Checkout →
            </Link>
            <button onClick={closeCart} className="w-full text-xs text-mink-400 hover:text-mink-600 transition-colors py-1">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
