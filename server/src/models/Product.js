import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        productName: {
            type: String,
            required: true,
            trim: true,
        },

        productType: {
            type: String,
            required: true,
            enum: [
                "Food",
                "Electronics",
                "Clothes",
                "Beauty Products",
                "Others",
            ],
        },

        quantityStock: {
            type: Number,
            required: true,
            min: 0,
        },

        mrp: {
            type: Number,
            required: true,
            min: 0,
        },

        sellingPrice: {
            type: Number,
            required: true,
            min: 0,
        },

        brandName: {
            type: String,
            required: true,
            trim: true,
        },

        images: {
            type: [String],
            default: [],
        },

        exchangeEligible: {
            type: String,
            enum: ["Yes", "No"],
            default: "No",
        },

        status: {
            type: String,
            enum: [
                "published",
                "unpublished",
            ],
            default: "unpublished",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "Product",
    productSchema
);