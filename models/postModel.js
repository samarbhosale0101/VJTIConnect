const {Schema,model}=require('mongoose')
const postSchema=new Schema({
    title:{type:String,require:true},
    category:{type:String,enum:["Event","Workshop","Recruitment","Academic","Competitions"]},
    description:{type:String,required:true},
    creator:{type:Schema.Types.ObjectId,ref:"User"},
    thumbnail:{type:String,required:true},

},{timestamps:true})
module.exports=model("Post",postSchema)