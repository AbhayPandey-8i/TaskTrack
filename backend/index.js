import { configDotenv } from "dotenv";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/dbConnect.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.routes.js";
import todoRoute from "./routes/todo.routes.js";
import cors from "cors";

dotenv.config({});
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

//routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/todo", todoRoute);

app.listen(PORT, () => {
  console.log(`Server is running at PORT:${PORT}`);
});
