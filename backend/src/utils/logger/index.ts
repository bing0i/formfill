/**
 * Logger utility for FormFill backend.
 * Provides info, warn, and error logging with strict type safety.
 * Uses console methods for output.
 */

import { LogError, LogInfo } from "./types";

/**
 * Internal log function to handle all log levels.
 * @param level - Log level (INFO, WARN, ERROR)
 * @param value - Value to log
 */
function log(level: "INFO" | "WARN" | "ERROR", value: unknown): void {
  const prefix = `[${level}]`;
  if (typeof value === "string") {
    // eslint-disable-next-line no-console
    console[level.toLowerCase() as "info" | "warn" | "error"](
      `${prefix} ${value}`
    );
  } else {
    // eslint-disable-next-line no-console
    console[level.toLowerCase() as "info" | "warn" | "error"](
      prefix,
      JSON.stringify(value)
    );
  }
}

export const logger = {
  /**
   * Log informational messages.
   * @param info - Information to log
   */
  info(info: LogInfo | string): void {
    log("INFO", info);
  },

  /**
   * Log error messages.
   * @param error - Error information to log
   */
  error(error: LogError | string): void {
    log("ERROR", error);
  },

  /**
   * Log warning messages.
   * @param warning - Warning information to log
   */
  warn(warning: LogInfo | string): void {
    log("WARN", warning);
  },
};
