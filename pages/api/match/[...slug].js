import dbConnect from '../../../lib/dbConnect';
import matchController from '../../../lib/controllers/matchController';
import requireUser from '../../../lib/middlewares/requireUser';
import { error } from '../../../lib/utils/responseWrapper';

export default async function handler(req, res) {
  // --- ADD LOGGING HERE ---
  console.log(`[API /api/match/] Received request: ${req.method} ${req.url}`);
  // --- END LOGGING ---

  await dbConnect();

  const { method } = req;
  const { slug } = req.query;

  // Handles requests to the root: POST /api/match/ or GET /api/match/
  if (!slug || slug.length === 0) {
    // --- ADD LOGGING HERE ---
    console.log(`[API /api/match/] No slug detected, handling root route for method: ${method}`);
    // --- END LOGGING ---

    if (method === 'POST') {
      // --- ADD LOGGING HERE ---
      console.log(`[API /api/match/] Attempting to handle POST request via requireUser(matchController.addMatchResult)`);
      // --- END LOGGING ---
      // This corresponds to router.post("/", ...), which adds a new match result.
      return requireUser(matchController.addMatchResult)(req, res);
    }
    if (method === 'GET') {
      // --- ADD LOGGING HERE ---
      console.log(`[API /api/match/] Handling GET request via matchController.getAllMatchesForSport`);
      // --- END LOGGING ---
      return matchController.getAllMatchesForSport(req, res);
    }
    // If method is neither POST nor GET for the root path
    // --- ADD LOGGING HERE ---
    console.log(`[API /api/match/] Method ${method} not allowed for root route, sending 405.`);
     // --- END LOGGING ---
     res.setHeader('Allow', ['GET', 'POST']); // Correct Allow header
     return res.status(405).json(error(405, `Method ${method} not allowed for this endpoint`));
  }

  // Handles requests to sub-routes (e.g., /api/match/upcoming)
  const action = slug && slug.length > 0 ? slug[0] : null;
  // --- ADD LOGGING HERE ---
  console.log(`[API /api/match/] Slug detected. Action: ${action}, Method: ${method}`);
  // --- END LOGGING ---

  switch (action) {
    case 'upcoming':
        if (method === 'GET') {
             // --- ADD LOGGING HERE ---
            console.log(`[API /api/match/upcoming] Handling GET request via matchController.getUpcomingMatches`);
            // --- END LOGGING ---
            return matchController.getUpcomingMatches(req, res);
        }
        break; // Fall through to 405 if method is not GET

    // --- 404 Not Found ---
    default:
      // --- ADD LOGGING HERE ---
      console.log(`[API /api/match/] Action '${action}' not found, sending 404.`);
      // --- END LOGGING ---
      return res.status(404).json(error(404, 'API endpoint not found'));
  }

  // Handle incorrect HTTP method for a valid sub-route (like POST to /upcoming)
  // --- ADD LOGGING HERE ---
  console.log(`[API /api/match/] Method ${method} not allowed for action '${action}', sending 405.`);
  // --- END LOGGING ---
  res.setHeader('Allow', ['GET']); // Adjust Allow header based on the specific action
  return res.status(405).json(error(405, `Method ${method} not allowed for this endpoint`));
}