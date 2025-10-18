import dbConnect from '../../../lib/dbConnect';
import matchController from '../../../lib/controllers/matchController';
import requireUser from '../../../lib/middlewares/requireUser';
import { error } from '../../../lib/utils/responseWrapper';

/**
 * The main handler for all routes under /api/match/*.
 * @param {import('next').NextApiRequest} req - The incoming request object.
 * @param {import('next').NextApiResponse} res - The response object.
 */
export default async function handler(req, res) {
  // 1. Connect to the database.
  await dbConnect();

  const { method } = req;
  // 2. Extract the action from the URL slug.
  const { slug } = req.query;

  // 3. Handle the root route (e.g., POST /api/match/)
  if (!slug || slug.length === 0) {
    if (method === 'POST') {
      // This corresponds to router.post("/", ...), which adds a new match result.
      // This is a protected action, so we wrap the controller in our middleware.
      return requireUser(matchController.addMatchResult)(req, res);
    }
    if (method === 'GET') {
      // This is a public route to get all matches for a specific sport.
      return matchController.getAllMatchesForSport(req, res);
    }
  }

  // 4. Handle sub-routes (e.g., /api/match/upcoming)
  const action = slug && slug.length > 0 ? slug[0] : null;

  switch (action) {
    case 'upcoming':
        if (method === 'GET') {
            // Public route to get all upcoming matches across all sports.
            return matchController.getUpcomingMatches(req, res);
        }
        break; // Fall through to 405 if method is not GET

    // --- 404 Not Found ---
    default:
      return res.status(404).json(error(404, 'API endpoint not found'));
  }

  // 5. Handle incorrect HTTP method for a valid route.
  return res.status(405).json(error(405, `Method ${method} not allowed for this endpoint`));
}
