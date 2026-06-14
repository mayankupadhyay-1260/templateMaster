import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
import uploadRoutes from "./routes/uploadRoutes.js";

import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API Running",
    });
});

app.use("/api/auth", authRoutes);

app.use(
    "/api/products",
    productRoutes
);

app.use(
    "/uploads",
    express.static("uploads")
);

app.use(
    "/api/upload",
    uploadRoutes
);

export default app;