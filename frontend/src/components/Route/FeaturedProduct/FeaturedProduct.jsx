import React, { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styles from "../../../styles/styles"
import ProductCard from "../ProductCard/ProductCard"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.products)
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)

  // Filter to show only one product from each brand (shop)
  const featuredProducts = []
  const seenShops = new Set()

  if (allProducts) {
    for (const product of allProducts) {
      const shopId = product.shopId || (product.shop && product.shop._id)
      if (shopId && !seenShops.has(shopId)) {
        seenShops.add(shopId)
        featuredProducts.push(product)
      }
    }
  }

  useEffect(() => {
    if (!featuredProducts || featuredProducts.length === 0) return

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
  }, [featuredProducts.length]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!allProducts || allProducts.length === 0) return null

  return (
    <section ref={sectionRef} className="bg-white py-14">
      <div className={`${styles.section}`}>
        {/* Header */}
        <div ref={headerRef} className="flex items-end justify-between mb-8">
          <div>
            <p className="text-amber-500 text-[11px] font-bold uppercase tracking-[0.2em] mb-1.5">
              Handpicked for you
            </p>
            <h2 className="section-heading text-[24px] font-extrabold text-[#1A1A2E] tracking-tight">
              Featured Products
            </h2>
          </div>
          <Link
            to="/products"
            className="text-[13px] font-semibold text-amber-600 hover:text-amber-700 transition-colors hidden sm:block"
          >
            Browse all →
          </Link>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {featuredProducts.map((item, index) => (
            <ProductCard data={item} key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProduct
