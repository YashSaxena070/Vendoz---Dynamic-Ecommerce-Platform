import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { server } from "../../server";

const CountDown = ({ data }) => {
  const calculateTimeLeft = useCallback(() => {
    const difference = +new Date(data.Finish_Date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }, [data.Finish_Date]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    const isTimerEnded =
      typeof timeLeft.days === "undefined" &&
      typeof timeLeft.hours === "undefined" &&
      typeof timeLeft.minutes === "undefined" &&
      typeof timeLeft.seconds === "undefined";

    if (isTimerEnded) {
      axios.delete(`${server}/event/delete-shop-event/${data._id}`);
    }

    return () => clearInterval(timer);
  }, [timeLeft, data._id, calculateTimeLeft]);

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (typeof timeLeft[interval] === "undefined") {
      return null;
    }

    const label =
      interval === "days"
        ? "Days"
        : interval === "hours"
        ? "Hours"
        : interval === "minutes"
        ? "Mins"
        : "Secs";

    return (
      <div
        key={interval}
        className="flex flex-col items-center justify-center min-w-[70px] bg-slate-50 hover:bg-[#FEF9F0] border border-slate-100 hover:border-amber-400 rounded-2xl py-3 px-2 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <span className="font-extrabold text-2xl md:text-3xl text-[#1A1A2E] tracking-tight font-mono leading-none select-none">
          {String(timeLeft[interval]).padStart(2, "0")}
        </span>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2 leading-none">
          {label}
        </span>
      </div>
    );
  });

  return (
    <div className="flex items-center gap-3.5 py-1 select-none">
      {timerComponents.length ? (
        <>
          <div className="flex items-center gap-3">
            {timerComponents}
          </div>
        </>
      ) : (
        <span className="text-[13px] font-bold text-rose-500 bg-rose-50 border border-rose-100 px-3 py-1.5 rounded-full animate-pulse">
          Event Ended
        </span>
      )}
    </div>
  );
};

export default CountDown;
