import React from "react";
import Lottie from "lottie-react";
import animationData from "../../Assests/animations/24151-ecommerce-animation.json";

const Loader = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Lottie animationData={animationData} loop={true} autoplay={true} style={{ width: 300, height: 300 }} />
        </div>
    );
};

export default Loader;