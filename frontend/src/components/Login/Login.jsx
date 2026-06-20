import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import logo from "../../vendoz-logo-white.svg";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Login Success!");
        sessionStorage.removeItem("vendoz_event_popup_shown");
        navigate("/");
        window.location.reload(true);
      })
      .catch((err) => {
        const message = err.response?.data?.message || err.message;
        toast.error(message);
        if (message.includes("blocked") || message.includes("ACCOUNT_BLOCKED")) {
          navigate("/blocked?type=user");
        }
      });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] aspect-square rounded-full bg-amber-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] aspect-square rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <Link to="/">
            <img src={logo} alt="Vendoz" className="h-10 cursor-pointer" />
          </Link>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-slate-100 tracking-tight">
          Login to your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Welcome back! Please enter your details.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-slate-900/40 backdrop-blur-xl py-10 px-8 border border-slate-800/80 shadow-2xl sm:rounded-3xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-slate-400 uppercase tracking-wider"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 bg-slate-950/50 border border-slate-800 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/10 text-slate-100 placeholder-slate-600 rounded-xl sm:text-sm transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-slate-400 uppercase tracking-wider"
              >
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 bg-slate-950/50 border border-slate-800 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/10 text-slate-100 placeholder-slate-600 rounded-xl sm:text-sm transition-all duration-200 pr-10"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-3.5 top-3.5 cursor-pointer text-slate-500 hover:text-slate-300 transition-colors"
                    size={18}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-3.5 top-3.5 cursor-pointer text-slate-500 hover:text-slate-300 transition-colors"
                    size={18}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-amber-500 focus:ring-amber-500/20 bg-slate-950 border-slate-800 rounded transition-colors"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-slate-400"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#forgot"
                  className="font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full h-[48px] flex justify-center items-center py-2 px-4 border border-transparent text-sm font-bold rounded-xl text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-[0.98] shadow-lg shadow-amber-500/10 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-200 cursor-pointer"
              >
                Sign In
              </button>
            </div>

            <div className="w-full flex justify-center text-sm text-slate-400 pt-2">
              <h4>Don't have an account?</h4>
              <Link
                to="/sign-up"
                className="text-amber-400 pl-2 font-bold hover:underline transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;