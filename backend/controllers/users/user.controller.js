const User = require("../../database/models/user.model");
const sendEMail = require("../../services/emailService/emailService");
const bcrypt = require("bcryptjs");

// Add Partner
exports.addPartner = async (req, res) => {
  try {
    const userId = req.userId;
    const { email } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID not provided" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email can't be empty" });
    }

    const user0 = await User.findOne({ _id: userId });
    if (!user0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user1 = await User.findOne({ email });
    if (!user1) {
      return res
        .status(400)
        .json({ message: "User with this email does not have an account" });
    }

    // Generate 4-digit token
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;

    // Send mail to partner
    sendEMail({
      email: email,
      subject: `${user0.username} invited you to be a partner on BondBook`,
      text: `Use code ${randomNumber} to connect with your partner.`,
    });

    // Save token in user1's record
    user1.token = randomNumber;
    user1.tokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // Token expires in 10 mins
    await user1.save();

    res.status(200).json({ message: "Code sent to partner's email" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Verify Partner Token
exports.verifyPartnerToken = async (req, res) => {
  try {
    const userId = req.userId;
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const user0 = await User.findOne({ _id: userId });
    if (!user0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user1 = await User.findOne({ token });
    if (!user1 || !user1.tokenExpiresAt || new Date() > user1.tokenExpiresAt) {
      return res
        .status(400)
        .json({ message: "Token has expired or is invalid" });
    }

    // Connect partners
    user0.partnerId = user1._id;
    user1.partnerId = user0._id;

    // Clear the token after successful verification
    user1.token = null;
    user1.tokenExpiresAt = null;

    await user0.save();
    await user1.save();

    res.status(200).json({
      message: "Partners connected",
      between: `${user0.email} and ${user1.email}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getLoggedInUserData = async (req, res) => {
  const userId = req.userId;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(400).json({
      message: "user not found with that userId",
    });
  }
  res.status(200).json({
    message: "login user fetched",
    user,
  });
};

exports.getPartnerData = async (req, res) => {
  const userId = req.userId;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(400).json({
      message: "user not loggedIn || not found",
    });
  }
  const partnerId = user.partnerId;
  const partner = await User.findOne({
    _id: partnerId,
  });
  if (!partner) {
    return res.status(400).json({
      message: "patner not found",
    });
  }
  res.status(200).json({
    partner,
  });
};

exports.removePartner = async (req, res) => {
  const userId = req.userId;
  const user0 = await User.findOne({ _id: userId });
  const user1 = await User.findOne({ _id: user0.partnerId });

  if (!user1) {
    return res.status(400).json({
      message: "you don't have partner to remove",
    });
  }

  user0.partnerId = null;
  user0.token = null;
  user0.tokenExpiresAt = null;
  await user0.save();

  user1.partnerId = null;
  user1.token = null;
  user1.tokenExpiresAt = null;
  await user1.save();

  res.status(200).json({
    message: "partner removed successfully",
  });
};

exports.changePassword = async (req, res) => {
  const userId = req.userId;
  const { currentPassword, newPassword } = req.body;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(400).json({
      message: "user not found",
    });
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    res.status(400).json({
      message: "current password doesn't match",
    });
    return;
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({
    message: "password changed Successfully",
  });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "email can't be null",
    });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "user not found with this email",
    });
  }
  // Generate 4-digit token
  const randomNumber = Math.floor(Math.random() * 9000) + 1000;

  // Send mail to partner
  sendEMail({
    email: email,
    subject: `BondBook reset password code `,
    text: `Use code ${randomNumber} to reset your password.`,
  });

  user.token = randomNumber;
  user.tokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  res.status(200).json({
    message: "code send to email",
    email,
  });
};

exports.verifyForgotPassword = async (req, res) => {
  const { email } = req.body;
  const { token } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "user not found with query email",
    });
  }
  if (!token == user.token) {
    return res.status(400).json({
      message: "invalid token",
    });
  }

  if (!user.tokenExpiresAt || new Date() > user.tokenExpiresAt) {
    return res.status(200).json({
      message: "token expires",
    });
  }

  res.status(200).json({
    message: "token valid successfully",
    email,
  });
};
exports.changeForgotPassword = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "user not found",
    });
  }

  if (!newPassword || !confirmPassword) {
    return res.status(400).json({
      message: "fill all fields",
    });
  }
  if (!newPassword === confirmPassword) {
    return res.status(400).json({
      message: "password and confirm password doesn't match",
    });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({
    message: "password reset successfully",
  });
};

//update profile picture
exports.editProfilePic = async (req, res) => {
  const userId = req.userId;
  const filename = req?.file?.filename;
  if (!filename) {
    return res.status(400).json({
      message: "please upload a file",
    });
  }
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(400).json({
      message: "user not found",
    });
  }
  user.photoUrl = filename;
  await user.save();

  res.status(200).json({
    message: "photo updated successfully",
  });
};

//update profiles
exports.updateProfile = async (req, res) => {
  const userId = req.userId;
  const { name, age, address, bio } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (name) user.name = name;
  if (age) user.age = age;
  if (address) user.address = address;
  if (bio) user.bio = bio;

  await user.save();
  res.status(200).json({ message: "Profile updated successfully", user });
};

//add/update social links
exports.updateSocialMediaLinks = async (req, res) => {
  const userId = req.userId;
  const { facebook, instagram, tiktok, linkedin, twitter } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.socialMedia = {
    ...user.socialMedia,
    ...(facebook && { facebook }),
    ...(instagram && { instagram }),
    ...(tiktok && { tiktok }),
    ...(linkedin && { linkedin }),
    ...(twitter && { twitter }),
  };

  await user.save();
  res
    .status(200)
    .json({
      message: "Social media links updated",
      socialMedia: user.socialMedia,
    });
};

//update Mood
exports.updateMood = async (req, res) => {
  const userId = req.userId;
  const { mood } = req.body;

  if (!["Happy", "Sad", "Angry", "Calm", "Excited", "Bored"].includes(mood)) {
    return res.status(400).json({ message: "Invalid mood selected" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.mood = mood;
  await user.save();

  res.status(200).json({ message: "Mood updated successfully", mood });
};
