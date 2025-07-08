export interface LogInfo {
  method?: string;
  url?: string;
  ip?: string;
  userAgent?: string;
  [key: string]: unknown;
}

export interface LogError {
  message: string;
  stack?: string;
  endpoint?: string;
  [key: string]: unknown;
}
