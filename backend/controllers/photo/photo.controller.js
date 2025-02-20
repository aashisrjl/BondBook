const Photo = require("../../database/models/photo.model");

exports.createPost = async (req, res) => {
    try {
        const {Phototype} = req.body
        const userId = req.userId;
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        let posts = [];

        for (let file of req.files) {
            let media_type = file.mimetype.startsWith("video/") ? "video" : "photo";

            const post = await Photo.create({
                Phototype, // Default type, change as needed
                Url: file.filename,
                type: media_type,
                userId
            });

            posts.push(post);
        }

        res.status(201).json({ message: "Posts created successfully", posts });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


exports.getPhotos = async (req, res) => {
    const userId = req.userId
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
    const userId = req.userId
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
        
        const galleryItem = await Photo.findOneAndDelete({ _id: id });
        
        if (!galleryItem) {
            return res.status(404).json({ message: "Gallery item not found" });
        }

        res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
