import mongoose from "mongoose";

const connectDb = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Mongodb connected successfully!!"))
    .catch((error) => console.error(error))
}


export default connectDb;