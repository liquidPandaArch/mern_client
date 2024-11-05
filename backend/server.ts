import express from "express";
import type { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user.route.ts";
import leadRouter from "./routes/lead.route.ts";
import { notFoundHandler, errorHandler } from "./middleware/error.middleware";
import connectDB from "./config/db.ts";

const port: String | Number = process.env.PORT || 6000;

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// Routes
app.use("/api/users", userRouter);
app.use("/api/saveauth", leadRouter);

app.post("/api/getauthcred", (req, res, next) => {
  console.log(req.body)
  res.status(200).json({
    message: "good job",
  });
})

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});


// Database connection
connectDB();

// If the request reaches this point, it means that the request was not handled by any of the routes.
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


