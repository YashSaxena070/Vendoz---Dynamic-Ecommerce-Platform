import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";
import ProductCard from "../components/Route/ProductCard/ProductCard";

import Footer from "../components/Layout/Footer";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const { allProducts, isLoading } = useSelector((state) => state.products);

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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-[#FAF9F6] min-h-screen flex flex-col">
          <Header activeHeading={2} />
          
          <div className="bg-white border-b border-slate-100 py-12 mb-10">
            <div className={`${styles.section} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
              <div>
                <h1 className="text-3xl font-extrabold text-[#1A1A2E] tracking-tight">
                  Best Selling
                </h1>
                <p className="text-sm text-slate-400 mt-1.5 font-medium">
                  The most popular products purchased by customers
                </p>
              </div>
            </div>
          </div>

          <div className={`${styles.section} flex-1`}>
            {data && data.length > 0 ? (
              <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
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
