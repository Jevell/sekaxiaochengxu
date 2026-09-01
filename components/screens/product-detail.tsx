"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, Heart, Headset, Scissors } from "lucide-react"
import { imageTypeMeta, type Product } from "@/lib/data"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function ProductDetail({
  product,
  onApplySample,
}: {
  product: Product
  onApplySample: (p: Product) => void
}) {
  const { pop, push, isFavorite, toggleFavorite, showToast } = useStore()
  const faved = isFavorite(product.id)

  // only keep categories that actually have images, in the defined order
  const groups = useMemo(
    () =>
      imageTypeMeta
        .map((meta) => {
          const g = product.imageGroups.find((ig) => ig.type === meta.type)
          return g && g.images.length > 0 ? { ...meta, images: g.images } : null
        })
        .filter((g): g is { type: (typeof imageTypeMeta)[number]["type"]; label: string; images: string[] } => g !== null),
    [product],
  )

  // flat list of every image, tagged with its group, for the main viewer
  const flat = useMemo(
    () => groups.flatMap((g) => g.images.map((src) => ({ src, type: g.type, label: g.label }))),
    [groups],
  )

  const [activeType, setActiveType] = useState(groups[0]?.type)
  const [mainSrc, setMainSrc] = useState(flat[0]?.src)

  const thumbs = groups.find((g) => g.type === activeType)?.images ?? []

  const specs = [
    { label: "计价单位", value: `/ ${product.unit}` },
    { label: "幅宽", value: product.width },
    { label: "挂码", value: product.hangCode },
    { label: "克重", value: product.weight },
    { label: "成分", value: product.composition },
  ]

  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="sticky top-0 z-20 flex items-center gap-2 bg-background/80 px-3 py-3 backdrop-blur">
        <button type="button" onClick={pop} aria-label="返回" className="p-1 text-foreground">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="truncate text-base font-medium text-foreground">{product.name}</h1>
      </header>

      {/* main image */}
      <div className="relative bg-muted">
        <img
          src={mainSrc || "/placeholder.svg"}
          alt={product.name}
          className="aspect-square w-full object-cover md:aspect-[4/3]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-foreground/60 px-2.5 py-1 text-xs text-background backdrop-blur">
          {flat.find((f) => f.src === mainSrc)?.label}
        </span>
      </div>

      {/* category tabs */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pt-3">
        {groups.map((g) => (
          <button
            key={g.type}
            type="button"
            onClick={() => {
              setActiveType(g.type)
              setMainSrc(g.images[0])
            }}
            className={cn(
              "shrink-0 rounded-full px-3.5 py-1.5 text-sm transition-colors",
              activeType === g.type
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground",
            )}
          >
            {g.label}
            <span className="ml-1 opacity-70">{g.images.length}</span>
          </button>
        ))}
      </div>

      {/* thumbnails for the active category */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3">
        {thumbs.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setMainSrc(src)}
            className={cn(
              "h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-colors",
              mainSrc === src ? "border-primary" : "border-transparent",
            )}
          >
            <img src={src || "/placeholder.svg"} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      {/* title block */}
      <div className="border-b border-t border-border px-4 py-4">
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

        {/* price */}
        <p className="mt-3 text-xl font-semibold text-primary">{product.price}</p>

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
