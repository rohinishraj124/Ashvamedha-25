import dbConnect from '../../../lib/dbConnect';
import uploadController from '../../../lib/controllers/uploadController';
import requireUser from '../../../lib/middlewares/requireUser';
import { error } from '../../../lib/utils/responseWrapper';

/**
 * The main handler for all routes under /api/upload/*.
 * @param {import('next').NextApiRequest} req - The incoming request object.
 * @param {import('next').NextApiResponse} res - The response object.
 */
export default async function handler(req, res) {
  // 1. Connect to the database.
  await dbConnect();

  const { method } = req;
  // 2. Extract the action from the URL slug.
  const { slug } = req.query;

  // 3. Handle the root route (e.g., POST /api/upload/)
  if (!slug || slug.length === 0) {
    if (method === 'POST') {
      // Corresponds to router.post("/", uploadController.getPhotos)
      return uploadController.getPhotos(req, res);
    }
  }

  // 4. Handle sub-routes (e.g., /api/upload/create)
  const action = slug && slug.length > 0 ? slug[0] : null;

  switch (action) {
    // --- PROTECTED ROUTE ---
    case 'create':
      if (method === 'POST') {
        // Corresponds to router.post("/create", uploadController.uploadImage)
        // This is a protected action, so we wrap it in middleware.
        return requireUser(uploadController.uploadImage)(req, res);
      }
      break;

    // --- PUBLIC ROUTE ---
    case 'name':
        if (method === 'POST') {
            // Corresponds to router.post("/name", uploadController.getPhotosByName)
            return uploadController.getPhotosByName(req, res);
        }
        break;

    // --- 404 Not Found ---
    default:
      return res.status(404).json(error(404, 'API endpoint not found'));
  }

  // 5. Handle incorrect HTTP method for a valid route.
  return res.status(405).json(error(405, `Method ${method} not allowed for this endpoint`));
}
