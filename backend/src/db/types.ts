export interface EncryptedData {
  iv: string;
  content: string;
  expiry: number;
  savedAt: number;
}

export interface DBData {
  record?: EncryptedData;
}
