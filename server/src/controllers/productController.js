import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
    try {
        const product = await Product.create({
            ...req.body,
            user: req.user.id,
        });

        res.status(201).json({
            success: true,
            data: product,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProducts = async (req, res) => {
    try {
        const {
            status,
            search,
            page = 1,
            limit = 10,
        } = req.query;

        const query = { user: req.user.id };

        if (status) {
            query.status = status;
        }

        if (search) {
            query.productName = {
                $regex: search,
                $options: "i",
            };
        }

        const total =
            await Product.countDocuments(query);

        const products = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({
                createdAt: -1,
            });

        res.status(200).json({
            success: true,
            total,
            page: Number(page),
            pages: Math.ceil(total / limit),
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product =
            await Product.findOneAndUpdate(
                { _id: req.params.id, user: req.user.id },
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product =
            await Product.findOneAndDelete(
                { _id: req.params.id, user: req.user.id }
            );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const toggleStatus = async (
    req,
    res
) => {
    try {
        console.log("ID:", req.params.id);
        const product = await Product.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        product.status =
            product.status === "published"
                ? "unpublished"
                : "published";

        await product.save();

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};