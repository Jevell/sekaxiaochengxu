"use client"

import { useStore } from "@/lib/store"

export function Toast() {
  const { toast } = useStore()
  if (!toast) return null
  return (
    <div className="pointer-events-none absolute inset-x-0 top-1/2 z-50 flex -translate-y-1/2 justify-center px-8">
      <div className="animate-in fade-in zoom-in-95 rounded-2xl bg-foreground/85 px-5 py-3 text-sm font-medium text-background shadow-lg backdrop-blur">
        {toast.message}
      </div>
    </div>
  )
}
