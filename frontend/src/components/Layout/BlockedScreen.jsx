import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MdOutlineBlock } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";

const ADMIN_EMAIL = "yashsaxena7668@gmail.com";

const BlockedScreen = ({ type: propType }) => {
  const [searchParams] = useSearchParams();
  const type = propType || searchParams.get("type") || "user";
  return (
    <div className="min-h-screen bg-[#F9F7F4] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#EDE8E0] shadow-xl overflow-hidden">
        {/* Red top bar */}
        <div className="h-2 w-full bg-gradient-to-r from-red-500 to-rose-600" />

        <div className="p-10 flex flex-col items-center text-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-red-50 border-2 border-red-100 flex items-center justify-center mb-6">
            <MdOutlineBlock size={40} className="text-red-500" />
          </div>

          {/* Heading */}
          <h1
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-[28px] font-extrabold text-[#1A1A2E] leading-tight mb-3"
          >
            Account Blocked
          </h1>

          <p className="text-[14px] text-slate-500 leading-relaxed mb-6">
            Your {type === "seller" ? "seller" : ""} account has been
            suspended by the Vendoz administrator. You have been automatically
            logged out and cannot log in until your account is reviewed.
          </p>

          {/* What to do box */}
          <div className="w-full bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6 text-left">
            <p className="text-[12px] font-bold text-amber-700 uppercase tracking-widest mb-3">
              What to do next
            </p>
            <ul className="space-y-2 text-[13px] text-slate-600">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-amber-500 font-bold">1.</span>
                Review Vendoz's Terms of Service to understand what may have caused this.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-amber-500 font-bold">2.</span>
                Email the admin with your registered email address and a brief explanation.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-amber-500 font-bold">3.</span>
                The admin will review your case and respond within 2-3 business days.
              </li>
            </ul>
          </div>

          {/* Contact admin */}
          <a
            href={`mailto:${ADMIN_EMAIL}?subject=Account Block Appeal - Vendoz&body=Hello Admin,%0A%0AMy registered email is: [YOUR EMAIL]%0A%0AReason for appeal: %0A%0A[Please describe your situation]%0A%0AThank you.`}
            className="w-full flex items-center justify-center gap-2 btn-amber py-3.5 rounded-full text-[#1A1A2E] font-bold text-[14px] mb-4"
          >
            <HiOutlineMail size={18} />
            Email Admin: {ADMIN_EMAIL}
          </a>

          <Link
            to="/"
            className="text-[13px] text-slate-400 hover:text-amber-600 transition-colors"
          >
            ← Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlockedScreen;
