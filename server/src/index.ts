import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import { dbConnection } from "./utils/dbConnection";
import routes from "./routes";
import swaggerDocs from "./utils/swagger";
import errorHandler from "./middleware/errorHandler";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use(cors());

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);

  await dbConnection();

  routes(app);

  app.use(errorHandler);

  swaggerDocs(app, parseInt(process.env.PORT!, 10));
});
