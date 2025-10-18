import dbConnect from '../../../lib/dbConnect';
import cronController from '../../../lib/controllers/cronController';
import { error } from '../../../lib/utils/responseWrapper';

/**
 * The main handler for all routes under /api/cron/*.
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
    case 'testcron':
      if (method === 'GET') {
        // This corresponds to router.get("/testcron", cronController.testcron)
        return cronController.testcron(req, res);
      }
      break; // Fall through to 405 if method is not GET

    // --- 404 Not Found ---
    default:
      return res.status(404).json(error(404, 'API endpoint not found'));
  }

  // 4. Handle incorrect HTTP method for a valid route.
  return res.status(405).json(error(405, `Method ${method} not allowed for this endpoint`));
}