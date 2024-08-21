import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const verifyToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req?.headers?.authorization;
    if (!token) return res.status(401).json({ error: "Invalid Token" });
    token = token?.split(" ")?.[1];
    const decoded: any = jwt.verify(token, config.tokenSecret);
    console.log("reqquest ==>> ", token);
    console.log("decoded ==>> ", decoded);
    req.userData = decoded?.data;
    //   req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
