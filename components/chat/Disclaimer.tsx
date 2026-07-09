'use client'

import { useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'

export default function Disclaimer() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div
      className="message-animate mx-auto max-w-2xl px-4 py-2"
      role="alert"
      aria-label="Aviso importante"
    >
      <div
        className="flex items-start gap-3 rounded-xl border px-4 py-3 text-sm"
        style={{
          background: 'rgba(122, 162, 200, 0.07)',
          borderColor: 'rgba(122, 162, 200, 0.22)',
          color: '#b0b0b0',
        }}
      >
        <AlertTriangle
          size={16}
          className="mt-0.5 shrink-0"
          style={{ color: '#7aa2c8' }}
          aria-hidden="true"
        />
        <p className="leading-relaxed flex-1">
          <span className="font-semibold" style={{ color: '#8fb4d4' }}>
            Aviso importante:{' '}
          </span>
          Esta herramienta es de orientación y psicoeducación. No reemplaza la atención psicológica
          profesional. Si estás atravesando una situación de crisis, te recomendamos consultar con un
          profesional de salud mental.
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="ml-1 shrink-0 rounded p-0.5 transition-colors hover:bg-white/10"
          aria-label="Cerrar aviso"
        >
          <X size={14} style={{ color: '#8a8a8a' }} />
        </button>
      </div>
    </div>
  )
}
