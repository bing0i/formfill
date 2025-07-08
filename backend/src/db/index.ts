import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import path from "path";
import { DBData, EncryptedData } from "./types";

const STORAGE_FILE = path.join(__dirname, "db.json");
const adapter = new JSONFileSync<DBData>(STORAGE_FILE);
const db = new LowSync<DBData>(adapter, {});

db.read();

if (!db.data) db.data = {};

/**
 * Saves encrypted form data with expiry to the lowdb file.
 * @param encryptedData - The encrypted data object { iv, content }.
 * @param expiryDays - Number of days until expiry.
 * @throws If saving fails or input is invalid.
 */
export function saveEncryptedData(
  encryptedData: { iv: string; content: string },
  expiryDays: number
): void {
  if (
    typeof encryptedData !== "object" ||
    typeof encryptedData.iv !== "string" ||
    typeof encryptedData.content !== "string"
  ) {
    throw new TypeError("Invalid encrypted data format.");
  }

  if (typeof expiryDays !== "number" || expiryDays <= 0) {
    throw new TypeError("expiryDays must be a positive number.");
  }

  const now = Date.now();
  const expiry = now + expiryDays * 24 * 60 * 60 * 1000;
  const record: EncryptedData = { ...encryptedData, expiry, savedAt: now };

  db.read();
  db.data = { record };
  db.write();
}

/**
 * Loads the latest encrypted form data if not expired.
 * @returns The encrypted data object or null if expired/not found.
 */
export function loadEncryptedData(): EncryptedData | null {
  db.read();

  const record = db.data?.record;

  if (
    !record ||
    typeof record.expiry !== "number" ||
    Date.now() > record.expiry
  ) {
    return null;
  }

  return record;
}
