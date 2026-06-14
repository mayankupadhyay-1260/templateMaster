import express from "express";

import multer from "../utils/multer.js";

import authMiddleware from "../middleware/authMiddleware.js";

import {
    uploadImages,
} from "../controllers/uploadController.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    multer.array("images", 5),
    uploadImages
);

export default router;