import React from "react";
import { RxCross1, RxPerson, RxDashboard } from "react-icons/rx";
import { HiOutlineShoppingBag, HiOutlineReceiptRefund, HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineMessage, AiOutlineLogin, AiOutlineFolderAdd, AiOutlineGift, AiOutlineSetting } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineTrackChanges, MdOutlineLocalOffer } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { FiShoppingBag, FiPackage } from "react-icons/fi";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { GrWorkshop } from "react-icons/gr";
import { BsHandbag } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { server, backend_url } from "../../server";
import { toast } from "react-toastify";

const ProfileDrawer = ({ setOpenProfileDrawer, drawerType }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { seller, isSeller } = useSelector((state) => state.seller);

  // Determine the effective role/context to display
  // drawerType can be "user" or "seller". If admin, it falls under user role === 'Admin'
  const isUserAdmin = user && (user?.role === "Admin" || user?.role === "admin");
  
  let menuTitle = "My Profile";
  let avatarUrl = "";
  let name = "";
  let subText = "";
  let menuItems = [];
  let logoutType = "user"; // "user" or "seller"

  if (drawerType === "seller" && isSeller) {
    menuTitle = "Seller Dashboard";
    avatarUrl = seller ? `${backend_url}${seller.avatar}` : "";
    name = seller ? seller.name : "Shop Owner";
    subText = seller ? seller.email : "";
    logoutType = "seller";
    menuItems = [
      { label: "Dashboard", icon: <RxDashboard size={20} />, path: "/dashboard" },
      { label: "All Orders", icon: <FiShoppingBag size={20} />, path: "/dashboard-orders" },
      { label: "All Products", icon: <FiPackage size={20} />, path: "/dashboard-products" },
      { label: "Create Product", icon: <AiOutlineFolderAdd size={20} />, path: "/dashboard-create-product" },
      { label: "All Events", icon: <MdOutlineLocalOffer size={20} />, path: "/dashboard-events" },
      { label: "Create Event", icon: <VscNewFile size={20} />, path: "/dashboard-create-event" },
      { label: "Withdraw Money", icon: <CiMoneyBill size={20} />, path: "/dashboard-withdraw-money" },
      { label: "Shop Inbox", icon: <BiMessageSquareDetail size={20} />, path: "/dashboard-messages" },
      { label: "Discount Codes", icon: <AiOutlineGift size={20} />, path: "/dashboard-coupouns" },
      { label: "Refunds", icon: <HiOutlineReceiptRefund size={20} />, path: "/dashboard-refunds" },
      { label: "Settings", icon: <CiSettings size={20} />, path: "/settings" },
    ];
  } else if (isUserAdmin) {
    menuTitle = "Admin Panel";
    avatarUrl = user ? `${backend_url}${user.avatar}` : "";
    name = user ? user.name : "Admin";
    subText = "Administrator";
    logoutType = "user";
    menuItems = [
      { label: "Dashboard", icon: <RxDashboard size={20} />, path: "/admin/dashboard" },
      { label: "All Orders", icon: <FiShoppingBag size={20} />, path: "/admin-orders" },
      { label: "All Sellers", icon: <GrWorkshop size={20} />, path: "/admin-sellers" },
      { label: "All Users", icon: <HiOutlineUserGroup size={20} />, path: "/admin-users" },
      { label: "All Products", icon: <BsHandbag size={20} />, path: "/admin-products" },
      { label: "All Events", icon: <MdOutlineLocalOffer size={20} />, path: "/admin-events" },
      { label: "Withdraw Request", icon: <CiMoneyBill size={20} />, path: "/admin-withdraw-request" },
      { label: "Profile Settings", icon: <AiOutlineSetting size={20} />, path: "/profile?active=1" },
    ];
  } else if (isAuthenticated) {
    menuTitle = "My Profile";
    avatarUrl = user ? `${backend_url}${user.avatar}` : "";
    name = user ? user.name : "Customer";
    subText = user ? user.email : "";
    logoutType = "user";
    menuItems = [
      { label: "Profile", icon: <RxPerson size={20} />, path: "/profile?active=1" },
      { label: "Orders", icon: <HiOutlineShoppingBag size={20} />, path: "/profile?active=2" },
      { label: "Refunds", icon: <HiOutlineReceiptRefund size={20} />, path: "/profile?active=3" },
      { label: "Inbox", icon: <AiOutlineMessage size={20} />, path: "/inbox" },
      { label: "Track Order", icon: <MdOutlineTrackChanges size={20} />, path: "/profile?active=5" },
      { label: "Change Password", icon: <RiLockPasswordLine size={20} />, path: "/profile?active=6" },
      { label: "Address", icon: <TbAddressBook size={20} />, path: "/profile?active=7" },
    ];
  }

  const logoutHandler = async () => {
    try {
      if (logoutType === "seller") {
        await axios.get(`${server}/shop/logout`, { withCredentials: true });
        toast.success("Logged out from shop successfully!");
      } else {
        const res = await axios.get(`${server}/user/logout`, { withCredentials: true });
        toast.success(res.data.message || "Logged out successfully!");
      }
      localStorage.removeItem("vendoz_pincode");
      setOpenProfileDrawer(false);
      
      // Delay briefly to allow toast to render before page reload
      setTimeout(() => {
        window.location.reload(true);
        navigate("/login");
      }, 500);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-slate-900/60 backdrop-blur-sm h-screen z-[999] transition-opacity duration-300">
      <div className="fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white flex flex-col justify-between shadow-2xl z-[1000] border-l border-slate-100 transition-transform duration-300 animate-[slideInRight_0.2s_ease-out]">
        
        {/* Drawer Content */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
            <h3 className="text-lg font-bold text-[#1A1A2E] tracking-wide">
              {menuTitle}
            </h3>
            <button
              onClick={() => setOpenProfileDrawer(false)}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-950 transition-colors"
              aria-label="Close menu"
            >
              <RxCross1 size={18} />
            </button>
          </div>

          {/* User Info Card */}
          {(isAuthenticated || isSeller) && (
            <div className="px-6 py-5 bg-slate-50/50 border-b border-slate-100 flex items-center gap-4 shrink-0">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-amber-400/60"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xl border-2 border-amber-400/60">
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-slate-800 text-base truncate leading-snug">
                  {name}
                </span>
                <span className="text-xs text-slate-400 truncate mt-0.5">
                  {subText}
                </span>
              </div>
            </div>
          )}

          {/* Menu Items List */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setOpenProfileDrawer(false)}
                className="flex items-center gap-3.5 px-4.5 py-3 rounded-xl text-slate-650 hover:bg-[#FEF9F0] hover:text-[#1A1A2E] transition-all duration-200 group"
              >
                <div className="text-slate-400 group-hover:text-amber-500 transition-colors shrink-0">
                  {item.icon}
                </div>
                <span className="text-[14px] font-semibold tracking-wide">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer (Logout) */}
        {(isAuthenticated || isSeller) && (
          <div className="p-5 border-t border-slate-100 bg-slate-50/50 shrink-0">
            <button
              onClick={logoutHandler}
              className="w-full h-[48px] bg-rose-50 hover:bg-rose-100 border border-rose-200/50 text-rose-600 font-bold rounded-xl transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2.5"
            >
              <AiOutlineLogin size={18} />
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDrawer;
