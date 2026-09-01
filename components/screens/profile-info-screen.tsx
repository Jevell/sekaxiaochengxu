"use client"

import { ChevronLeft, User } from "lucide-react"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function ProfileInfoScreen() {
  const { pop } = useStore()

  const info = [
    { label: "昵称", value: "陈女士" },
    { label: "手机号", value: "138 **** 6621" },
    { label: "常用档口", value: "东升面料 A12 档口" },
    { label: "所在地区", value: "广东 · 佛山" },
  ]

  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="sticky top-0 z-20 flex items-center gap-2 bg-background/90 px-3 py-3 backdrop-blur">
        <button type="button" onClick={pop} aria-label="返回" className="p-1 text-foreground">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-base font-medium text-foreground">我的资料</h1>
      </header>

      <div className="flex flex-col items-center py-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <User className="h-10 w-10" />
        </div>
      </div>

      <div className="px-4">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {info.map((item, i) => (
            <div
              key={item.label}
              className={cn(
                "flex items-center justify-between px-4 py-3.5 text-sm",
                i !== info.length - 1 && "border-b border-border",
              )}
            >
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
