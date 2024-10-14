import { NextApiRequest, NextApiResponse } from "next";
import { verify, VerifyErrors, Secret } from "jsonwebtoken";
import User, { UserDocument } from "../models/User";
import dbConnect from "../utils/db";
import { JWT_SECRET } from "../config/config";

dbConnect();

interface DecodedToken {
  userId: string;
}

export interface AuthenticatedNextApiRequest extends NextApiRequest {
  user?: Omit<UserDocument, "password">;
}

export function withAuth(
  handler: (
    req: AuthenticatedNextApiRequest,
    res: NextApiResponse
  ) => Promise<void>
) {
  return async (req: AuthenticatedNextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = verify(token, JWT_SECRET as Secret) as DecodedToken;
      const user = await User.findById(decoded.userId).lean();

      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }

      req.user = user;
      return handler(req, res);
    } catch (error) {
      const errName = (error as VerifyErrors).name;
      const message =
        errName === "TokenExpiredError"
          ? "Token expired"
          : errName === "JsonWebTokenError"
          ? "Invalid token"
          : "Unauthorized";

      return res.status(401).json({ message });
    }
  };
}
