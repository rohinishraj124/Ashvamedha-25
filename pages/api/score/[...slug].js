import dbConnect from '../../../lib/dbConnect';
import scoreController from '../../../lib/controllers/scoreController';
import requireUser from '../../../lib/middlewares/requireUser';
import { error } from '../../../lib/utils/responseWrapper';

/**
 * The main handler for all routes under /api/score/*.
 * @param {import('next').NextApiRequest} req - The incoming request object.
 * @param {import('next').NextApiResponse} res - The response object.
 */
export default async function handler(req, res) {
  // 1. Connect to the database.
  await dbConnect();

  const { method } = req;
  // 2. Extract the action from the URL slug.
  const { slug } = req.query;
  const action = slug && slug.length > 0 ? slug[0] : null;

  // 3. Route the request.
  switch (action) {
    // --- PUBLIC ROUTE ---
    case 'getlivescore':
      if (method === 'POST') {
        // Corresponds to router.post("/getlivescore", ...)
        return scoreController.getLiveScore(req, res);
      }
      break;

    // --- PROTECTED ROUTES ---
    case 'setlivescore':
      if (method === 'POST') {
        // Corresponds to router.post("/setlivescore", ...)
        // We use setOrUpdateLiveScore and protect it with middleware.
        return requireUser(scoreController.setOrUpdateLiveScore)(req, res);
      }
      break;

    case 'updatelivescore':
      if (method === 'PUT') {
        // Corresponds to router.put("/updatelivescore", ...)
        // This also uses the efficient setOrUpdateLiveScore controller.
        return requireUser(scoreController.setOrUpdateLiveScore)(req, res);
      }
      break;
      
    case 'deletelivescore':
      if (method === 'DELETE') {
        // Corresponds to router.delete("/deletelivescore", ...)
        return requireUser(scoreController.deleteLiveScore)(req, res);
      }
      break;

    // --- 404 Not Found ---
    default:
      return res.status(404).json(error(404, 'API endpoint not found'));
  }

  // 4. Handle incorrect HTTP method for a valid route.
  return res.status(405).json(error(405, `Method ${method} not allowed for this endpoint`));
}
