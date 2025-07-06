
import express from "express" ; 

import dotenv from "dotenv"
import DBLogic from "./db/db.js"; 

dotenv.config({
    path : ".env"
})


DBLogic() ; 
const app = express() ; 


// app.get('./' , (req,res)=>{
//      res.send("hey user") 

// })

// app.listen(process.env.PORT , ()=>{
//     console.log(`server is listening on the port ${process.env.PORT}`)
// })