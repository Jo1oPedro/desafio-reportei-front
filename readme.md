# Sobre

- Repositório do Front responsável pelo desafio da reportei.
- Com o foco em analisar os dados dos repositorios do github:
  ```
  - Vue,
  - Nuxt
  ```
- Link para o repositório contendo o front do projeto: https://github.com/Jo1oPedro/desafio-reportei-back

# Hospedagem

- Atualmente o sistema está hospedado em uma vps2 da hostinger sobre o domínio http://www.desafio-reportei.ejsocial.com/ ou ip: http://85.31.62.148:3000

- Configurações da vps:
  ```
  - Núcleos de CPU: 2
  - Memória: 8 GB
  - Largura de Banda: 8 TB
  - Espaço em disco: 100 GB
  ```

# Passo a Passo para execução

## Certifique-se de estar com o Docker em execução.

```sh
docker ps
```

## Certifique-se de ter o Docker Compose instalado.

```sh
docker compose version
```

## Contruir a imagem Docker, execute:

### Caso não se importe em esperar a execução do npm install:

```sh
docker compose up --build -d
```

### Caso contrario:

```sh
docker compose -f docker-compose.yaml -f docker-compose.dev.yaml up --build -d
```
