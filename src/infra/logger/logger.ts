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
  private readonly colors = {
    [LogLevel.INFO]: "\x1b[32m",
    [LogLevel.WARNING]: "\x1b[33m",
    [LogLevel.ERROR]: "\x1b[31m",
    [LogLevel.DEBUG]: "\x1b[36m",
    [LogLevel.WARN]: "\x1b[33m",
  };

  private readonly resetColor = "\x1b[0m";

  log(message: string): void {
    this.print(LogLevel.INFO, message);
  }

  info(message: string): void {
    this.print(LogLevel.INFO, message);
  }

  error(message: string): void {
    this.print(LogLevel.ERROR, message);
  }

  warning(message: string): void {
    this.print(LogLevel.WARNING, message);
  }

  debug(message: string): void {
    this.print(LogLevel.DEBUG, message);
  }

  private print(level: LogLevel, message: string): void {
    console.log(`${this.colors[level]}[${level}] ${message}${this.resetColor}`);
  }
}

export const logger = new Logger();
