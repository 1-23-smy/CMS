import dotenv from "dotenv";
import connectDB from "./db/connnect.db.js";
import { app } from "./app.js";
import {v2 as cloudinary} from 'cloudinary'
dotenv.config({ path: "./.env" });
cloudinary.config({
  cloud_name:process.env.cloud_name,
  api_key:process.env.api_key,
  api_secret:process.env.api_secret
})

connectDB().then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`⚙️ Server running on PORT ${process.env.PORT} 🚀`)
  })
}).catch((err) => { console.log("MongoDB connection error !!!", err) });
