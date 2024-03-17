import { NextApiRequest, NextApiResponse } from "next";
import { verify, VerifyErrors, Secret } from "jsonwebtoken";
import User, { UserDocument } from "../models/User";
import dbConnect from "../utils/db";
import { JWT_SECRET } from "../config/config";

dbConnect();

interface DecodedToken {
  userId: string;
}

// Define authenticated request interface
export interface AuthenticatedNextApiRequest extends NextApiRequest {
  user?: UserDocument;
}

export function withAuth(
  handler: (
    req: AuthenticatedNextApiRequest,
    res: NextApiResponse
  ) => Promise<void>
) {
  return async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    try {
      // Extract access token from request headers
      const accessToken = req.headers.authorization?.replace("Bearer ", "");

      // If access token is missing, return unauthorized error
      if (!accessToken) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Verify access token
      const decoded = verify(accessToken, JWT_SECRET as Secret) as DecodedToken;

      // If access token is invalid, return error
      if (!decoded) {
        return res.status(400).json({ message: "Invalid Token" });
      }

      // Find user by user ID from decoded token
      const user: UserDocument | null = await User.findById(decoded.userId);

      // If user not found, return error
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }

      // Remove sensitive fields from the user object
      const { password, ...safeUser } = user.toObject();

      // Attach safe user object to request for further handling
      req.user = safeUser;

      // Call the original request handler function
      return handler(req, res);
    } catch (error) {
      // Handle token verification errors
      console.error("Error verifying access token:", error);
      if ((error as VerifyErrors).name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      } else if ((error as VerifyErrors).name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }
      // For other errors, return unauthorized
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
}
