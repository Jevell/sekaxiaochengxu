"use client"

import { Heart } from "lucide-react"
import type { Product } from "@/lib/data"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

// pick readable text color for an arbitrary swatch background
function isLight(hex: string) {
  const h = hex.replace("#", "")
  const r = Number.parseInt(h.slice(0, 2), 16)
  const g = Number.parseInt(h.slice(2, 4), 16)
  const b = Number.parseInt(h.slice(4, 6), 16)
  return 0.299 * r + 0.587 * g + 0.114 * b > 150
}

function FavButton({ product }: { product: Product }) {
  const { isFavorite, toggleFavorite, showToast } = useStore()
  const faved = isFavorite(product.id)
  return (
    <span
      onClick={(e) => {
        e.stopPropagation()
        toggleFavorite(product.id)
        showToast(faved ? "已取消收藏" : "已加入收藏")
      }}
      role="button"
      aria-label={faved ? "取消收藏" : "收藏"}
      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur"
    >
      <Heart className={cn("h-4 w-4", faved ? "fill-primary text-primary" : "text-muted-foreground")} />
    </span>
  )
}

/** Standard swatch card: photo on top, fabric-colored swatch footer. */
export function ProductCard({ product }: { product: Product }) {
  const { push } = useStore()
  const light = isLight(product.colorHex)

  return (
    <button
      type="button"
      onClick={() => push({ type: "product", id: product.id })}
      className="group flex flex-col overflow-hidden rounded-2xl bg-card text-left shadow-sm ring-1 ring-border transition-shadow active:shadow-none"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <img
          src={product.images[0] || "/placeholder.svg"}
          alt={`${product.name} 面料图`}
          className="h-full w-full object-cover transition-transform duration-300 group-active:scale-[0.98]"
        />
        <FavButton product={product} />
      </div>
      {/* swatch footer painted with the real fabric color */}
      <div
        className="flex flex-col gap-0.5 px-3 py-2.5"
        style={{ backgroundColor: product.colorHex }}
      >
        <span className={cn("truncate text-[13px] font-medium", light ? "text-black/80" : "text-white")}>
          {product.name}
        </span>
        <span className={cn("text-[11px] tabular-nums", light ? "text-black/55" : "text-white/70")}>
          {product.colorName} · {product.code}
        </span>
      </div>
    </button>
  )
}

/** Featured wide card used as the first item — editorial hero. */
export function FeaturedCard({ product }: { product: Product }) {
  const { push } = useStore()
  const light = isLight(product.colorHex)

  return (
    <button
      type="button"
      onClick={() => push({ type: "product", id: product.id })}
      className="group relative flex w-full overflow-hidden rounded-2xl bg-card text-left shadow-sm ring-1 ring-border"
    >
      <div className="relative aspect-[4/5] w-2/5 shrink-0 overflow-hidden bg-muted">
        <img
          src={product.images[0] || "/placeholder.svg"}
          alt={`${product.name} 面料图`}
          className="h-full w-full object-cover"
        />
      </div>
      <div
        className="flex flex-1 flex-col justify-between p-4"
        style={{ backgroundColor: product.colorHex }}
      >
        <div>
          <span className={cn("text-[11px] uppercase tracking-widest", light ? "text-black/50" : "text-white/60")}>
            本期臻选
          </span>
          <h3 className={cn("mt-1 font-serif text-lg font-semibold", light ? "text-black/85" : "text-white")}>
            {product.name}
          </h3>
          <p className={cn("mt-1 text-xs", light ? "text-black/55" : "text-white/70")}>
            {product.colorName} · {product.composition}
          </p>
        </div>
        <div className={cn("flex items-end justify-between", light ? "text-black/80" : "text-white")}>
          <span className="text-sm font-semibold">{product.price}</span>
          <span className={cn("text-[11px]", light ? "text-black/50" : "text-white/70")}>{product.code}</span>
        </div>
      </div>
      <FavButton product={product} />
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
