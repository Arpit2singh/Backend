import mongoose from "mongoose" ; 
import { DBNAME } from "../constants.js";

const DBLogic = async ()=>{
  try {

    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`);
    console.log("mongodb is connected ")
    console.log(`db is connected at the db host ${connectionInstance.connection.host}`)
    
  } catch (error) {
    console.log("error is occurred")
    throw error ; 
  }
}
export default DBLogic ; 
