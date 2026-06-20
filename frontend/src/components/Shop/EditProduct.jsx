import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import axios from "axios";
import { server, backend_url } from "../../server";

const EditProduct = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [originalPrice, setOriginalPrice] = useState("");
    const [discountPrice, setDiscountPrice] = useState("");
    const [stock, setStock] = useState("");
    const [existingImages, setExistingImages] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`${server}/product/get-product/${id}`)
            .then((res) => {
                const product = res.data.product;
                setName(product.name);
                setDescription(product.description);
                setCategory(product.category);
                setTags(product.tags || "");
                setOriginalPrice(product.originalPrice || "");
                setDiscountPrice(product.discountPrice);
                setStock(product.stock);
                setExistingImages(product.images || []);
                setIsLoading(false);
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || "Failed to load product details");
                setIsLoading(false);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !description || !category || !discountPrice || stock === "") {
            toast.error("Please fill in all required fields!");
            return;
        }

        axios
            .put(
                `${server}/product/update-product/${id}`,
                {
                    name,
                    description,
                    category,
                    tags,
                    originalPrice,
                    discountPrice,
                    stock,
                },
                { withCredentials: true }
            )
            .then((res) => {
                toast.success("Product updated successfully!");
                navigate("/dashboard-products");
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || "Failed to update product details");
            });
    };

    if (isLoading) {
        return (
            <div className="w-full h-[80vh] flex items-center justify-center">
                <span className="text-lg font-medium text-slate-500">Loading product details...</span>
            </div>
        );
    }

    return (
        <div className="w-[90%] 800px:w-[50%] bg-white shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
            <h5 className="text-[30px] font-Poppins text-center">Edit Product</h5>
            {/* edit product form */}
            <form onSubmit={handleSubmit}>
                <br />
                <div>
                    <label className="pb-2">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        required
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your product name..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        cols="30"
                        required
                        rows="8"
                        type="text"
                        name="description"
                        value={description}
                        className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter your product description..."
                    ></textarea>
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Category <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="w-full mt-2 border h-[35px] rounded-[5px]"
                        value={category}
                        required
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Choose a category</option>
                        {categoriesData &&
                            categoriesData.map((i) => (
                                <option value={i.title} key={i.title}>
                                    {i.title}
                                </option>
                            ))}
                    </select>
                </div>
                <br />
                <div>
                    <label className="pb-2">Tags</label>
                    <input
                        type="text"
                        name="tags"
                        value={tags}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Enter your product tags..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">Original Price</label>
                    <input
                        type="number"
                        name="price"
                        value={originalPrice}
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="Enter your product price..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Price (With Discount) <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={discountPrice}
                        required
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setDiscountPrice(e.target.value)}
                        placeholder="Enter your product price with discount..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Product Stock <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="number"
                        name="price"
                        value={stock}
                        required
                        className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setStock(e.target.value)}
                        placeholder="Enter your product stock..."
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">Current Product Images</label>
                    <div className="w-full flex items-center flex-wrap gap-2 mt-2">
                        {existingImages &&
                            existingImages.map((imgSrc, idx) => (
                                <img
                                    src={`${backend_url}${imgSrc}`}
                                    key={idx}
                                    alt="Product"
                                    className="h-[100px] w-[100px] object-cover rounded border"
                                />
                            ))}
                    </div>
                </div>
                <br />
                <div>
                    <input
                        type="submit"
                        value="Save Changes"
                        className="mt-4 cursor-pointer appearance-none text-center block w-full px-3 h-[45px] bg-[#1A1A2E] hover:bg-amber-500 text-white hover:text-[#1A1A2E] font-bold rounded-[3px] border border-transparent placeholder-gray-400 focus:outline-none transition-all duration-300"
                    />
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
