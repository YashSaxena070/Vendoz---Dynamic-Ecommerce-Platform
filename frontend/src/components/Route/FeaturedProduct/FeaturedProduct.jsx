import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styles from "../../../styles/styles"
import ProductCard from "../ProductCard/ProductCard"

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.products)

  if (!allProducts || allProducts.length === 0) return null

  // Filter to show only one product from each brand (shop)
  const featuredProducts = [];
  const seenShops = new Set();

  for (const product of allProducts) {
    const shopId = product.shopId || (product.shop && product.shop._id);
    if (shopId && !seenShops.has(shopId)) {
      seenShops.add(shopId);
      featuredProducts.push(product);
    }
  }

  return (
    <section className="bg-white py-14">
      <div className={`${styles.section}`}>
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
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
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {featuredProducts.map((item, index) => (
            <ProductCard data={item} key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProduct
