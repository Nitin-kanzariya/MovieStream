import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: "dhj4cv0ch",
  api_key: "294158828473591",
  api_secret: "n92LaoqnGso2_xAF1vte_CzT5XU",
});

// Function to upload a file buffer to Cloudinary using a stream
const uploadToCloudinary = (fileBuffer, resourceType) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: resourceType },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

export default uploadToCloudinary;