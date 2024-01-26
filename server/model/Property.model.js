import mongoose, { Schema } from "mongoose";
const propertySchema=new Schema(
    {
        name:{
            type:String,
            required:true,
        },
        picture:{
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        },
        location:{
            type:String,
            required:true
        },
        price:{
            type: Number,
            required: true
        },
        description:{
            type: String,
            minLength: [6,"Description must be at least 100 characters"],
            required: true
        },  

        createdAt: {
            type: Date,
            default: Date.now,
        },
    },{timestamps:true}
)
export const PropertyData= mongoose.model("PropertyData", propertySchema);