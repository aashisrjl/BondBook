const User = require("../../database/models/user.model");
const sendMail = require("../../services/emailService/emailService");

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
            return res.status(400).json({ message: "User with this email does not have an account" });
        }

        // Generate 4-digit token
        const randomNumber = Math.floor(Math.random() * 9000) + 1000;

        // Send mail to partner
        sendMail({
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
        res.status(500).json({ message: "Internal server error", error: error.message });
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
            return res.status(400).json({ message: "Token has expired or is invalid" });
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
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.getLoggedInUserData = async(req,res)=>{
    const userId = req.userid;
    if(!user){
        return res.status(400).json({
            message: "user not found with that userId"
        })
    }

    const user = await User.findOne({_id:userId});
    if(!user){
        return res.status(400).json({
            message: "user not found with that userId"
        })
    }
    res.status(200).json({
        message: "login user fetched",
        user
    })
}

exports.getPartnerData = async(req,res)=>{
    const userId = req.userId;
    const user = await User.findOne({_id:userId});
    if(!user){
        return res.status(400).json({
            message: "user not loggedIn || not found"
        })
    }
    const partnerId = user.partnerId;
    const partner = await User.findOne({
        _id:partnerId
    })
    if(!partner){
        return res.status(400).json({
            message: "patner not found"
        })
    }
    res.status(200).json({
        partner
    })

}

exports.removePartner = async(req,res)=>{
    const userId = req.userId;
    const user0 = await User.findOne({_id:userId});
    const user1 = await User.findOne({_id:user0.partnerId})

    if(!user1){
        return res.status(400).json({
            message: "you don't have partner to remove"
        })
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
        message: "partner removed successfully"
    })


}