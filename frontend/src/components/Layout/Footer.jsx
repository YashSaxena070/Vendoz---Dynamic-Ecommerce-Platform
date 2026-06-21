import React, { useEffect, useRef } from "react"
import logo from "../../vendoz-logo-white.svg"
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai"
import { Link } from "react-router-dom"
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const SOCIAL = [
  { Icon: AiFillFacebook, href: "#", label: "Facebook" },
  { Icon: AiOutlineTwitter, href: "#", label: "Twitter" },
  { Icon: AiFillInstagram, href: "#", label: "Instagram" },
  { Icon: AiFillYoutube, href: "#", label: "YouTube" },
]

const Footer = () => {
  const footerRef = useRef(null)
  const newsletterRef = useRef(null)
  const columnsRef = useRef(null)
  const socialRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Newsletter slide-up ──
      if (newsletterRef.current) {
        gsap.from(newsletterRef.current.children, {
          y: 40, opacity: 0, duration: 0.7, stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: newsletterRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        })
      }

      // ── Footer columns stagger ──
      if (columnsRef.current) {
        gsap.from(columnsRef.current.children, {
          y: 30, opacity: 0, duration: 0.6, stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: columnsRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        })
      }

      // ── Social icons pop-in ──
      if (socialRef.current) {
        gsap.from(socialRef.current.children, {
          scale: 0, opacity: 0, duration: 0.4, stagger: 0.08,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: socialRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        })
      }
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="bg-[#0F0F1E] text-white">

      {/* ── Newsletter band ── */}
      <div className="border-b border-white/10">
        <div ref={newsletterRef} className="w-11/12 mx-auto max-w-7xl py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-1">
              Stay in the loop
            </p>
            <h3
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-[24px] md:text-[28px] font-bold text-white leading-tight"
            >
              Get deals, drops & news<br className="hidden md:block" /> straight to your inbox.
            </h3>
          </div>
          <div className="flex w-full md:w-auto gap-2 flex-col sm:flex-row">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 sm:w-64 px-5 py-3 rounded-full bg-white/10 border border-white/10 text-white placeholder-white/40 text-[14px] focus:border-amber-400/60 focus:outline-none transition-colors"
            />
            <button className="btn-amber px-6 py-3 rounded-full text-[#1A1A2E] font-bold text-[13px] tracking-wide whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ── Main links ── */}
      <div ref={columnsRef} className="w-11/12 mx-auto max-w-7xl py-14 grid grid-cols-2 sm:grid-cols-4 gap-8">
        {/* Brand col */}
        <div className="col-span-2 sm:col-span-1">
          <img src={logo} alt="Vendoz" className="h-8 mb-5" />
          <p className="text-[13px] text-white/50 leading-relaxed max-w-[200px]">
            Marketplace for unique products from independent sellers worldwide.
          </p>
          <div ref={socialRef} className="flex items-center gap-3 mt-5">
            {SOCIAL.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-amber-500/20 hover:text-amber-400 flex items-center justify-center text-white/60 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        {[
          { title: "Company", links: footerProductLinks },
          { title: "Shop", links: footercompanyLinks },
          { title: "Support", links: footerSupportLinks },
        ].map(({ title, links }) => (
          <div key={title}>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/40 mb-4">
              {title}
            </p>
            <ul className="space-y-2.5">
              {links.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.link}
                    className="text-[13px] text-white/60 hover:text-amber-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="w-11/12 mx-auto max-w-7xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/30">
            © {new Date().getFullYear()} Vendoz. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/privacy-policy" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-[12px] text-white/30 hover:text-white/60 transition-colors">Terms of Service</Link>
          </div>
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt="Payment methods"
            className="h-6 opacity-40 hidden sm:block"
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer
