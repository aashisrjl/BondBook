const Music = require("../../database/models/music.model");
const User = require("../../database/models/user.model");

// Add a new favorite song
exports.addMusic = async (req, res) => {
  const { title, musicUrl, artist } = req.body;
  const userId = req.userId; // Assuming userId comes from auth middleware

    const newMusic = await Music.create({
      title,
      musicUrl,
      artist: artist || "Unknown Artist",
      userId,
    });
    res.status(201).json({
      message: "Music added successfully",
      music: newMusic,
    });
  
};

// Get all favorite songs for the user
exports.getMusic = async (req, res) => {
  const userId = req.userId;

    const musicList = await Music.find({ userId });
    res.status(200).json({
      message: "Music fetched successfully",
      music: musicList,
    });
};

// Delete a favorite song
exports.deleteMusic = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

    const music = await Music.findOneAndDelete({ _id: id, userId });
    if (!music) {
      return res.status(404).json({
        message: "Music not found or not authorized",
      });
    }
    res.status(200).json({
      message: "Music deleted successfully",
      music,
    });
};

// Update a favorite song (optional, if you want this feature)
exports.updateMusic = async (req, res) => {
  const { id } = req.params;
  const { title, musicUrl, artist } = req.body;
  const userId = req.userId;

  try {
    const music = await Music.findOne({ _id: id, userId });
    if (!music) {
      return res.status(404).json({
        message: "Music not found or not authorized",
      });
    }

    music.title = title || music.title;
    music.musicUrl = musicUrl || music.musicUrl;
    music.artist = artist || music.artist;
    const updatedMusic = await music.save();

    res.status(200).json({
      message: "Music updated successfully",
      music: updatedMusic,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Failed to update music",
    });
  }
};

exports.getPartnerMusic = async (req, res) => {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
  
    const partnerId = user.partnerId;
    if (!partnerId) {
      return res.status(400).json({ message: "Add a partner first" });
    }
  
    const musicData = await Music.find({ userId: partnerId });
    if (musicData.length <= 0) {
      return res
        .status(400)
        .json({ message: "Your partner hasn't added an Diary" });
    }
  
    res
      .status(200)
      .json({ message: "Diary fetched successfully", musics: musicData });
  };