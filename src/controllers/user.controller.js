import { asyncHandler } from "../utils/async-Handler.js";
import{ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadONcLOUDINARY } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async(req,res) =>{
    // user details
    // validation of user details
    // check the user esist or not 
    //check for images and avatar
    //upload to cloudinary
    // create user object -create entry in db
    //remove password and refresh token field from response
    // check for user creation
    //return response

    const {username,email,password,fullName}= req.body
    console.log("email:",email);
    if(
        [username,email,password,fullName].some((field)=> field?.trim() === "")
    ){
        throw new ApiError(400,"all fields are required")
    }
    const existedUser = User.findOne({
        $or: [{email},{username}]
    })
    if (existedUser){
        throw new ApiError(409,"User already exists with this email or username")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const imagesLocalPaths = req.files?.coverImage[0]?.path; 

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar is required")
    }
    if(!imagesLocalPaths){
        throw new ApiError(400,"Cover image is required")
    }
    const avatar = await uploadONcLOUDINARY(avatarLocalPath);
    const coverImage = await uploadONcLOUDINARY(imagesLocalPaths);

    if(!avatar){
        throw new ApiError(400,"Error while uploading avatar")
    }
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        username: username.toLowerCase(),
        email ,
        password,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken ")

    if (!createdUser) {
      throw new ApiError(500, "something went wrong while registering user");
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})


export { registerUser }