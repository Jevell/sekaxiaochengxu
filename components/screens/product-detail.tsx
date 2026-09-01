"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, Heart, Headset, Scissors, Expand } from "lucide-react"
import { imageTypeMeta, type Product } from "@/lib/data"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import { Watermark } from "@/components/watermark"
import { ImageViewer } from "@/components/image-viewer"

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
        .filter(
          (g): g is { type: (typeof imageTypeMeta)[number]["type"]; label: string; images: string[] } =>
            g !== null,
        ),
    [product],
  )

  const flat = useMemo(
    () => groups.flatMap((g) => g.images.map((src) => ({ src, type: g.type, label: g.label }))),
    [groups],
  )

  const [activeType, setActiveType] = useState(groups[0]?.type)
  const [mainSrc, setMainSrc] = useState(flat[0]?.src)
  const [viewerOpen, setViewerOpen] = useState(false)

  const mainLabel = flat.find((f) => f.src === mainSrc)?.label

  const thumbs = groups.find((g) => g.type === activeType)?.images ?? []

  // 4 compact tiles + composition as a full-width tile
  const tiles = [
    { label: "计价单位", value: `/ ${product.unit}` },
    { label: "幅宽", value: product.width },
    { label: "挂码", value: product.hangCode },
    { label: "克重", value: product.weight },
  ]

  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="sticky top-0 z-20 flex items-center gap-2 bg-gradient-to-b from-black/25 to-transparent px-3 py-3">
        <button
          type="button"
          onClick={pop}
          aria-label="返回"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </header>

      {/* main image (pulled under the transparent header) */}
      <button
        type="button"
        onClick={() => setViewerOpen(true)}
        aria-label="放大查看图片"
        className="relative -mt-[60px] block w-full bg-muted"
      >
        <img
          src={mainSrc || "/placeholder.svg"}
          alt={product.name}
          className="aspect-square w-full object-cover md:aspect-[4/3]"
        />
        {/* 品牌水印 */}
        <Watermark />
        <span className="absolute bottom-8 left-4 rounded-full bg-foreground/60 px-2.5 py-1 text-xs text-background backdrop-blur">
          {mainLabel}
        </span>
        <span className="absolute bottom-8 right-4 flex items-center gap-1 rounded-full bg-foreground/60 px-2.5 py-1 text-xs text-background backdrop-blur">
          <Expand className="h-3.5 w-3.5" />
          点击放大
        </span>
      </button>

      {/* info sheet pulled up over the image */}
      <div className="relative -mt-5 flex-1 rounded-t-3xl bg-background pt-4">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />

        {/* category tabs */}
        <div className="flex flex-wrap gap-2 px-4">
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

        {/* title + color + price */}
        <div className="px-4 pt-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-serif text-2xl font-semibold text-foreground">{product.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">编号 {product.code}</p>
            </div>
            <div className="flex shrink-0 flex-col items-center gap-1">
              <span
                className="h-9 w-9 rounded-full ring-1 ring-black/10"
                style={{ backgroundColor: product.colorHex }}
              />
              <span className="text-[11px] text-muted-foreground">{product.colorName}</span>
            </div>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-3xl font-semibold text-primary">{product.price}</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <span key={t} className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* specs as swatch-style data tiles */}
        <div className="px-4 py-5">
          <h3 className="mb-3 text-sm font-medium text-foreground">面料属性</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {tiles.map((t) => (
              <div key={t.label} className="rounded-2xl bg-card p-3.5 ring-1 ring-border">
                <p className="text-[11px] text-muted-foreground">{t.label}</p>
                <p className="mt-1 text-base font-semibold text-foreground">{t.value}</p>
              </div>
            ))}
            <div className="col-span-2 rounded-2xl bg-card p-3.5 ring-1 ring-border">
              <p className="text-[11px] text-muted-foreground">成分</p>
              <p className="mt-1 text-base font-semibold text-foreground">{product.composition}</p>
            </div>
          </div>
        </div>
      </div>

      {/* bottom action bar */}
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

      {viewerOpen && mainSrc && (
        <ImageViewer src={mainSrc} label={mainLabel} onClose={() => setViewerOpen(false)} />
      )}
    </div>
  )
}
