const Address = require('../../database/models/address.model');
const User = require('../../database/models/user.model');

exports.saveAddress = async (req, res) => {
    try {
        console.log("AddressRoute is called!");

        const userId = req.userId;
        const { location, placeName, photoUrl } = req.body;

        if (!location || !placeName || !photoUrl) {
            return res.status(400).json({ message: "All fields are required ['location','placeName','photoUrl']" });
        }

        let address = await Address.findOne({ userId: userId });

        if (!address) {
            const saveAddress = await Address.create({
                location,
                placeName,
                photoUrl,
                userId
            });
            return res.status(201).json({ message: "New address is created", saveAddress });
        } else {
            let updateAddress = await Address.findOneAndUpdate(
                { userId: userId },
                { location, placeName, photoUrl, userId },
                { new: true } // Return updated document
            );

            return res.status(200).json({ message: "Address is updated", updateAddress });
        }

    } catch (error) {
        console.error("Server error while saving a new address", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

exports.getPartnerAddress = async (req, res) => {

        const userId = req.userId;
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const partnerId = user.partnerId;
        if (!partnerId) {
            return res.status(400).json({ message: "Add a partner first" });
        }

        const addressData = await Address.findOne({ userId: partnerId });
        if (!addressData) {
            return res.status(400).json({ message: "Your partner hasn't added an address" });
        }

        res.status(200).json({ message: "Address fetched successfully", address: addressData });

}
