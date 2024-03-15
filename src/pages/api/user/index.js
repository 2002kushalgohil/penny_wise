import { withAuth } from "../../../../middlewares/auth";

// Handler function to get user information
export default withAuth(async function getUserHandler(req, res) {
  try {
    // Ensure only GET requests are accepted
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    // Extract user object from request (provided by withAuth middleware)
    const user = req.user;

    // Return user information
    return res.status(200).json({ user });
  } catch (error) {
    // Handle errors
    console.error("Error retrieving user information:", error);
    return res.status(500).json({ error: "Oops! Something went wrong" });
  }
});
