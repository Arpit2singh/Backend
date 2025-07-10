import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js"; 
import uploadonCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

import path from "path";



const registerUser = asyncHandler(async (req, res) => {

    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return re

   const { username, email, password, fullname } = req.body;
   console.log(username)
   console.log(email)
   console.log(password)
   console.log(fullname)

   if (username === "") {
      throw new ApiError(101, "userName is empty ")
   }
   if (email === "") {
      throw new ApiError(101, "email is empty ")
   }
   if (password === "") {
      throw new ApiError(101, "password is empty ")
   }
   if (fullname === "") {
      throw new ApiError(101, "fullName is empty ")
   }

   const existedUser = await User.findOne({
      $or : [{username} ,{email}] 
   })

if (existedUser) {
   throw new ApiError(409, "User already exists");
} else {
   console.log("User does not exist. Proceeding...");
}

   console.log(req.files);

   const avatarLocalPath = req.files?.avatar[0]?.path;
   let coverImageLocalPath ; 

   if()
  


console.log(avatarLocalPath)
 

   if(!avatarLocalPath){
      throw new ApiError(400 , "Avatar file is required avatarlocalpath") ; 
   }
   


  const avatar = await uploadonCloudinary(avatarLocalPath) ; 
  
  const coverImage = await uploadonCloudinary(coverImageLocalPath) ; 

  console.log(`hey`, avatar)

  if(!avatar){
   throw new ApiError(400 , "Avatar file is required cloudinary issue") ;
  }
//     if(!coverImage){
//    throw new ApiError(400 , "Image file is required") ;
//   }

const user = await User.create({
  username,
  email,
  password,
  fullname,
  avatar: avatar.url,
  coverImage: coverImage?.url || "",
})


const userSelected = await User.findById(user._id).select(
   "-password -refreshToken " 
) 

if(!userSelected){
   throw new ApiError(500 , "there is some error while registering ")
}

return res.status(201).json(
   new ApiResponse(201 , userSelected , "user selected successfully")
)


        
})

export default registerUser; 