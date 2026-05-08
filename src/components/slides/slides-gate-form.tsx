import { useState } from 'react'
import { setSlidesGateUnlocked } from '@/lib/slides-gate-local-storage'
import { verifySlidesPasswordFn } from '@/lib/slides-gate-server'
import { Button } from '@/components/ui/button'

type SlidesGateFormProps = {
  onUnlocked?: () => void
}

/**
 * Password form for gated slides. Sets cookie via server fn on success.
 */
export function SlidesGateForm({ onUnlocked }: SlidesGateFormProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  return (
    <div className="bg-background flex min-h-dvh flex-col items-center justify-center px-6 text-foreground">
      <form
        className="w-full max-w-sm"
        onSubmit={(e) => {
          e.preventDefault()
          setError(null)
          setPending(true)
          void (async () => {
            try {
              const result = await verifySlidesPasswordFn({
                data: { password },
              })
              if (result.success) {
                setSlidesGateUnlocked()
                setPassword('')
                onUnlocked?.()
              } else {
                setError('Contraseña incorrecta.')
              }
            } catch {
              setError('No se pudo verificar. Intenta de nuevo.')
            } finally {
              setPending(false)
            }
          })()
        }}
      >
        <p className="font-display mb-8 text-center text-xl font-semibold">
          Presentaciones
        </p>
        <label
          htmlFor="slides-gate-password"
          className="text-muted-foreground mb-2 block text-sm font-medium"
        >
          Contraseña
        </label>
        <input
          id="slides-gate-password"
          className="border-border bg-background ring-offset-background focus-visible:ring-ring mb-4 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={pending}
        />
        {error ? (
          <p className="text-destructive mb-4 text-sm">{error}</p>
        ) : null}
        <Button
          type="submit"
          className="w-full"
          disabled={pending || password.length === 0}
        >
          {pending ? 'Entrando…' : 'Continuar'}
        </Button>
      </form>
    </div>
  )
}

export function SlidesGateLoading() {
  return (
    <div className="bg-background text-foreground flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="text-muted-foreground text-sm">Cargando…</p>
    </div>
  )
}

export function SlidesGateUnavailable() {
  return (
    <div className="bg-background text-foreground flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-xl font-semibold">Presentaciones no disponibles</p>
      <p className="text-muted-foreground mt-2 max-w-md text-sm">
        No hay configuración de acceso para presentaciones en este entorno. Define{' '}
        <code className="bg-muted rounded px-1 py-0.5 font-mono text-xs">
          SLIDES_PASSWORD
        </code>{' '}
        en el servidor.
      </p>
    </div>
  )
}
