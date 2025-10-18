import dbConnect from '../../../lib/dbConnect';
import collegeController from '../../../lib/controllers/collegeController';
import { error } from '../../../lib/utils/responseWrapper';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  const { slug } = req.query;

  // Handles requests to the root: GET /api/college
  if (!slug || slug.length === 0) {
    if (method === 'GET') {
      return collegeController.getAllColleges(req, res);
    }
  }

  // Handles requests to sub-routes
  const action = slug && slug.length > 0 ? slug[0] : null;
  switch (action) {
    case 'point-table':
      if (method === 'POST') {
        return collegeController.collegePointTable(req, res);
      }
      break;

    case 'score':
      if (method === 'POST') {
        return collegeController.totalScore(req, res);
      }
      break;

    // --- NEW CASE for fetching detailed match history ---
    case 'match-details':
        if (method === 'POST') {
            return collegeController.getCollegeMatchDetails(req, res);
        }
        break;

    default:
      return res.status(404).json(error(404, 'API endpoint not found'));
  }

  return res.status(405).json(error(405, `Method ${method} not allowed for this endpoint`));
}
