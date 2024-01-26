import { Router } from "express";
import { register, login, logout, formSubmit, getPropertyDetails, updatePropertyDetails, allPropertyDetails,deleteProperty } from "../controller/user.controller.js";
import { isAuthenticated } from "../middleware/auth.js";
import singleUpload from "../middleware/multer.middleware.js";

const userRouter=Router();
//Login,register,logout routes
userRouter.route('/register').post(register);
userRouter.route('/login').post(login)
userRouter.route("/logout").get(logout);

//PropertyData routes
userRouter.route('/submit').post(isAuthenticated,singleUpload, formSubmit)
// userRouter.route('/submit').post(singleUpload, formSubmit)
userRouter.route('/propertyDetails/:id').get(getPropertyDetails)
userRouter.route('/updateDetails/:id').put(isAuthenticated,singleUpload,updatePropertyDetails)
userRouter.route('/allPropertyDetails').get(allPropertyDetails)
userRouter.route('/deleteProperty/:id').delete(isAuthenticated,deleteProperty)
export {userRouter}