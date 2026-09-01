"use client"

import { Heart, LayoutGrid, User } from "lucide-react"
import { useStore, type Tab } from "@/lib/store"
import { cn } from "@/lib/utils"

const items: { key: Tab; label: string; icon: typeof Heart }[] = [
  { key: "cards", label: "色卡", icon: LayoutGrid },
  { key: "favorites", label: "收藏", icon: Heart },
  { key: "profile", label: "我的", icon: User },
]

export function BottomNav() {
  const { tab, setTab, favorites } = useStore()
  return (
    <nav className="flex shrink-0 items-stretch border-t border-border bg-card/95 backdrop-blur">
      {items.map((item) => {
        const active = tab === item.key
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key)}
            className={cn(
              "relative flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] transition-colors",
              active ? "text-primary" : "text-muted-foreground",
            )}
          >
            <span className="relative">
              <item.icon className={cn("h-5 w-5", active && item.key === "favorites" && "fill-primary")} />
              {item.key === "favorites" && favorites.length > 0 && (
                <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-medium text-primary-foreground">
                  {favorites.length}
                </span>
              )}
            </span>
            {item.label}
          </button>
        )
      })}
    </nav>
  )
}
