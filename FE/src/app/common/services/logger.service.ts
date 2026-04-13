import { environment } from '@/environments/environment';
import { Injectable } from '@angular/core';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

@Injectable({
  providedIn: 'root'
})
export class Logger {
  private currentLogLevel: LogLevel = environment.production ? LogLevel.WARN : LogLevel.DEBUG;
  private enableConsoleOutput: boolean = true;

  private readonly styles = {
    timestamp: 'color: #888; font-size: 11px;',
    debug: 'color: #6c757d; font-weight: normal;',
    info: 'color: #17a2b8; font-weight: bold;',
    warn: 'color: #ffc107; font-weight: bold;',
    error: 'color: #dc3545; font-weight: bold;',
    method: 'color: #6f42c1; font-weight: bold;',
    params: 'color: #28a745; font-style: italic;'
  };

  constructor() {
    this.enableConsoleOutput = !environment.production;
  }

  debug(message: string, ...params: any[]): void {
    this.writeToLog(LogLevel.DEBUG, message, params);
  }

  info(message: string, ...params: any[]): void {
    this.writeToLog(LogLevel.INFO, message, params);
  }

  warn(message: string, ...params: any[]): void {
    this.writeToLog(LogLevel.WARN, message, params);
  }

  error(message: string, error?: any, ...params: any[]): void {
    this.writeToLog(LogLevel.ERROR, message, error ? [error, ...params] : params);
  }

  setLogLevel(level: LogLevel): void {
    this.currentLogLevel = level;
  }

  private writeToLog(level: LogLevel, message: string, params: any[]): void {
    if (level < this.currentLogLevel || !this.enableConsoleOutput) {
      return;
    }

    if (environment.production && level < LogLevel.WARN) {
      return;
    }

    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level];

    const timestampFormatted = `%c[${timestamp}]`;
    const levelFormatted = `%c[${levelName}]`;
    const messageFormatted = `%c${message}`;

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(
          `${timestampFormatted} ${levelFormatted} ${messageFormatted}`,
          this.styles.timestamp,
          this.styles.debug,
          this.styles.debug,
          ...params
        );
        break;
      case LogLevel.INFO:
        console.info(
          `${timestampFormatted} ${levelFormatted} ${messageFormatted}`,
          this.styles.timestamp,
          this.styles.info,
          this.styles.info,
          ...params
        );
        break;
      case LogLevel.WARN:
        console.warn(
          `${timestampFormatted} ${levelFormatted} ${messageFormatted}`,
          this.styles.timestamp,
          this.styles.warn,
          this.styles.warn,
          ...params
        );
        break;
      case LogLevel.ERROR:
        console.error(
          `${timestampFormatted} ${levelFormatted} ${messageFormatted}`,
          this.styles.timestamp,
          this.styles.error,
          this.styles.error,
          ...params
        );
        break;
    }
  }
}
