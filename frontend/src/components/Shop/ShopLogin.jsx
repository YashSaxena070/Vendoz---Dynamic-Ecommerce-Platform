import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";


const ShopLogin = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [visible, setVisible] = useState(false)




    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios
            .post(
                `${server}/shop/login-shop`,
                {
                    email,
                    password,
                },
                { withCredentials: true }
            ).then((res) => {
                toast.success("Login Sucess!")
                navigate("/dashboard")
                window.location.reload(true);
            })
            .catch((err) => {
                const message = err.response?.data?.message || err.message;
                toast.error(message);
                if (message.includes("blocked") || message.includes("ACCOUNT_BLOCKED")) {
                    navigate("/blocked?type=seller");
                }
            });
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900 tracking-tight">
                    Login to your Shop
                </h2>
                <p className="mt-2 text-center text-sm text-slate-500">
                    Access your merchant dashboard to manage products and orders.
                </p>
            </div>
            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                <div className='bg-white py-10 px-8 border border-slate-100/80 shadow-xl shadow-slate-200/40 sm:rounded-2xl sm:px-10'>
                    <form className='space-y-6' onSubmit={handleSubmit} >
                        {/* Email */}
                        <div>
                            <label htmlFor="email"
                                className='block text-sm font-medium text-slate-700'
                            >
                                Email address
                            </label>
                            <div className='mt-1.5'>
                                <input type="email"
                                    name='email'
                                    autoComplete='email'
                                    required
                                    placeholder='Please enter valid email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='appearance-none block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 sm:text-sm transition-all duration-200'
                                />

                            </div>
                        </div>
                        {/* Password */}
                        <div>
                            <label htmlFor="password"
                                className='block text-sm font-medium text-slate-700'
                            >
                                Password
                            </label>
                            <div className='mt-1.5 relative'>
                                <input type={visible ? "text" : "password"}
                                    name='password'
                                    autoComplete='password'
                                    required
                                    placeholder='Enter your shop password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='appearance-none block w-full px-4 py-2.5 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 sm:text-sm transition-all duration-200 pr-10'
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
                        {/* password end */}

                        <div className={`${styles.noramlFlex} justify-between`}>
                            <div className={`${styles.noramlFlex}`}>
                                <input
                                    type="checkbox"
                                    name="remember-me"
                                    id="remember-me"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500/20 border-slate-300 rounded-md transition-colors"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-slate-600"
                                >
                                    Remember me
                                </label>
                            </div>
                            <div className='text-sm'>
                                <a
                                    href=".forgot-password"
                                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        <div>
                            <button
                                type='submit'
                                className="group relative w-full h-[45px] flex justify-center items-center py-2 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/15 hover:shadow-lg hover:shadow-blue-500/25 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                            >
                                Sign In
                            </button>
                        </div>

                        <div className={`${styles.noramlFlex} w-full justify-center text-sm text-slate-600`} >
                            <h4>Don't have a shop?</h4>
                            <Link to="/shop-create" className="text-blue-600 pl-2 font-medium hover:underline">
                                Register Shop
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ShopLogin






