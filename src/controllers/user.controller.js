import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js"; 
import uploadonCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

import path from "path";
import { log } from "console";

const generateAccessAndRefreshTokens = async(userId)=>{
   try {
    const user =   await User.findById(userId) ; 
    const accessToken = user.generateAcessToken() 
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken ; 
    await user.save({validateBeforeSave : false}) ;  

    return {refreshToken , accessToken}

   } catch (error) {
      throw new ApiError(500 , "something went wrong while generating password ")
   }
}

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

   if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
      coverImageLocalPath = req.files.coverImage[0].path ; 
   }
  


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

const loginUser = asyncHandler(async(req , res) =>{
   // get the details from req.body 
   // username or email check  
   // find the user 
   // password check 
   // access and refresh token 
   // send cookie  

   const {username , password , email } = req.body ; 
   console.log(email)
   console.log(username )
   console.log(password) 
   if(!username && !email){
      throw new ApiError(400 , "username and password is required ")
   }
   
   const user = await User.findOne(
      {
         $or:[{username} , {email}]
      }
   )
  console.log(user)
   if(!user){
      throw new ApiError(400 , "user not exists ")
   }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if(!isPasswordValid){
      throw new ApiError(401 , "Invalid User Credentials") ; 
   }

  const {accessToken ,refreshToken} = await generateAccessAndRefreshTokens(user._id) ; 
  
  const LoggedInUser = await User.findById(user._id).select("-password -refreshToken") ;
 
  // setting up cokkie , httpOnly is only for to increase the security 
  const options = {
   httpOnly : true , 
   secure : true  ,
  }

  return res.status(200).cookie("accessToken" , accessToken , options).cookie("refreshToken" , refreshToken , options).json( 
   new ApiResponse(
      200 , 
      {
         user : LoggedInUser, accessToken , refreshToken 
            } , 
            "useer logged in successfully "
   )
  )}
)

   const logoutUser = asyncHandler( async(req , res) =>{
   const user = await  User.findByIdAndUpdate(req.body._id ,
      {
      $set :{
         refreshToken :undefined
      }
   },
      {
         new : true  
      }
     ) ; 
    const options = {
      httpOnly : true ,
      secure : true 
    }

    return res.status(200).clearCookie("accessToken"  , options).clearCookie("refreshToken" , options).json( 
   new ApiResponse(
      200 , {} , 
            "useer logged out successfully "
   )
)
})

export  { registerUser  ,  loginUser, logoutUser }; 