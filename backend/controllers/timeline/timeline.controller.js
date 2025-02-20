const Timeline = require("../../database/models/timeline.model")

exports.postTimeline = async (req, res) => {
    try {
        const { title, description, eventDate } = req.body;
        const userId = req.userId;
        console.log("User id is:",userId)

        // Check for required fields
        if (!title || !description || !eventDate) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Handling multiple file uploads
        let photo = [];
        if (req.files && req.files.length > 0) {
            photo = req.files.map(file => file.filename); // Extract filenames
        }

        // Create a new timeline entry
        const timeline = await Timeline.create({
            title,
            description,
            eventDate,
            photo, // Store array of filenames
            userId
        });

        res.status(201).json({
            message: "Timeline created successfully",
            timeline
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

exports.updateTimeline = async (req, res) => {
    try {
        const timelineId = req.params.id;
        console.log("Timeline id is:",timelineId)

        const userId = req.userId;
        const { title, description, eventDate } = req.body;

        if (!timelineId) {
            return res.status(400).json({ message: "Timeline ID is required!" });
        }



        console.log("User is:",userId)


        const existingTimeline = await Timeline.findOne({
            _id: timelineId,
            userId: userId
        });

        console.log("Existing Timeline is:",existingTimeline)

        if (!existingTimeline) {
            return res.status(404).json({ message: "Timeline not found" });
        }

        // Update only text fields, not images
        existingTimeline.title = title || existingTimeline.title;
        existingTimeline.description = description || existingTimeline.description;
        existingTimeline.eventDate = eventDate || existingTimeline.eventDate;

        await existingTimeline.save();
   console.log("Helllp")
        res.status(200).json({
            message: "Timeline updated successfully",
            timeline: existingTimeline
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


exports.addPhotoToTimeline = async (req, res) => {
    const timelineId = req.params.id;
    const userId = req.userId;
    let photo;

    if (!timelineId) {
        return res.status(400).json({ message: "Timeline ID is required!" });
    }

    if (req.file) {
        photo = req.file.filename;
    } else {
        return res.status(400).json({ message: "Photo is required!" });
    }

    const existingTimeline = await Timeline.findOne({
        _id: timelineId,
        userId: userId
    });

    if (!existingTimeline) {
        return res.status(404).json({ message: "Timeline not found" });
    }

    if (existingTimeline.photo) {
        existingTimeline.photo.push(photo);
    } else {
        existingTimeline.photo = [photo];
    }

    await existingTimeline.save();

    res.status(200).json({
        message: "Photo added successfully",
        timeline: existingTimeline
    });
}


exports.getTimeline = async(req,res)=>{
    const userId = req.userId
    const timeline = await Timeline.find(
        {
            userId: userId
        }
    )
    if(timeline.length === 0){
        return res.status(404).json({
            message: "No timeline found"
        })
    }
    res.status(200).json({
        message: "All timelines",
        timeline
    })
}

exports.getPartnerTimeline = async(req,res)=>{
    const userId = req.userId
    const token = req.user.token
    const timeline = await Timeline.find({
        where:{
            userId: token
        }
    })
    if(timeline.length === 0){
        return res.status(404).json({
            message: "No timeline found"
        })
    }
    res.status(200).json({
        message: "All timelines",
        timeline
    })
}

exports.deleteTimeline = async(req,res)=>{
    const userId = req.userId
    const timelineId = req.params.id
    const [timeline] = await Timeline.find(
        {
            _id: timelineId,
            userId:userId
        }
    )
    if(!timeline){
        return res.status(404).json({
            message: "Timeline not found"
        })
    }
    await Timeline.findByIdAndDelete(timelineId)
    res.status(200).json({
        message: "Timeline deleted successfully"
    })
}
