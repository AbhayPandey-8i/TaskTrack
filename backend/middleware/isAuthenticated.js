import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }

    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log("Authentication failed: ", error);
    return res.status(401).json({
      success: false,
      message: "Authentication error",
    });
  }
};
