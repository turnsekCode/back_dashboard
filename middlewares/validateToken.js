import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const authRequired = (req, res, next) => {
  console.log("req", req.cookies);
  const { token } = req.cookies;
  if (!token)
    return res.status(401).json({ message: "No token, autorizacion denegada" });

  jwt.verify(token, "secretKey", (err, user) => {
    if (err) return res.status(403).json({ message: "token invalido" });

    req.user = user;
    next();
  });
};
