'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export type MessageRole = 'user' | 'assistant'

export interface Message {
  id: string
  role: MessageRole
  content: string
  isError?: boolean
}

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const isError = message.isError

  if (isUser) {
    return (
      <div className="message-animate flex w-full justify-end px-4 py-1.5">
        <div className="mx-auto flex w-full max-w-2xl justify-end">
          <div
            className="max-w-[80%] rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed"
            style={{
              background: '#1e3a52',
              border: '1px solid #2a5070',
              color: '#e8e8e8',
            }}
          >
            {message.content}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="message-animate flex w-full justify-start px-4 py-1.5">
      <div className="mx-auto flex w-full max-w-2xl items-start gap-3">
        {/* Assistant avatar */}
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
          style={{
            background: isError ? '#3a1e1e' : '#1e3a52',
            color: isError ? '#c87a7a' : '#7aa2c8',
            border: isError ? '1px solid #5a2a2a' : '1px solid #2a5070',
          }}
          aria-hidden="true"
        >
          A
        </div>

        {/* Bubble */}
        <div
          className="max-w-[calc(100%-2.5rem)] rounded-2xl rounded-tl-sm px-4 py-2.5"
          style={{
            background: isError ? 'rgba(200,122,122,0.07)' : '#1a1a1a',
            border: isError ? '1px solid rgba(200,122,122,0.2)' : '1px solid #2e2e2e',
          }}
        >
          <div className="prose-chat">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}
