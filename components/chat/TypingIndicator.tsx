export default function TypingIndicator() {
  return (
    <div
      className="message-animate flex w-full justify-start px-4 py-2"
      role="status"
      aria-label="El asistente está escribiendo"
    >
      <div className="mx-auto flex w-full max-w-2xl items-start gap-3">
        {/* Avatar */}
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
          style={{ background: '#1e3a52', color: '#7aa2c8', border: '1px solid #2a5070' }}
          aria-hidden="true"
        >
          A
        </div>

        {/* Dots */}
        <div
          className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm px-4 py-3"
          style={{ background: '#1a1a1a', border: '1px solid #2e2e2e' }}
        >
          <span
            className="typing-dot h-2 w-2 rounded-full"
            style={{ background: '#7aa2c8' }}
          />
          <span
            className="typing-dot h-2 w-2 rounded-full"
            style={{ background: '#7aa2c8' }}
          />
          <span
            className="typing-dot h-2 w-2 rounded-full"
            style={{ background: '#7aa2c8' }}
          />
          <span className="sr-only">El asistente está escribiendo...</span>
        </div>
      </div>
    </div>
  )
}
