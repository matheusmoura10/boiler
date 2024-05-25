import * as dotenv from "dotenv";

dotenv.config();
enum LogLevel {
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
  DEBUG = "DEBUG",
  WARN = "WARN",
}

export interface LoggerInterface {
  log(message: string): void;
  error(message: string): void;
  warning(message: string): void;
  debug(message: string): void;
}

export default class Logger {
  private readonly enableDebug = process.env.DEBUG === "true";

  constructor() {}

  private readonly colors = {
    [LogLevel.INFO]: "\x1b[32m",
    [LogLevel.WARNING]: "\x1b[33m",
    [LogLevel.ERROR]: "\x1b[31m",
    [LogLevel.DEBUG]: "\x1b[36m",
    [LogLevel.WARN]: "\x1b[33m",
  };

  private readonly resetColor = "\x1b[0m";

  log(message: string): void {
    if (this.enableDebug) {
      this.print(LogLevel.INFO, message);
    }
  }

  info(message: string): void {
    if (this.enableDebug) {
      this.print(LogLevel.INFO, message);
    }
  }

  error(message: string): void {
    if (this.enableDebug) {
      this.print(LogLevel.ERROR, message);
    }
  }

  warning(message: string): void {
    if (this.enableDebug) {
      if (this.enableDebug) {
        this.print(LogLevel.WARNING, message);
      }
    }
  }

  debug(message: string): void {
    if (this.enableDebug) {
      this.print(LogLevel.DEBUG, message);
    }
  }

  private print(level: LogLevel, message: string): void {
    console.log(`${this.colors[level]}[${level}] ${message}${this.resetColor}`);
  }

  logTable({
    title,
    headers,
    rows,
  }: {
    title: string;
    headers: string[];
    rows: any[];
  }): void {
    if (this.enableDebug) {
      console.log("\x1b[33m%s\x1b[0m", "-".repeat(10) + title + "-".repeat(10));
      const combined = headers.map(function (v, k, a) {
        return { chave: v, valor: rows[k] };
      });
      console.table(combined);
    }
  }
}

export const logger = new Logger();
