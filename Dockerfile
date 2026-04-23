FROM node:20-alpine

WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./

# Instala todas as dependências 
RUN npm install

# Copia o restante do código
COPY . .

# Gera o build de produção (pasta /dist)
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]