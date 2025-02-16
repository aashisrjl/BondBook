const Timeline = require("../../database/models/timeline.model")

exports.postTimeline = async(req,res)=>{
    const {title,description,eventDate} = req.body
    let photo
    if(req.file){
        photo = req.file.filename
    }else{
        photo = null
    }

    const userId = req.userId

    if(!title || !description || !eventDate){
    return res.status(400).json({
        message: "All fields are required",

    })
    }

    const timeline = await Timeline.create({
        title,
        description,
        eventDate,
        photo,
        userId
    })

    res.status(201).json({
        message: "Timeline created successfully",
        timeline
    })

}

exports.getTimeline = async(req,res)=>{
    const timeline = await Timeline.find({
        where:{
            userId: userId
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
    const timeline = await Timeline.findOne({
        where:{
            userId: userId,
            _id: timelineId
        }
    })
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
