import React, { useEffect, useState } from 'react'
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from 'react-redux';
import {
    deleteUserAddress,
    loadUser,
    updatUserAddress,
    updateUserInformation,
} from "../../redux/actions/user";
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { RxCross1 } from 'react-icons/rx'
import { MdTrackChanges } from "react-icons/md";
import { toast } from "react-toastify";
import axios from 'axios';
import { Country, State } from "country-state-city";
import { getAllOrdersOfUser } from '../../redux/actions/order';


const ProfileContent = ({ active }) => {
    const { user, error, successMessage } = useSelector((state) => state.user);
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
    const [password, setPassword] = useState("");


    const dispatch = useDispatch();


    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch({ type: "clearErrors" });
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch({ type: "clearMessages" });
        }
    }, [error, successMessage, dispatch]);


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserInformation(name, email, phoneNumber, password));
    }

    // Image update
    const handleImage = async (e) => {
        const formData = new FormData();

        formData.append("image", e.target.files[0]);

        await axios
            .put(`${server}/user/update-avatar`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            })
            .then((response) => {
                dispatch(loadUser());
                toast.success("avatar updated successfully!");
            })
            .catch((error) => {
                toast.error(error);
            });
    };


    return (
        <div className='w-full'>
            {/* Profile */}
            {
                active === 1 && (
                    <div className="bg-white rounded-2xl border border-[#EDE8E0] p-6 800px:p-10">
                        {/* Avatar Section */}
                        <div className="flex justify-center w-full mb-8">
                            <div className="avatar-ring">
                                <img src={`${backend_url}${user?.avatar}`}
                                    className="w-[130px] h-[130px]"
                                    alt="profile img" />
                                <div className="camera-btn">
                                    <input type="file"
                                        id="image"
                                        className="hidden"
                                        onChange={handleImage}
                                    />
                                    <label htmlFor="image" className="cursor-pointer flex items-center justify-center w-full h-full">
                                        <AiOutlineCamera size={16} />
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className='w-full grid grid-cols-1 800px:grid-cols-2 gap-6 mb-6'>
                                <div>
                                    <label className='premium-label'>Full Name</label>
                                    <input type="text"
                                        className="premium-input"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className='premium-label'>Email Address</label>
                                    <input type="text"
                                        className="premium-input"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="w-full grid grid-cols-1 800px:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className="premium-label">Phone Number</label>
                                    <input
                                        type="number"
                                        className="premium-input"
                                        required
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="premium-label">Enter your password</label>
                                    <input
                                        type="password"
                                        className="premium-input"
                                        required
                                        value={password}
                                        placeholder="Required to save changes"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="btn-premium"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                )
            }

            {/* Orders */}
            {
                active === 2 && (
                    <div>
                        <AllOrders />
                    </div>
                )
            }

            {/* Refund order */}
            {
                active === 3 && (
                    <div>
                        <AllRefundOrders />
                    </div>
                )
            }

            {/* Track order */}
            {active === 5 && (
                <div>
                    <TrackOrder />
                </div>
            )}

            {/* Change Password */}
            {active === 6 && (
                <div>
                    <ChangePassword />
                </div>
            )}

            {/* user Address */}
            {active === 7 && (
                <div>
                    <Address />
                </div>
            )}

        </div >
    )
}

// All orders
const AllOrders = () => {
    const { user } = useSelector((state) => state.user);

    const { orders } = useSelector((state) => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrdersOfUser(user._id));
    }, [dispatch, user._id]);

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
                        <Link to={`/user/order/${params.id}`}>
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

    orders &&
        orders.forEach((item) => {
            row.push({
                id: item._id,
                itemsQty: item.cart.length,
                total: "US$ " + item.totalPrice,
                status: item.status,
            });
        });


    return (
        <div className="bg-white rounded-2xl border border-[#EDE8E0] overflow-hidden">
            <div className="page-container">
                <div className="page-header">
                    <h2 className="section-title">My Orders</h2>
                    <span className="count-badge">{row.length}</span>
                </div>
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
    )
}

// Refund page
const AllRefundOrders = () => {
    const { user } = useSelector((state) => state.user);
    const { orders } = useSelector((state) => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrdersOfUser(user._id));
    }, [dispatch, user._id]);

    const eligibleOrders = orders && orders.filter((item) => item.status === "Processing refund");

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
                        <Link to={`/user/order/${params.id}`}>
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

    eligibleOrders &&
        eligibleOrders.forEach((item) => {
            row.push({
                id: item._id,
                itemsQty: item.cart.length,
                total: "US$ " + item.totalPrice,
                status: item.status,
            });
        });

    return (
        <div className="bg-white rounded-2xl border border-[#EDE8E0] overflow-hidden">
            <div className="page-container">
                <div className="page-header">
                    <h2 className="section-title">Refund Orders</h2>
                    <span className="count-badge">{row.length}</span>
                </div>
            </div>
            <div className="data-grid-premium px-4 pb-4">
                <DataGrid
                    rows={row}
                    columns={columns}
                    pageSize={10}
                    autoHeight
                    disableSelectionOnClick
                />
            </div>
        </div>
    );
};


