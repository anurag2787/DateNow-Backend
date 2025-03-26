const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const talkSchema=new Schema({
        role: { type: String, required: true }, 
        userid: {type : String, required: true },
        text: { type: String, required: true },
        displayName: String,
        createdAt: { type: Date, default: Date.now },
        },
{
    timestamps:true
})
module.exports=mongoose.model("Talk",talkSchema);
