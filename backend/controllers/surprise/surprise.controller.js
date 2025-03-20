const Surprise = require("../../database/models/surprise.model");
const User = require("../../database/models/user.model");

exports.sendSurprise = async (req, res) => {
  try {
    console.log("Surprise Creation Controller is Called!");
    const userId = req.userId;
    const { message, photo, scheduleFor } = req.body;
    if (!message && !photo) {
      return res
        .status(500)
        .json({ message: "photo and message both can't be empty", error });
    }
    const newSurprise = await Surprise.create({
      message: message,
      photo: photo,
      scheduleFor: scheduleFor,
      userId: userId,
    });

    res
      .status(200)
      .json({ message: "Server created successfully", newSurprise });
    return;
  } catch (error) {
    console.log("Server error while updating the remainder");
    return res
      .status(500)
      .json({ message: "Server error while updating the remainder", error });
  }
};

exports.fetchAllSurprise = async (req, res) => {
  try {
    console.log("Fetch all surprise is called!");
    const userId = req.userId;

    const existingSurprise = await Surprise.find({
      userId: userId,
    });
    if (!existingSurprise) {
      return res
        .status(500)
        .json({ message: "There are no existing surprises available" });
    }
    return res
      .status(200)
      .json({ message: "All existing surprises are:", existingSurprise });
  } catch (error) {
    console.log("Error while updating the surprise is:", error);
    return res
      .status(500)
      .json({ message: "Server error while updating surprises is:" });
  }
};

exports.deleteSurprise = async(req,res)=>{

  try{
      const id = req.params.id;
      if(!id)
      {
        return res.status(400).json({ message: "Surprise Id not found" });
      }

    await Surprise.findByIdAndDelete(id);
    res.status(400).json({ message: "Surprise deleted successfully!" });
  }
  catch(error){
    console.log("Error while deleting the surprises is:", error);
    return res
      .status(500)
      .json({ message: "Server error while deleting Surprise is:" });

  }
}

exports.getPartnerSurprise = async(req,res)=>{
    try {
        const userId = req.userId;
        const user = await User.findOne({ _id: userId });
        if (!user) {
          return res.status(400).json({ message: "User not found" });
        }

    const partnerId = user.partnerId;
    if (!partnerId) {
      return res.status(400).json({ message: "Add a partner first" });
    }

    const SurpriseData = await Surprise.find({ userId: partnerId });
    if (SurpriseData.length <= 0) {
      return res
        .status(400)
        .json({ message: "Your partner hasn't added an Surprise" });
    }

    res
      .status(200)
      .json({
        message: "Surprise fetched successfully",
        surprises: SurpriseData,
      });
  } catch (error) {
    console.log("Server error while viewing  the surprise");
    return res
      .status(500)
      .json({ message: "Server error while viewing  the surprise", error });
  }
};
exports.updateSurprise = async (req, res) => {
  console.log("UpdateSurprise controller is called!");
  try {
    console.log("Req.params is:", req.params);
    const surpriseId = req.params._id;
    console.log("DiaryId is :", surpriseId);
    if (!surpriseId) {
      return res.status(400).json({ message: "Diary ID is required" });
    }
    const { message, photo, scheduleFor } = req.body;
    if (!message && !photo && !scheduleFor) {
      return res.status(400).json({
        message:
          "You must provide at least a 'message' or a 'photo' to update.",
      });
    }
    const existingSurprise = await Surprise.findById(surpriseId);
    console.log("Existing Diary is:", existingSurprise);
    if (!existingSurprise) {
      return res
        .status(404)
        .json({ message: "Surprise  doesn't exist on database!" });
    }

    const updatedFields = {};

    if (message !== undefined) updatedFields.message = message;
    if (photo !== undefined) updatedFields.photo = photo;
    if (scheduleFor !== undefined) updatedFields.scheduleFor = scheduleFor;

    const updateSurprise = await Surprise.findByIdAndUpdate(
      surpriseId,
      {
        $set: updatedFields,
      },
      {
        new: true,
      }
    );
    console.log("Existing surpriseID is :", updateSurprise);

    res
      .status(200)
      .json({
        message: "Surprise has been updated successfully",
        updateSurprise,
      });
    return;
  } catch (error) {
    console.log("Error while updating the surprise is:", error);
    return res
      .status(500)
      .json({ message: "Server error while updating Surprise:" });
  }
};



//Message to the Surprise received     


exports.getAllSurprises = async (req, res) => {
  try {
    const userId = req.userId;
    const surprises = await Surprise.find
      ({ userId: userId })
      .sort({ createdAt: -1 });
    if (!surprises) {
      return res.status(400).json({ message: "No surprises found" });
    }
    res.status(200).json({ message: "Surprises fetched successfully", surprises });
  }
  catch (error) {
    console.log("Server error while viewing the surprises");
    return res
      .status(500)
      .json({ message: "Server error while viewing the surprises", error });
  }
}


exports.fetchAllSurprise = async (req, res) => {
  try {
    console.log("Fetch all surprise is called!");
    const userId = req.userId;

    const existingSurprise = await Surprise.find({
      userId: userId,
    });
    if (!existingSurprise) {
      return res
        .status(500)
        .json({ message: "There are no existing surprises available" });
    }
    return res
      .status(200)
      .json({ message: "All existing surprises are:", existingSurprise });
  } catch (error) {
    console.log("Error while updating the surprise is:", error);
    return res
      .status(500)
      .json({ message: "Server error while updating surprises is:" });
  }
};

exports.deleteSurprise = async(req,res)=>{

  try{
      const id = req.params.id;
      if(!id)
      {
        return res.status(400).json({ message: "Surprise Id not found" });
      }

    await Surprise.findByIdAndDelete(id);
    res.status(400).json({ message: "Surprise deleted successfully!" });
  }
  catch(error){
    console.log("Error while deleting the surprises is:", error);
    return res
      .status(500)
      .json({ message: "Server error while deleting Surprise is:" });

  }
}

exports.getSurpriseByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const userId = req.userId;
    const surprises = await Surprise.find({ userId: userId, scheduleFor: date });
    if (!surprises) {
      return res.status(400).json({ message: "No surprises found" });
    }

    res.status(200).json({ message: "Surprises fetched successfully", surprises });
  }
  catch (error) {
    console.log("Server error while viewing the surprises");
    return res
      .status(500)
      .json({ message: "Server error while viewing the surprises", error });
  }
}

exports.updateSurprise = async (req, res) => {
        console.log("UpdateSurprise controller is called!");
        try {
          console.log("Req.params is:", req.params);
          const surpriseId = req.params._id;
          console.log("DiaryId is :", surpriseId);
          if (!surpriseId) {
            return res.status(400).json({ message: "Diary ID is required" });
          }
          const {message,photo,scheduleFor} = req.body;
          if(!message && !photo && !scheduleFor )
          {
            return res.status(400).json({
                message: "You must provide at least a 'message' or a 'photo' to update.",
              });
            
          }
          const existingSurprise = await Surprise.findById(surpriseId);
          console.log("Existing Diary is:", existingSurprise);
          if (!existingSurprise) {
            return res
              .status(404)
              .json({ message: "Surprise  doesn't exist on database!" });
          }

          const updatedFields ={};

          if(message !== undefined) updatedFields.message= message;
          if (photo !== undefined) updatedFields.photo = photo;
          if (scheduleFor !== undefined) updatedFields.scheduleFor = scheduleFor;


          const updateSurprise  = await Surprise.findByIdAndUpdate(surpriseId, {
            $set:updatedFields          
          },
        {
            new:true
        });
          console.log("Existing surpriseID is :", updateSurprise);
      
          res
            .status(200)
            .json({ message: "Surprise has been updated successfully", updateSurprise });
          return;
        } catch (error) {
          console.log("Error while updating the surprise is:", error);
          return res
            .status(500)
            .json({ message: "Server error while updating Surprise:" });
        }
      };


//Message to the Surprise received     


