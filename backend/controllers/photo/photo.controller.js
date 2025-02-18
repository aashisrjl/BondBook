const Photo = require("../../database/models/photo.model");

exports.createPost = async (req, res) => {
    try {
        let image = req.file ? req.file.filename : "";
        const userId = req.userId;
        
        let media_type = "photo";
        if (req.file && req.file.mimetype.startsWith("video/")) {
            media_type = "video";
        }

        const post = await Photo.create({
            Phototype: "Personal", // Default type, change as needed
            Url: image,
            type: media_type,
            userId
        });

        if (!post) {
            return res.status(400).json({ message: "Failed to create post" });
        }

        res.status(201).json({ message: "Post created successfully", post });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getPhotos = async (req, res) => {
    try {
        const photos = await Photo.find({ type: "photo" });
        if (photos.length === 0) {
            return res.status(404).json({ message: "No photos found" });
        }
        res.status(200).json({ message: "Photos found successfully", photos });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getVideos = async (req, res) => {
    try {
        const videos = await Photo.find({ type: "video" });
        if (videos.length === 0) {
            return res.status(404).json({ message: "No videos found" });
        }
        res.status(200).json({ message: "Videos found successfully", videos });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.deleteGalleryItem = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        
        const galleryItem = await Photo.findOneAndDelete({ _id: id, userId });
        
        if (!galleryItem) {
            return res.status(404).json({ message: "Gallery item not found" });
        }

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
