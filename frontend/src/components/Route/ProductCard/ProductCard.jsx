import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai"
import { backend_url } from "../../../server"
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx"
import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist, removeFromWishlist } from '../../../redux/actions/wishlist'
import { addTocart } from '../../../redux/actions/cart'
import { toast } from 'react-toastify'
import Ratings from "../../Products/Ratings"

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist)
  const { cart } = useSelector((state) => state.cart)
  const { seller } = useSelector((state) => state.seller)
  const [click, setClick] = useState(false)
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setClick(!!(wishlist && wishlist.find((i) => i._id === data._id)))
  }, [wishlist, data._id])

  const removeFromWishlistHandler = (data) => {
    setClick(false)
    dispatch(removeFromWishlist(data))
  }

  const addToWishlistHandler = (data) => {
    setClick(true)
    dispatch(addToWishlist(data))
  }

  const addToCartHandler = (id) => {
    if (seller && seller._id === data.shopId) {
      toast.error("You cannot buy/add your own products!")
      return
    }
    const isItemExists = cart && cart.find((i) => i._id === id)
    if (isItemExists) {
      toast.error("Already in your cart!")
    } else if (data.stock < 1) {
      toast.error("Out of stock!")
    } else {
      dispatch(addTocart({ ...data, qty: 1 }))
      toast.success("Added to cart!")
    }
  }

  const productLink = isEvent
    ? `/product/${data._id}?isEvent=true`
    : `/product/${data._id}`

  const discountPct =
    data.originalPrice && data.discountPrice
      ? Math.round(((data.originalPrice - data.discountPrice) / data.originalPrice) * 100)
      : null

  return (
    <>
      <div className="product-card group bg-white rounded-3xl border border-slate-100 hover:border-amber-100/50 hover:shadow-[0_20px_40px_rgba(26,26,46,0.04)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden relative">

        {/* ── Image area ── */}
        <div className="relative w-full aspect-square bg-[#FDFCFB] overflow-hidden">
          <Link to={productLink} className="block w-full h-full">
            <img
              src={`${backend_url}${data.images && data.images[0]}`}
              alt={data.name}
              className="w-full h-full object-contain p-5 group-hover:scale-[1.06] transition-transform duration-500 ease-out"
            />
          </Link>

          {/* Discount badge */}
          {discountPct > 0 && (
            <span className="absolute top-4 left-4 bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-md shadow-sm select-none">
              Save {discountPct}%
            </span>
          )}

          {/* Action buttons — slide/fade in on hover */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            <button
              className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full shadow-sm border border-slate-100 flex items-center justify-center hover:border-amber-400 hover:bg-amber-50 text-slate-500 hover:text-amber-600 transition-all duration-200 active:scale-95"
              onClick={() => click ? removeFromWishlistHandler(data) : addToWishlistHandler(data)}
              title={click ? "Remove from wishlist" : "Add to wishlist"}
            >
              {click
                ? <AiFillHeart size={14} className="text-red-500" />
                : <AiOutlineHeart size={14} />
              }
            </button>

            <button
              className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full shadow-sm border border-slate-100 flex items-center justify-center hover:border-amber-400 hover:bg-amber-50 text-slate-500 hover:text-amber-600 transition-all duration-200 active:scale-95"
              onClick={() => setOpen(!open)}
              title="Quick view"
            >
              <AiOutlineEye size={14} />
            </button>
          </div>
        </div>

        {/* ── Content ── */}
        <div className="p-4 flex flex-col flex-1">
          {/* Shop name */}
          <Link to={productLink}>
            <span className="text-[9px] font-semibold text-slate-400 tracking-wider hover:text-amber-500 uppercase transition-colors">
              {data.shop?.name}
            </span>
          </Link>

          {/* Product name */}
          <Link to={productLink}>
            <h4 className="mt-1 text-[13px] font-medium text-slate-800 line-clamp-2 hover:text-amber-500 transition-colors min-h-[38px] leading-normal">
              {data.name}
            </h4>
          </Link>

          {/* Rating */}
          <div className="mt-1.5">
            <Ratings rating={data?.ratings} />
          </div>

          {/* Price row + Add to cart */}
          <div className="mt-3.5 flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[15px] font-extrabold text-[#1A1A2E]">
                ${data.discountPrice ?? data.originalPrice}
              </span>
              {data.originalPrice > data.discountPrice && (
                <span className="text-[11px] text-slate-400 line-through">
                  ${data.originalPrice}
                </span>
              )}
            </div>

            <button
              onClick={() => addToCartHandler(data._id)}
              className="w-8 h-8 rounded-full bg-slate-900 hover:bg-amber-400 text-white hover:text-slate-950 flex items-center justify-center transition-all duration-300 active:scale-95 shadow-sm"
              title="Add to cart"
            >
              <AiOutlineShoppingCart size={14} />
            </button>
          </div>

          {/* Sold indicator / Cart popularity */}
          {((data?.sold_out || 0) > 0 || (data?.cartCount || 0) > 0) && (
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span>Popularity</span>
              <span className="font-semibold text-slate-700">
                {data.sold_out ? `${data.sold_out} sold` : `${data.cartCount} times added`}
              </span>
            </div>
          )}
        </div>
      </div>

      {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
    </>
  )
}

export default ProductCard
