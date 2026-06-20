import React from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { backend_url } from "../../server";
import { toast } from "react-toastify";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    if (seller && (seller._id === data?.shopId || seller._id === data?.shop?._id)) {
      toast.error("You cannot buy/add your own products!");
      return;
    }
    const newData = { ...data, qty: 1 };
    dispatch(addTocart(newData));
    setOpenWishlist(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-slate-900/60 backdrop-blur-sm h-screen z-[999] transition-opacity duration-300">
      <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white flex flex-col justify-between shadow-2xl z-[1000] border-l border-slate-100 transition-transform duration-300">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 relative">
            <button
              onClick={() => setOpenWishlist(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              aria-label="Close wishlist"
            >
              <RxCross1 size={18} />
            </button>
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-4 border border-slate-100">
              <AiOutlineHeart size={28} className="text-red-500" />
            </div>
            <h5 className="text-base font-semibold text-slate-800">Your wishlist is empty!</h5>
            <p className="text-xs text-slate-400 text-center mt-1.5 max-w-[200px]">
              Save items you love to your wishlist and they will show up here.
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <AiOutlineHeart size={22} className="text-red-500" />
                <h3 className="text-lg font-bold text-[#1A1A2E]">
                  My Wishlist ({wishlist ? wishlist.length : 0})
                </h3>
              </div>
              <button
                onClick={() => setOpenWishlist(false)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-950 transition-colors"
                aria-label="Close wishlist"
              >
                <RxCross1 size={18} />
              </button>
            </div>

            {/* Wishlist Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-2 space-y-1">
              {wishlist.map((item, index) => (
                <WishlistSingle
                  data={item}
                  key={index}
                  removeFromWishlistHandler={removeFromWishlistHandler}
                  addToCartHandler={addToCartHandler}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const WishlistSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-slate-100 last:border-b-0">
      {/* Remove Button */}
      <button
        onClick={() => removeFromWishlistHandler(data)}
        className="p-2 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors shrink-0"
        title="Remove from wishlist"
      >
        <RxCross1 size={15} />
      </button>

      {/* Product Image */}
      <img
        src={`${backend_url}${data?.images[0]}`}
        alt={data.name}
        className="w-[74px] h-[74px] object-contain bg-slate-50 border border-slate-100 rounded-xl shrink-0 p-1"
      />

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="text-[13px] font-semibold text-[#1A1A2E] line-clamp-2 leading-snug hover:text-amber-600 transition-colors">
          {data.name}
        </h4>
        <div className="text-sm font-extrabold text-[#1A1A2E] mt-1.5">
          US${data.discountPrice}
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => addToCartHandler(data)}
        className="p-2.5 rounded-full bg-[#1A1A2E] hover:bg-amber-500 text-white hover:text-[#1A1A2E] transition-all duration-200 active:scale-90 shadow-sm shrink-0"
        title="Add to cart"
      >
        <BsCartPlus size={16} />
      </button>
    </div>
  );
};

export default Wishlist;
