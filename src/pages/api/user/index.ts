import { NextApiResponse } from "next";
import {
  withAuth,
  AuthenticatedNextApiRequest,
} from "../../../../middlewares/auth";

// Handler function to get user information
const getUserHandler = withAuth(async function (
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse
) {
  try {
    // Ensure only GET requests are accepted
    if (req.method !== "GET") {
      return res
        .status(405)
        .json({ success: false, error: "Method Not Allowed" });
    }

    // Extract user object from request (provided by withAuth middleware)
    const user = req.user;

    // Return user information
    return res.status(200).json({ success: true, user });
  } catch (error) {
    // Log the error
    console.error("Error retrieving user information:", error);

    // Return a generic error response
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
});

export default getUserHandler;
