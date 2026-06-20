import React from 'react'
import { Link } from "react-router-dom"
import styles from "../../../styles/styles"

const STATS = [
  { value: "50K+", label: "Products" },
  { value: "12K+", label: "Sellers" },
  { value: "4.9★", label: "Rating" },
]

const Hero = () => {
  return (
    <section className="w-full bg-[#1A1A2E] overflow-hidden">
      <div className={`${styles.section} flex flex-col 800px:flex-row min-h-[540px] 800px:min-h-[540px]`}>

        {/* ── Left: editorial copy ── */}
        <div className="flex flex-col justify-center py-14 800px:py-0 800px:w-[50%] 800px:pr-12 z-10">
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 text-amber-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-5">
            <span className="w-8 h-px bg-amber-400 inline-block" />
            New Season Arrivals
          </span>

          {/* Headline — Playfair Display for character */}
          <h1
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-[40px] 800px:text-[56px] font-extrabold text-white leading-[1.05] tracking-tight"
          >
            Find things<br />
            <em className="not-italic text-amber-400">you'll love</em><br />
            at Vendoz.
          </h1>

          <p className="mt-5 text-[15px] text-white/60 leading-relaxed max-w-[380px]">
            Curated products from thousands of independent sellers —
            premium quality, fast shipping, and deals that make sense.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/products">
              <button className="btn-amber px-7 py-3 rounded-full text-[#1A1A2E] font-bold text-[14px] tracking-wide">
                Shop Now
              </button>
            </Link>
            <Link to="/best-selling">
              <button className="btn-ghost px-7 py-3 rounded-full font-semibold text-[14px] tracking-wide">
                Bestsellers →
              </button>
            </Link>
          </div>

          {/* Stats strip */}
          <div className="mt-10 flex items-center gap-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <p
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-[22px] font-bold text-white leading-none"
                >
                  {s.value}
                </p>
                <p className="text-[11px] text-white/40 uppercase tracking-widest mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: image mosaic ── */}
        <div className="hidden 800px:flex 800px:w-[50%] relative items-center justify-center py-10">
          {/* Amber glow blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full bg-amber-500/10 blur-[80px] pointer-events-none" />

          {/* Main image */}
          <Link to="/products?category=Accesories" className="relative z-10 block w-[380px] h-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-300">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
              alt="Featured product"
              className="w-full h-full object-cover scale-105"
            />
            {/* Floating badge */}
            <div className="absolute bottom-5 left-5 right-5 bg-white/10 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/10">
              <p className="text-white/50 text-[11px] uppercase tracking-widest font-semibold">Featured Drop</p>
              <p className="text-white font-bold text-[16px] mt-0.5">Premium Watches</p>
              <p className="text-amber-400 text-[13px] font-semibold mt-0.5">From $89 · Free shipping</p>
            </div>
          </Link>

          {/* Floating mini card top-right */}
          <Link to="/products?category=Others" className="absolute top-14 right-0 bg-white rounded-2xl shadow-xl px-4 py-3 border border-[#EDE8E0] text-[#1A1A2E] z-20 w-[140px] block hover:scale-105 active:scale-95 transition-all duration-200">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Trending</p>
            <p className="text-[13px] font-bold mt-0.5 leading-tight">Home Decor</p>
            <p className="text-amber-500 text-[12px] font-semibold mt-1">↑ 38% this week</p>
          </Link>

          {/* Floating mini card bottom-right */}
          <Link to="/events" className="absolute bottom-14 right-0 bg-[#1A1A2E] rounded-2xl shadow-xl px-4 py-3 border border-white/10 z-20 w-[150px] block hover:scale-105 active:scale-95 transition-all duration-200">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wide">Live deals</p>
            </div>
            <p className="text-white text-[13px] font-bold leading-tight">Today only: up to 60% off</p>
          </Link>
        </div>

      </div>

      {/* ── Mobile hero image ── */}
      <Link to="/products?category=Accesories" className="800px:hidden block relative h-[260px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
          alt="Hero"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] to-transparent" />
      </Link>
    </section>
  )
}

export default Hero
