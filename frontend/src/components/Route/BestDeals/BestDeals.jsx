import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styles from "../../../styles/styles"
import ProductCard from "../ProductCard/ProductCard"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const BestDeals = () => {
  const [data, setData] = useState([])
  const { allProducts } = useSelector((state) => state.products)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const sorted = allProducts
      ? [...allProducts].sort((a, b) => b.sold_out - a.sold_out).slice(0, 5)
      : []
    setData(sorted)
  }, [allProducts])

  useEffect(() => {
    if (!data || data.length === 0) return

    const ctx = gsap.context(() => {
      // ── Section header reveal ──
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          y: 30, opacity: 0, duration: 0.6, stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        })
      }

      // ── Product cards batch stagger ──
      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          y: 50, opacity: 0, duration: 0.6, stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [data])

  if (!data || data.length === 0) return null

  return (
    <section ref={sectionRef} className="bg-[#F9F7F4] py-14">
      <div className={`${styles.section}`}>
        {/* Header */}
        <div ref={headerRef} className="flex items-end justify-between mb-8">
          <div>
            <p className="text-amber-500 text-[11px] font-bold uppercase tracking-[0.2em] mb-1.5">
              Top picks
            </p>
            <h2 className="section-heading text-[24px] font-extrabold text-[#1A1A2E] tracking-tight">
              Best Deals
            </h2>
          </div>
          <Link
            to="/best-selling"
            className="text-[13px] font-semibold text-amber-600 hover:text-amber-700 transition-colors hidden sm:block"
          >
            View all →
          </Link>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data.map((item, index) => (
            <ProductCard data={item} key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestDeals
