# Guia para Publicar o Pacote no NPM

## Pré-requisitos

1. **Ter uma conta no npm**
   - Se não tiver, crie em: https://www.npmjs.com/signup

2. **Fazer login no npm**
   ```bash
   npm login
   ```
   - Você será solicitado a inserir:
     - Username (seu nome de usuário npm)
     - Password (sua senha)
     - Email (seu email)
     - OTP (código de autenticação de dois fatores, se habilitado)

## Passos para Publicar

### 1. Verificar se está logado
```bash
npm whoami
```
Se mostrar seu username, está logado. Se não, execute `npm login`.

### 2. Verificar o nome do pacote

⚠️ **IMPORTANTE**: O nome do pacote deve ser único no npm. 

O nome atual é `@gsc/axios-logger-client`. Se você quiser publicar como scoped package (`@gsc/...`), você precisa:
- Ter uma organização no npm com o nome `gsc`, OU
- Mudar o nome para algo sem escopo (ex: `axios-logger-client`)

**Opção A: Publicar como scoped package (requer organização)**
```bash
npm publish --access public
```

**Opção B: Mudar o nome para não-scoped**
Edite o `package.json` e mude:
```json
"name": "axios-logger-client"
```
Depois publique normalmente:
```bash
npm publish
```

### 3. Verificar se o build está atualizado
```bash
npm run build
```

### 4. Verificar o que será publicado
```bash
npm pack --dry-run
```
Isso mostra quais arquivos serão incluídos no pacote.

### 5. Publicar o pacote

**Se for scoped package (com @):**
```bash
npm publish --access public
```

**Se for pacote normal (sem @):**
```bash
npm publish
```

### 6. Verificar publicação
Após publicar, você pode verificar em:
- https://www.npmjs.com/package/[nome-do-pacote]

## Atualizar uma Versão Existente

Quando quiser publicar uma nova versão:

1. **Atualize a versão no package.json:**
   ```json
   "version": "1.0.1"
   ```
   
   Ou use o comando npm:
   ```bash
   npm version patch   # 1.0.0 -> 1.0.1
   npm version minor   # 1.0.0 -> 1.1.0
   npm version major   # 1.0.0 -> 2.0.0
   ```

2. **Faça o build:**
   ```bash
   npm run build
   ```

3. **Publique novamente:**
   ```bash
   npm publish --access public  # se for scoped
   # ou
   npm publish                   # se não for scoped
   ```

## Comandos Úteis

- `npm whoami` - Ver qual usuário está logado
- `npm logout` - Fazer logout
- `npm view [nome-pacote]` - Ver informações de um pacote publicado
- `npm unpublish [nome-pacote]@[versao]` - Remover uma versão (só funciona nas primeiras 72 horas)

## Troubleshooting

### Erro: "You do not have permission to publish"
- Verifique se está logado: `npm whoami`
- Se for scoped package, use `--access public`
- Verifique se o nome do pacote já existe no npm

### Erro: "Package name already exists"
- Escolha outro nome no `package.json`
- Ou use um scoped package: `@seu-usuario/axios-logger-client`

### Erro: "You cannot publish over the previously published versions"
- Atualize a versão no `package.json`


