import { Request, Response, NextFunction } from "express";
import { encrypt } from "@src/utils/crypto";
import { saveEncryptedData } from "@src/db";
import { logger } from "@src/utils/logger";
import { saveSchema } from "@src/api/forms/schemas";

export const saveFormHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parseResult = saveSchema.safeParse(req.body);

    if (!parseResult.success) {
      const errors = parseResult.error.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      }));

      logger.warn({ errors, endpoint: "/save" });

      return res.status(400).json({ errors });
    }

    const { firstName, email, expiryDays } = parseResult.data;
    const days = expiryDays ?? 7;
    const data = JSON.stringify({ firstName, email });
    const encrypted = encrypt(data);

    saveEncryptedData(encrypted, days);

    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
