import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const userMessage: string = body?.message ?? ''

    if (!userMessage.trim()) {
      return NextResponse.json(
        { error: 'El campo "message" es requerido.' },
        { status: 400 }
      )
    }

    // ──────────────────────────────────────────────────────────────────────
    // LLAMADA A TU API DE PYTHON (FASTAPI)
    // ──────────────────────────────────────────────────────────────────────
    // Cuando lo subas a Hugging Face, reemplaza esta URL por la URL pública
    // de tu servidor de Python (por ejemplo: https://tu-usuario-api-python.hf.space/chat)
    const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://127.0.0.1:8000/chat'

    try {
      const pythonRes = await fetch(PYTHON_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      })

      if (!pythonRes.ok) {
        throw new Error('Error en la API de Python')
      }

      const pythonData = await pythonRes.json()
      
      // Se espera que la API de Python devuelva: { "response": "texto..." }
      return NextResponse.json({ response: pythonData.response })
      
    } catch (apiError) {
      console.error('Error conectando a la API de Python:', apiError)
      return NextResponse.json({ 
        response: `Error: No se pudo conectar a la API de Python en ${PYTHON_API_URL}. ¿Está encendido el servidor FastAPI?` 
      })
    }

  } catch (error) {
    console.error('[api/chat] Error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    )
  }
}
