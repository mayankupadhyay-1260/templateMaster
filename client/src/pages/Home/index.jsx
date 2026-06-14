import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ProductCard from "../../components/ProductCard";
import ProductModal from "../../components/ProductModal";
import DeleteModal from "../../components/DeleteModal";

import {
    getProducts,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
} from "../../api/productApi";

export default function Home() {
    const [activeTab, setActiveTab] = useState("published");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const fetchProducts = async () => {
        try {
            const response = await getProducts();
            setProducts(response.data.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleEditSubmit = async (data) => {
        try {
            if (selectedProduct) {
                await updateProduct(selectedProduct._id, data);
            }
            setModalOpen(false);
            setSelectedProduct(null);
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteProduct(selectedProduct._id);
            setDeleteOpen(false);
            setSelectedProduct(null);
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggle = async (id) => {
        try {
            await toggleProductStatus(id);
            fetchProducts();
        } catch (error) {
            console.error(error);
        }
    };

    const filteredProducts = products.filter(
        (product) => product.status === activeTab
    );

    return (
        <DashboardLayout>
            {/* Sub-navigation Tabs */}
            <div className="flex gap-8 border-b border-gray-200 mb-8 pt-2">
                <button
                    onClick={() => setActiveTab("published")}
                    className={`font-semibold text-sm pb-3 relative -mb-[1px] transition cursor-pointer ${
                        activeTab === "published"
                            ? "text-[#0018a8] border-b-2 border-[#0018a8]"
                            : "text-gray-400 hover:text-gray-600"
                    }`}
                >
                    Published
                </button>
                <button
                    onClick={() => setActiveTab("unpublished")}
                    className={`font-semibold text-sm pb-3 relative -mb-[1px] transition cursor-pointer ${
                        activeTab === "unpublished"
                            ? "text-[#0018a8] border-b-2 border-[#0018a8]"
                            : "text-gray-400 hover:text-gray-600"
                    }`}
                >
                    Unpublished
                </button>
            </div>

            {/* List Grid or Empty State */}
            {!loading && filteredProducts.length === 0 ? (
                <div className="bg-white rounded-3xl border border-gray-100 p-24 text-center shadow-[0px_4px_25px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center min-h-[500px]">
                    <div className="mb-6">
                        <svg className="w-18 h-18 text-blue-900" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="10" y="10" width="18" height="18" rx="4" stroke="#0018a8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                            <rect x="36" y="10" width="18" height="18" rx="4" stroke="#0018a8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                            <rect x="10" y="36" width="18" height="18" rx="4" stroke="#0018a8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M45 36v18M36 45h18" stroke="#0018a8" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {activeTab === "published" ? "No Published Products" : "No Unpublished Products"}
                    </h2>

                    <p className="text-gray-400 max-w-md text-[15px] leading-relaxed">
                        Your {activeTab === "published" ? "Published" : "Unpublished"} Products will appear here<br />
                        Create your first product to publish
                    </p>
                </div>
            ) : loading ? (
                <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-8">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="h-[480px] rounded-3xl bg-gray-50 border border-gray-100 animate-pulse"
                        />
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onEdit={(product) => {
                                setSelectedProduct(product);
                                setModalOpen(true);
                            }}
                            onDelete={(product) => {
                                setSelectedProduct(product);
                                setDeleteOpen(true);
                            }}
                            onToggleStatus={handleToggle}
                        />
                    ))}
                </div>
            )}

            <ProductModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleEditSubmit}
                initialData={selectedProduct}
            />

            <DeleteModal
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
                onConfirm={handleDelete}
            />
        </DashboardLayout>
    );
}