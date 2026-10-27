"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import { BRAND_NAME, BRAND_TAGLINE } from "@/data/config";

const CATEGORIES = [
  { name: "Lip Gloss", desc: "Gloss in your shade", color: "bg-rose-50", img: "/images/products/lip-gloss-pink.jpeg", slug: "lip-gloss" },
  { name: "Lip Care", desc: "Care for your lips", color: "bg-pink-50", img: "/images/products/pink-lips-set.jpeg", slug: "lip-care" },
  { name: "Lip Liners", desc: "Find your shade", color: "bg-amber-50", img: "/images/products/lip-liner-shades.jpeg", slug: "lip-liner" },
  { name: "Lip Sets", desc: "Made to go together", color: "bg-purple-50", img: "/images/products/lip-gloss-duo.jpeg", slug: "lip-sets" },
];

const TESTIMONIALS = [
  { name: "Sophia M.", text: "The Velvet Rose Serum transformed my skin in just two weeks. I've never felt more radiant!", rating: 5, location: "New York" },
  { name: "Isabelle K.", text: "XANDZ Beauty has become my holy grail brand. Luxurious quality without compromise.", rating: 5, location: "Paris" },
  { name: "Amara L.", text: "The Bloom perfume is absolutely divine. I receive compliments everywhere I go.", rating: 5, location: "London" },
  { name: "Priya S.", text: "Best skincare I've ever tried. My skin is dewy, plump, and glowing all day.", rating: 5, location: "Mumbai" },
];

const featured = products.filter(p => p.featured);

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <>

      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1600&q=90"
            alt="Luxury beauty"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ivory-100/95 via-ivory-100/70 to-transparent"/>
          <div className="absolute inset-0 bg-gradient-to-t from-ivory-50/80 via-transparent to-transparent"/>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blush-200/20 blur-3xl animate-float pointer-events-none"/>
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-champagne/30 blur-2xl animate-float pointer-events-none" style={{animationDelay:"2s"}}/>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="max-w-xl">
            <p className="text-xs tracking-[0.35em] uppercase text-mink-400 font-medium mb-4 animate-fade-up">
              Meet XANDZ Beauty
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-mink-800 leading-[1.1] mb-6 animate-fade-up" style={{animationDelay:"0.1s"}}>
              XANDZ<br/>
              <em className="text-mink-500">Beauty.</em><br/>
              Made for<br/>Your Lips.
            </h1>
            <p className="text-mink-500 text-base leading-relaxed mb-8 max-w-sm animate-fade-up" style={{animationDelay:"0.2s"}}>
              Find your favorite lip gloss, liner, and care essentials from XANDZ Beauty. Made to bring your look together, your way.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-up" style={{animationDelay:"0.3s"}}>
              <Link href="/shop" className="btn-primary px-8 py-4 rounded-full text-sm">
                Shop the Collection
              </Link>
              <Link href="/shop?category=lip-gloss" className="btn-outline px-8 py-4 rounded-full text-sm">
                Shop Lip Gloss
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-5 mt-10 animate-fade-up" style={{animationDelay:"0.4s"}}>
              <div className="flex -space-x-2">
                {["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50","https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=50","https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=50"].map((s, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden relative">
                    <Image src={s} alt="" fill className="object-cover" sizes="32px"/>
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-amber-400 text-sm">{"\u2605".repeat(5)}</div>
                <p className="text-xs text-mink-500">Loved by 5,000+ beauties</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-mink-600 py-3 overflow-hidden whitespace-nowrap">
        <div className="inline-flex animate-[marquee_20s_linear_infinite]">
          {Array(4).fill(null).map((_, i) => (
            <span key={i} className="text-champagne text-xs tracking-[0.25em] uppercase font-light mx-8">
              XANDZ BEAUTY &nbsp;&nbsp; | &nbsp;&nbsp; Lip Gloss &nbsp;&nbsp; | &nbsp;&nbsp; Lip Liners &nbsp;&nbsp; | &nbsp;&nbsp; Lip Care Sets &nbsp;&nbsp; | &nbsp;&nbsp; Find Your Signature Lip Look
            </span>
          ))}
        </div>
      </div>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.35em] uppercase text-mink-400 font-medium mb-3">Curated for You</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-mink-700">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link key={cat.name} href={`/shop?category=${cat.slug}`} className="category-card block w-full min-w-0">
              <div className="bg-white rounded-3xl overflow-hidden shadow-card">
                <div className="relative h-36 sm:h-48 overflow-hidden">
                  <Image src={cat.img} alt={cat.name} fill unoptimized loading="eager" className="card-image object-cover" sizes="(max-width:640px) 50vw, 25vw"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"/>
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="font-serif text-lg font-medium leading-tight">{cat.name}</p>
                    <p className="text-xs text-white/70">{cat.desc}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <div>
            <p className="text-[10px] tracking-[0.35em] uppercase text-mink-400 font-medium mb-2">Handpicked for You</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-mink-700">Featured Beauties</h2>
          </div>
          <Link href="/shop" className="btn-outline px-6 py-2.5 rounded-full text-sm flex-shrink-0">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-mink-700 min-h-[280px] flex items-center">
          <div className="absolute inset-0">
            <Image
              src="/images/arrival-banner.png"
              alt="Beauty portrait with a red rose"
              fill
              className="hidden object-fill opacity-100 md:block"
              sizes="100vw"
            />
            <Image
              src="/images/arrival-banner-mobile.png"
              alt=""
              fill
              className="object-cover object-center opacity-100 md:hidden"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-mink-900/85 via-mink-900/55 to-mink-900/10" />
          </div>
          <div className="relative z-10 px-8 sm:px-12 py-10 max-w-lg">
            <p className="text-champagne/70 text-xs tracking-[0.3em] uppercase mb-3">Limited Time</p>
            <h3 className="font-serif text-3xl sm:text-4xl font-light text-champagne mb-3">
              XANDZ Beauty<br/>Lip Collection
            </h3>
            <p className="text-mink-300 text-sm leading-relaxed mb-6">
              Discover gloss shades, lip liners, and lip care favorites from XANDZ Beauty.
            </p>
            <Link href="/shop" className="inline-block bg-champagne text-mink-700 px-7 py-3 rounded-full text-sm font-semibold hover:bg-white transition-colors">
              Explore Now
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-blush-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[10px] tracking-[0.35em] uppercase text-mink-400 font-medium mb-3">Real Reviews</p>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-mink-700">Words from Our Community</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card rounded-3xl p-6 shadow-card">
                <div className="flex text-amber-400 text-base mb-3">{"\u2605".repeat(t.rating)}</div>
                <p className="font-serif text-base font-light text-mink-600 leading-relaxed mb-4 italic">"{t.text}"</p>
                <div>
                  <p className="font-semibold text-mink-700 text-sm">{t.name}</p>
                  <p className="text-mink-400 text-xs">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </>
  );
}
