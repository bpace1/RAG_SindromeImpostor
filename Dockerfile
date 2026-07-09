FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Instalar dependencias
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN pnpm run build

# Configurar el puerto para Hugging Face Spaces
ENV PORT=7860
EXPOSE 7860

# Iniciar la aplicación
CMD ["pnpm", "start", "-p", "7860"]
