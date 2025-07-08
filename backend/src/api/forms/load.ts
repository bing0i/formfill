import { Request, Response, NextFunction } from "express";
import { decrypt } from "@src/utils/crypto";
import { loadEncryptedData } from "@src/db";

export const loadFormHandler = (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const record = loadEncryptedData();
    if (!record) {
      return res.status(404).json({ error: "No valid form data found." });
    }

    const decrypted = decrypt(record.iv, record.content);
    const data = JSON.parse(decrypted);

    return res.json({ data });
  } catch (err) {
    next(err);
  }
};
