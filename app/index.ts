import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import mongoose, { ConnectOptions } from "mongoose";
import authRoutes from "./routes/authRoutes";
import { config } from "./config/config";

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
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.json());
app.use(authRoutes);

app.listen(config.port, () => {
  console.log("server has been started..", config.port);
});
