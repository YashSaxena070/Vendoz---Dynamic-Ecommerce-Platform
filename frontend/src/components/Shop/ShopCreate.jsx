import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { RxAvatar } from 'react-icons/rx';


const ShopCreate = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState();
    const [address, setAddress] = useState("");
    const [zipCode, setZipCode] = useState();
    const [avatar, setAvatar] = useState();
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = { headers: { "Content-Type": "multipart/form-data" } };
        // meaning of uper line is that we are creating a new object with the name of config and the value of config is {headers:{'Content-Type':'multipart/form-data'}}  

        const newForm = new FormData();
        // meaning of uper line is that we are creating a new form data object and we are sending it to the backend with the name of newForm and the value of newForm is new FormData()
        newForm.append("file", avatar);
        // meanin of newForm.append("file",avatar) is that we are sending a file to the backend with the name of file and the value of the file is avatar
        newForm.append("name", name);
        newForm.append("email", email);
        newForm.append("password", password);
        newForm.append("zipCode", zipCode);
        newForm.append("address", address);
        newForm.append("phoneNumber", phoneNumber);

        axios
            .post(`${server}/shop/create-shop`, newForm, config)
            .then((res) => {
                toast.success(res.data.message);
                setName("");
                setEmail("");
                setPassword("");
                setAvatar();
                setZipCode();
                setAddress("");
                setPhoneNumber();
                navigate("/shop-login");
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || error.message);
            });



    }
    // File upload
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        setAvatar(file);
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
                    Register as a Seller
                </h2>
                <p className="mt-2 text-center text-sm text-slate-500">
                    Open your store today and start selling on Vendoz.
                </p>
            </div>
            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-[36rem]'>
                <div className='bg-white py-10 px-8 border border-slate-100/80 shadow-xl shadow-slate-200/40 sm:rounded-2xl sm:px-10'>
                    <form className='space-y-6' onSubmit={handleSubmit} >
                        {/* Shop Name */}
                        <div>
                            <label htmlFor="name"
                                className='block text-sm font-medium text-slate-700'
                            >
                                Shop Name
                            </label>
                            <div className='mt-1.5'>
                                <input type="text"
                                    name='name'
                                    required
                                    placeholder="Enter your store name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className='appearance-none block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 sm:text-sm transition-all duration-200'
                                />
                            </div>
                        </div>
                        {/* Phone number */}
                        <div>
                            <label htmlFor="phone-number"
                                className='block text-sm font-medium text-slate-700'
                            >
                                Phone Number
                            </label>
                            <div className='mt-1.5 relative'>
                                <input
                                    type="number"
                                    name='phone-number'
                                    required
                                    placeholder="e.g. 1234567890"
                                    value={phoneNumber || ''}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className='appearance-none block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 sm:text-sm transition-all duration-200'
                                />
                            </div>
                        </div>
                        {/* Phone number end */}

                        {/* Email start */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-slate-700"
                            >
                                Email Address
                            </label>
                            <div className="mt-1.5">
                                <input
                                    type="email"
                                    name="email"
                                    autoComplete="email"
                                    required
                                    placeholder="Enter shop email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label
                                htmlFor="address"
                                className="block text-sm font-medium text-slate-700"
                            >
                                Address
                            </label>
                            <div className="mt-1.5">
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    placeholder="Shop business address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="appearance-none block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* ZipCode */}
                        <div>
                            <label
                                htmlFor="zipcode"
                                className="block text-sm font-medium text-slate-700"
                            >
                                Zip Code
                            </label>
                            <div className="mt-1.5">
                                <input
                                    type="number"
                                    name="zipcode"
                                    required
                                    placeholder="6 digit postal code"
                                    value={zipCode || ''}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    className="appearance-none block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 sm:text-sm transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-slate-700"
                            >
                                Password
                            </label>
                            <div className="mt-1.5 relative">
                                <input
                                    type={visible ? "text" : "password"}
                                    name="password"
                                    autoComplete="current-password"
                                    required
                                    placeholder="Create store password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 sm:text-sm transition-all duration-200 pr-10"
                                />
                                {visible ? (
                                    <AiOutlineEye
                                        className="absolute right-3 top-3 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
                                        size={20}
                                        onClick={() => setVisible(false)}
                                    />
                                ) : (
                                    <AiOutlineEyeInvisible
                                        className="absolute right-3 top-3 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
                                        size={20}
                                        onClick={() => setVisible(true)}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Logo Upload */}
                        <div>
                            <label
                                htmlFor="avatar"
                                className="block text-sm font-medium text-slate-700"
                            >
                                Shop Logo / Banner
                            </label>
                            <div className="mt-2.5 flex items-center gap-4">
                                <span className="inline-block h-12 w-12 rounded-full overflow-hidden border border-slate-200 bg-slate-50 flex-shrink-0">
                                    {avatar ? (
                                        <img
                                            src={URL.createObjectURL(avatar)}
                                            alt="avatar"
                                            className="h-full w-full object-cover rounded-full"
                                        />
                                    ) : (
                                        <RxAvatar className="h-full w-full text-slate-300" />
                                    )}
                                </span>
                                <label
                                    htmlFor="file-input"
                                    className="flex items-center justify-center px-4 py-2 border border-slate-200 rounded-xl shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                                >
                                    <span>Choose Logo</span>
                                    <input
                                        type="file"
                                        name="avatar"
                                        id="file-input"
                                        onChange={handleFileInputChange}
                                        className="sr-only"
                                    />
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                className="group relative w-full h-[45px] flex justify-center items-center py-2 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/15 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                            >
                                Register
                            </button>
                        </div>

                        <div className={`${styles.noramlFlex} w-full justify-center text-sm text-slate-600`} >
                            <h4>Already have a merchant account?</h4>
                            <Link to="/shop-login" className="text-blue-600 pl-2 font-medium hover:underline">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ShopCreate





