import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyUser = () => {
  return async (req, res, next) => {
    console.log("req", req);
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, "secretKey");
      const user = await User.findById(decodedToken.userId);
      console.log("verify", user);
      if (!user) {
        return res
          .status(403)
          .json({ message: "No esta autorizado para esta tarea" });
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};

export default verifyUser;