// Track order
const TrackOrder = () => {

    const { user } = useSelector((state) => state.user);
    const { orders } = useSelector((state) => state.order);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllOrdersOfUser(user._id));
    }, [dispatch, user._id]);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
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
                        <Link to={`/user/track/order/${params.id}`}>
                            <Button>
                                <MdTrackChanges size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ];

    const row = []

    orders &&
        orders.forEach((item) => {
            row.push({
                id: item._id,
                itemsQty: item.cart.length,
                total: "US$ " + item.totalPrice,
                status: item.status,
            });
        });

    return (
        <div className="bg-white rounded-2xl border border-[#EDE8E0] overflow-hidden">
            <div className="page-container">
                <div className="page-header">
                    <h2 className="section-title">Track Orders</h2>
                    <span className="count-badge">{row.length}</span>
                </div>
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
    )
}


// Change Password
const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const passwordChangeHandler = async (e) => {
        e.preventDefault();

        await axios
            .put(
                `${server}/user/update-user-password`,
                { oldPassword, newPassword, confirmPassword },
                { withCredentials: true }
            )
            .then((res) => {
                toast.success("Password updated successfully!");
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    return (
        <div className="bg-white rounded-2xl border border-[#EDE8E0] p-6 800px:p-10 max-w-[600px] mx-auto">
            <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h2 className="section-title !text-[22px]">Change Password</h2>
                <p className="text-sm text-slate-400 mt-3">
                    Choose a strong password to protect your account
                </p>
            </div>

            <form
                onSubmit={passwordChangeHandler}
                className="space-y-5"
            >
                <div>
                    <label className='premium-label'>Current Password</label>
                    <input type="password"
                        className="premium-input"
                        required
                        placeholder="Enter current password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label className='premium-label'>New Password</label>
                    <input type="password"
                        className="premium-input"
                        required
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label className="premium-label">Confirm New Password</label>
                    <input
                        type="password"
                        className="premium-input"
                        required
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="btn-premium w-full mt-4"
                >
                    Update Password
                </button>
            </form>
        </div>
    )
}

// Address
const Address = () => {

    const [open, setOpen] = useState(false);
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState();
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [addressType, setAddressType] = useState("");
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();


    const addressTypeData = [
        { name: "Default" },
        { name: "Home" },
        { name: "Office" },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (addressType === "" || country === "" || city === "") {
            toast.error("Please fill all the fields!");
        } else {
            dispatch(
                updatUserAddress(
                    country,
                    city,
                    address1,
                    address2,
                    zipCode,
                    addressType
                )
            );
            setOpen(false);
            setCountry("");
            setCity("");
            setAddress1("");
            setAddress2("");
            setZipCode(null);
            setAddressType("");
        }
    }

    const handleDelete = (item) => {
        const id = item._id;
        dispatch(deleteUserAddress(id));
    }

    return (
        <div className='w-full'>
            {/* Add Address Modal */}
            {open && (
                <div className="modal-overlay" onClick={() => setOpen(false)}>
                    <div
                        className="modal-content w-[90%] 800px:w-[480px] p-0"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 pb-4 border-b border-[#EDE8E0]">
                            <h3 className="text-lg font-bold text-[#1A1A2E]">Add New Address</h3>
                            <button
                                className="btn-delete"
                                onClick={() => setOpen(false)}
                            >
                                <RxCross1 size={18} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="premium-label">Country</label>
                                <select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="premium-select"
                                >
                                    <option value="">Choose your country</option>
                                    {Country &&
                                        Country.getAllCountries().map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div>
                                <label className="premium-label">City / State</label>
                                <select
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="premium-select"
                                >
                                    <option value="">Choose your city</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            <div>
                                <label className="premium-label">Address 1</label>
                                <input
                                    type="address"
                                    className="premium-input"
                                    required
                                    placeholder="Street address"
                                    value={address1}
                                    onChange={(e) => setAddress1(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="premium-label">Address 2</label>
                                <input
                                    type="address"
                                    className="premium-input"
                                    required
                                    placeholder="Apartment, suite, etc."
                                    value={address2}
                                    onChange={(e) => setAddress2(e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="premium-label">Zip Code</label>
                                    <input
                                        type="number"
                                        className="premium-input"
                                        required
                                        placeholder="000000"
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className='premium-label'>Address Type</label>
                                    <select
                                        value={addressType}
                                        onChange={(e) => setAddressType(e.target.value)}
                                        className="premium-select"
                                    >
                                        <option value="">Choose type</option>
                                        {addressTypeData.map((item) => (
                                            <option key={item.name} value={item.name}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <button type="submit" className="btn-premium w-full mt-2">
                                Save Address
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="bg-white rounded-2xl border border-[#EDE8E0] p-6">
                <div className='flex w-full items-center justify-between mb-6'>
                    <h2 className="section-title">My Addresses</h2>
                    <button className="btn-premium" onClick={() => setOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Add New
                    </button>
                </div>

                {/* Address List */}
                {user &&
                    user.addresses.map((item, index) => (
                        <div className="address-card" key={index}>
                            <div className="flex-shrink-0">
                                <span className="address-type-badge">{item.addressType}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[#1A1A2E] truncate">
                                    {item.address1} {item.address2}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">
                                    {user && user.phoneNumber}
                                </p>
                            </div>
                            <button
                                className="btn-delete flex-shrink-0"
                                onClick={() => handleDelete(item)}
                            >
                                <AiOutlineDelete size={18} />
                            </button>
                        </div>
                    ))}

                {user && user.addresses.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-50 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <p className="text-slate-400 font-medium">No saved addresses yet</p>
                        <p className="text-sm text-slate-300 mt-1">Add your first address to get started</p>
                    </div>
                )}
            </div>
        </div>
    )

}


export default ProfileContent