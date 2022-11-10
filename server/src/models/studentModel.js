const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const studentSchema = new mongoose.Schema({
        name: { type: String, required: true ,trim:true,lowercase: true},
        subject:{type:String,required:true,trim:true,lowercase: true},
        marks:{type:Number,required:true,trim:true},
        isDeleted:{type:Boolean,default:false},
        userId: { type: ObjectId, required: true, ref: "user" },
});

module.exports = mongoose.model("Students", studentSchema)