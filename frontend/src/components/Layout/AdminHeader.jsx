import React from "react";
import logo from "../../vendoz-logo.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { backend_url } from "../../server";

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);

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
        <div className="ml-3">
          <img
            src={`${backend_url}${user?.avatar}`}
            alt={user?.name}
            className="header-avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
