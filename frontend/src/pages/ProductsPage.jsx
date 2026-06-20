import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
        allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
    //    window.scrollTo(0,0);
  }, [allProducts, categoryData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-[#FAF9F6] min-h-screen flex flex-col">
          <Header activeHeading={3} />
          
          {/* Minimal Hero Header Banner */}
          <div className="bg-white border-b border-slate-100 py-12 mb-10">
            <div className={`${styles.section} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
              <div>
                <h1 className="text-3xl font-extrabold text-[#1A1A2E] tracking-tight capitalize">
                  {categoryData ? categoryData : "All Products"}
                </h1>
                <p className="text-sm text-slate-400 mt-1.5 font-medium">
                  Discover {data ? data.length : 0} items curated for premium quality
                </p>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
                <span className="text-slate-300">/</span>
                <span className="text-slate-800">{categoryData ? categoryData : "Products"}</span>
              </div>
            </div>
          </div>

          <div className={`${styles.section} flex-1`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>
            {data && data.length === 0 ? (
              <div className="text-center py-20 bg-white border border-slate-150 rounded-3xl max-w-md mx-auto my-12 shadow-sm">
                <h1 className="text-[18px] font-bold text-[#1A1A2E]">
                  No products Found!
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Try checking back later or adjusting your filters.
                </p>
              </div>
            ) : null}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
