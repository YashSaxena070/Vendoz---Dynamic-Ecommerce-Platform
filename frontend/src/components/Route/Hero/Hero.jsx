import React, { useEffect, useRef } from 'react'
import { Link } from "react-router-dom"
import styles from "../../../styles/styles"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: "50K+", num: 50, suffix: "K+", label: "Products" },
  { value: "12K+", num: 12, suffix: "K+", label: "Sellers" },
  { value: "4.9★", num: 4.9, suffix: "★", label: "Rating", decimals: 1 },
]

const Hero = () => {
  const sectionRef = useRef(null)
  const eyebrowRef = useRef(null)
  const headlineRef = useRef(null)
  const descRef = useRef(null)
  const ctaRef = useRef(null)
  const statsRef = useRef(null)
  const imageRef = useRef(null)
  const mobileHeroRef = useRef(null)
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Main entrance timeline ──
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from(eyebrowRef.current, {
        y: 30, opacity: 0, duration: 0.7,
      })
      .from(headlineRef.current.children, {
        y: 50, opacity: 0, duration: 0.8, stagger: 0.12,
      }, "-=0.4")
      .from(descRef.current, {
        y: 30, opacity: 0, duration: 0.7,
      }, "-=0.4")
      .from(ctaRef.current.children, {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.1,
      }, "-=0.3")

      // ── Stats counter animation ──
      const statEls = statsRef.current?.querySelectorAll(".stat-num")
      if (statEls && statEls.length > 0) {
        tl.from(statsRef.current.children, {
          y: 20, opacity: 0, duration: 0.5, stagger: 0.1,
        }, "-=0.2")

        statEls.forEach((el, i) => {
          const target = STATS[i]
          const obj = { val: 0 }
          gsap.to(obj, {
            val: target.num,
            duration: 1.8,
            delay: 0.8 + i * 0.15,
            ease: "power2.out",
            snap: { val: target.decimals ? 0.1 : 1 },
            onUpdate: () => {
              el.textContent = target.decimals
                ? obj.val.toFixed(target.decimals) + target.suffix
                : Math.floor(obj.val) + target.suffix
            },
          })
        })
      }

      // ── Desktop image + floating cards ──
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          scale: 1.08, opacity: 0, duration: 1.2,
          ease: "power2.out", delay: 0.3,
        })
      }

      // Floating parallax on mini cards
      if (card1Ref.current) {
        gsap.from(card1Ref.current, {
          x: 60, opacity: 0, duration: 0.8, delay: 1,
          ease: "back.out(1.7)",
        })
        gsap.to(card1Ref.current, {
          y: -12,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1.8,
        })
      }

      if (card2Ref.current) {
        gsap.from(card2Ref.current, {
          x: 60, opacity: 0, duration: 0.8, delay: 1.2,
          ease: "back.out(1.7)",
        })
        gsap.to(card2Ref.current, {
          y: 10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2,
        })
      }

      // ── Mobile hero ──
      if (mobileHeroRef.current) {
        gsap.from(mobileHeroRef.current, {
          scale: 1.15, opacity: 0, duration: 1.4,
          ease: "power2.out", delay: 0.5,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="w-full bg-[#1A1A2E] overflow-hidden">
      <div className={`${styles.section} flex flex-col 800px:flex-row min-h-[540px] 800px:min-h-[540px]`}>

        {/* ── Left: editorial copy ── */}
        <div className="flex flex-col justify-center py-14 800px:py-0 800px:w-[50%] 800px:pr-12 z-10">
          {/* Eyebrow */}
          <span ref={eyebrowRef} className="inline-flex items-center gap-2 text-amber-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-5">
            <span className="w-8 h-px bg-amber-400 inline-block" />
            New Season Arrivals
          </span>

          {/* Headline — Playfair Display for character */}
          <div ref={headlineRef}>
            <h1
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-[40px] 800px:text-[56px] font-extrabold text-white leading-[1.05] tracking-tight"
            >
              <span className="block">Find things</span>
              <span className="block"><em className="not-italic text-amber-400">you'll love</em></span>
              <span className="block">at Vendoz.</span>
            </h1>
          </div>

          <p ref={descRef} className="mt-5 text-[15px] text-white/60 leading-relaxed max-w-[380px]">
            Curated products from thousands of independent sellers —
            premium quality, fast shipping, and deals that make sense.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="mt-8 flex flex-wrap items-center gap-3">
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
          <div ref={statsRef} className="mt-10 flex items-center gap-8">
            {STATS.map((s) => (
              <div key={s.label}>
                <p
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-[22px] font-bold text-white leading-none"
                >
                  <span className="stat-num">0</span>
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
          <Link ref={imageRef} to="/products?category=Accesories" className="relative z-10 block w-[380px] h-[420px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-300">
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
          <Link ref={card1Ref} to="/products?category=Others" className="absolute top-14 right-0 bg-white rounded-2xl shadow-xl px-4 py-3 border border-[#EDE8E0] text-[#1A1A2E] z-20 w-[140px] block hover:scale-105 active:scale-95 transition-all duration-200">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Trending</p>
            <p className="text-[13px] font-bold mt-0.5 leading-tight">Home Decor</p>
            <p className="text-amber-500 text-[12px] font-semibold mt-1">↑ 38% this week</p>
          </Link>

          {/* Floating mini card bottom-right */}
          <Link ref={card2Ref} to="/events" className="absolute bottom-14 right-0 bg-[#1A1A2E] rounded-2xl shadow-xl px-4 py-3 border border-white/10 z-20 w-[150px] block hover:scale-105 active:scale-95 transition-all duration-200">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-wide">Live deals</p>
            </div>
            <p className="text-white text-[13px] font-bold leading-tight">Today only: up to 60% off</p>
          </Link>
        </div>

      </div>

      {/* ── Mobile hero image ── */}
      <Link ref={mobileHeroRef} to="/products?category=Accesories" className="800px:hidden block relative h-[260px] overflow-hidden">
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
