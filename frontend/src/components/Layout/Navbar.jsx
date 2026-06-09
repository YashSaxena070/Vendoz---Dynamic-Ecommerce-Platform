import React from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../../static/data'
import styles from '../../styles/styles'


const Navbar = ({ active }) => {
    return (
        <div className={`block 800px:${styles.noramlFlex} space-x-2`}> 
            {navItems.map((i, index) => (
                <div className='flex' key={i.title + index}>
                    <Link
                        to={i.url}
                        className={`${active === index + 1 ? "text-teal-300" : "text-gray-700 800px:text-white"} pb-[30px] 800px:pb-0 font-[500] px-4 cursor-pointer hover:text-teal-200 transition uppercase tracking-wide`}
                    >
                        {i.title}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default Navbar