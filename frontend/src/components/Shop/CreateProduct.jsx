import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

const CreateProduct = () => {
    const { seller } = useSelector((state) => state.seller);
    const { success, error } = useSelector((state) => state.products);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [originalPrice, setOriginalPrice] = useState();
    const [discountPrice, setDiscountPrice] = useState();
    const [stock, setStock] = useState();

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (success) {
            toast.success("Product created successfully!");
            navigate("/dashboard");
            window.location.reload();
        }
    }, [dispatch, error, success, navigate]);

    const handleImageChange = (e) => {
        e.preventDefault();
        let files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
    };

    const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newForm = new FormData();
        images.forEach((image) => {
            newForm.append("images", image);
        });
        newForm.append("name", name);
        newForm.append("description", description);
        newForm.append("category", category);
        newForm.append("tags", tags);
        newForm.append("originalPrice", originalPrice);
        newForm.append("discountPrice", discountPrice);
        newForm.append("stock", stock);
        newForm.append("shopId", seller._id);
        dispatch(createProduct(newForm));
    };

    return (
        <div className="w-full flex justify-center py-8 px-4">
            <div className="w-full max-w-[680px]">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-[24px] font-[800] text-[#1A1A2E] tracking-tight">
                        Create Product
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">
                        Add a new product to your store
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl border border-[#EDE8E0] p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="premium-label">
                                Product Name <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                value={name}
                                className="premium-input"
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your product name..."
                            />
                        </div>

                        <div>
                            <label className="premium-label">
                                Description <span className="text-red-400">*</span>
                            </label>
                            <textarea
                                cols="30"
                                required
                                rows="6"
                                value={description}
                                className="premium-textarea"
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter your product description..."
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 800px:grid-cols-2 gap-5">
                            <div>
                                <label className="premium-label">
                                    Category <span className="text-red-400">*</span>
                                </label>
                                <select
                                    className="premium-select"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="Choose a category">Choose a category</option>
                                    {categoriesData &&
                                        categoriesData.map((i) => (
                                            <option value={i.title} key={i.title}>
                                                {i.title}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            <div>
                                <label className="premium-label">Tags</label>
                                <input
                                    type="text"
                                    value={tags}
                                    className="premium-input"
                                    onChange={(e) => setTags(e.target.value)}
                                    placeholder="Enter product tags..."
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 800px:grid-cols-3 gap-5">
                            <div>
                                <label className="premium-label">Original Price</label>
                                <input
                                    type="number"
                                    value={originalPrice}
                                    className="premium-input"
                                    onChange={(e) => setOriginalPrice(e.target.value)}
                                    placeholder="$0.00"
                                />
                            </div>
                            <div>
                                <label className="premium-label">
                                    Discount Price <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={discountPrice}
                                    className="premium-input"
                                    onChange={(e) => setDiscountPrice(e.target.value)}
                                    placeholder="$0.00"
                                />
                            </div>
                            <div>
                                <label className="premium-label">
                                    Stock <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={stock}
                                    className="premium-input"
                                    onChange={(e) => setStock(e.target.value)}
                                    placeholder="0"
                                />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="premium-label">
                                Upload Images <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="file"
                                id="upload"
                                className="hidden"
                                multiple
                                onChange={handleImageChange}
                            />
                            <label htmlFor="upload">
                                <div className="upload-area">
                                    <AiOutlinePlusCircle size={28} className="mx-auto mb-2 text-slate-400" />
                                    <p className="text-sm font-semibold text-slate-500">
                                        Click to upload images
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">
                                        PNG, JPG, WEBP up to 5MB
                                    </p>
                                </div>
                            </label>

                            {/* Image Previews */}
                            {images.length > 0 && (
                                <div className="flex items-center flex-wrap gap-3 mt-4">
                                    {images.map((i, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={URL.createObjectURL(i)}
                                                alt=""
                                                className="h-[100px] w-[100px] object-cover rounded-xl border border-[#EDE8E0]"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                                            >
                                                <RxCross1 size={10} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button type="submit" className="btn-premium w-full mt-4">
                            Create Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProduct;