import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const navItems = [
    { id: 1, label: "Dashboard", icon: RxDashboard, to: "/dashboard" },
    { id: 2, label: "All Orders", icon: FiShoppingBag, to: "/dashboard-orders" },
    { id: 3, label: "All Products", icon: FiPackage, to: "/dashboard-products" },
    { id: 4, label: "Create Product", icon: AiOutlineFolderAdd, to: "/dashboard-create-product" },
    { id: 5, label: "All Events", icon: MdOutlineLocalOffer, to: "/dashboard-events" },
    { id: 6, label: "Create Event", icon: VscNewFile, to: "/dashboard-create-event" },
    { id: 7, label: "Withdraw Money", icon: CiMoneyBill, to: "/dashboard-withdraw-money" },
    { id: 8, label: "Shop Inbox", icon: BiMessageSquareDetail, to: "/dashboard-messages" },
    { id: 9, label: "Discount Codes", icon: AiOutlineGift, to: "/dashboard-coupouns" },
    { id: 10, label: "Refunds", icon: HiOutlineReceiptRefund, to: "/dashboard-refunds" },
    { id: 11, label: "Settings", icon: CiSettings, to: "/settings" },
];

const DashboardSideBar = ({ active }) => {
    return (
        <div className="w-full h-[90vh] dashboard-sidebar overflow-y-auto sticky top-0 left-0 z-10 py-4">
            {/* Logo Area Spacer */}
            <div className="px-5 mb-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                    Seller Dashboard
                </p>
            </div>

            {/* Navigation */}
            <nav className="space-y-[2px]">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    // Add divider before "Withdraw Money" and "Settings"
                    const showDivider = item.id === 7 || item.id === 11;
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

export default DashboardSideBar;