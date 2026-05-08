import { useEffect } from 'react'
import Clarity from '@microsoft/clarity'

export function ClarityAnalytics() {
  useEffect(() => {
    if (!import.meta.env.PROD) return

    const projectId = import.meta.env.VITE_CLARITY_PROJECT_ID as
      | string
      | undefined
    if (!projectId) return

    Clarity.init(projectId)
  }, [])

  return null
}
