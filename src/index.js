
import express from "express" ; 

import dotenv from "dotenv"
import DBLogic from "./db/db.js"; 
import app from "./app.js";


dotenv.config({
    path : "./.env"
})

console.log("Cloudinary config values =>", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});




// const app = express() ; 
DBLogic().then(
     app.listen(process.env.PORT , ()=>{
       console.log(`app is listenn on the port ${process.env.PORT}`)
       console.log(`Server is running at http://localhost:${process.env.PORT}`)
     })
)
.catch((error)=>{
    console.log(error)
    }
) 





// app.get('./' , (req,res)=>{
//      res.send("hey user") 

// })

// app.listen(process.env.PORT , ()=>{
//     console.log(`server is listening on the port ${process.env.PORT}`)
// })