"use client"

import { ChevronRight, ClipboardList, Headset, LogOut, User } from "lucide-react"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function ProfilePage() {
  const { push, records, logout, showToast } = useStore()

  const menu = [
    { icon: User, label: "我的资料", onClick: () => push({ type: "profileInfo" }) },
    {
      icon: ClipboardList,
      label: "剪样申请",
      badge: records.length,
      onClick: () => push({ type: "records" }),
    },
    { icon: Headset, label: "专属客服", onClick: () => push({ type: "service" }) },
  ]

  return (
    <div className="flex flex-col">
      <header className="bg-primary/10 px-4 pb-6 pt-8">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-secondary text-secondary-foreground">
            <User className="h-8 w-8" />
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">陈女士</p>
            <p className="text-sm text-muted-foreground">138 **** 6621</p>
          </div>
        </div>
      </header>

      <div className="px-4 py-4">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {menu.map((m, i) => (
            <button
              key={m.label}
              type="button"
              onClick={m.onClick}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-4 text-left",
                i !== menu.length - 1 && "border-b border-border",
              )}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <m.icon className="h-5 w-5" />
              </span>
              <span className="flex-1 text-sm text-foreground">{m.label}</span>
              {typeof m.badge === "number" && m.badge > 0 && (
                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs text-primary">
                  {m.badge}
                </span>
              )}
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            logout()
            showToast("已退出登录")
          }}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-4 text-sm text-muted-foreground transition-colors active:bg-secondary"
        >
          <LogOut className="h-4 w-4" />
          退出登录
        </button>
      </div>
    </div>
  )
}
