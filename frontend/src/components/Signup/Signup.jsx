import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import logo from "../../vendoz-logo-white.svg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);

    axios
      .post(`${server}/user/create-user`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar(null);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message);
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
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400">
          Join us today to get started.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-slate-900/40 backdrop-blur-xl py-10 px-8 border border-slate-800/80 shadow-2xl sm:rounded-3xl sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="text"
                className="block text-xs font-bold text-slate-400 uppercase tracking-wider"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="text"
                  autoComplete="text"
                  required
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 bg-slate-950/50 border border-slate-800 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/10 text-slate-100 placeholder-slate-600 rounded-xl sm:text-sm transition-all duration-200"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-slate-400 uppercase tracking-wider"
              >
                Email Address
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
                  placeholder="Create a password"
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

            {/* Profile Picture */}
            <div>
              <label
                htmlFor="avatar"
                className="block text-xs font-bold text-slate-400 uppercase tracking-wider"
              >
                Profile Picture
              </label>
              <div className="mt-2.5 flex items-center gap-4">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden border border-slate-800 bg-slate-950 flex-shrink-0 flex items-center justify-center">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-full w-full text-slate-700" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="flex items-center justify-center px-4 py-2 border border-slate-800 rounded-xl shadow-sm text-sm font-medium text-slate-300 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  <span>Choose Photo</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full h-[48px] flex justify-center items-center py-2 px-4 border border-transparent text-sm font-bold rounded-xl text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-[0.98] shadow-lg shadow-amber-500/10 hover:shadow-xl hover:shadow-amber-500/20 transition-all duration-200 cursor-pointer"
              >
                Register
              </button>
            </div>

            <div className="w-full flex justify-center text-sm text-slate-400 pt-2">
              <h4>Already have an account?</h4>
              <Link
                to="/login"
                className="text-amber-400 pl-2 font-bold hover:underline transition-colors"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
