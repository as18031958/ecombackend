import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected The MongoDb database ${connect.connection.host}`);

    }catch(error){
        console.log("db not connected",error)
    }
}
export default connectDB;