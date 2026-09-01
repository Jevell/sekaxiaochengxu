"use client"

import { HeartOff } from "lucide-react"
import { products } from "@/lib/data"
import { useStore } from "@/lib/store"
import { ProductGrid } from "@/components/product-card"

export function FavoritesPage() {
  const { favorites, setTab } = useStore()
  const favProducts = products.filter((p) => favorites.includes(p.id))

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-20 bg-background/90 px-4 pb-3 pt-4 backdrop-blur">
        <h1 className="font-serif text-xl font-semibold text-foreground">我的收藏</h1>
        <p className="text-xs text-muted-foreground">共 {favProducts.length} 款面料</p>
      </header>

      {favProducts.length > 0 ? (
        <div className="px-4 py-3">
          <ProductGrid products={favProducts} />
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <HeartOff className="h-7 w-7 text-secondary-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">还没有收藏的面料</p>
            <p className="mt-1 text-xs text-muted-foreground">看到心仪的面料点击爱心即可收藏</p>
          </div>
          <button
            type="button"
            onClick={() => setTab("cards")}
            className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
          >
            去逛色卡
          </button>
        </div>
      )}
    </div>
  )
}
