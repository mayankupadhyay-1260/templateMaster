export const uploadImages = (
    req,
    res
) => {
    try {
        const imageUrls =
            req.files.map(
                (file) =>
                    `${req.protocol}://${req.get(
                        "host"
                    )}/uploads/${file.filename}`
            );

        res.status(200).json({
            success: true,
            images: imageUrls,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};