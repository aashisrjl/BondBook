const Photo = require("../../database/models/photo.model");
const User = require("../../database/models/user.model");

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
        const photos = await Photo.find({ userId,type: "photo" });
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
        const videos = await Photo.find({userId, type: "video" });
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

exports.getPartnerPhoto = async (req, res) => {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const partnerId = user.partnerId;
    if (!partnerId) {
        return res.status(400).json({ message: "Add a partner first" });
    }

    const photoData = await Photo.find({ userId: partnerId , type:'photo'});
    if (photoData.length <= 0) {
        return res.status(400).json({ message: "Your partner hasn't added an Photo" });
    }

    res.status(200).json({ message: "photo fetched successfully", photos: photoData });


}

exports.getPartnerVideo = async (req, res) => {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const partnerId = user.partnerId;
    if (!partnerId) {
        return res.status(400).json({ message: "Add a partner first" });
    }

    const videoData = await Photo.find({ userId: partnerId, type: 'video' });
    if (videoData.length <= 0) {
        return res.status(400).json({ message: "Your partner hasn't added an video" });
    }

    res.status(200).json({ message: "video fetched successfully", videos: videoData });


}
