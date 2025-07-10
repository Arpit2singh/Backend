import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from "../constants.js";



// const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env

// console.log(CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME)


// const cloud_name = process.env.CLOUDINARY_CLOUD_NAME
// const api_key = process.env.CLOUDINARY_API_KEY
// const api_secret = process.env.CLOUDINARY_API_SECRET

// if (!cloud_name || !api_key || !api_secret) {
//     throw new Error("Cloudinary Config is not set!")
// }



cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
});

// console.log(CLOUDINARY_CLOUD_NAME) ;
// console.log(CLOUDINARY_API_KEY) ;
// console.log(CLOUDINARY_API_SECRET) ;

console.log(cloudinary.config)

const uploadonCloudinary = async (localPath) => {
    console.log(localPath)
    try {
        if (!localPath) return null;

        const uploadResult = await cloudinary.uploader.upload(localPath, {
            public_id: 'sds', // You can remove this if not needed
            resource_type: 'auto'
        });

        console.log("Cloudinary upload successful:", uploadResult.url);

        // Clean up temp file
        // if (fs.existsSync(localPath)) {
        //     fs.unlinkSync(localPath);
        // }

        return uploadResult;
    } catch (error) {
        console.error("Failed while uploading on Cloudinary:", error.message);
        if (fs.existsSync(localPath)) {
            fs.unlinkSync(localPath);
        }
        return -1;
    }
};

export default uploadonCloudinary;
