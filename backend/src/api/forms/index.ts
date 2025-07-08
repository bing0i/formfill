import { Router } from "express";
import { saveFormHandler } from "@src/api/forms/save";
import { loadFormHandler } from "@src/api/forms/load";

const formsRouter = Router();

formsRouter.post("/save", saveFormHandler as any);
formsRouter.get("/load", loadFormHandler as any);

export default formsRouter;
