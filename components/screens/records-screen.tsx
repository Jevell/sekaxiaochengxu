"use client"

import { ChevronLeft, ChevronRight, ClipboardList } from "lucide-react"
import { statusMeta } from "@/lib/data"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function RecordsScreen() {
  const { pop, push, records, setTab } = useStore()

  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="sticky top-0 z-20 flex items-center gap-2 bg-background/90 px-3 py-3 backdrop-blur">
        <button type="button" onClick={pop} aria-label="返回" className="p-1 text-foreground">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-base font-medium text-foreground">剪样申请记录</h1>
      </header>

      {records.length > 0 ? (
        <div className="flex flex-col gap-3 px-4 py-4">
          {records.map((r) => {
            const meta = statusMeta[r.status]
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => push({ type: "recordDetail", id: r.id })}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3 text-left"
              >
                <img
                  src={r.image || "/placeholder.svg"}
                  alt={r.productName}
                  className="h-16 w-16 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-foreground">{r.productName}</p>
                    <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-xs", meta.className)}>
                      {meta.label}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {r.color} · {r.quantity} 份
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{r.createdAt}</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </button>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 py-24 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <ClipboardList className="h-7 w-7 text-secondary-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">暂无剪样申请</p>
          <button
            type="button"
            onClick={() => {
              pop()
              setTab("cards")
            }}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
          >
            去逛色卡
          </button>
        </div>
      )}
    </div>
  )
}
