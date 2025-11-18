import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { Logger, ConsoleLogger } from "./logger.interface";

export interface HttpClientAdapter {
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

export interface HttpClientOptions {
  /**
   * Logger opcional para registrar requests e responses
   * Se não fornecido, usa ConsoleLogger por padrão
   */
  logger?: Logger;
  /**
   * Se true, habilita o logging de requests/responses
   * Padrão: true se logger for fornecido, false caso contrário
   */
  enableLogging?: boolean;
  /**
   * Se true, remove dados sensíveis dos logs
   * Padrão: true
   */
  removeSensitiveData?: boolean;
  /**
   * Contexto para os logs (ex: 'HttpClient', 'ApiClient')
   */
  context?: string;
  /**
   * Configuração base do axios
   */
  axiosConfig?: AxiosRequestConfig;
}

export class HttpClient implements HttpClientAdapter {
  private readonly http: AxiosInstance;
  private readonly logger: Logger | null;
  private readonly enableLogging: boolean;
  private readonly removeSensitiveDataFromLogs: boolean;
  private readonly context: string;

  constructor(options: HttpClientOptions = {}) {
    const {
      logger,
      enableLogging = !!logger,
      removeSensitiveData: removeSensitive = true,
      context = "HttpClient",
      axiosConfig = {},
    } = options;

    this.http = axios.create(axiosConfig);
    this.logger = logger || (enableLogging ? new ConsoleLogger() : null);
    this.enableLogging = enableLogging;
    this.removeSensitiveDataFromLogs = removeSensitive;
    this.context = context;

    if (this.enableLogging && this.logger) {
      this.setupInterceptors();
    }
  }

  private setupInterceptors(): void {
    this.http.interceptors.response.use(
      (response) => {
        this.logResponse(response);
        return response;
      },
      (error: AxiosError) => {
        this.logError(error);
        return Promise.reject(error);
      }
    );
  }

  private logResponse(response: any): void {
    if (!this.logger) return;

    const logData = {
      data: {
        request: {
          method: response.config.method,
          url: `${response.config.baseURL || ""}${response.config.url}`,
          params: response.config.params,
          body: this.safeParse(response?.config?.data ?? null),
          headers: response.config?.headers,
          baseUrl: response.config.baseURL,
        },
        response: {
          statusCode: response.status,
          body: response.data,
          headers: response?.headers,
        },
      },
    };

    if (this.logger.trace) {
      this.logger.trace(logData, "http_request_response");
    } else if (this.logger.info) {
      this.logger.info(logData, "http_request_response");
    }
  }

  private logError(error: AxiosError): void {
    if (!this.logger) return;

    const logData = {
      data: {
        request: {
          method: error.config?.method,
          url: `${error.config?.baseURL || ""}${error.config?.url}`,
          params: error.config?.params,
          body: this.safeParse(error?.config?.data ?? null),
          headers: error?.config?.headers,
          baseUrl: error.config?.baseURL,
        },
        response: error.response
          ? {
              statusCode: error.response.status,
              body: error.response.data,
              headers: error.response.headers,
            }
          : {
              duration: "unknown",
              statusCode: "unknown",
              body: "unknown",
              headers: "unknown",
            },
      },
    };

    if (this.logger.trace) {
      this.logger.trace(logData, "http_request_response_error");
    } else if (this.logger.error) {
      this.logger.error(logData, "http_request_response_error");
    }
  }

  private safeParse(data: any): any {
    try {
      return JSON.parse(data);
    } catch (error) {
      return data;
    }
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return (await this.http.post<T>(url, data, config)).data;
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return (await this.http.put<T>(url, data, config)).data;
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.http.get<T>(url, config)).data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return (await this.http.delete<T>(url, config)).data;
  }

  /**
   * Retorna a instância do axios para uso avançado
   */
  public getAxiosInstance(): AxiosInstance {
    return this.http;
  }
}
