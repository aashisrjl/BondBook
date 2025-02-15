const Remainder = require("../../database/models/remainder.model");

exports.createRemainder = async(req,res)=>{
    const {title,date} = req.body;
    const userId = req.userId;

    if(!title || !date)
    {
        return res.status(400).json({message:"Title and date is required"})
    }
    const newRemainder = await Remainder.create({
        title,
        date,
        userId
    });

    res.status(200).json({
        message:"Remainder created successfully",
        remainder:newRemainder
    })

}

exports.getRemainders = async(req,res)=>{
    const userId = req.userId;
    const remainders = await Remainder.find({userId:userId});
    res.status(200).json({
        message:"Remainders fetched successfully",
        remainders
    })
}

exports.deleteRemainder = async(req,res)=>{
    const remainderId = req.params.id;
    const userId = req.userId;
    const remainder = await Remainder.find({_id:remainderId,userId:userId});
    if(!remainder){
        return res.status(404).json({message:"Remainder not found"})
    }
    if(!remainderId){
        return res.status(400).json({message:"Remainder id is required"})
    }
    const deletedRemainder = await Remainder.findByIdAndDelete(remainderId);
    if(!deletedRemainder){
        return res.status(404).json({message:"Remainder not found"})
    }
    res.status(200).json({message:"Remainder deleted successfully",deletedRemainder})
}