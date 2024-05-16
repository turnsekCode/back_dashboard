import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, "secretKey");
      const user = await User.findById(decodedToken.userId);
      console.log("verify", user);
      if (!user || user.role !== requiredRole) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};

export default verifyRole;
