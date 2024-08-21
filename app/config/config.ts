import dotenv from "dotenv";
dotenv.config();

export const config = {
  mongodbConnection:
    process.env.MONGO_DB_CONNECTION ||
    "mongodb://localhost:27017/appliInfosolTask",
  port: process.env.PORT || 8080,
  tokenSecret: process.env.TOKEN_SECRET || "assign_task_demo_tech-0101",
  tokenExpiredTime: process.env.TOKEN_EXPIRED_TIME || 2,
};
