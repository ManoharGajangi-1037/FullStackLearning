import express from "express";
import employeeRoutes from "./routes/employee.routes";
const PORT = 3000;
const app = express();
app.use(express.json());
app.use('/employees', employeeRoutes);

app.listen(PORT);
