import React, { useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom"
import { brandingData, categoriesData } from "../../../static/data"
import styles from '../../../styles/styles'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Categories = () => {
  const navigate = useNavigate()
  const sectionRef = useRef(null)
  const trustRef = useRef(null)
  const headingRef = useRef(null)
  const pillsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Trust bar cards stagger ──
      if (trustRef.current) {
        gsap.from(trustRef.current.children, {
          y: 30, opacity: 0, duration: 0.6, stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trustRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })
      }

      // ── Section heading slide-in ──
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          x: -40, opacity: 0, duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        })
      }

      // ── Category pills pop-in ──
      if (pillsRef.current) {
        gsap.from(pillsRef.current.children, {
          scale: 0.8, opacity: 0, duration: 0.5, stagger: 0.06,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: pillsRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="bg-[#F9F7F4] pt-14 pb-4">

      {/* ── Trust bar ── */}
      <div className={`${styles.section} hidden sm:block mb-12`}>
        <div ref={trustRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brandingData && brandingData.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white border border-[#EDE8E0] rounded-2xl px-5 py-4 shadow-sm"
            >
              <div className="text-amber-500 shrink-0">{item.icon}</div>
              <div>
                <p className="text-[13px] font-bold text-[#1A1A2E] leading-tight">{item.title}</p>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.Description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section header ── */}
      <div className={`${styles.section} mb-7`}>
        <h2 ref={headingRef} className="section-heading text-[22px] font-extrabold text-[#1A1A2E] tracking-tight">
          Browse Categories
        </h2>
      </div>

      {/* ── Category pills ── */}
      <div className={`${styles.section} mb-14`} id="categories">
        <div ref={pillsRef} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {categoriesData && categoriesData.map((cat) => (
            <button
              key={cat.id}
              className="cat-pill flex flex-col items-center gap-2 bg-white border border-[#EDE8E0] rounded-2xl py-5 px-3 shadow-sm cursor-pointer group text-center"
              onClick={() => navigate(`/products?category=${cat.title}`)}
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-amber-50 flex items-center justify-center border border-amber-100/60">
                <img
                  src={cat.image_Url}
                  alt={cat.title}
                  className="w-11 h-11 object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <span className="text-[12px] font-semibold text-[#1A1A2E] leading-tight">{cat.title}</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Categories
