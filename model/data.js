const mongoose = require("mongoose");
const schema=new mongoose.Schema({
    data:{type:Object,default:{}}
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  });

model=mongoose.model("data",schema);
module.exports=model;