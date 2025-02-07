const Address = require('../../database/models/address.model')

exports.saveAddress = async(req,res)=>{
    try {
        console.log("AddressRoute is called!");
       
        const user = req.user._id;
        console.log("User is:",user)
        const {location,placeName,photoUrl} = req.body;
         if(!location || !placeName || !photoUrl)
         {
            return res.status(404).json({message:"All fields are required ['location','placeName','photoUrl']"})
         }

         const saveAddress = await Address.create({
            location,
            placeName,
            photoUrl,
            userId:user,
         });

         await saveAddress.save();
         return res.status(200).json({message:"New address is created",saveAddress})
        
    } catch (error) {
        console.log("Server error while saving a new address")
        res.status(200).json({message:"New place added successfully",error})        
    }
}

