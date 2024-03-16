import { verify } from "jsonwebtoken";
import User from "../models/User";
import dbConnect from "../utils/db";

dbConnect();

export function withAuth(handler) {
  return async (req, res) => {
    // Extract access token from request headers
    let accessToken = req.headers.authorization;

    // Remove "Bearer " prefix from access token
    accessToken = accessToken ? accessToken.replace("Bearer ", "") : null;

    // If access token is missing, return unauthorized error
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      // Verify access token
      const decoded = verify(accessToken, process.env.JWT_SECRET);

      // If access token is invalid, return error
      if (!decoded) {
        return res.status(400).json({ message: "Invalid Token" });
      }

      // Find user by user ID from decoded token
      const user = await User.findById(decoded.userId);

      // If user not found, return error
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }

      // Remove sensitive fields from the user object
      const {
        password,
        bankAccounts,
        expenses,
        incomes,
        budgets,
        financialGoals,
        debts,
        billReminders,
        ...safeUser
      } = user.toObject();

      // Attach safe user object to request for further handling
      req.user = safeUser;

      // Call the original request handler function
      return handler(req, res);
    } catch (error) {
      // Handle token verification errors
      console.error("Error verifying access token:", error);
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }
      // For other errors, return unauthorized
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
}
