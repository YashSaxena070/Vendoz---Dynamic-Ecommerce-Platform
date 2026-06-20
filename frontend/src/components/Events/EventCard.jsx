import React, { useEffect } from "react";
import { backend_url } from "../../server";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addToCartHandler = (data) => {
    if (seller && (seller._id === data?.shopId || seller._id === data?.shop?._id)) {
      toast.error("You cannot buy/add your own products!");
      return;
    }
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item alredy in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("item added to cart successfully!");
      }
    }
  };

  const displayName = data.name.replace(/^Vendoz\s+Super\s+Sale\s*-\s*/gi, "");

  return (
    <div
      className={`w-full block bg-white rounded-3xl border border-slate-100/80 hover:shadow-[0_20px_50px_rgba(26,26,46,0.05)] transition-all duration-300 ${
        active ? "unset" : "mb-12"
      } lg:flex p-6 gap-8`}
    >
      <div className="w-full lg:w-[30%] flex items-center justify-center bg-slate-50 rounded-2xl p-4 overflow-hidden aspect-square max-h-[260px] m-auto">
        <img
          src={`${backend_url}${data.images[0]}`}
          alt={displayName}
          className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="w-full lg:w-[70%] flex flex-col justify-center mt-4 lg:mt-0">
        <h2 className={`${styles.productTitle} text-xl md:text-2xl font-bold text-[#1A1A2E] mb-2`}>
          {displayName}
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-4">{data.description}</p>

        <div className="flex py-2 justify-between items-center border-t border-b border-slate-100 my-2">
          <div className="flex items-baseline gap-2">
            <h5 className="font-medium text-sm text-slate-400 line-through">
              {data.originalPrice}$
            </h5>
            <h5 className="font-extrabold text-2xl text-[#1A1A2E]">
              {data.discountPrice}$
            </h5>
          </div>
          <span className="font-bold text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            {data.sold_out} sold
          </span>
        </div>

        <div className="mt-3">
          <CountDown data={data} />
        </div>
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div
            className={`${styles.button} text-[#fff] ml-5`}
            onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
