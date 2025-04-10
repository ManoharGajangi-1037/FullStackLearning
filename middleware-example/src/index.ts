import express from "express";
import userRoutes from "./routes/user.routes";
import { Request, Response, NextFunction } from "express";
const app = express();
app.use(express.json());
app.use("/users", userRoutes);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.StatusCode || 500;
  const errorMessage = err.message || "SomeThing went wrong";
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: errorMessage,
  });
});
app.listen(3000);
