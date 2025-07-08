
import { v2 as cloudinary } from "cloudinary"; 
import fs from "fs" ; 

 cloudinary.config({ 
        cloud_name: process.env.
CLOUDINARY_CLOUD_NAME , 
        api_key:process.env.
CLOUDINARY_API_KEY , 
        api_secret: process.env.
CLOUDINARY_API_SECRET ,// Click 'View API Keys' above to copy your API secret
    });

    const uploadonCloudinary = async (localPath) =>{
        try {
            
            if(!localPath) return null ; 
          const response = await  cloudinary.uploader.upload(localPath,
                 {
                 resource_type : "auto"
                 })
         console.log("file is uploaded " ,response.url);

         return response ;
            
        } catch (error) {
            
            fs.unlinkSync(localPath) // remove the locally saved temprory file as the upload operation is failed in between or pre 
        }
    }

    export default uploadonCloudinary ; 