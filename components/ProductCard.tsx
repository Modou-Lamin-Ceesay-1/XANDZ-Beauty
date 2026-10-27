"use client";
import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  badge: string | null;
  shortDesc: string;
  description: string;
  featured: boolean;
}

const BADGE_COLORS: Record<string, string> = {
  "Best Seller": "bg-amber-100 text-amber-700",
  "New": "bg-emerald-100 text-emerald-700",
  "Sale": "bg-red-100 text-red-600",
  "Trending": "bg-purple-100 text-purple-700",
  "Luxury": "bg-mink-100 text-mink-600",
  "Fan Fave": "bg-blush-100 text-blush-600",
  "Premium": "bg-yellow-100 text-yellow-700",
  "Eco-Certified": "bg-green-100 text-green-700",
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const handleAdd = async () => {
    setAdding(true);
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image });
    await new Promise(r => setTimeout(r, 600));
    setAdding(false);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < Math.floor(product.rating) ? "text-amber-400" : "text-gray-200"}>★</span>
  ));

  return (
    <>
      <div className="product-card w-full min-w-0 bg-white rounded-3xl overflow-hidden shadow-card group">
        {/* Image */}
        <div className="relative h-56 sm:h-64 overflow-hidden bg-blush-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="card-image object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Badges row */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badge && (
              <span className={`badge px-2.5 py-1 rounded-full ${BADGE_COLORS[product.badge] || "bg-blush-100 text-blush-600"}`}>
                {product.badge}
              </span>
            )}
            {discount && (
              <span className="badge px-2.5 py-1 rounded-full bg-red-100 text-red-600">
                -{discount}%
              </span>
            )}
          </div>
          {/* Quick view on hover */}
          <button
            onClick={() => setShowDetail(true)}
            className="absolute inset-x-3 bottom-3 bg-white/90 backdrop-blur-sm text-mink-700 text-xs py-2 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hover:bg-white"
          >
            Quick View
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-[10px] text-mink-400 uppercase tracking-widest mb-1 font-medium">{product.category}</p>
          <h3 className="font-serif text-lg font-medium text-mink-700 leading-tight mb-1">{product.name}</h3>
          <p className="text-xs text-mink-400 leading-relaxed mb-3 line-clamp-2">{product.shortDesc}</p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex text-sm">{stars}</div>
            <span className="text-xs text-mink-400">({product.reviews})</span>
          </div>

          {/* Price + Add to cart */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl font-medium text-mink-700">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-mink-300 line-through">${product.originalPrice}</span>
              )}
            </div>
            <button
              onClick={handleAdd}
              disabled={adding}
              className={`btn-primary px-4 py-2 rounded-full text-xs transition-all ${adding ? "opacity-80 scale-95" : ""}`}
            >
              {adding ? (
                <span className="flex items-center gap-1.5">
                  <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25"/>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75"/>
                  </svg>
                  Added!
                </span>
              ) : "Add to Bag"}
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showDetail && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          style={{ backdropFilter: "blur(8px)", background: "rgba(61,43,31,0.4)" }}
          onClick={() => setShowDetail(false)}
        >
          <div
            className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto animate-fade-up"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-72 overflow-hidden rounded-t-3xl bg-blush-50">
              <Image src={product.image} alt={product.name} fill className="object-cover" sizes="512px"/>
              <button
                onClick={() => setShowDetail(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-mink-600 hover:bg-white transition-colors"
              >×</button>
            </div>
            <div className="p-6">
              <p className="text-[10px] text-mink-400 uppercase tracking-widest mb-1">{product.category}</p>
              <h3 className="font-serif text-2xl font-medium text-mink-700 mb-2">{product.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex text-sm">{stars}</div>
                <span className="text-xs text-mink-400">{product.rating} ({product.reviews} reviews)</span>
              </div>
              <p className="text-sm text-mink-500 leading-relaxed mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-2xl font-medium text-mink-700">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-mink-300 line-through">${product.originalPrice}</span>
                  )}
                </div>
                <button
                  onClick={() => { handleAdd(); setShowDetail(false); }}
                  disabled={adding}
                  className="btn-primary px-6 py-3 rounded-full text-sm"
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
