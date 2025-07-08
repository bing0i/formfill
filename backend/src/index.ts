import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import { logger } from "@src/utils/logger";
import formsRouter from "@src/api/forms";
import docsRouter from "@src/api/docs";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use((req, _, next) => {
  logger.info({
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });
  next();
});

app.use("/apis/forms", formsRouter);
app.use("/apis/docs", docsRouter);

app.use((err: any, req: any, res: any, _: any) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    endpoint: req.originalUrl,
  });
  res.status(500).json({ error: "Internal server error." });
});

app.listen(PORT, () => {
  logger.info(`FormFill backend running on port ${PORT}`);
});
