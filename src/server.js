import * as dotenv from "dotenv";
import "express-async-errors";
import express, { json } from "express";
import cors from "cors";

import { routes } from "./routes/index.js";
import { Error } from "./utils/Error.js";
import { UPLOADS_FOLDER } from "./configs/upload.js";

dotenv.config();

const port = 3333;

const app = express();
app.use(cors());
app.use(json());

app.use("/files", express.static(UPLOADS_FOLDER));

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof Error) {
    return response.status(error.statusCode).json({
      status: "Erro",
      message: error.message,
    });
  }
  console.error(error);

  return response.status(500).json({
    status: "Erro",
    message: "Erro interno do servidor",
  });
});

app.listen(port, () => {
  console.log(`Rodando na porta ${port}!`);
});
