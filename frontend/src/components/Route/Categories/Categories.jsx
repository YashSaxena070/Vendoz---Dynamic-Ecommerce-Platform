import React from 'react'
import { useNavigate } from "react-router-dom"
import { brandingData, categoriesData } from "../../../static/data"
import styles from '../../../styles/styles'

const Categories = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-[#F9F7F4] pt-14 pb-4">

      {/* ── Trust bar ── */}
      <div className={`${styles.section} hidden sm:block mb-12`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        <h2 className="section-heading text-[22px] font-extrabold text-[#1A1A2E] tracking-tight">
          Browse Categories
        </h2>
      </div>

      {/* ── Category pills ── */}
      <div className={`${styles.section} mb-14`} id="categories">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
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
