import asyncHandler from "../utils/asyncHandler.js"; 

const registerUser = asyncHandler(async (req , res) =>{
     res.status(200).json({
        message : "hey arpit everything is working fine" 
     })
})

export default registerUser ; 