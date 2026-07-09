'use client'

import { useEffect, useRef } from 'react'
import MessageBubble, { type Message } from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import Disclaimer from './Disclaimer'

interface MessageListProps {
  messages: Message[]
  isTyping: boolean
}

export default function MessageList({ messages, isTyping }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div
      className="flex-1 overflow-y-auto"
      role="log"
      aria-live="polite"
      aria-label="Conversación"
    >
      {/* Top padding */}
      <div className="h-4" />

      {/* Disclaimer always at top */}
      <Disclaimer />

      {messages.length === 0 && !isTyping && (
        <EmptyState />
      )}

      <div className="flex flex-col gap-0.5 pb-2">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      {/* Scroll anchor */}
      <div ref={bottomRef} className="h-4" aria-hidden="true" />
    </div>
  )
}

function EmptyState() {
  const topics = [
    { emoji: '🎯', label: 'Autoexigencia' },
    { emoji: '🧠', label: 'Síndrome del impostor' },
    { emoji: '✅', label: 'Perfeccionismo' },
    { emoji: '💼', label: 'Estrés laboral' },
    { emoji: '💙', label: 'Ansiedad por rendimiento' },
  ]

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <div
        className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{ background: 'rgba(122,162,200,0.1)', border: '1px solid rgba(122,162,200,0.2)' }}
        aria-hidden="true"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#7aa2c8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      <h1
        className="mb-2 text-xl font-semibold text-balance"
        style={{ color: '#e8e8e8' }}
      >
        Asistente de Bienestar Psicológico
      </h1>
      <p className="mb-8 max-w-sm text-sm leading-relaxed text-balance" style={{ color: '#8a8a8a' }}>
        Estoy aquí para orientarte sobre bienestar emocional y salud mental. Puedes preguntarme sobre:
      </p>
      <ul className="flex flex-wrap justify-center gap-2" aria-label="Temas disponibles">
        {topics.map((t) => (
          <li key={t.label}>
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
              style={{
                background: 'rgba(122,162,200,0.07)',
                border: '1px solid rgba(122,162,200,0.18)',
                color: '#b0b0b0',
              }}
            >
              <span aria-hidden="true">{t.emoji}</span>
              {t.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
