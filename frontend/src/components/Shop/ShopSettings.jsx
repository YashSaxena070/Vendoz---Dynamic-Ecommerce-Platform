import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";

const ShopSettings = () => {
    const { seller } = useSelector((state) => state.seller);
    const [avatar, setAvatar] = useState();
    const [name, setName] = useState(seller && seller.name);
    const [description, setDescription] = useState(seller && seller.description ? seller.description : "");
    const [address, setAddress] = useState(seller && seller.address);
    const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
    const [zipCode, setZipcode] = useState(seller && seller.zipCode);

    const dispatch = useDispatch();

    // Image updated
    const handleImage = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setAvatar(file);

        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        await axios.put(`${server}/shop/update-shop-avatar`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
        }).then((res) => {
            dispatch(loadSeller());
            toast.success("Avatar updated successfully!")
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    };

    const updateHandler = async (e) => {
        e.preventDefault();

        await axios.put(`${server}/shop/update-seller-info`, {
            name, address, zipCode, phoneNumber, description,
        }, { withCredentials: true }).then((res) => {
            toast.success("Shop info updated successfully!");
            dispatch(loadSeller());
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center py-8 px-4">
            <div className="w-full max-w-[640px]">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-[24px] font-[800] text-[#1A1A2E] tracking-tight">
                        Shop Settings
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Manage your shop profile and information
                    </p>
                </div>

                {/* Settings Card */}
                <div className="bg-white rounded-2xl border border-[#EDE8E0] p-8">
                    {/* Avatar */}
                    <div className="flex justify-center mb-8">
                        <div className="avatar-ring">
                            <img
                                src={avatar ? URL.createObjectURL(avatar) : `${backend_url}/${seller.avatar}`}
                                alt={seller.name}
                                className="w-[140px] h-[140px]"
                            />
                            <div className="camera-btn">
                                <input type="file" id="image" className="hidden" onChange={handleImage} />
                                <label htmlFor="image" className="cursor-pointer flex items-center justify-center w-full h-full">
                                    <AiOutlineCamera size={16} />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={updateHandler} className="space-y-5">
                        <div>
                            <label className="premium-label">Shop Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="premium-input"
                                required
                            />
                        </div>

                        <div>
                            <label className="premium-label">Shop Description</label>
                            <input
                                type="text"
                                placeholder="Enter your shop description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="premium-input"
                            />
                        </div>

                        <div>
                            <label className="premium-label">Shop Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="premium-input"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 800px:grid-cols-2 gap-5">
                            <div>
                                <label className="premium-label">Phone Number</label>
                                <input
                                    type="number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="premium-input"
                                    required
                                />
                            </div>
                            <div>
                                <label className="premium-label">Zip Code</label>
                                <input
                                    type="number"
                                    value={zipCode}
                                    onChange={(e) => setZipcode(e.target.value)}
                                    className="premium-input"
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-premium w-full mt-4">
                            Update Shop
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShopSettings;