import React from 'react'
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";


const Hero = () => {
    return (
        <div
            className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-cover bg-center ${styles.noramlFlex}`}
            style={{
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=80)",
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30"></div>
            <div className={`${styles.section} w-[90%] 800px:w-[55%] relative z-10 text-white py-24`}
            >
                <h1
                    className={`text-[32px] leading-[1.1] 800px:text-[56px] font-[700] capitalize`}
                >
                    Curated Home Collections
                </h1>
                <p className="pt-5 text-[16px] font-[400] text-white/85 max-w-xl">
                    Discover premium home decor and accessories — premium quality,
                    exclusive deals and fast shipping. Upgrade your space today.
                </p>
                <div className="mt-6 flex gap-4">
                    <Link to="/products" className="inline-block">
                        <div className={`${styles.button}`}>
                            <span className="text-white font-medium text-[16px]">Shop Now</span>
                        </div>
                    </Link>
                    <Link to="/best-selling" className="inline-block">
                        <div className="inline-flex items-center justify-center px-5 py-3 border border-white rounded-full bg-white/10 hover:bg-white/20 transition">
                            <span className="text-white">Explore Bestsellers</span>
                        </div>
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default Hero