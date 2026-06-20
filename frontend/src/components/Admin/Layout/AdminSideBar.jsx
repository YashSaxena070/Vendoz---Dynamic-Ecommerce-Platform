import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";

const navItems = [
  { id: 1, label: "Dashboard", icon: RxDashboard, to: "/admin/dashboard" },
  { id: 2, label: "All Orders", icon: FiShoppingBag, to: "/admin-orders" },
  { id: 3, label: "All Sellers", icon: GrWorkshop, to: "/admin-sellers" },
  { id: 4, label: "All Users", icon: HiOutlineUserGroup, to: "/admin-users" },
  { id: 5, label: "All Products", icon: BsHandbag, to: "/admin-products" },
  { id: 6, label: "All Events", icon: MdOutlineLocalOffer, to: "/admin-events" },
  { id: 7, label: "Withdraw Request", icon: CiMoneyBill, to: "/admin-withdraw-request" },
  { id: 8, label: "Settings", icon: AiOutlineSetting, to: "/profile" },
];

const AdminSideBar = ({ active }) => {
  return (
    <div className="w-full h-[90vh] dashboard-sidebar overflow-y-auto sticky top-0 left-0 z-10 py-4">
      {/* Title */}
      <div className="px-5 mb-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
          Admin Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-[2px]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const showDivider = item.id === 7 || item.id === 8;
          return (
            <React.Fragment key={item.id}>
              {showDivider && (
                <div className="mx-5 my-2 border-t border-[#EDE8E0]/60" />
              )}
              <Link to={item.to} style={{ textDecoration: "none" }}>
                <div
                  className={`sidebar-item ${active === item.id ? "active" : ""}`}
                >
                  <Icon size={20} className="sidebar-icon" />
                  <span className="sidebar-label hidden 800px:block">
                    {item.label}
                  </span>
                </div>
              </Link>
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSideBar;
