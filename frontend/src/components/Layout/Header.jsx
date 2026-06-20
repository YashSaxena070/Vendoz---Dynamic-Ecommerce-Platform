import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import logo from "../../vendoz-logo.svg";
import { categoriesData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx";
import { FiMapPin } from "react-icons/fi";
import { toast } from "react-toastify";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import ProfileDrawer from "./ProfileDrawer";

const TICKER_ITEMS = [
  "🎉 Free shipping on orders over $49",
  "✨ New arrivals every week — shop now",
  "🔐 Secure checkout guaranteed",
  "🛍️ Earn rewards on every purchase",
  "📦 Easy 30-day returns",
];

const Header = ({ activeHeading, isNavbarHidden, isCheckout }) => {
  const { isSeller } = useSelector((state) => state.seller);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const [openProfileDrawer, setOpenProfileDrawer] = useState(false);
  const [profileDrawerType, setProfileDrawerType] = useState("user");
  const [showStickySearch, setShowStickySearch] = useState(false);

  const [pincode, setPincode] = useState(localStorage.getItem("vendoz_pincode") || "");
  const [showPincodeModal, setShowPincodeModal] = useState(false);
  const [tempPincode, setTempPincode] = useState("");

  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const stickySearchRef = useRef(null);
  const stickySearchInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInsideDesktop =
        desktopSearchRef.current && desktopSearchRef.current.contains(event.target);
      const isClickInsideMobile =
        mobileSearchRef.current && mobileSearchRef.current.contains(event.target);
      const isClickInsideSticky =
        stickySearchRef.current && stickySearchRef.current.contains(event.target);

      if (!isClickInsideDesktop && !isClickInsideMobile && !isClickInsideSticky) {
        setSearchData(null);
        setShowStickySearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showStickySearch && stickySearchInputRef.current) {
      stickySearchInputRef.current.focus();
    }
  }, [showStickySearch]);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 70);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      setSearchData(null);
    } else {
      const filtered =
        allProducts &&
        allProducts.filter((p) =>
          p.name.toLowerCase().includes(term.toLowerCase())
        );
      setSearchData(filtered);
    }
  };

  const handleSearchFocus = () => {
    if (searchTerm.trim() !== "") {
      const filtered =
        allProducts &&
        allProducts.filter((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      setSearchData(filtered);
    }
  };

  const tickerText = TICKER_ITEMS.join("   ·   ");

  return (
    <>
      {/* ── Announcement ticker ── */}
      {!isCheckout && (
        <div className="announce-bar overflow-hidden py-2 text-[12px] font-medium tracking-wide select-none">
          <div className="ticker-inner inline-block">
            {[tickerText, tickerText].map((t, i) => (
              <span key={i} className="inline-block px-8 opacity-90">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Desktop top bar ── */}
      <div className="w-full bg-[#FAF9F6] border-b border-[#EDE8E0]/40 shadow-[0_1px_2px_rgba(26,26,46,0.02)] py-3 select-none">
        <div className={`${styles.section}`}>
          <div className="hidden 800px:flex 800px:h-[64px] items-center justify-between gap-8">
            {/* Logo */}
            <Link to="/" className="shrink-0">
              <img src={logo} alt="Vendoz" className="h-9 hover:scale-105 transition-transform duration-200" />
            </Link>

            {/* Search */}
            {!isCheckout && (
              <div ref={desktopSearchRef} className="w-[48%] relative">
                <div className="relative flex items-center bg-white border border-slate-200/80 rounded-full transition-all duration-300 focus-within:border-amber-400 focus-within:ring-4 focus-within:ring-amber-500/10 focus-within:shadow-md">
                  <input
                    type="text"
                    placeholder="Search for anything…"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={handleSearchFocus}
                    onClick={handleSearchFocus}
                    className="w-full h-[46px] pl-6 pr-14 bg-transparent text-[#1A1A2E] text-[14px] font-medium outline-none placeholder-slate-400"
                  />
                  <div className="absolute right-1.5 top-1.5 bottom-1.5">
                    <div className="h-[34px] w-[40px] rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#1A1A2E] flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer hover:shadow active:scale-95">
                      <AiOutlineSearch size={18} />
                    </div>
                  </div>
                </div>
                {searchData && searchData.length !== 0 && (
                  <div className="absolute top-[54px] left-0 w-full bg-white border border-[#EDE8E0] rounded-2xl shadow-xl z-[99] max-h-[360px] overflow-y-auto p-2 space-y-1">
                    {searchData.map((item, index) => (
                      <Link to={`/product/${item._id}`} key={index}>
                        <div className="flex items-center gap-3 p-2.5 hover:bg-[#FEF9F0] rounded-xl transition-colors cursor-pointer">
                          <img
                            src={`${backend_url}${item.images[0]}`}
                            alt="img"
                            className="w-10 h-10 rounded-lg object-cover border border-[#EDE8E0] shrink-0"
                          />
                          <span className="text-[13px] font-medium text-[#1A1A2E] line-clamp-1">
                            {item.name}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* CTA & Pincode container */}
            {!isCheckout && (
              <div className="flex items-center gap-4 shrink-0">
                {user?.role !== "Admin" && user?.role !== "admin" && (
                  <div 
                    onClick={() => {
                      setTempPincode(pincode);
                      setShowPincodeModal(true);
                    }}
                    className="flex items-center gap-2.5 px-4 py-2 bg-white hover:bg-[#FEF9F0]/20 border border-slate-200 hover:border-amber-400/50 rounded-full cursor-pointer transition-all duration-200 shadow-sm select-none group relative"
                  >
                    <FiMapPin className="text-amber-500 group-hover:scale-110 transition-transform duration-200" size={18} />
                    <div className="flex flex-col text-left">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none">Deliver to</span>
                      <span className={`text-[12px] font-bold leading-tight ${pincode ? 'text-slate-800' : 'text-rose-500 font-extrabold animate-pulse'}`}>
                        {pincode ? pincode : "Set Pincode"}
                      </span>
                    </div>
                    {!pincode && (
                      <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
                      </span>
                    )}
                  </div>
                )}

                {user?.role !== "Admin" && user?.role !== "admin" && (
                  <Link to={isSeller ? "/dashboard" : "/shop-create"}>
                    <div className="btn-amber inline-flex items-center justify-center px-6 py-2.5 text-white rounded-full font-bold text-[14px] tracking-wide cursor-pointer hover:scale-[1.03] active:scale-[0.97] hover:shadow-lg transition-all duration-300">
                      {isSeller ? "Go to Dashboard" : "Become a Seller"}
                      <IoIosArrowForward className="ml-2" size={14} />
                    </div>
                  </Link>
                )}

                {isNavbarHidden && (
                  <div className="flex items-center gap-5 border-l border-slate-200/80 pl-5 ml-1">
                    {/* Wishlist */}
                    <button
                      className="relative text-slate-700 hover:text-amber-500 transition-colors flex items-center justify-center"
                      onClick={() => setOpenWishlist(true)}
                      aria-label="Wishlist"
                    >
                      <AiOutlineHeart size={24} />
                      {wishlist?.length > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 text-[10px] font-bold text-[#1A1A2E] flex items-center justify-center">
                          {wishlist.length}
                        </span>
                      )}
                    </button>

                    {/* Cart */}
                    <button
                      className="relative text-slate-700 hover:text-amber-500 transition-colors flex items-center justify-center"
                      onClick={() => setOpenCart(true)}
                      aria-label="Cart"
                    >
                      <AiOutlineShoppingCart size={24} />
                      {cart?.length > 0 && (
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 text-[10px] font-bold text-[#1A1A2E] flex items-center justify-center">
                          {cart.length}
                        </span>
                      )}
                    </button>

                    {/* Profile */}
                    <div className="relative cursor-pointer flex items-center">
                      {isAuthenticated ? (
                        <div onClick={() => { setProfileDrawerType("user"); setOpenProfileDrawer(true); }} className="flex items-center">
                          <img
                            src={`${backend_url}${user.avatar}`}
                            className="w-[34px] h-[34px] rounded-full border-2 border-amber-400/60 object-cover hover:border-amber-400 hover:scale-105 transition-all duration-200"
                            alt="Profile"
                          />
                        </div>
                      ) : (
                        <Link to="/login" className="flex items-center text-slate-700 hover:text-amber-500 transition-colors">
                          <CgProfile size={24} />
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Desktop nav bar ── */}
      {!isNavbarHidden && !isCheckout && (
        <>
          {active && <div className="h-[62px] hidden 800px:block" />}
          <div
            className={`${
              active ? "fixed top-0 left-0 z-50 shadow-md animate-[slideDown_0.2s_ease]" : ""
            } hidden 800px:flex items-center w-full bg-[#1A1A2E] h-[62px] transition-all duration-300`}
          >
            <div
              className={`${styles.section} relative ${styles.noramlFlex} justify-between w-full`}
            >
              {/* Categories dropdown */}
              <div className="relative">
                <div
                  className="hidden 1000px:flex items-center gap-2 h-[44px] px-5 bg-white/10 hover:bg-white/15 rounded-full cursor-pointer transition-colors select-none"
                  onClick={() => setDropDown(!dropDown)}
                >
                  <BiMenuAltLeft size={18} className="text-white/70" />
                  <span className="text-[13px] font-semibold text-white/90 tracking-wide">
                    All Categories
                  </span>
                  <IoIosArrowDown
                    size={14}
                    className={`text-white/60 transition-transform duration-200 ${
                      dropDown ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {dropDown && (
                  <DropDown
                    categoriesData={categoriesData}
                    setDropDown={setDropDown}
                  />
                )}
              </div>

              {/* Nav links */}
              <div className={`${styles.noramlFlex}`}>
                <Navbar active={activeHeading} />
              </div>

              {/* Icons */}
              <div className="flex items-center gap-5">
                {/* Sticky Search bar */}
                {active && (
                  <div ref={stickySearchRef} className="animate-slide-search relative flex items-center">
                    <div 
                      className={`flex items-center bg-white/10 hover:bg-white/15 border border-white/10 rounded-full transition-all duration-300 ease-in-out relative sticky-search-pill ${
                        showStickySearch ? "w-[280px] px-3.5 h-[36px]" : "w-[36px] h-[36px] justify-center cursor-pointer"
                      }`}
                      onClick={() => {
                        if (!showStickySearch) {
                          setShowStickySearch(true);
                        }
                      }}
                    >
                      {!showStickySearch && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <AiOutlineSearch size={20} className="text-white/80" />
                        </div>
                      )}
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onFocus={handleSearchFocus}
                        className={`bg-transparent text-white text-[13px] outline-none placeholder-white/50 w-full transition-all duration-300 ${
                          showStickySearch ? "opacity-100 pr-6" : "w-0 h-0 opacity-0 pointer-events-none"
                        }`}
                        ref={stickySearchInputRef}
                      />
                      {showStickySearch && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowStickySearch(false);
                            setSearchTerm("");
                            setSearchData(null);
                          }}
                          className="absolute right-2.5 text-white/60 hover:text-white transition-colors flex items-center justify-center"
                        >
                          <RxCross1 size={14} />
                        </button>
                      )}
                    </div>
                    
                    {/* Search results dropdown for sticky search */}
                    {showStickySearch && searchData && searchData.length !== 0 && (
                      <div className="absolute top-[44px] right-0 w-[280px] bg-white border border-[#EDE8E0] rounded-2xl shadow-xl z-[99] max-h-[300px] overflow-y-auto p-2 space-y-1">
                        {searchData.map((item, index) => (
                          <Link to={`/product/${item._id}`} key={index} onClick={() => { setShowStickySearch(false); setSearchTerm(""); setSearchData(null); }}>
                            <div className="flex items-center gap-3 p-2 hover:bg-[#FEF9F0] rounded-xl transition-colors cursor-pointer animate-[scaleUp_0.15s_ease]">
                              <img
                                src={`${backend_url}${item.images[0]}`}
                                alt="img"
                                className="w-8 h-8 rounded-lg object-cover border border-[#EDE8E0] shrink-0"
                              />
                              <span className="text-[12px] font-medium text-[#1A1A2E] line-clamp-1">
                                {item.name}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Wishlist */}
                <button
                  className="relative text-white/80 hover:text-amber-300 transition-colors"
                  onClick={() => setOpenWishlist(true)}
                  aria-label="Wishlist"
                >
                  <AiOutlineHeart size={24} />
                  {wishlist?.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 text-[10px] font-bold text-[#1A1A2E] flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </button>

                {/* Cart */}
                <button
                  className="relative text-white/80 hover:text-amber-300 transition-colors"
                  onClick={() => setOpenCart(true)}
                  aria-label="Cart"
                >
                  <AiOutlineShoppingCart size={24} />
                  {cart?.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 text-[10px] font-bold text-[#1A1A2E] flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </button>

                {/* Profile */}
                {isAuthenticated ? (
                  <div 
                    onClick={() => {
                      setProfileDrawerType("user");
                      setOpenProfileDrawer(true);
                    }}
                    className="cursor-pointer"
                  >
                    <img
                      src={`${backend_url}${user.avatar}`}
                      className="w-[32px] h-[32px] rounded-full object-cover border-2 border-amber-400/60 hover:border-amber-400 transition-colors"
                      alt="Profile"
                    />
                  </div>
                ) : isSeller ? (
                  <div
                    onClick={() => {
                      setProfileDrawerType("seller");
                      setOpenProfileDrawer(true);
                    }}
                    className="text-white/80 hover:text-amber-300 transition-colors cursor-pointer"
                    title="Seller Dashboard"
                  >
                    <CgProfile size={24} />
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="text-white/80 hover:text-amber-300 transition-colors"
                  >
                    <CgProfile size={24} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {openCart && <Cart setOpenCart={setOpenCart} />}
      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}

      {/* ── Mobile header ── */}
      {active && <div className="h-[60px] 800px:hidden" />}
      <div
        className={`${
          active ? "fixed top-0 left-0 z-50 shadow-md" : ""
        } w-full h-[60px] bg-white border-b border-[#EDE8E0] 800px:hidden flex items-center ${
          isCheckout ? "justify-center" : "justify-between"
        } px-4`}
      >
        {!isCheckout && (
          <button onClick={() => setOpen(true)} aria-label="Open menu">
            <BiMenuAltLeft size={32} className="text-[#1A1A2E]" />
          </button>
        )}
        <Link to="/">
          <img src={logo} alt="Vendoz" className="h-8" />
        </Link>
        {!isCheckout && (
          <button
            className="relative text-[#1A1A2E]"
            onClick={() => setOpenCart(true)}
            aria-label="Cart"
          >
            <AiOutlineShoppingCart size={28} />
            {cart?.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-[10px] font-bold text-[#1A1A2E] flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        )}
        {!isCheckout && openCart && <Cart setOpenCart={setOpenCart} />}
        {!isCheckout && openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <div className="fixed inset-0 z-[60] flex">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-[78%] max-w-xs bg-white h-full flex flex-col shadow-2xl overflow-y-auto">
            {/* Drawer header */}
            <div className="flex items-center justify-between p-5 border-b border-[#EDE8E0]">
              <img src={logo} alt="Vendoz" className="h-8" />
              <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-[#1A1A2E]">
                <RxCross1 size={22} />
              </button>
            </div>

            {/* Mobile search */}
            <div ref={mobileSearchRef} className="px-5 py-4">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search products…"
                  className={`${styles.input}`}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onClick={handleSearchFocus}
                />
                <AiOutlineSearch
                  size={18}
                  className="absolute right-4 top-3 text-amber-400 pointer-events-none"
                />
              </div>
              {searchData && searchData.length > 0 && (
                <div className="mt-2 bg-white border border-[#EDE8E0] rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                  {searchData.map((item, i) => (
                    <Link to={`/product/${item._id}`} key={i} onClick={() => setOpen(false)}>
                      <div className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#FEF9F0] transition-colors">
                        <img
                          src={`${backend_url}${item.images[0]}`}
                          className="w-9 h-9 rounded-lg object-cover border border-[#EDE8E0]"
                          alt=""
                        />
                        <span className="text-[13px] font-medium text-[#1A1A2E] line-clamp-1">{item.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Nav */}
            <div className="px-5 flex-1">
              <Navbar active={activeHeading} />
            </div>

            {/* Bottom actions */}
            <div className="p-5 border-t border-[#EDE8E0] space-y-3">
              {user?.role !== "Admin" && user?.role !== "admin" && (
                <div 
                  onClick={() => {
                    setTempPincode(pincode);
                    setShowPincodeModal(true);
                    setOpen(false);
                  }}
                  className="flex items-center justify-between px-4 py-3 bg-[#F9F7F4] border border-[#EDE8E0] rounded-xl cursor-pointer hover:bg-slate-50 transition-all duration-200 select-none group"
                >
                  <div className="flex items-center gap-2">
                    <FiMapPin className="text-amber-500 group-hover:scale-110 transition-transform duration-200" size={18} />
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none">Deliver to</span>
                      <span className={`text-[12px] font-bold leading-tight ${pincode ? 'text-slate-800' : 'text-rose-500'}`}>
                        {pincode ? pincode : "Set Pincode"}
                      </span>
                    </div>
                  </div>
                  {!pincode ? (
                    <span className="text-[10px] font-semibold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100 animate-pulse">
                      Required
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">
                      Active
                    </span>
                  )}
                </div>
              )}

              {user?.role !== "Admin" && user?.role !== "admin" && (
                <Link
                  to={isSeller ? "/dashboard" : "/shop-create"}
                  onClick={() => setOpen(false)}
                >
                  <div className={`${styles.button} w-full justify-center`}>
                    {isSeller ? "Go to Dashboard" : "Become a Seller"}
                    <IoIosArrowForward className="ml-2" size={14} />
                  </div>
                </Link>
              )}

              {isAuthenticated ? (
                <div 
                  onClick={() => {
                    setOpen(false);
                    setProfileDrawerType("user");
                    setOpenProfileDrawer(true);
                  }}
                  className="flex items-center gap-3 py-2 cursor-pointer"
                >
                  <img
                    src={`${backend_url}${user.avatar}`}
                    className="w-10 h-10 rounded-full object-cover border-2 border-amber-400/60"
                    alt="Profile"
                  />
                  <span className="font-semibold text-[#1A1A2E] text-sm">{user.name}</span>
                </div>
              ) : isSeller ? (
                <div 
                  onClick={() => {
                    setOpen(false);
                    setProfileDrawerType("seller");
                    setOpenProfileDrawer(true);
                  }}
                  className="flex items-center gap-3 py-2 text-[#1A1A2E] hover:text-amber-600 transition-colors cursor-pointer"
                >
                  <CgProfile size={24} className="text-amber-500" />
                  <span className="font-semibold text-sm">Dashboard</span>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex-1 text-center py-2.5 rounded-full border border-[#EDE8E0] text-[14px] font-semibold text-[#1A1A2E] hover:bg-[#F9F7F4] transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/sign-up"
                    onClick={() => setOpen(false)}
                    className="flex-1 text-center py-2.5 rounded-full bg-[#1A1A2E] text-[14px] font-semibold text-white hover:bg-[#2d2d4e] transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              )}

              {/* Wishlist in drawer */}
              <button
                className="flex items-center gap-2 text-[13px] text-slate-500 hover:text-amber-600 transition-colors"
                onClick={() => { setOpenWishlist(true); setOpen(false); }}
              >
                <AiOutlineHeart size={18} />
                Wishlist ({wishlist?.length || 0})
              </button>
            </div>
          </div>
        </div>
      )}

      {showPincodeModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-[#EDE8E0] w-full max-w-sm rounded-2xl p-6 shadow-2xl relative mx-4 animate-[scaleUp_0.2s_ease]">
            <button 
              onClick={() => setShowPincodeModal(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-650 transition-colors"
            >
              <RxCross1 size={18} />
            </button>
            <h3 className="text-lg font-bold text-[#1A1A2E] mb-1">Set Delivery Location</h3>
            <p className="text-xs text-slate-450 mb-4">
              Enter your local 6-digit pincode to customize delivery options.
            </p>
            <div className="space-y-4">
              <input
                type="text"
                maxLength={6}
                placeholder="e.g. 110001"
                value={tempPincode}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setTempPincode(val);
                }}
                className="appearance-none block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 text-sm transition-all duration-200"
              />
              <button
                onClick={() => {
                  if (tempPincode.length === 6) {
                    localStorage.setItem("vendoz_pincode", tempPincode);
                    setPincode(tempPincode);
                    setShowPincodeModal(false);
                    toast.success("Delivery location updated successfully!");
                  } else {
                    toast.error("Please enter a valid 6-digit pincode!");
                  }
                }}
                className="w-full py-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold rounded-xl transition-all duration-200 active:scale-[0.98] shadow-md shadow-amber-500/10 hover:shadow-lg cursor-pointer text-sm"
              >
                Save Location
              </button>
            </div>
          </div>
        </div>
      )}
      {openProfileDrawer && (
        <ProfileDrawer 
          setOpenProfileDrawer={setOpenProfileDrawer} 
          drawerType={profileDrawerType}
        />
      )}
    </>
  );
};

export default Header;
