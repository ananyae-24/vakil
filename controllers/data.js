const catchAsync=require("../util/catch-async")
const Data=require("../model/data");
const apierror=require("../util/global-error")
exports.make=catchAsync(async(req,res,next)=>{
    let data=await Data.create({data:req.body});
    res.status(200).json({status:"success",data});
});
exports.getone=catchAsync(async(req,res,next)=>{
    let data=await Data.findById(req.params.id);
    if(!data)return next(new apierror("entry not found",400));
    res.status(200).json({status:"success",data});
});
exports.get=catchAsync(async(req,res,next)=>{
    let data=await Data.find();
    
    res.status(200).json({status:"success",data});
});