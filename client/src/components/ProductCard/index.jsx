import { useState } from "react";

export default function ProductCard({
    product,
    onEdit,
    onDelete,
    onToggleStatus,
}) {
    const [activeImage, setActiveImage] = useState(0);

    const imagesList = product.images?.length > 0 
        ? product.images 
        : ["https://placehold.co/400x300?text=No+Image"];

    return (
        <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-[0px_8px_25px_rgba(0,0,0,0.03)] hover:shadow-[0px_12px_30px_rgba(0,0,0,0.06)] transition-all duration-300 flex flex-col justify-between min-h-[480px]">
            <div>
                {/* Product Image Box */}
                <div className="h-[210px] bg-white border border-gray-100 rounded-2xl overflow-hidden flex items-center justify-center p-3 relative group">
                    <img
                        src={imagesList[activeImage]}
                        alt={product.productName}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                </div>

                {/* Slider Dots */}
                <div className="flex justify-center gap-1.5 mt-3 mb-4">
                    {imagesList.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveImage(index)}
                            className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                                index === activeImage
                                    ? "bg-orange-500 w-2.5"
                                    : "bg-gray-300 hover:bg-gray-400"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Product Title */}
                <h2 className="font-bold text-gray-900 text-lg mb-4 leading-tight">
                    {product.productName}
                </h2>

                {/* Product Details */}
                <div className="space-y-2.5 text-[14px]">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">
                            Product type -
                        </span>
                        <span className="font-medium text-gray-800">
                            {product.productType}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">
                            Quantity Stock -
                        </span>
                        <span className="font-medium text-gray-800">
                            {product.quantityStock}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">
                            MRP -
                        </span>
                        <span className="font-medium text-gray-800">
                            ₹ {product.mrp}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">
                            Selling Price -
                        </span>
                        <span className="font-medium text-gray-800">
                            ₹ {product.sellingPrice}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">
                            Brand Name -
                        </span>
                        <span className="font-medium text-gray-800">
                            {product.brandName}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">
                            Total Number of images -
                        </span>
                        <span className="font-medium text-gray-800">
                            {product.images?.length || 0}
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">
                            Exchange Eligibility -
                        </span>
                        <span className="font-bold text-gray-900">
                            .{product.exchangeEligible ? product.exchangeEligible.toUpperCase() : "NO"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2.5 mt-6">
                <button
                    onClick={() => onToggleStatus(product._id)}
                    className={`flex-1 py-3.5 rounded-2xl text-white font-semibold text-sm transition-all active:scale-[0.98] cursor-pointer ${
                        product.status === "published"
                            ? "bg-[#4ade00] hover:bg-[#3ec400]"
                            : "bg-[#102aeb] hover:bg-[#0018a8]"
                    }`}
                >
                    {product.status === "published" ? "Unpublish" : "Publish"}
                </button>

                <button
                    onClick={() => onEdit(product)}
                    className="flex-1 py-3.5 border border-gray-200 rounded-2xl font-semibold text-sm text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.98] cursor-pointer"
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(product)}
                    className="w-13 border border-gray-200 rounded-2xl flex items-center justify-center text-gray-400 bg-white hover:bg-gray-50 hover:text-red-500 hover:border-red-200 transition-all active:scale-[0.98] cursor-pointer"
                    aria-label="Delete product"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
}