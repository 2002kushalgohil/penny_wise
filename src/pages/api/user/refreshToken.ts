import { NextApiRequest, NextApiResponse } from "next";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import dbConnect from "../../../../utils/db";
import User from "../../../../models/User";
import generateTokens from "../../../../utils/generateTokens";
import { JWT_REFRESH_SECRET } from "../../../../config/config";

// Connect to the database
dbConnect();

interface RefreshTokenRequest {
  refreshToken: string;
}

export default async function refreshTokenHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    const { refreshToken }: RefreshTokenRequest = req.body;

    if (!refreshToken) {
      return res
        .status(400)
        .json({ success: false, error: "Refresh token is required" });
    }

    const decoded: any = jwt.verify(refreshToken, JWT_REFRESH_SECRET!);
    const userId: string = decoded.userId;

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(400).json({ success: false, error: "User not found" });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      existingUser._id
    );

    return res
      .status(200)
      .json({ success: true, accessToken, refreshToken: newRefreshToken });
  } catch (error) {
    console.error("Error while refreshing token:", error);
    if (error instanceof TokenExpiredError) {
      return res
        .status(401)
        .json({ success: false, error: "Refresh token expired" });
    } else if (error instanceof JsonWebTokenError) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid refresh token" });
    }
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
}
