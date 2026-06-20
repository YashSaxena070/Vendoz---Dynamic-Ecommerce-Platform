import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import axios from "axios";
import { server, backend_url } from "../../server";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const sidebarItems = [
  { id: 1, label: "Profile", icon: RxPerson },
  { id: 2, label: "Orders", icon: HiOutlineShoppingBag },
  { id: 3, label: "Refunds", icon: HiOutlineReceiptRefund },
  { id: 4, label: "Inbox", icon: AiOutlineMessage, navigateTo: "/inbox" },
  { id: 5, label: "Track Order", icon: MdOutlineTrackChanges },
  { id: 6, label: "Change Password", icon: RiLockPasswordLine },
  { id: 7, label: "Address", icon: TbAddressBook },
];

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        localStorage.removeItem("vendoz_pincode");
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="w-full dashboard-sidebar rounded-2xl p-3 pt-4 min-h-[70vh]">
      {/* User Card */}
      <div className="sidebar-user-card">
        <img
          src={`${backend_url}${user?.avatar}`}
          alt={user?.name}
        />
        <div className="800px:block hidden">
          <div className="user-name">{user?.name}</div>
          <div className="user-email">{user?.email}</div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="py-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`sidebar-item ${active === item.id ? "active" : ""}`}
              onClick={() => {
                setActive(item.id);
                if (item.navigateTo) navigate(item.navigateTo);
              }}
            >
              <Icon size={20} className="sidebar-icon" />
              <span className="sidebar-label 800px:block hidden">
                {item.label}
              </span>
            </div>
          );
        })}

        {/* Admin Dashboard Link */}
        {user && (user?.role === "Admin" || user?.role === "admin") && (
          <Link to="/admin/dashboard" style={{ textDecoration: "none" }}>
            <div
              className={`sidebar-item ${active === 8 ? "active" : ""}`}
              onClick={() => setActive(8)}
            >
              <MdOutlineAdminPanelSettings size={20} className="sidebar-icon" />
              <span className="sidebar-label 800px:block hidden">
                Admin Dashboard
              </span>
            </div>
          </Link>
        )}

        {/* Divider */}
        <div className="mx-4 my-3 border-t border-[#EDE8E0]/60" />

        {/* Logout */}
        <div
          className="sidebar-item hover:!bg-red-50 hover:!text-red-500"
          onClick={logoutHandler}
        >
          <AiOutlineLogin size={20} className="sidebar-icon" />
          <span className="sidebar-label 800px:block hidden">
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
