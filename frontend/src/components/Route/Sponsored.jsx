import React, { useEffect, useRef } from "react"
import styles from "../../styles/styles"
import lgLogo from "../../lg-logo.svg"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

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
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const brandsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Title fade in ──
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 20, opacity: 0, duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        })
      }

      // ── Brand logos stagger ──
      if (brandsRef.current) {
        gsap.from(brandsRef.current.children, {
          scale: 0.7, opacity: 0, duration: 0.5, stagger: 0.12,
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: brandsRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className={`${styles.section} hidden sm:block py-12 mb-8`}>
      <p ref={titleRef} className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
        Trusted brands on Vendoz
      </p>
      <div ref={brandsRef} className="flex items-center justify-center gap-10 flex-wrap">
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
