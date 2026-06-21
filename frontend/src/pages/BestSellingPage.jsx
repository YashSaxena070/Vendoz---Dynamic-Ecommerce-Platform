import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Footer from "../components/Layout/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.products);

  const bannerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (Array.isArray(allProducts)) {
      // Filter to only include products that have been sold (sold_out > 0)
      const soldProducts = allProducts.filter((product) => product.sold_out > 0);
      const sortedProducts = [...soldProducts].sort(
        (a, b) => b.sold_out - a.sold_out
      );
      setData(sortedProducts);
      window.scrollTo(0, 0);
    }
  }, [allProducts]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const ctx = gsap.context(() => {
      // ── Banner fade-in ──
      if (bannerRef.current) {
        gsap.from(bannerRef.current, {
          y: -30, opacity: 0, duration: 0.7,
          ease: "power3.out",
        });
      }

      // ── Product grid batch stagger ──
      if (gridRef.current && gridRef.current.children.length > 0) {
        gsap.from(gridRef.current.children, {
          y: 40, opacity: 0, duration: 0.5, stagger: 0.06,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    return () => ctx.revert();
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-[#FAF9F6] min-h-screen flex flex-col">
          <Header activeHeading={2} />
          
          {/* Minimal Hero Header Banner */}
          <div ref={bannerRef} className="bg-white border-b border-slate-100 py-12 mb-10">
            <div className={`${styles.section} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
              <div>
                <h1 className="text-3xl font-extrabold text-[#1A1A2E] tracking-tight">
                  Best Selling
                </h1>
                <p className="text-sm text-slate-400 mt-1.5 font-medium">
                  The most popular products purchased by customers
                </p>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
                <span className="text-slate-300">/</span>
                <span className="text-slate-800">Best Selling</span>
              </div>
            </div>
          </div>

          <div className={`${styles.section} flex-1`}>
            {data && data.length > 0 ? (
              <div ref={gridRef} className="grid grid-cols-2 gap-[12px] sm:gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
                {data.map((i, index) => (
                  <ProductCard data={i} key={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-slate-150 rounded-3xl max-w-md mx-auto my-12 shadow-sm">
                <h1 className="text-[18px] font-bold text-[#1A1A2E]">
                  No best selling products found!
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  No products have been sold yet on Vendoz.
                </p>
              </div>
            )}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default BestSellingPage;
