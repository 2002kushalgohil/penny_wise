import jwt from "jsonwebtoken";
import {
  JWT_ACCESS_TOKEN_EXPIRY,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_TOKEN_EXPIRY,
  JWT_SECRET,
} from "../config/config";

interface TokenPayload {
  userId: string;
}

export default function generateTokens(_id: string): {
  accessToken: string;
  refreshToken: string;
} {
  // Ensure JWT secrets are available
  if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
    throw new Error("JWT secrets are not provided");
  }

  // Generate access token
  const accessToken: string = jwt.sign(
    { userId: _id } as TokenPayload,
    JWT_SECRET,
    {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRY,
    }
  );

  // Generate refresh token
  const refreshToken: string = jwt.sign(
    { userId: _id } as TokenPayload,
    JWT_REFRESH_SECRET,
    {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRY,
    }
  );

  // Return tokens
  return { accessToken, refreshToken };
}
