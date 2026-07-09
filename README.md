# 🧠 Chatbot RAG — Síndrome del Impostor

Herramienta de orientación y psicoeducación sobre el **síndrome del impostor**, autoexigencia, perfeccionismo y ansiedad relacionada con el rendimiento.

## 🏗️ Arquitectura

```
RAG_SindromeImpostor/
├── app/                  # Next.js App Router (frontend)
│   ├── api/chat/         # API route (proxy hacia FastAPI)
│   ├── globals.css       # Estilos globales
│   ├── layout.tsx
│   └── page.tsx
├── components/chat/      # Componentes React del chat
│   ├── ChatContainer.tsx
│   ├── ChatInput.tsx
│   ├── MessageBubble.tsx
│   ├── MessageList.tsx
│   ├── TypingIndicator.tsx
│   └── Disclaimer.tsx
├── lib/
│   └── utils.ts
├── backend/              # API FastAPI (Python)
│   ├── main.py           # Servidor con endpoint /chat
│   └── requirements.txt  # Dependencias Python (LangChain, FAISS, etc.)
├── data/                 # Datos para el RAG
│   ├── Sindrome_Impostor.pdf
│   └── data_process.py   # Extracción de texto (PDF + Wikipedia)
├── Dockerfile            # Para deploy en Hugging Face Spaces
├── package.json
└── requirements.txt      # Dependencias Python legacy
```

## 🔄 Flujo RAG

```
Usuario → Next.js /api/chat → FastAPI /chat → [Embedding → FAISS] → LLM → Respuesta
```

1. El usuario escribe en el chat (Next.js).
2. El frontend llama a `/api/chat` (Next.js API Route).
3. La API Route hace un `POST` al servidor **FastAPI** en Python.
4. FastAPI convierte la consulta en un embedding, busca contextos relevantes en FAISS, construye el prompt y llama al LLM.
5. La respuesta se devuelve al usuario.

## 🚀 Cómo correr el proyecto localmente

### 1. Backend Python (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2. Frontend Next.js

```bash
# En la raíz del proyecto
pnpm install
pnpm dev
```

La app estará en `http://localhost:3000`.  
El frontend se conecta al backend en `http://127.0.0.1:8000/chat` por defecto.

### 3. Variables de entorno (opcional)

Crear un archivo `.env.local` en la raíz:

```env
# URL del backend FastAPI (en producción: URL de Hugging Face Spaces)
PYTHON_API_URL=http://127.0.0.1:8000/chat
```

## 📦 Deploy en Hugging Face Spaces

El `Dockerfile` está configurado para Hugging Face Spaces (puerto 7860).

```bash
# Construir imagen localmente para testear
docker build -t chatbot-rag .
docker run -p 7860:7860 chatbot-rag
```

## ⚠️ Aviso

Esta herramienta es de orientación y psicoeducación. **No reemplaza la atención psicológica profesional.** Si estás atravesando una situación de crisis, consultá con un profesional de salud mental.