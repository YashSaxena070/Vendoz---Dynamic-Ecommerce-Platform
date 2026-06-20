import React from "react"
import styles from "../../styles/styles"
import lgLogo from "../../lg-logo.svg"

const BRANDS = [
  {
    name: "Sony",
    src: "https://logos-world.net/wp-content/uploads/2020/04/Sony-Logo.png",
  },
  {
    name: "Dell",
    src: "https://logos-world.net/wp-content/uploads/2020/08/Dell-Logo-1989-2016.png",
  },
  {
    name: "LG",
    src: lgLogo,
  },
  {
    name: "Apple",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
]

const Sponsored = () => {
  return (
    <section className={`${styles.section} hidden sm:block py-12 mb-8`}>
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
        Trusted brands on Vendoz
      </p>
      <div className="flex items-center justify-center gap-10 flex-wrap">
        {BRANDS.map((brand) => (
          <div
            key={brand.name}
            className="grayscale opacity-40 hover:grayscale-0 hover:opacity-80 transition-all duration-300 cursor-pointer"
          >
            <img
              src={brand.src}
              alt={brand.name}
              className="h-8 object-contain w-[120px]"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Sponsored
