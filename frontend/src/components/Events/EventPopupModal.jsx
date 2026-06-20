import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { backend_url } from "../../server";
import CountDown from "./CountDown";

const EventPopupModal = ({ showPopup, setShowPopup, eventItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!showPopup || !eventItems || eventItems.length === 0) {
    return null;
  }

  const activeItem = eventItems[currentIndex];
  const displayName = activeItem.name.replace(/^Vendoz\s+Super\s+Sale\s*-\s*/gi, "");

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % eventItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + eventItems.length) % eventItems.length);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/65 backdrop-blur-md animate-[fadeIn_0.2s_ease-out]">
      <div className="relative bg-white/95 backdrop-blur border border-[#EDE8E0] w-[92%] sm:w-[500px] rounded-3xl p-6 shadow-3xl text-center flex flex-col items-center animate-[scaleUp_0.25s_ease-out] select-none">
        
        {/* Close Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute right-5 top-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-950 transition-all duration-200"
          aria-label="Close popup"
        >
          <RxCross1 size={18} />
        </button>

        {/* Modal Header */}
        <div className="mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-600 font-extrabold text-[10px] tracking-widest uppercase rounded-full border border-amber-200 animate-pulse">
            ⚡ Vendoz Super Sale
          </span>
          <h3 className="text-xl font-extrabold text-[#1A1A2E] mt-2">
            Limited Time Offers!
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-[280px]">
            Check out these active events with massive discounts!
          </p>
        </div>

        {/* Slider Area */}
        <div className="relative w-full flex items-center justify-center my-4 min-h-[300px]">
          {/* Prev Button */}
          {eventItems.length > 1 && (
            <button
              onClick={handlePrev}
              className="absolute left-1 z-10 p-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 shadow-md border border-slate-100 hover:scale-105 active:scale-95 transition-all duration-200"
              aria-label="Previous item"
            >
              <IoIosArrowBack size={18} />
            </button>
          )}

          {/* Active Event Slide Content */}
          <div className="flex flex-col items-center w-[78%] animate-[fadeIn_0.3s_ease]">
            {/* Product Image */}
            <div className="w-44 h-44 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-2xl p-3 overflow-hidden aspect-square mb-4 shadow-inner">
              <img
                src={`${backend_url}${activeItem.images[0]}`}
                alt={displayName}
                className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Name */}
            <h4 className="text-base font-bold text-[#1A1A2E] line-clamp-1">
              {displayName}
            </h4>

            {/* Price Tags */}
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-[11px] font-medium text-slate-400 line-through">
                ${activeItem.originalPrice}
              </span>
              <span className="text-lg font-extrabold text-amber-500">
                ${activeItem.discountPrice}
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 ml-1">
                50% OFF
              </span>
            </div>

            {/* Countdown */}
            <div className="mt-4 scale-90">
              <CountDown data={activeItem} />
            </div>
          </div>

          {/* Next Button */}
          {eventItems.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-1 z-10 p-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 shadow-md border border-slate-100 hover:scale-105 active:scale-95 transition-all duration-200"
              aria-label="Next item"
            >
              <IoIosArrowForward size={18} />
            </button>
          )}
        </div>

        {/* Carousel Indicators / Dots */}
        {eventItems.length > 1 && (
          <div className="flex items-center gap-1.5 mb-6">
            {eventItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-6 bg-amber-500" : "w-1.5 bg-slate-200 hover:bg-slate-350"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Action Button */}
        <Link
          to={`/product/${activeItem._id}?isEvent=true`}
          onClick={() => setShowPopup(false)}
          className="w-full"
        >
          <button className="w-full h-[48px] bg-[#1A1A2E] hover:bg-amber-500 text-white hover:text-[#1A1A2E] font-bold rounded-xl transition-all duration-300 active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center gap-2">
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EventPopupModal;
