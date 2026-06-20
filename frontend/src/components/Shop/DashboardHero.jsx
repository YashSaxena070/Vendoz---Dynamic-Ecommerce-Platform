import React, { useEffect } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdBorderClear } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { getAllProductsShop } from "../../redux/actions/product";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

const DashboardHero = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.order);
    const { seller } = useSelector((state) => state.seller);
    const { products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getAllOrdersOfShop(seller._id));
        dispatch(getAllProductsShop(seller._id));
    }, [dispatch, seller._id]);

    const availableBalance = seller?.availableBalance.toFixed(2);

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
            field: " ",
            flex: 1,
            minWidth: 150,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/order/${params.id}`}>
                            <Button>
                                <AiOutlineArrowRight size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ];

    const row = [];

    orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
            total: "US$ " + item.totalPrice,
            status: item.status,
        });
    });

    return (
        <div className="w-full page-container">
            {/* Page Title */}
            <div className="mb-8">
                <h1 className="text-[24px] font-[800] text-[#1A1A2E] tracking-tight">
                    Welcome back, {seller?.name} 👋
                </h1>
                <p className="text-sm text-slate-400 mt-1">
                    Here's what's happening with your store today
                </p>
            </div>

            {/* Stat Cards */}
            <div className="w-full grid grid-cols-1 800px:grid-cols-3 gap-5 mb-8">
                {/* Balance Card */}
                <div className="stat-card">
                    <div className="stat-icon amber">
                        <AiOutlineMoneyCollect size={24} />
                    </div>
                    <p className="stat-label">Account Balance</p>
                    <h3 className="stat-value">${availableBalance}</h3>
                    <p className="text-[11px] text-slate-400 -mt-2 mb-3">After 10% service charge</p>
                    <Link to="/dashboard-withdraw-money">
                        <span className="stat-link">
                            Withdraw Money
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
                    <h3 className="stat-value">{orders && orders.length}</h3>
                    <Link to="/dashboard-orders">
                        <span className="stat-link">
                            View Orders
                            <AiOutlineArrowRight size={14} />
                        </span>
                    </Link>
                </div>

                {/* Products Card */}
                <div className="stat-card">
                    <div className="stat-icon emerald">
                        <FiPackage size={24} />
                    </div>
                    <p className="stat-label">All Products</p>
                    <h3 className="stat-value">{products && products.length}</h3>
                    <Link to="/dashboard-products">
                        <span className="stat-link">
                            View Products
                            <AiOutlineArrowRight size={14} />
                        </span>
                    </Link>
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
                        pageSize={10}
                        disableSelectionOnClick
                        autoHeight
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardHero;