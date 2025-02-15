const Diary = require("../../database/models/diary.model");

exports.createDiary = async (req, res) => {
  const user = req.user._id;
  console.log("Auth user is:", user);
  console.log("CreateDiary controller is called!");
  try {
    const { title, content, DiaryType } = req.body;
    if (!title | !content | !DiaryType) {
      res.status(404).json({ message: "Error in creating diary" });
      return;
    }
    const newDiary = await Diary.create({
      title: title,
      DiaryType: DiaryType,
      content: content,
      userId: user,
    });
    await newDiary.save();
    res.status(200).json({ message: "Diary created successfully!", newDiary });
    return;
  } catch (error) {
    console.log("Error while creating diary is:", error);
    res
      .status(500)
      .json({ message: "Internal server error while creating a diary" });
    return;
  }
};

exports.updateDiary = async (req, res) => {
  console.log("UpdateDiary controller is called!");
  try {
    console.log("Req.params is:",req.params)
    const diaryId = req.params._id;
    console.log("DiaryId is :",diaryId)
    if (!diaryId) {
      return res.status(400).json({ message: "Diary ID is required" });
    }
    const { title, content, DiaryType } = req.body;
    const existingDiary = await Diary.findById(diaryId);
    console.log("Existing Diary is:", existingDiary);
    if (!existingDiary) {
      return res
        .status(404)
        .json({ message: "Diary doesn't exist on database!" });
    }
    const updatedDiary = await Diary.findByIdAndUpdate(diaryId, {
      title,
      content,
      DiaryType,
    });
    console.log("Existing diaryId is :", updatedDiary);

    res
      .status(200)
      .json({ message: "Diary has been updated successfully", updatedDiary });
    return;
  } catch (error) {
    console.log("Error while updating the diary is:", error);
    return res
      .status(500)
      .json({ message: "Server error while updating Diary is:" });
  }
};

exports.deleteDiary = async (req, res) => {
  try {
    const id = req.params._id;
    if(!id)
    {
      return res.status(404).json({message:"Diary with this id doesn't exist"})
    }
    
    await Diary.findByIdAndDelete(id);
    res.status(400).json({message:"Diary deleted successfully!"})


  } catch (error) {
    console.log("Error while updating the diary is:", error);
    return res
      .status(500)
      .json({ message: "Server error while updating Diary is:" });
  }
};


exports.fetchAllDiary = async(req,res)=>{
  try {
    console.log("Fetch all diary is called!")
    const userId = req.userId

    const existingDiary= await Diary.find({
        userId:userId
    });;
    if(!existingDiary)
    {
      return res.status(500).json({message:"There are no existing diaries available"})
    }
    return res
     .status(200)
     .json({message:"All existing diaries are:", existingDiary})
  } catch (error) {
    console.log("Error while updating the diary is:", error);
    return res
      .status(500)
      .json({ message: "Server error while updating Diary is:" });
  }
    
  }

