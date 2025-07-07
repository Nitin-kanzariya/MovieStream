import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // console.log(`JWT Token: ${userId}`);
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  //   This code sets a cookie named "jwt" that stores the JWT token:
  // It can be read by JavaScript (httpOnly: false)
  // It uses HTTPS in production
  // It lasts for 30 days
  res.cookie("jwt", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken;
