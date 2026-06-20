import React from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../../static/data'
import styles from '../../styles/styles'

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.noramlFlex} 800px:gap-1`}>
      {navItems.map((item, index) => (
        <Link
          key={item.title + index}
          to={item.url}
          className={`
            relative px-4 py-2 text-[13px] font-semibold uppercase tracking-widest
            transition-colors duration-200 cursor-pointer
            ${active === index + 1
              ? "text-amber-400 nav-link-active"
              : "text-slate-300 800px:text-white/75 hover:text-amber-300"
            }
          `}
        >
          {item.title}
          {active === index + 1 && (
            <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-amber-400 rounded-full" />
          )}
        </Link>
      ))}
    </div>
  )
}

export default Navbar
