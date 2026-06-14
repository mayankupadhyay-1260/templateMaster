import axios from "./axios";

export const getProducts = () =>
    axios.get("/products");

export const createProduct = (data) =>
    axios.post("/products", data);

export const updateProduct = (
    id,
    data
) =>
    axios.put(
        `/products/${id}`,
        data
    );

export const deleteProduct = (
    id
) =>
    axios.delete(
        `/products/${id}`
    );

export const toggleProductStatus = (
    id
) =>
    axios.patch(
        `/products/${id}/status`
    );

export const uploadImages = (formData) =>
    axios.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });