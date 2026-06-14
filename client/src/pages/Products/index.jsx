import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import ProductCard from "../../components/ProductCard";
import ProductModal from "../../components/ProductModal";
import DeleteModal from "../../components/DeleteModal";

import {
    createProduct,
    updateProduct,
    deleteProduct,
    toggleProductStatus,
    getProducts,
} from "../../api/productApi";

export default function Products() {

    const [modalOpen, setModalOpen] =
        useState(false);

    const [deleteOpen, setDeleteOpen] =
        useState(false);

    const [selectedProduct,
        setSelectedProduct] =
        useState(null);

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [isModalOpen, setIsModalOpen] =
        useState(false);

    const fetchProducts =
        async () => {
            try {
                const response =
                    await getProducts();

                setProducts(
                    response.data.data || []
                );
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleCreateOrEdit =
        async (data) => {
            try {
                if (
                    selectedProduct
                ) {
                    await updateProduct(
                        selectedProduct._id,
                        data
                    );
                } else {
                    await createProduct(
                        data
                    );
                }

                setModalOpen(false);

                setSelectedProduct(
                    null
                );

                fetchProducts();
            } catch (error) {
                console.error(error);
            }
        };

    const handleDelete =
        async () => {
            try {
                await deleteProduct(
                    selectedProduct._id
                );

                setDeleteOpen(false);

                fetchProducts();
            } catch (error) {
                console.error(error);
            }
        };

    const handleToggle =
        async (id) => {
            try {
                await toggleProductStatus(
                    id
                );

                fetchProducts();
            } catch (error) {
                console.error(error);
            }
        };

    return (
        <DashboardLayout>
            {/* Header section with heading and Add Products button */}
            <div className="flex justify-between items-center mb-10 mt-2">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-950">
                        Products
                    </h1>
                </div>

                <button
                    onClick={() => {
                        setSelectedProduct(
                            null
                        );
                        setModalOpen(true);
                    }}
                    className="flex items-center gap-1.5 text-[#1e3a8a] hover:text-[#0018a8] font-bold text-lg transition cursor-pointer"
                >
                    <span className="text-xl font-extrabold">+</span> Add Products
                </button>
            </div>

            {/* Main content grid or empty state */}
            {!loading && products.length === 0 ? (
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
                        Feels a little empty over here...
                    </h2>

                    <p className="text-gray-400 max-w-md text-[15px] leading-relaxed mb-8">
                        You can create products without connecting store<br />
                        you can add products to store anytime
                    </p>

                    <button
                        onClick={() => {
                            setSelectedProduct(null);
                            setModalOpen(true);
                        }}
                        className="bg-[#102aeb] hover:bg-[#0018a8] text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98] cursor-pointer"
                    >
                        Add your Products
                    </button>
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
                    {products.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onEdit={(product) => {
                                setSelectedProduct(
                                    product
                                );
                                setModalOpen(true);
                            }}
                            onDelete={(product) => {
                                setSelectedProduct(
                                    product
                                );
                                setDeleteOpen(true);
                            }}
                            onToggleStatus={
                                handleToggle
                            }
                        />
                    ))}
                </div>
            )}

            <ProductModal
                open={modalOpen}
                onClose={() =>
                    setModalOpen(false)
                }
                onSubmit={
                    handleCreateOrEdit
                }
                initialData={
                    selectedProduct
                }
            />

            <DeleteModal
                open={deleteOpen}
                onClose={() =>
                    setDeleteOpen(false)
                }
                onConfirm={handleDelete}
            />
        </DashboardLayout >
    );
}