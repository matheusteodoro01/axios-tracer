/**
 * Exemplo de uso do axios-logger-client
 *
 * Este arquivo é apenas para referência e não será incluído no pacote npm
 */

import { HttpClient, Logger, ConsoleLogger } from "./src";

// Exemplo 1: Uso básico sem logging
async function exemplo1() {
  const client = new HttpClient();

  const data = await client.get("https://jsonplaceholder.typicode.com/posts/1");
  console.log("Dados recebidos:", data);
}

// Exemplo 2: Com logger padrão (console.log)
async function exemplo2() {
  const client = new HttpClient({
    enableLogging: true,
  });

  const data = await client.post("https://jsonplaceholder.typicode.com/posts", {
    title: "Teste",
    body: "Conteúdo do teste",
    userId: 1,
  });
  console.log("Post criado:", data);
}

// Exemplo 3: Com logger customizado
async function exemplo3() {
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
    context: "MyApiClient",
  });

  const data = await client.get("https://jsonplaceholder.typicode.com/posts/1");
  console.log("Dados:", data);
}

// Exemplo 4: Com configuração do axios
async function exemplo4() {
  const client = new HttpClient({
    logger: new ConsoleLogger(),
    axiosConfig: {
      baseURL: "https://jsonplaceholder.typicode.com",
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  // Agora pode usar URLs relativas
  const posts = await client.get("/posts");
  console.log("Posts:", posts);
}

// Exemplo 5: Desabilitar remoção de dados sensíveis
async function exemplo5() {
  const client = new HttpClient({
    logger: new ConsoleLogger(),
    removeSensitiveData: false, // Mantém dados sensíveis nos logs
  });

  const data = await client.post("https://api.example.com/login", {
    username: "user",
    password: "secret123", // Será logado sem mascaramento
  });
}
