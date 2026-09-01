"use client"

import { Heart } from "lucide-react"
import type { Product } from "@/lib/data"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function ProductCard({ product }: { product: Product }) {
  const { push, isFavorite, toggleFavorite, showToast } = useStore()
  const faved = isFavorite(product.id)

  return (
    <button
      type="button"
      onClick={() => push({ type: "product", id: product.id })}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition-shadow active:shadow-none"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <img
          src={product.images[0] || "/placeholder.svg"}
          alt={`${product.name} 面料图`}
          className="h-full w-full object-cover transition-transform duration-300 group-active:scale-[0.98]"
        />
        <span
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(product.id)
            showToast(faved ? "已取消收藏" : "已加入收藏")
          }}
          role="button"
          aria-label={faved ? "取消收藏" : "收藏"}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors"
        >
          <Heart
            className={cn("h-4 w-4", faved ? "fill-primary text-primary" : "text-muted-foreground")}
          />
        </span>
      </div>
      <div className="flex flex-col gap-1 p-3">
        <div className="flex items-center gap-1.5">
          <span
            className="h-3 w-3 shrink-0 rounded-full border border-black/5"
            style={{ backgroundColor: product.colorHex }}
          />
          <h3 className="truncate text-sm font-medium text-foreground">{product.name}</h3>
        </div>
        <p className="text-xs text-muted-foreground">编号 {product.code}</p>
        <p className="truncate text-xs text-muted-foreground">
          {product.composition} · {product.weight}
        </p>
      </div>
    </button>
  )
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
