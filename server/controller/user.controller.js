import { apiError } from "../utils/ApiError.js";
import { User } from "../model/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { sendToken } from "../utils/sendToken.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from 'cloudinary';
import { PropertyData } from '../model/Property.model.js'
const register = asyncHandler(async (req, res) => {
    
    const { username, email, password } = req.body;
    // console.log(username);

    if ([username, email, password].some((ele) => ele?.trim() === "")) {

        throw new apiError(400, "All fields are required")
    }
    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    })
    if (existedUser) {
        res.json({ exists: true, msg: "user already exist" })
        throw new apiError(409, "User already exists")
    }
    const user = await User.create({
        username,
        email,
        password
    })
    const createdUser = await User.findById(user._id).select("-password")
    if (!createdUser) {
        throw new apiError(500, "Something went wrong while registering the user...");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully..")
    )
});

const login = asyncHandler(async (req, res) => {
    // const password =req.body.password;
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (user) {
        const isMatch = await user.isPasswordCorrect(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        sendToken(res, user, `Welcome back, ${user.username}`, 200);
    }
    else {
        res.json({ msg: "user not existed! please register..." })
    }

})

const logout = asyncHandler(async (req, res, next) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true,
        sameSite: "none",
    })
        .json({
            success: true,
            message: "Logged Out Successfully",
        });
});

const formSubmit = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user)
    console.log(user);
    //    console.log(user);
    // const propertydata = await PropertyData.findById(req.body.id);
    const { name, location, price, description } = req.body;
    const picture = req.file
    // console.log(req.file);
    if ([name, location, price, description].some((ele) => ele?.trim() === "")) {

        throw new apiError(400, "All fields are required")
    }
    const fileUri = getDataUri(picture);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
    const propertyData = await PropertyData.create({
        name,
        location,
        price,
        description,
        picture: {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        },
    });
    // user.propertydata.push({
    //     propertyDetails: propertyData._id
    // })
    // await user.save()
    // res.status(201).json({
    //     propertyData,
    //     success: true,
    //     message: "Property added",
    // });
})
const getPropertyDetails = asyncHandler(async (req, res) => {
    //  console.log(req.params.id)
    const userDetails = await PropertyData.findById(req.params.id);

    res.status(200).json({
        success: true,
        name: userDetails.name,
        description: userDetails.description,
        location: userDetails.location,
        price: userDetails.price,
        picture: userDetails.picture
    });
});

const updatePropertyDetails = asyncHandler(async (req, res) => {

    // const updateProperty=await User.findById(req.user.id)
    // const arr = updateProperty.propertydata
    // const id= updateProperty.propertydata[arr.length - 1]
    // const propdata = await PropertyData.findById(updateProperty.propertydata[].propertyDetails)
    // const id = updateProperty.propertydata.propertyDetails
    // console.log(len);
    // const { name, location, price, description } = req.body;


    // const picture = req.file;

    // if ([name, location, price, description].some((ele) => ele?.trim() === "")) {

    //     throw new apiError(400, "All fields are required")
    // }
    const id = req.params.id;
    const propertyData = await PropertyData.findById(id)
    const public_id = propertyData.picture.public_id;
    const picture = req.file
    cloudinary.uploader.destroy(public_id, (err, result) => {
        if (err) { console.log(err); }

        // console.log(result);    
    })
    const fileUri = getDataUri(picture);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
    const updateData = {
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        price: req.body.price,
        picture: {
            public_id: mycloud.public_id,
            url: mycloud.url
        }
    }

    try {
        const updatedDocument = await PropertyData.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedDocument) {
            return res.status(404).send('Document not found');
        }
        else {
            res.send(updatedDocument);
            // cloudinary.uploader.destroy(propertyData.public_id)
        }
    } catch (error) {
        res.status(500).send(error.message);
    }

});

const allPropertyDetails = asyncHandler(async (req, res) => {
    const propertyDetails= await PropertyData.find({});
    res.status(200).json({
        propertyDetails
    })
})

const deleteProperty=asyncHandler(async(req,res)=>{
    const propertyDetails=await PropertyData.findById(req.params.id);
    if (!propertyDetails) throw new apiError(404,"Property not found");
    await cloudinary.v2.uploader.destroy(propertyDetails.picture.public_id);
    await propertyDetails.deleteOne();
    
    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
})

export { register, login, logout, formSubmit, getPropertyDetails, updatePropertyDetails, allPropertyDetails, deleteProperty };
