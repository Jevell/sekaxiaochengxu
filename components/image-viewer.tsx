"use client"

import { useEffect, useState } from "react"
import { X, ZoomIn, ZoomOut } from "lucide-react"
import { Watermark } from "@/components/watermark"

export function ImageViewer({
  src,
  label,
  onClose,
}: {
  src: string
  label?: string
  onClose: () => void
}) {
  const [zoomed, setZoomed] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <div className="absolute inset-0 z-50 flex flex-col bg-foreground/95">
      {/* top bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm text-background/90">{label}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="关闭"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-background/15 text-background"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* image area */}
      <div
        className="no-scrollbar flex flex-1 items-center justify-center overflow-auto px-4"
        onClick={onClose}
      >
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <img
            src={src || "/placeholder.svg"}
            alt={label || "面料图片"}
            onClick={() => setZoomed((z) => !z)}
            className="max-h-full w-auto origin-center rounded-lg object-contain transition-transform duration-300"
            style={{ transform: zoomed ? "scale(2)" : "scale(1)" }}
          />
          <Watermark />
        </div>
      </div>

      {/* zoom hint / toggle */}
      <div className="flex items-center justify-center gap-2 py-5">
        <button
          type="button"
          onClick={() => setZoomed((z) => !z)}
          className="flex items-center gap-2 rounded-full bg-background/15 px-4 py-2 text-sm text-background"
        >
          {zoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
          {zoomed ? "缩小" : "点击放大"}
        </button>
      </div>
    </div>
  )
}
