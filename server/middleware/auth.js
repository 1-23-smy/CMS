import { apiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
 const isAuthenticated = asyncHandler(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) return next(new apiError(401,"Not logged In"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);

    next();
});
export {isAuthenticated}