// Import your controller functions and middleware.
// Note: You'll need to adjust the import paths based on your project structure.
import adminController from "../../../lib/controllers/adminController";
import requireUser from "../../../lib/middlewares/requireUser";
import dbConnect from "../../../lib/dbConnect"; // Helper to connect to the database

/**
 * A helper function to run Express-style middleware in Next.js.
 * This allows you to reuse your existing `requireUser` middleware.
 * @param {import('next').NextApiRequest} req - The request object.
 * @param {import('next').NextApiResponse} res - The response object.
 * @param {Function} fn - The middleware function to run.
 * @returns {Promise<any>} A promise that resolves when the middleware is done.
 */
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    // The middleware function calls the third argument `(result) => ...` when it's done.
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

/**
 * The main handler for all routes under /api/admin/*.
 * @param {import('next').NextApiRequest} req - The incoming request object.
 * @param {import('next').NextApiResponse} res - The response object.
 */
export default async function handler(req, res) {
  // Ensure the database is connected before proceeding
  await dbConnect();

  const { method } = req;
  // `slug` is an array of the path parts after /api/admin/
  // e.g., for /api/admin/login, slug will be ['login']
  const { slug } = req.query;
  const action = slug && slug.length > 0 ? slug[0] : null;

  // Route requests based on the first part of the slug and the HTTP method
  switch (action) {
    case "signup":
      if (method === "POST") {
        return adminController.signup(req, res);
      }
      break;

    case "login":
      if (method === "POST") {
        return adminController.login(req, res);
      }
      break;

    case "refresh":
      if (method === "GET") {
        try {
          // Run the authentication middleware first
          await runMiddleware(req, res, requireUser);
          // If middleware succeeds, call the controller
          return adminController.refreshAccessToken(req, res);
        } catch (error) {
          // If middleware fails, it will likely have already sent a response.
          // This is a safeguard.
          console.error(error);
          return res.status(401).json({ message: "Authentication required." });
        }
      }
      break;

    case "verify":
      if (method === "GET") {
        try {
          // Run the authentication middleware
          await runMiddleware(req, res, requireUser);
          // Then call the controller
          return adminController.verifyToken(req, res);
        } catch (error) {
          console.error(error);
          return res.status(401).json({ message: "Authentication required." });
        }
      }
      break;

    // If the 'action' does not match any case, it's a 404
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(404).json({ message: `Endpoint not found.` });
  }

  // If the 'action' was found but the method was wrong (e.g., GET to /login)
  res.setHeader("Allow", ["POST"]); // Adjust based on the specific route
  return res.status(405).json({ message: `Method ${method} is not allowed.` });
}
