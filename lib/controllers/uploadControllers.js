import cloudinary from '../utils/cloudinary'; // Import our configured Cloudinary instance
import Photo from '../models/photo';
import { success, error } from '../utils/responseWrapper';

const uploadImage = async (req, res) => {
  try {
    // The image is expected to be a base64 encoded string from the frontend
    const { image, folderName, name } = req.body;

    if (!image || !folderName) {
        return res.status(400).json(error(400, "Image data and folderName are required."));
    }

    const cloudImg = await cloudinary.uploader.upload(image, {
      folder: folderName,
    });

    const imgToUpload = await Photo.create({
      folderName,
      image: {
        publicId: cloudImg.public_id,
        url: cloudImg.secure_url,
      },
      name, // Name can be optional
    });

    return res.status(201).json(success(201, { imgToUpload }));
  } catch (e) {
    console.error("Error in uploadImage controller:", e);
    return res.status(500).json(error(500, e.message));
  }
};

const getPhotos = async (req, res) => {
  try {
    const { folderName } = req.body;
    if (!folderName) {
        return res.status(400).json(error(400, "folderName is required."));
    }

    const photos = await Photo.find({ folderName: folderName });
    return res.status(200).json(success(200, photos));
  } catch (e) {
    console.error("Error in getPhotos controller:", e);
    return res.status(500).json(error(500, e.message));
  }
};

const getPhotosByName = async (req, res) => {
  try {
    const { folderName, name } = req.body;
     if (!folderName || !name) {
        return res.status(400).json(error(400, "folderName and name are required."));
    }
    const photos = await Photo.find({ folderName, name });
    return res.status(200).json(success(200, photos));
  } catch (e) {
    console.error("Error in getPhotosByName controller:", e);
    return res.status(500).json(error(500, e.message));
  }
};

export default { uploadImage, getPhotos, getPhotosByName };
