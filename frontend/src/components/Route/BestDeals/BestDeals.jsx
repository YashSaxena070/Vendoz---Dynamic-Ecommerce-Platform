import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styles from "../../../styles/styles"
import ProductCard from "../ProductCard/ProductCard"

const BestDeals = () => {
  const [data, setData] = useState([])
  const { allProducts } = useSelector((state) => state.products)

  useEffect(() => {
    const sorted = allProducts
      ? [...allProducts].sort((a, b) => b.sold_out - a.sold_out).slice(0, 5)
      : []
    setData(sorted)
  }, [allProducts])

  if (!data || data.length === 0) return null

  return (
    <section className="bg-[#F9F7F4] py-14">
      <div className={`${styles.section}`}>
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data.map((item, index) => (
            <ProductCard data={item} key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestDeals
