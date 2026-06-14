import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import uploadRoutes from "./routes/uploadRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    origin: (origin, callback) => {
        // Strip trailing slash from CLIENT_URL if present
        const allowed = (process.env.CLIENT_URL || "http://localhost:5173").replace(/\/$/, "");
        // Allow production URL, all vercel.app previews, and local dev
        if (
            !origin ||
            origin === allowed ||
            origin.endsWith(".vercel.app") ||
            origin === "http://localhost:5173"
        ) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
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
    express.static(path.join(__dirname, "../../uploads"))
);

app.use(
    "/api/upload",
    uploadRoutes
);

export default app;