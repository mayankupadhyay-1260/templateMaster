import express from "express";

import authMiddleware from "../middleware/authMiddleware.js";

import {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    toggleStatus,
} from "../controllers/productController.js";

const router = express.Router();

router.use(authMiddleware);

router.route("/")
    .post(createProduct)
    .get(getProducts);

router.route("/:id")
    .get(getProductById)
    .put(updateProduct)
    .delete(deleteProduct);

router.patch(
    "/:id/status",
    toggleStatus
);

export default router;