import { NextApiResponse } from "next";
import dbConnect from "../../../../utils/db";
import {
  AuthenticatedNextApiRequest,
  withAuth,
} from "../../../../middlewares/auth";
import User, { UserDocument } from "../../../../models/User";

// Connect to the database
dbConnect();

const cashHandler = withAuth(async function (
  req: AuthenticatedNextApiRequest,
  res: NextApiResponse
) {
  const userId = req.user?._id;

  if (!userId) {
    return sendErrorResponse(res, 401, "Unauthorized");
  }

  try {
    switch (req.method) {
      case "GET":
        return handleGetCash(userId, res);
      case "PUT":
        return handleUpdateCash(userId, req.body, res);
      default:
        return sendErrorResponse(res, 405, "Method not allowed");
    }
  } catch (error) {
    console.error("Error:", error);
    return sendErrorResponse(res, 500, "Internal Server Error");
  }
});

// Utility function to send error responses
function sendErrorResponse(
  res: NextApiResponse,
  statusCode: number,
  message: string
) {
  return res.status(statusCode).json({ success: false, error: message });
}

// Define type for cash data
type CashData = {
  wallet: number;
};

async function handleGetCash(userId: string, res: NextApiResponse) {
  try {
    const user: UserDocument | null = await User.findById(userId);
    if (!user) {
      return sendErrorResponse(res, 404, "User not found");
    }
    return res.status(200).json({ success: true, cash: user.cash });
  } catch (error) {
    console.error("Error fetching user cash information:", error);
    return sendErrorResponse(res, 500, "Failed to fetch user cash information");
  }
}

async function handleUpdateCash(
  userId: string,
  cashData: CashData,
  res: NextApiResponse
) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cash: cashData },
      { new: true }
    );

    if (!updatedUser) {
      return sendErrorResponse(res, 404, "User not found");
    }

    return res.status(200).json({ success: true, cash: updatedUser.cash });
  } catch (error) {
    console.error("Error updating user cash information:", error);
    return sendErrorResponse(
      res,
      500,
      "Failed to update user cash information"
    );
  }
}

export default cashHandler;
