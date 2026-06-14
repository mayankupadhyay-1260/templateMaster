import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Absolute path to uploads folder (2 levels up from src/utils/)
const uploadsDir = path.join(__dirname, "../../../uploads");

// Create uploads dir if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },

    filename: (req, file, cb) => {
        cb(
            null,
            `${Date.now()}-${file.originalname}`
        );
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes =
        /jpeg|jpg|png|webp/;

    const ext =
        allowedTypes.test(
            path.extname(file.originalname)
                .toLowerCase()
        );

    const mime =
        allowedTypes.test(file.mimetype);

    if (ext && mime) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Only image files are allowed"
            )
        );
    }
};

export default multer({
    storage,
    fileFilter,
});