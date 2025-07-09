import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js"; 
import uploadonCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {


   const { userName, email, password, fullName } = req.body;
   console.log(userName)
   console.log(email)
   console.log(password)
   console.log(fullName)

   if (userName === "") {
      throw new ApiError(101, "userName is empty ")
   }
   if (email === "") {
      throw new ApiError(101, "email is empty ")
   }
   if (password === "") {
      throw new ApiError(101, "password is empty ")
   }
   if (fullName === "") {
      throw new ApiError(101, "fullName is empty ")
   }

   const existedUser = User.findOne({
      $or : [{userName } ,{email}] 
   })
   if(!existedUser){
      throw new ApiError(409 , "user not exist")
   }
   else{
      console.log("user exists") ; 
   }

   const avatarLocalPath = req.files?.avatar[0]?.path ;
   const coverImageLocalPath = req.files?.coverImage[0]?.path ;

   if(!avatarLocalPath){
      throw new ApiError(400 , "Avatar file is required ") ; 
   }

  const avatar = await uploadonCloudinary(avatarLocalPath) ; 
  
  const coverImage = await uploadonCloudinary(coverImageLocalPath) ; 

  if(!avatar){
   throw new ApiError(400 , "Avatar file is required") ;
  }
//     if(!coverImage){
//    throw new ApiError(400 , "Image file is required") ;
//   }

const user = await User.create({
   userName , 
   email , 
   password,
   fullName,
   avatar : avatar.url , 
   coverImage : coverImage?.url || "" ,  
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