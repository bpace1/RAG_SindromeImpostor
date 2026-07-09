'use client'

import { useState, useCallback } from 'react'
import { RotateCcw } from 'lucide-react'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { type Message } from './MessageBubble'

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = useCallback(async () => {
    const text = inputValue.trim()
    if (!text || isTyping) return

    const userMessage: Message = { id: generateId(), role: 'user', content: text }
    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
      }

      const data = await res.json()
      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: data.response ?? 'No se recibió respuesta del servidor.',
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.error('[v0] Error al contactar /api/chat:', err)
      const errorMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content:
          'Hubo un problema al conectar con el asistente. Por favor, verifica tu conexión e intenta nuevamente.',
        isError: true,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }, [inputValue, isTyping])

  const handleNewConversation = () => {
    setMessages([])
    setInputValue('')
    setIsTyping(false)
  }

  return (
    <div
      className="flex h-screen flex-col"
      style={{ background: '#0f0f0f', color: '#e8e8e8' }}
    >
      {/* Header */}
      <header
        className="flex items-center justify-between border-b px-4 py-3"
        style={{ borderColor: '#2e2e2e', background: '#0f0f0f' }}
      >
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold"
              style={{ background: 'rgba(122,162,200,0.15)', color: '#7aa2c8' }}
              aria-hidden="true"
            >
              A
            </div>
            <div>
              <h1 className="text-sm font-semibold" style={{ color: '#e8e8e8' }}>
                Asistente Psicológico
              </h1>
              <p className="text-xs" style={{ color: '#555' }}>
                Orientación y psicoeducación
              </p>
            </div>
          </div>

          <button
            onClick={handleNewConversation}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/5"
            style={{ color: '#8a8a8a', border: '1px solid #2e2e2e' }}
            aria-label="Iniciar nueva conversación"
            title="Nueva conversación"
          >
            <RotateCcw size={13} aria-hidden="true" />
            <span>Nueva conversación</span>
          </button>
        </div>
      </header>

      {/* Messages */}
      <MessageList messages={messages} isTyping={isTyping} />

      {/* Input */}
      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={sendMessage}
        disabled={isTyping}
      />
    </div>
  )
}
