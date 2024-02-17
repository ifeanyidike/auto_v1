import { v2 as cloudinary, type UploadResponseCallback } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploads = (file: string, folder: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(
        file,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result: any) => {
          // Explicitly define the type of the 'result' parameter
          resolve({
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            public_id: result.public_id,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            url: result.url,
          });
        },
        {
          resource_type: 'auto',
          folder: folder,
        } as unknown as UploadResponseCallback
      )
      .catch(error => {
        reject(error); // Handle the rejection by passing it to the outer promise
      });
  });
};

export { uploads, cloudinary };
