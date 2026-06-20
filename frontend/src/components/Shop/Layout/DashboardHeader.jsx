import React from "react";
import logo from "../../../vendoz-logo.svg";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { backend_url } from "../../../server";

const headerLinks = [
    { to: "/dashboard/cupouns", icon: AiOutlineGift, label: "Coupons" },
    { to: "/dashboard-events", icon: MdOutlineLocalOffer, label: "Events" },
    { to: "/dashboard-products", icon: FiShoppingBag, label: "Products" },
    { to: "/dashboard-orders", icon: FiPackage, label: "Orders" },
    { to: "/dashboard-messages", icon: BiMessageSquareDetail, label: "Messages" },
];

const DashboardHeader = () => {
    const { seller } = useSelector((state) => state.seller);
    return (
        <div className="w-full h-[70px] dashboard-header sticky top-0 left-0 z-30 flex items-center justify-between px-6">
            <div>
                <Link to="/">
                    <img
                        src={logo}
                        alt="Vendoz"
                        className="h-9"
                    />
                </Link>
            </div>
            <div className="flex items-center gap-1">
                {headerLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="header-icon-link 800px:flex hidden"
                            title={link.label}
                        >
                            <Icon size={20} />
                        </Link>
                    );
                })}
                <div className="ml-3">
                    <Link to={`/shop/${seller._id}`}>
                        <img
                            src={`${backend_url}${seller.avatar}`}
                            alt={seller.name}
                            className="header-avatar"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;