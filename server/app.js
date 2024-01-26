import express from "express";
// import { upload } from "./middleware/multer.middleware.js";
import cors from "cors";
import cookieParser from 'cookie-parser';

const app=express();

app.use(cors({
    
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
    limit: "20kb",
}))

// app.use(express.static('./public'))

app.use(cookieParser())
// Express Configuration
import { userRouter } from "./routes/user.router.js";
app.use('/api/v1/user/',userRouter);

export  {app};