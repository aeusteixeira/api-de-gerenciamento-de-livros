import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config()

async function connect(){
    mongoose.connect(process.env.MONGO_URL);
}

export default connect;