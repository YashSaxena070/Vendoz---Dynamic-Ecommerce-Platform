import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { HiOutlineUserGroup } from "react-icons/hi";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../redux/actions/order";
import Loader from "../Layout/Loader";
import { getAllSellers } from "../../redux/actions/sellers";

const AdminDashboardMain = () => {
  const dispatch = useDispatch();

  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.order
  );
  const { sellers } = useSelector((state) => state.seller);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
  }, [dispatch]);

  const adminEarning =
    adminOrders &&
    adminOrders.reduce((acc, item) => acc + item.totalPrice * 0.1, 0);

  const adminBalance = adminEarning?.toFixed(2);

  const [analyticsType, setAnalyticsType] = useState("daily");

  // Calculate daily analytics (last 7 days)
  const getDailyAnalytics = () => {
    const data = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().slice(0, 10);
      data[dateString] = { sales: 0, commission: 0, orders: 0 };
    }

    adminOrders &&
      adminOrders.forEach((order) => {
        const dateString = order.createdAt.slice(0, 10);
        if (data[dateString]) {
          data[dateString].sales += order.totalPrice;
          data[dateString].commission += order.totalPrice * 0.1;
          data[dateString].orders += 1;
        }
      });

    return Object.keys(data).map((date) => ({
      label: new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
      sales: data[date].sales,
      commission: data[date].commission,
      orders: data[date].orders,
    }));
  };

  // Calculate monthly analytics (current year months)
  const getMonthlyAnalytics = () => {
    const data = {};
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const currentYear = new Date().getFullYear();

    months.forEach((month, index) => {
      const key = `${currentYear}-${String(index + 1).padStart(2, "0")}`;
      data[key] = { label: `${month} ${currentYear}`, sales: 0, commission: 0, orders: 0 };
    });

    adminOrders &&
      adminOrders.forEach((order) => {
        const monthKey = order.createdAt.slice(0, 7);
        if (data[monthKey]) {
          data[monthKey].sales += order.totalPrice;
          data[monthKey].commission += order.totalPrice * 0.1;
          data[monthKey].orders += 1;
        }
      });

    return Object.keys(data).map((key) => ({
      label: data[key].label,
      sales: data[key].sales,
      commission: data[key].commission,
      orders: data[key].orders,
    }));
  };

  // Calculate yearly analytics (last 5 years)
  const getYearlyAnalytics = () => {
    const data = {};
    const currentYear = new Date().getFullYear();
    for (let i = 4; i >= 0; i--) {
      const year = currentYear - i;
      data[year] = { sales: 0, commission: 0, orders: 0 };
    }

    adminOrders &&
      adminOrders.forEach((order) => {
        const year = new Date(order.createdAt).getFullYear();
        if (data[year]) {
          data[year].sales += order.totalPrice;
          data[year].commission += order.totalPrice * 0.1;
          data[year].orders += 1;
        }
      });

    return Object.keys(data).map((year) => ({
      label: String(year),
      sales: data[year].sales,
      commission: data[year].commission,
      orders: data[year].orders,
    }));
  };

  const activeAnalytics =
    analyticsType === "daily"
      ? getDailyAnalytics()
      : analyticsType === "monthly"
      ? getMonthlyAnalytics()
      : getYearlyAnalytics();

  const maxSales = Math.max(...activeAnalytics.map((d) => d.sales), 1);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const row = [];
  adminOrders &&
    adminOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
        total: item?.totalPrice + " $",
        status: item?.status,
        createdAt: item?.createdAt.slice(0, 10),
      });
    });

  return (
    <>
      {adminOrderLoading ? (
        <Loader />
      ) : (
        <div className="w-full page-container">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-[24px] font-[800] text-[#1A1A2E] tracking-tight">
              Admin Overview
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Monitor platform performance and key metrics
            </p>
          </div>

          {/* Stat Cards */}
          <div className="w-full grid grid-cols-1 800px:grid-cols-3 gap-5 mb-8">
            {/* Earnings Card */}
            <div className="stat-card">
              <div className="stat-icon amber">
                <AiOutlineMoneyCollect size={24} />
              </div>
              <p className="stat-label">Total Commission (10%)</p>
              <h3 className="stat-value">$ {adminBalance}</h3>
            </div>

            {/* Sellers Card */}
            <div className="stat-card">
              <div className="stat-icon purple">
                <HiOutlineUserGroup size={24} />
              </div>
              <p className="stat-label">All Sellers</p>
              <h3 className="stat-value">{sellers && sellers.length}</h3>
              <Link to="/admin-sellers">
                <span className="stat-link">
                  View Sellers
                  <AiOutlineArrowRight size={14} />
                </span>
              </Link>
            </div>

            {/* Orders Card */}
            <div className="stat-card">
              <div className="stat-icon blue">
                <MdBorderClear size={24} />
              </div>
              <p className="stat-label">All Orders</p>
              <h3 className="stat-value">{adminOrders && adminOrders.length}</h3>
              <Link to="/admin-orders">
                <span className="stat-link">
                  View Orders
                  <AiOutlineArrowRight size={14} />
                </span>
              </Link>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="bg-white rounded-2xl border border-[#EDE8E0] p-6 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h3 className="section-title !text-[18px]">
                  Sales & Commission Analytics
                </h3>
                <p className="text-xs text-slate-400 mt-3">
                  Track platform sales and your 10% commission fee.
                </p>
              </div>
              <div className="flex bg-[#F5F3EE] rounded-xl p-1 mt-4 sm:mt-0 border border-[#EDE8E0]">
                {["daily", "monthly", "yearly"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setAnalyticsType(type)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 capitalize ${
                      analyticsType === type
                        ? "bg-white text-amber-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Chart visualization */}
              <div className="space-y-4">
                <h4 className="text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Sales Trend ({analyticsType})
                </h4>
                <div className="space-y-3">
                  {activeAnalytics.map((item, index) => {
                    const percentage = (item.sales / maxSales) * 100;
                    return (
                      <div key={index} className="flex items-center group">
                        <span className="w-24 text-xs text-slate-500 font-medium truncate">
                          {item.label}
                        </span>
                        <div className="flex-1 h-3 bg-[#F5F3EE] rounded-full mx-3 overflow-hidden border border-[#EDE8E0]/50">
                          <div
                            className="h-full bg-gradient-to-r from-amber-400 to-orange-400 rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="w-20 text-right text-xs text-slate-700 font-bold">
                          $ {item.sales.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Data Table */}
              <div>
                <h4 className="text-[13px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Detailed Breakdown
                </h4>
                <div className="overflow-x-auto rounded-xl border border-[#EDE8E0]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#FAFAF8] text-slate-400 text-[10px] uppercase tracking-[0.1em] font-bold">
                        <th className="py-3 px-4">Period</th>
                        <th className="py-3 px-4 text-right">Orders</th>
                        <th className="py-3 px-4 text-right">Sales</th>
                        <th className="py-3 px-4 text-right text-emerald-600">
                          Commission
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1EFE9] text-xs text-slate-600 font-medium">
                      {activeAnalytics.map((item, index) => (
                        <tr key={index} className="hover:bg-[#FAFAF8] transition-colors">
                          <td className="py-3 px-4 font-semibold text-[#1A1A2E]">{item.label}</td>
                          <td className="py-3 px-4 text-right text-slate-400">{item.orders}</td>
                          <td className="py-3 px-4 text-right">$ {item.sales.toFixed(2)}</td>
                          <td className="py-3 px-4 text-right text-emerald-600 font-bold">
                            $ {item.commission.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Orders */}
          <div className="bg-white rounded-2xl border border-[#EDE8E0] overflow-hidden">
            <div className="p-6 pb-4">
              <h3 className="section-title">Latest Orders</h3>
            </div>
            <div className="data-grid-premium px-4 pb-4">
              <DataGrid
                rows={row}
                columns={columns}
                pageSize={4}
                disableSelectionOnClick
                autoHeight
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboardMain;
