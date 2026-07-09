'use client'

import { useRef, useEffect, type KeyboardEvent } from 'react'
import { ArrowUp } from 'lucide-react'

interface ChatInputProps {
  value: string
  onChange: (val: string) => void
  onSubmit: () => void
  disabled: boolean
}

export default function ChatInput({ value, onChange, onSubmit, disabled }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 200) + 'px'
  }, [value])

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    // Guard against CJK IME composition
    if (e.nativeEvent.isComposing || e.keyCode === 229) return

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!disabled && value.trim()) onSubmit()
    }
  }

  const canSubmit = !disabled && value.trim().length > 0

  return (
    <div
      className="border-t px-4 py-3"
      style={{ borderColor: '#2e2e2e', background: '#0f0f0f' }}
    >
      <div className="mx-auto max-w-2xl">
        <div
          className="flex items-end gap-2 rounded-2xl px-4 py-3 transition-colors"
          style={{
            background: '#1a1a1a',
            border: `1px solid ${canSubmit ? 'rgba(122,162,200,0.35)' : '#2e2e2e'}`,
          }}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Escribe tu mensaje..."
            disabled={disabled}
            aria-label="Mensaje al asistente"
            className="flex-1 resize-none bg-transparent text-sm leading-relaxed outline-none placeholder:text-[#555] disabled:opacity-50"
            style={{ color: '#e8e8e8', maxHeight: '200px', minHeight: '24px' }}
          />
          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            aria-label="Enviar mensaje"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all disabled:opacity-30"
            style={{
              background: canSubmit ? '#7aa2c8' : '#252525',
              color: canSubmit ? '#0f0f0f' : '#555',
              cursor: canSubmit ? 'pointer' : 'not-allowed',
            }}
          >
            <ArrowUp size={16} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
        <p className="mt-2 text-center text-xs" style={{ color: '#4a4a4a' }}>
          Presiona{' '}
          <kbd
            className="rounded px-1 py-0.5 font-mono text-[10px]"
            style={{ background: '#252525', color: '#6a6a6a' }}
          >
            Enter
          </kbd>{' '}
          para enviar &nbsp;·&nbsp;{' '}
          <kbd
            className="rounded px-1 py-0.5 font-mono text-[10px]"
            style={{ background: '#252525', color: '#6a6a6a' }}
          >
            Shift+Enter
          </kbd>{' '}
          para nueva línea
        </p>
      </div>
    </div>
  )
}
