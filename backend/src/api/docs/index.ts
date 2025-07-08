import { Router, Request, Response } from "express";
import path from "path";
import redoc from "redoc-express";

const docsRouter = Router();

docsRouter.get("/openapi.yaml", (_: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "./openapi.yaml"));
});

docsRouter.get(
  "/docs",
  redoc({
    title: "FormFill API Docs",
    specUrl: "/apis/docs/openapi.yaml",
  })
);

export default docsRouter;
