import express, { request } from 'express';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (request, response) => {
  return response.json({ message: "Server running." })
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on https://localhost:${port}`))