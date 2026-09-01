"use client"

import { useState } from "react"
import { Loader2, RefreshCw, Search } from "lucide-react"
import { categories, products } from "@/lib/data"
import { useStore } from "@/lib/store"
import { ProductGrid } from "@/components/product-card"
import { cn } from "@/lib/utils"

export function ColorCardPage() {
  const { push, showToast } = useStore()
  const [activeCat, setActiveCat] = useState("all")
  const [refreshing, setRefreshing] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [loadedAll, setLoadedAll] = useState(false)

  const filtered = products.filter((p) => activeCat === "all" || p.category === activeCat)

  function handleRefresh() {
    if (refreshing) return
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      showToast("已刷新")
    }, 900)
  }

  function handleLoadMore() {
    if (loadingMore || loadedAll) return
    setLoadingMore(true)
    setTimeout(() => {
      setLoadingMore(false)
      setLoadedAll(true)
    }, 900)
  }

  return (
    <div className="flex flex-col">
      {/* brand + search */}
      <header className="sticky top-0 z-20 bg-background/90 px-4 pb-3 pt-4 backdrop-blur">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl font-semibold tracking-wide text-foreground">
              云锦色卡
            </h1>
            <p className="text-xs text-muted-foreground">臻选面料 · 一手货源</p>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            aria-label="刷新"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground"
          >
            <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
          </button>
        </div>
        <button
          type="button"
          onClick={() => push({ type: "search" })}
          className="flex w-full items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground"
        >
          <Search className="h-4 w-4" />
          搜索面料名称或编号
        </button>
      </header>

      {/* categories */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-2">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActiveCat(c.id)}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-sm transition-colors",
              activeCat === c.id
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground border border-border",
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* pull-to-refresh hint */}
      {refreshing && (
        <div className="flex items-center justify-center gap-2 py-2 text-xs text-muted-foreground">
          <Loader2 className="h-3.5 w-3.5 animate-spin" /> 正在刷新…
        </div>
      )}

      {/* grid */}
      <div className="px-4 py-3">
        <ProductGrid products={filtered} />

        <div className="flex items-center justify-center py-6">
          {loadingMore ? (
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> 加载中…
            </span>
          ) : loadedAll ? (
            <span className="text-xs text-muted-foreground">— 已经到底啦 —</span>
          ) : (
            <button
              type="button"
              onClick={handleLoadMore}
              className="rounded-full border border-border bg-card px-5 py-2 text-xs text-muted-foreground"
            >
              加载更多
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
