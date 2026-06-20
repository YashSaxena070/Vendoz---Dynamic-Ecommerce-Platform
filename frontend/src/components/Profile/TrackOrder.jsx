import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import { 
  MdOutlineReceiptLong, 
  MdLocalShipping, 
  MdOutlineMyLocation, 
  MdCheckCircle, 
  MdKeyboardArrowLeft, 
  MdOutlineSettingsBackupRestore 
} from "react-icons/md";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user]);

  const data = orders && orders.find((item) => item._id === id);

  if (!user) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center bg-[#F9F7F4]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#F59E0B]"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center bg-[#F9F7F4]">
        <div className="text-center bg-white p-8 rounded-2xl border border-[#EDE8E0] shadow-sm max-w-sm">
          <p className="text-[#1A1A2E] font-medium text-[15px] mb-4">Fetching order tracking information...</p>
          <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-[#F59E0B] mx-auto"></div>
        </div>
      </div>
    );
  }

  const isRefund = data.status === "Processing refund" || data.status === "Refund Success";

  // Standard steps
  const standardSteps = [
    {
      title: "Order Confirmed",
      desc: "Seller has accepted the order.",
      icon: MdOutlineReceiptLong,
    },
    {
      title: "Shipped",
      desc: "Parcel is with our delivery partner.",
      icon: MdLocalShipping,
    },
    {
      title: "Out for Delivery",
      desc: "Courier partner is bringing the package.",
      icon: MdOutlineMyLocation,
    },
    {
      title: "Delivered",
      desc: "Successfully package received.",
      icon: MdCheckCircle,
    }
  ];

  // Refund steps
  const refundSteps = [
    {
      title: "Refund Requested",
      desc: "You have initiated a refund appeal.",
      icon: MdOutlineSettingsBackupRestore,
    },
    {
      title: "Processing Refund",
      desc: "The seller is reviewing your request.",
      icon: MdOutlineReceiptLong,
    },
    {
      title: "Refund Successful",
      desc: "Funds successfully returned.",
      icon: MdCheckCircle,
    }
  ];

  const getStepIndex = (status) => {
    switch (status) {
      case "Processing":
        return 0;
      case "Transferred to delivery partner":
      case "Shipping":
        return 1;
      case "Received":
      case "On the way":
        return 2;
      case "Delivered":
        return 3;
      default:
        return 0;
    }
  };

  const getRefundStepIndex = (status) => {
    if (status === "Processing refund") return 1;
    if (status === "Refund Success") return 2;
    return 0;
  };

  const steps = isRefund ? refundSteps : standardSteps;
  const currentStep = isRefund ? getRefundStepIndex(data.status) : getStepIndex(data.status);

  return (
    <div className="min-h-[80vh] bg-[#F9F7F4] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          to="/profile"
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-amber-600 transition-colors text-[14px] font-semibold mb-6"
        >
          <MdKeyboardArrowLeft className="text-[20px]" />
          Back to Profile
        </Link>

        {/* Order Details Header */}
        <div className="bg-white rounded-3xl border border-[#EDE8E0] shadow-sm p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-slate-100">
            <div>
              <p className="text-[12px] font-bold text-amber-600 uppercase tracking-wider mb-1">
                Order Tracker
              </p>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A2E] tracking-tight">
                ID: #{data._id}
              </h2>
            </div>
            <div className="flex flex-col sm:items-end">
              <span className="text-slate-400 text-[12px] font-semibold mb-1">Status</span>
              <span className="px-3.5 py-1.5 rounded-full text-[13px] font-bold bg-amber-50 text-amber-700 border border-amber-100">
                {data.status}
              </span>
            </div>
          </div>

          <div className="pt-6">
            <h3 className="font-bold text-[#1A1A2E] mb-2 text-[15px]">Estimated Delivery</h3>
            <p className="text-slate-500 text-[14px]">
              Within 3-5 business days from order confirmation date.
            </p>
          </div>
        </div>

        {/* Stepper Timeline */}
        <div className="bg-white rounded-3xl border border-[#EDE8E0] shadow-sm p-8 sm:p-12 relative overflow-hidden">
          <div className="relative">
            {/* Timeline Progress Line */}
            <div className="absolute top-6 left-6 right-6 h-1 bg-slate-100 -translate-y-1/2 z-0">
              <div 
                className="bg-amber-500 h-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${(currentStep / (steps.length - 1)) * 100}%`
                }}
              />
            </div>

            {/* Steps Container */}
            <div className="relative z-10 flex justify-between">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                const isCompleted = index <= currentStep;
                const isActive = index === currentStep;

                return (
                  <div key={index} className="flex flex-col items-center text-center flex-1">
                    {/* Circle Node */}
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        isCompleted 
                          ? "bg-amber-500 border-amber-500 text-white shadow-md shadow-amber-500/20" 
                          : "bg-white border-slate-200 text-slate-400"
                      } ${isActive ? "ring-4 ring-amber-100 scale-105 animate-pulse" : ""}`}
                    >
                      <IconComponent className="text-[20px]" />
                    </div>

                    {/* Step Labels */}
                    <div className="mt-3">
                      <h4 className={`font-bold text-[12px] sm:text-[14px] transition-colors ${
                        isCompleted ? "text-[#1A1A2E]" : "text-slate-400"
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-slate-400 text-[9px] sm:text-[11px] mt-1 font-medium leading-relaxed hidden sm:block max-w-[120px] mx-auto">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;