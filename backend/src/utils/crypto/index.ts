import crypto from "crypto";

function getAesKey(): string {
  const key = process.env.AES_KEY;

  if (!key || key.length !== 32) {
    throw new Error("AES_KEY must be set in environment and be 32 bytes long.");
  }

  return key;
}

/**
 * Encrypts plaintext using AES-256-CBC.
 * @param plaintext - The data to encrypt.
 * @returns The IV and encrypted content, both base64 encoded.
 * @throws If encryption fails or input is invalid.
 */
export function encrypt(plaintext: string): { iv: string; content: string } {
  if (typeof plaintext !== "string") {
    throw new TypeError("Plaintext must be a string.");
  }

  const AES_KEY = getAesKey();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(AES_KEY), iv);
  const encrypted = `${cipher.update(
    plaintext,
    "utf8",
    "base64"
  )}${cipher.final("base64")}`;

  return {
    iv: iv.toString("base64"),
    content: encrypted,
  };
}

/**
 * Decrypts AES-256-CBC encrypted content.
 * @param iv - The base64-encoded IV.
 * @param content - The base64-encoded encrypted content.
 * @returns The decrypted plaintext.
 * @throws If decryption fails or input is invalid.
 */
export function decrypt(iv: string, content: string): string {
  if (typeof iv !== "string" || typeof content !== "string") {
    throw new TypeError("IV and content must be strings.");
  }

  const AES_KEY = getAesKey();
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(AES_KEY),
    Buffer.from(iv, "base64")
  );
  const decrypted = `${decipher.update(
    content,
    "base64",
    "utf8"
  )}${decipher.final("utf8")}`;

  return decrypted;
}
