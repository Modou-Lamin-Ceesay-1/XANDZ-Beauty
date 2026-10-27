"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard";

const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "lip-gloss", label: "Lip Gloss" },
  { id: "lip-care", label: "Lip Care" },
  { id: "lip-liner", label: "Lip Liners" },
  { id: "lip-sets", label: "Lip Sets" },
];

const SORTS = [
  { id: "default", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Top Rated" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setCategory(cat);
  }, [searchParams]);

  let filtered = products.filter(p => {
    const matchesCat = category === "all" || p.category === category;
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.shortDesc.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (sort === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <>
      {/* Header */}
      <div className="pt-20 pb-10 bg-blush-50/80 border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <p className="text-[10px] tracking-[0.35em] uppercase text-mink-400 font-medium mb-2">Our Collection</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <h1 className="font-serif text-5xl sm:text-6xl font-light text-mink-700">
              {category === "all" ? "All Products" : CATEGORIES.find(c => c.id === category)?.label}
            </h1>
            <p className="text-mink-400 text-sm">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative max-w-xs w-full">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-mink-400 text-sm">🔍</span>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="form-field w-full pl-10 pr-4 py-2.5 rounded-full text-sm"
            />
          </div>
          {/* Sort */}
          <select
            value={sort} onChange={e => setSort(e.target.value)}
            className="form-field px-4 py-2.5 rounded-full text-sm cursor-pointer"
          >
            {SORTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-medium transition-all ${
                category === c.id
                  ? "bg-mink-600 text-white shadow-soft"
                  : "bg-white text-mink-500 border border-mink-200 hover:border-mink-400"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🌸</div>
            <h3 className="font-serif text-2xl text-mink-600 font-light mb-2">Nothing found</h3>
            <p className="text-mink-400 text-sm mb-6">Try a different category or search term.</p>
            <button onClick={() => { setCategory("all"); setSearch(""); }}
              className="btn-outline px-6 py-2.5 rounded-full text-sm">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-40 text-center text-mink-400">Loading...</div>}>
      <ShopContent />
    </Suspense>
  );
}
