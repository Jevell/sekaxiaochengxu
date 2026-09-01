"use client"

import { useState } from "react"
import { ChevronLeft, Heart, Headset, Lock, Scissors } from "lucide-react"
import type { Product } from "@/lib/data"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function ProductDetail({
  product,
  onApplySample,
}: {
  product: Product
  onApplySample: (p: Product) => void
}) {
  const { pop, push, isFavorite, toggleFavorite, isEmployee, showToast } = useStore()
  const [active, setActive] = useState(0)
  const faved = isFavorite(product.id)

  // simulate multiple angles by reusing the main image
  const gallery = product.images.length > 1 ? product.images : [product.images[0], product.images[0]]

  const specs = [
    { label: "成分", value: product.composition },
    { label: "克重", value: product.weight },
    { label: "幅宽", value: product.width },
    { label: "颜色", value: product.colorName },
  ]

  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="sticky top-0 z-20 flex items-center gap-2 bg-background/80 px-3 py-3 backdrop-blur">
        <button type="button" onClick={pop} aria-label="返回" className="p-1 text-foreground">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="truncate text-base font-medium text-foreground">{product.name}</h1>
      </header>

      {/* gallery */}
      <div className="relative">
        <div
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
          onScroll={(e) => {
            const el = e.currentTarget
            setActive(Math.round(el.scrollLeft / el.clientWidth))
          }}
        >
          {gallery.map((src, i) => (
            <img
              key={i}
              src={src || "/placeholder.svg"}
              alt={`${product.name} 图 ${i + 1}`}
              className="aspect-square w-full shrink-0 snap-center object-cover md:aspect-[4/3]"
            />
          ))}
        </div>
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {gallery.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === active ? "w-4 bg-primary" : "w-1.5 bg-background/70",
              )}
            />
          ))}
        </div>
      </div>

      {/* title block */}
      <div className="border-b border-border px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{product.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">编号 {product.code}</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5">
            <span
              className="h-3.5 w-3.5 rounded-full border border-black/5"
              style={{ backgroundColor: product.colorHex }}
            />
            <span className="text-xs text-secondary-foreground">{product.colorName}</span>
          </div>
        </div>

        {/* price / employee only */}
        <div className="mt-3">
          {isEmployee ? (
            <p className="text-xl font-semibold text-primary">{product.price}</p>
          ) : (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              价格仅内部员工可见
            </div>
          )}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {product.tags.map((t) => (
            <span key={t} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* specs */}
      <div className="px-4 py-4">
        <h3 className="mb-3 text-sm font-medium text-foreground">面料属性</h3>
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {specs.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "flex items-center justify-between px-4 py-3 text-sm",
                i !== specs.length - 1 && "border-b border-border",
              )}
            >
              <span className="text-muted-foreground">{s.label}</span>
              <span className="font-medium text-foreground">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* bottom action bar */}
      <div className="mt-auto" />
      <div className="sticky bottom-0 z-20 flex items-center gap-2 border-t border-border bg-card/95 px-3 py-2.5 backdrop-blur">
        <button
          type="button"
          onClick={() => {
            toggleFavorite(product.id)
            showToast(faved ? "已取消收藏" : "已加入收藏")
          }}
          className="flex flex-col items-center gap-0.5 px-2 text-[11px] text-muted-foreground"
        >
          <Heart className={cn("h-5 w-5", faved && "fill-primary text-primary")} />
          收藏
        </button>
        <button
          type="button"
          onClick={() => push({ type: "service" })}
          className="flex flex-col items-center gap-0.5 px-2 text-[11px] text-muted-foreground"
        >
          <Headset className="h-5 w-5" />
          客服
        </button>
        <button
          type="button"
          onClick={() => onApplySample(product)}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground"
        >
          <Scissors className="h-4 w-4" />
          申请剪样
        </button>
      </div>
    </div>
  )
}
