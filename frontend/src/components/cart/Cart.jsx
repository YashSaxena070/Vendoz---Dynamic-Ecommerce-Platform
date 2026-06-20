import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { backend_url } from "../../server";
import { addTocart, removeFromCart } from "../../redux/actions/cart";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Remove from cart
  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  // Total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-slate-900/60 backdrop-blur-sm h-screen z-[999] transition-opacity duration-300">
      <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white flex flex-col justify-between shadow-2xl z-[1000] border-l border-slate-100 transition-transform duration-300">
        {cart && cart.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 relative">
            <button
              onClick={() => setOpenCart(false)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              aria-label="Close cart"
            >
              <RxCross1 size={18} />
            </button>
            <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-4 border border-slate-100">
              <IoBagHandleOutline size={28} className="text-amber-500" />
            </div>
            <h5 className="text-base font-semibold text-slate-800">Your cart is empty!</h5>
            <p className="text-xs text-slate-400 text-center mt-1.5 max-w-[200px]">
              Add products to your cart and they will show up here.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 flex flex-col min-h-0">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-2.5">
                  <IoBagHandleOutline size={22} className="text-amber-500" />
                  <h3 className="text-lg font-bold text-[#1A1A2E]">
                    Shopping Cart ({cart ? cart.length : 0})
                  </h3>
                </div>
                <button
                  onClick={() => setOpenCart(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-950 transition-colors"
                  aria-label="Close cart"
                >
                  <RxCross1 size={18} />
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-2 space-y-1">
                {cart.map((item, index) => (
                  <CartSingle
                    data={item}
                    key={index}
                    quantityChangeHandler={quantityChangeHandler}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 shrink-0">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-slate-500">Subtotal</span>
                <span className="text-xl font-extrabold text-[#1A1A2E]">
                  US${totalPrice}
                </span>
              </div>
              <Link to="/checkout" onClick={() => setOpenCart(false)}>
                <button className="w-full h-[50px] bg-[#1A1A2E] hover:bg-amber-500 text-white hover:text-[#1A1A2E] font-bold rounded-xl transition-all duration-300 active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      const newValue = value + 1;
      setValue(newValue);
      quantityChangeHandler({ ...data, qty: newValue });
    }
  };

  const decrement = (data) => {
    if (value > 1) {
      const newValue = value - 1;
      setValue(newValue);
      quantityChangeHandler({ ...data, qty: newValue });
    }
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b border-slate-100 last:border-b-0">
      {/* Quantity Pill Selector */}
      <div className="flex flex-col items-center bg-slate-50 border border-slate-200/60 rounded-full py-1 px-1 shrink-0">
        <button
          onClick={() => increment(data)}
          className="w-6 h-6 rounded-full flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-sm transition-all"
          aria-label="Increase quantity"
        >
          <HiPlus size={13} />
        </button>
        <span className="text-[12px] font-bold text-[#1A1A2E] my-1 w-6 text-center select-none">
          {value}
        </span>
        <button
          onClick={() => decrement(data)}
          disabled={value === 1}
          className="w-6 h-6 rounded-full flex items-center justify-center text-slate-600 hover:bg-white hover:shadow-sm disabled:opacity-40 disabled:hover:bg-transparent transition-all"
          aria-label="Decrease quantity"
        >
          <HiOutlineMinus size={11} />
        </button>
      </div>

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
        <div className="text-[11px] text-slate-400 mt-1">
          ${data.discountPrice} × {value}
        </div>
        <div className="text-sm font-extrabold text-[#1A1A2E] mt-1">
          US${totalPrice}
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCartHandler(data)}
        className="p-2 rounded-full hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors shrink-0"
        title="Remove item"
      >
        <RxCross1 size={15} />
      </button>
    </div>
  );
};

export default Cart;
