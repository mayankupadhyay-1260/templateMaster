import { useState, useEffect, useRef } from "react";
import { uploadImages } from "../../api/productApi";

export default function ProductModal({
    open,
    onClose,
    onSubmit,
    initialData,
}) {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [form, setForm] = useState({
        productName: "",
        productType: "Food",
        quantityStock: "",
        mrp: "",
        sellingPrice: "",
        brandName: "",
        exchangeEligible: "No",
        images: [],
    });

    useEffect(() => {
        if (open) {
            if (initialData) {
                setForm({
                    productName: initialData.productName || "",
                    productType: initialData.productType || "Food",
                    quantityStock: initialData.quantityStock || "",
                    mrp: initialData.mrp || "",
                    sellingPrice: initialData.sellingPrice || "",
                    brandName: initialData.brandName || "",
                    exchangeEligible: initialData.exchangeEligible || "No",
                    images: initialData.images || [],
                });
            } else {
                setForm({
                    productName: "",
                    productType: "Food",
                    quantityStock: "",
                    mrp: "",
                    sellingPrice: "",
                    brandName: "",
                    exchangeEligible: "No",
                    images: [],
                });
            }
        }
    }, [open, initialData]);

    if (!open) return null;

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const formData = new FormData();
        files.forEach((file) => {
            formData.append("images", file);
        });

        try {
            setUploading(true);
            const response = await uploadImages(formData);
            if (response.data?.success) {
                setForm((prev) => ({
                    ...prev,
                    images: [...(prev.images || []), ...response.data.images],
                }));
            }
        } catch (error) {
            console.error("Upload failed", error);
            alert("Image upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveImage = (indexToRemove) => {
        setForm((prev) => ({
            ...prev,
            images: prev.images.filter((_, idx) => idx !== indexToRemove),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-3xl p-6 w-[560px] max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col justify-between">
                
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-5">
                    <h2 className="text-xl font-bold text-gray-900">
                        {initialData ? "Edit Product" : "Add Product"}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition cursor-pointer"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Product Name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">
                            Product Name
                        </label>
                        <input
                            name="productName"
                            placeholder="Enter product name"
                            value={form.productName}
                            onChange={handleChange}
                            className="w-full border border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm transition bg-white"
                            required
                        />
                    </div>

                    {/* Product Type */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">
                            Product Type
                        </label>
                        <div className="relative">
                            <select
                                name="productType"
                                value={form.productType}
                                onChange={handleChange}
                                className="w-full border border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm transition appearance-none bg-white cursor-pointer"
                            >
                                <option value="Food">Foods</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothes">Clothes</option>
                                <option value="Beauty Products">Beauty Products</option>
                                <option value="Others">Others</option>
                            </select>
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Quantity Stock */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">
                            Quantity Stock
                        </label>
                        <input
                            name="quantityStock"
                            placeholder="Enter quantity of stock"
                            value={form.quantityStock}
                            onChange={handleChange}
                            type="number"
                            className="w-full border border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm transition bg-white"
                            required
                        />
                    </div>

                    {/* MRP */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">
                            MRP
                        </label>
                        <input
                            name="mrp"
                            placeholder="Total numbers of Stock available"
                            value={form.mrp}
                            onChange={handleChange}
                            type="number"
                            className="w-full border border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm transition bg-white"
                            required
                        />
                    </div>

                    {/* Selling Price */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">
                            Selling Price
                        </label>
                        <input
                            name="sellingPrice"
                            placeholder="Total numbers of Stock available"
                            value={form.sellingPrice}
                            onChange={handleChange}
                            type="number"
                            className="w-full border border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm transition bg-white"
                            required
                        />
                    </div>

                    {/* Brand Name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">
                            Brand Name
                        </label>
                        <input
                            name="brandName"
                            placeholder="Total numbers of Stock available"
                            value={form.brandName}
                            onChange={handleChange}
                            className="w-full border border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm transition bg-white"
                            required
                        />
                    </div>

                    {/* Upload Product Images */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-gray-700">
                            Upload Product Images
                        </label>
                        
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 hover:bg-gray-50 flex flex-col items-center justify-center min-h-[120px]"
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                multiple
                                accept="image/*"
                            />
                            {uploading ? (
                                <span className="text-sm font-medium text-gray-500">Uploading...</span>
                            ) : (
                                <>
                                    <span className="text-sm text-gray-400">Enter Description</span>
                                    <span className="text-sm font-bold text-[#102aeb] mt-1">Browse</span>
                                </>
                            )}
                        </div>

                        {/* Image Previews */}
                        {form.images?.length > 0 && (
                            <div className="flex flex-wrap gap-2.5 mt-3">
                                {form.images.map((url, index) => (
                                    <div key={index} className="w-16 h-16 rounded-xl border border-gray-200 overflow-hidden relative group">
                                        <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity duration-200 cursor-pointer"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Exchange or return eligibility */}
                    <div className="flex flex-col gap-1.5 pb-2">
                        <label className="text-sm font-semibold text-gray-700">
                            Exchange or return eligibility
                        </label>
                        <div className="relative">
                            <select
                                name="exchangeEligible"
                                value={form.exchangeEligible}
                                onChange={handleChange}
                                className="w-full border border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm transition appearance-none bg-white cursor-pointer"
                            >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="border border-gray-200 px-6 py-3 rounded-xl font-semibold text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="bg-[#102aeb] hover:bg-[#0018a8] text-white px-8 py-3 rounded-xl font-semibold text-sm transition shadow-sm active:scale-[0.98] cursor-pointer"
                        >
                            Save Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}