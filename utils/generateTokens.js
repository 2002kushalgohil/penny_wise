import jwt from "jsonwebtoken";

export default function generateTokens(_id) {
  // Validate user ID
  if (!_id) {
    throw new Error("User ID is required to generate tokens");
  }

  // Generate access token
  const accessToken = jwt.sign({ userId: _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
  });

  // Generate refresh token
  const refreshToken = jwt.sign(
    { userId: _id },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY,
    }
  );

  // Return tokens
  return { accessToken, refreshToken };
}
