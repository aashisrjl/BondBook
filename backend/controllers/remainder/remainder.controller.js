const Remainder = require("../../database/models/remainder.model");
const User = require("../../database/models/user.model");

exports.createRemainder = async (req, res) => {
  const { title, date } = req.body;
  const userId = req.userId;

  if (!title || !date) {
    return res.status(400).json({ message: "Title and date is required" });
  }
  const newRemainder = await Remainder.create({
    title,
    date,
    userId,
  });

  res.status(200).json({
    message: "Remainder created successfully",
    remainder: newRemainder,
  });
};

exports.getRemainders = async (req, res) => {
  const userId = req.userId;
  const remainders = await Remainder.find({ userId: userId });
  res.status(200).json({
    message: "Remainders fetched successfully",
    remainders,
  });
};

exports.updateRemainder = async (req, res) => {
  try {
    console.log("Route is called!");
    const { date, title } = req.body;
    if (!date || !title) {
      res.status(404).json({ message: "All fields are required!" });
      return;
    }
    const remainderId = req.params.id;
    if (!remainderId) {
      res.status(404).json({ message: "RemainderId is required" });
      return;
    }

    const RemainderId = await Remainder.findById({ id });
    if (!RemainderId) {
      res.status(404).json({ message: "RemainderId is not available" });
      return;
    }
    const userId = req.userId;

    if (!userId) {
      res.status(404).json({ message: "User is not authenticated!" });
      return;
    }

    const existingRemainder = await Remainder.find({
      $or: [{ userId: userId, _id: remainderId }],
    });

    if (!existingRemainder) {
      res.status(404).json({ message: "Remainder doesn't exist here" });
      return;
    }

    const updateRemainder = await Remainder.findByIdAndUpdate(remainderId, {
      date: date,
      title: title,
    });
    if (!updateRemainder) {
      res.status(404).json({ message: "Remainder fails to be updated" });
      return;
    }
    await updateRemainder.save();
    return res
      .status(200)
      .json({ message: "Remainder updated successfully", updateRemainder });
  } catch (error) {
    console.log("Server error while updating the remainder");
    return res
      .status(500)
      .json({ message: "Server error while updating the remainder", error });
  }
};

exports.deleteRemainder = async (req, res) => {
  const remainderId = req.params.id;
  const userId = req.userId;
  const remainder = await Remainder.find({ _id: remainderId, userId: userId });
  if (!remainder) {
    return res.status(404).json({ message: "Remainder not found" });
  }
  if (!remainderId) {
    return res.status(400).json({ message: "Remainder id is required" });
  }
  const deletedRemainder = await Remainder.findByIdAndDelete(remainderId);
  if (!deletedRemainder) {
    return res.status(404).json({ message: "Remainder not found" });
  }
  res
    .status(200)
    .json({ message: "Remainder deleted successfully", deletedRemainder });
};

exports.getPartnerRemainder = async (req, res) => {
  const userId = req.userId;
  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const partnerId = user.partnerId;
  if (!partnerId) {
    return res.status(400).json({ message: "Add a partner first" });
  }

  const remainderData = await Photo.find({ userId: partnerId });
  if (remainderData.length <= 0) {
    return res
      .status(400)
      .json({ message: "Your partner hasn't added an video" });
  }

  res
    .status(200)
    .json({
      message: "Remainder fetched successfully",
      remainders: remainderData,
    });
};
