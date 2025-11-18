# axios-logger-client

Axios HTTP client com logging opcional de requests e responses.

## Instalação

```bash
npm install axios-logger-client axios
```

## Uso Básico

### Sem Logger (sem logging)

```typescript
import { HttpClient } from "axios-logger-client";

const client = new HttpClient();

const data = await client.get("https://api.example.com/users");
```

### Com Logger Padrão (console.log)

```typescript
import { HttpClient } from "axios-logger-client";

const client = new HttpClient({
  enableLogging: true, // Habilita logging com console.log
});

const data = await client.post("https://api.example.com/users", {
  name: "John Doe",
  email: "john@example.com",
});
```

### Com Logger Customizado

```typescript
import { HttpClient, Logger } from "axios-logger-client";

// Exemplo com PinoLogger (nestjs-pino)
import { PinoLogger } from "nestjs-pino";

const pinoLogger = new PinoLogger();
pinoLogger.setContext("MyApiClient");

const client = new HttpClient({
  logger: pinoLogger,
  context: "MyApiClient",
});

// Exemplo com logger customizado
const customLogger: Logger = {
  trace: (data, message) => {
    console.log(`[TRACE] ${message}`, JSON.stringify(data, null, 2));
  },
  error: (data, message) => {
    console.error(`[ERROR] ${message}`, JSON.stringify(data, null, 2));
  },
};

const client = new HttpClient({
  logger: customLogger,
  enableLogging: true,
});
```

### Com Configuração do Axios

```typescript
import { HttpClient } from "axios-logger-client";

const client = new HttpClient({
  logger: myLogger,
  axiosConfig: {
    baseURL: "https://api.example.com",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  },
});

// Agora você pode usar URLs relativas
const users = await client.get("/users");
```

## API

### `HttpClient`

#### Construtor

```typescript
new HttpClient(options?: HttpClientOptions)
```

#### Opções

- `logger?: Logger` - Logger opcional para registrar requests/responses
- `enableLogging?: boolean` - Habilita logging (padrão: `true` se logger fornecido, `false` caso contrário)
- `context?: string` - Contexto para os logs (padrão: `'HttpClient'`)
- `axiosConfig?: AxiosRequestConfig` - Configuração base do axios

#### Métodos

- `get<T>(url: string, config?: AxiosRequestConfig): Promise<T>`
- `post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>`
- `put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>`
- `delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>`
- `getAxiosInstance(): AxiosInstance` - Retorna a instância do axios para uso avançado

### `Logger` Interface

```typescript
interface Logger {
  trace?(data: any, message?: string): void;
  debug?(data: any, message?: string): void;
  info?(data: any, message?: string): void;
  warn?(data: any, message?: string): void;
  error?(data: any, message?: string): void;
}
```

## Exemplos de Logs

### Request/Response de Sucesso

```json
{
  "data": {
    "request": {
      "method": "POST",
      "url": "https://api.example.com/users",
      "body": {
        "name": "John Doe",
        "email": "john@example.com"
      },
      "headers": {
        "Content-Type": "application/json"
      }
    },
    "response": {
      "statusCode": 201,
      "body": {
        "id": 1,
        "name": "John Doe"
      }
    }
  }
}
```

### Request/Response com Erro

```json
{
  "data": {
    "request": {
      "method": "GET",
      "url": "https://api.example.com/users/999"
    },
    "response": {
      "statusCode": 404,
      "body": {
        "error": "User not found"
      }
    }
  }
}
```

## Compatibilidade

- Compatível com qualquer logger que implemente a interface `Logger`
- Funciona com `PinoLogger` do `nestjs-pino`
- Funciona com `console.log` (via `ConsoleLogger`)
- Totalmente compatível com a API do Axios

## Desenvolvimento

```bash
# Build
npm run build

# Publicar
npm publish
```

## Licença

MIT
