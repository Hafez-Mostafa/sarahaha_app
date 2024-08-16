import mongoose from "mongoose";


const messageSchema = mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }, 
    content: String, 
})


const messageModel = mongoose.model("Message", messageSchema)


export default messageModel