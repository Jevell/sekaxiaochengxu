"use client"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { colorFamilies, products } from "@/lib/data"
import { useStore } from "@/lib/store"
import { ProductCard } from "@/components/product-card"
import { cn } from "@/lib/utils"

export function ColorFamilyScreen() {
  const { pop } = useStore()
  const [active, setActive] = useState<string>("all")

  const options = [{ id: "all", name: "全部", hex: "" }, ...colorFamilies]
  const filtered = active === "all" ? products : products.filter((p) => p.family === active)

  return (
    <div className="flex min-h-full flex-col bg-background">
      {/* header */}
      <header className="sticky top-0 z-20 flex items-center gap-2 bg-background/90 px-2 py-3 backdrop-blur">
        <button
          type="button"
          onClick={pop}
          aria-label="返回"
          className="flex h-9 w-9 items-center justify-center rounded-full text-foreground"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="font-serif text-lg font-semibold text-foreground">按色系挑选</h1>
          <p className="text-xs text-muted-foreground">选择色系，快速找到心仪面料</p>
        </div>
      </header>

      {/* color family swatches */}
      <section className="px-4 pb-2 pt-1">
        <div className="grid grid-cols-4 gap-3">
          {options.map((f) => {
            const isActive = active === f.id
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                className="flex flex-col items-center gap-1.5"
                aria-pressed={isActive}
              >
                <span
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ring-black/10 transition-all",
                    isActive && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                  )}
                  style={
                    f.id === "all"
                      ? {
                          background:
                            "conic-gradient(#9caa93,#37485f,#b56a4b,#c9922f,#e6c9cb,#4a4a4d,#e3d9c4,#9caa93)",
                        }
                      : { backgroundColor: f.hex }
                  }
                />
                <span
                  className={cn(
                    "text-xs",
                    isActive ? "font-medium text-foreground" : "text-muted-foreground",
                  )}
                >
                  {f.name}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* result count */}
      <div className="flex items-baseline justify-between px-4 pb-2 pt-3">
        <h2 className="text-sm font-medium text-foreground">
          {active === "all" ? "全部面料" : options.find((o) => o.id === active)?.name}
        </h2>
        <span className="text-xs text-muted-foreground">共 {filtered.length} 款</span>
      </div>

      {/* product grid */}
      <div className="px-4 pb-6">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-sm text-muted-foreground">该色系暂无面料</p>
        )}
      </div>
    </div>
  )
}
