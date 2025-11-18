/**
 * Interface genérica para loggers
 * Permite usar qualquer logger que implemente estes métodos
 */
export interface Logger {
  trace?(data: any, message?: string): void;
  debug?(data: any, message?: string): void;
  info?(data: any, message?: string): void;
  warn?(data: any, message?: string): void;
  error?(data: any, message?: string): void;
}

/**
 * Logger padrão que usa console.log
 * Usado quando nenhum logger é fornecido
 */
export class ConsoleLogger implements Logger {
  trace(data: any, message?: string): void {
    console.log(`[TRACE] ${message || ""}`, JSON.stringify(data, null, 2));
  }

  debug(data: any, message?: string): void {
    console.debug(`[DEBUG] ${message || ""}`, JSON.stringify(data, null, 2));
  }

  info(data: any, message?: string): void {
    console.info(`[INFO] ${message || ""}`, JSON.stringify(data, null, 2));
  }

  warn(data: any, message?: string): void {
    console.warn(`[WARN] ${message || ""}`, JSON.stringify(data, null, 2));
  }

  error(data: any, message?: string): void {
    console.error(`[ERROR] ${message || ""}`, JSON.stringify(data, null, 2));
  }
}
