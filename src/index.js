
import express from "express" ; 

import dotenv from "dotenv"
import DBLogic from "./db/db.js"; 

dotenv.config({
    path : ".env"
})

const app = express() ; 
DBLogic().then(
     app.listen(process.env.PORT , ()=>{
       console.log(`app is listenn on the port ${process.env.PORT}`)
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