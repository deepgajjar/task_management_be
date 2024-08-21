import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { config } from "./config/config";
import authRoutes from "./routes/authRoutes";
import ticketRoutes from "./routes/ticketRoutes";

dotenv.config();

const MONGO_URI = config.mongodbConnection;

// mongo connection
// mongoose.connect(MONGO_URI,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }as ConnectOptions)
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDb has been connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

// routes
app.use(authRoutes);
app.use(ticketRoutes);

app.listen(config.port, () => {
  console.log("server has been started..", config.port);
});
