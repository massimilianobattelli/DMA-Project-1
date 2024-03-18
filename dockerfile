# Usa un'immagine di base Node.js
FROM node:latest

# Imposta la directory di lavoro nel container
WORKDIR /usr/src/app

# Copia il file package.json e package-lock.json nella directory di lavoro
COPY package*.json ./

# Installa le dipendenze dell'applicazione
RUN npm install

# Copia il resto dei file dell'applicazione nella directory di lavoro
COPY . .

# Espone la porta 3000 del container
EXPOSE 3000

# Install Prisma Engine
RUN npx prisma generate

# Comando per avviare l'applicazione quando il container viene eseguito
CMD ["node", "app.js"]
