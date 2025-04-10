import express from 'express';
import userRoutes from './routes/user.routes';


const app = express();
const PORT = 3000;

app.use(express.json()); // for parsing application/json
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
