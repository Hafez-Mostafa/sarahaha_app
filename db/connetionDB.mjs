import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";

export const connectionDB = async () => {

    const connection = await mongoose.connect(process.env.MONGO_CLOUD_URL)
    console.log(`Database is successfully Connected! ...`)
    if (!connection) return   res.status(400).json({msg:` Connection is istablished! .. `})
}    
export default connectionDB