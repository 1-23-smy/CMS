import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { PropertyData } from "./Property.model.js";
const userSchema=new Schema(
    {
    
        username:{
            type:String,
            unique:true,
            required:true,
            trim: true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        password:{
            type:String,
            required: [true, "Password is required"],
            select:false
        },
       propertydata:[
        {
          propertyDetails:{ 
            type: mongoose.Schema.Types.ObjectId,
                ref: 'PropertyData'
          }
        }
       ]
    
},{timestamps:true});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
 }
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id, name: this.username, email: this.email, data: this.propertydata }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });
};

export const User = mongoose.model("User", userSchema);