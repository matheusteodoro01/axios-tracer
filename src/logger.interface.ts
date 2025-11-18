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
    console.log(`[TRACE] ${message || ''}`, data);
  }

  debug(data: any, message?: string): void {
    console.debug(`[DEBUG] ${message || ''}`, data);
  }

  info(data: any, message?: string): void {
    console.info(`[INFO] ${message || ''}`, data);
  }

  warn(data: any, message?: string): void {
    console.warn(`[WARN] ${message || ''}`, data);
  }

  error(data: any, message?: string): void {
    console.error(`[ERROR] ${message || ''}`, data);
  }
}


