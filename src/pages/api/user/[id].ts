import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../../../middlewares/auth";
import User, { UserDocument, PersonalInfo } from "../../../../models/User";

const updateUserPersonalInfo = withAuth(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Ensure only PUT requests are accepted
    if (req.method !== "PUT") {
      return res
        .status(405)
        .json({ success: false, error: "Method Not Allowed" });
    }

    // Extract userId from request query parameters
    const userId: string | undefined = req.query.id as string | undefined;

    // Check if userId is provided
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, error: "User ID required" });
    }

    // Extract personalInfo from request body
    const { personalInfo }: { personalInfo?: PersonalInfo } = req.body;

    // Find the user by userId
    const user: UserDocument | null = await User.findById(userId);

    // If user not found, return 404 error
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // If personalInfo is provided, update user's personalInfo
    if (personalInfo) {
      user.personalInfo = personalInfo;
    }

    // Save the updated user
    const updatedUser: UserDocument = await user.save();

    // Return updated user object
    return res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    // Handle errors
    console.error("Error updating user personal info:", error);
    return res
      .status(500)
      .json({ success: false, error: "Oops! Something went wrong" });
  }
});

export default updateUserPersonalInfo;
