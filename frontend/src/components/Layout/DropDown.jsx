import React from "react";
import { useNavigate } from "react-router-dom";

const DropDown = ({ categoriesData, setDropDown }) => {
    const navigate = useNavigate();
    const submitHandle = (i) => {
        navigate(`/products?category=${i.title}`);
        setDropDown(false);
        window.location.reload();
    };
    return (
        <div className="pb-4 w-[270px] bg-white absolute z-30 rounded-b-2xl shadow-xl shadow-slate-200/50 border-x border-b border-slate-100/80 p-2 space-y-1">
            {categoriesData &&
                categoriesData.map((i, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-xl transition-all duration-150 cursor-pointer select-none"
                        onClick={() => submitHandle(i)}
                    >
                        <img
                          src={i.image_Url}
                          className="w-[24px] h-[24px] object-contain flex-shrink-0"
                          alt=""
                        />
                        <h3 className="text-sm font-medium text-slate-700">{i.title}</h3>
                    </div>
                ))}
        </div>
    );
};

export default DropDown;