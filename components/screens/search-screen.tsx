"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ImageUp, Loader2, PackageOpen, RefreshCw, Search, Sparkles, Trash2, X } from "lucide-react"
import { hotSearches, products } from "@/lib/data"
import { useStore } from "@/lib/store"
import { ProductGrid } from "@/components/product-card"

export function SearchScreen() {
  const { pop, currentScreen, recentSearches, addRecentSearch, clearRecent } = useStore()
  const aiMode = currentScreen?.type === "search" && currentScreen.ai === true

  const [query, setQuery] = useState("")
  const [submitted, setSubmitted] = useState("")

  // AI image search state
  const fileRef = useRef<HTMLInputElement>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [aiDone, setAiDone] = useState(false)

  // open the photo library immediately when entering AI mode
  useEffect(() => {
    if (aiMode) {
      const t = setTimeout(() => fileRef.current?.click(), 300)
      return () => clearTimeout(t)
    }
  }, [aiMode])

  const results = useMemo(() => {
    const q = submitted.trim().toLowerCase()
    if (!q) return []
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.colorName.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    )
  }, [submitted])

  // mock AI matches: a stable subset of products
  const aiResults = useMemo(() => products.slice(0, 4), [])

  function runSearch(q: string) {
    setQuery(q)
    setSubmitted(q)
    addRecentSearch(q)
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setImageUrl(url)
    setAiDone(false)
    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)
      setAiDone(true)
    }, 1600)
  }

  const showResults = submitted.trim().length > 0

  // ---- AI image search view ----
  if (aiMode) {
    return (
      <div className="flex min-h-full flex-col bg-background">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFile}
        />
        <header className="sticky top-0 z-20 flex items-center gap-2 bg-background/90 px-3 py-3 backdrop-blur">
          <button type="button" onClick={pop} aria-label="返回" className="p-1 text-foreground">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="flex items-center gap-1.5 text-base font-medium text-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            AI 识图搜面料
          </h1>
        </header>

        {!imageUrl ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <ImageUp className="h-7 w-7 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">上传一张面料图片</p>
              <p className="mt-1 text-xs text-muted-foreground">AI 将为你匹配色卡中最相似的面料</p>
            </div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
            >
              从相册选择
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 px-4 py-4">
            <div className="relative overflow-hidden rounded-2xl bg-muted">
              {/* uploaded preview */}
              <img src={imageUrl || "/placeholder.svg"} alt="上传的面料图片" className="aspect-square w-full object-cover" />
              {analyzing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-foreground/45 text-background backdrop-blur-sm">
                  <Loader2 className="h-7 w-7 animate-spin" />
                  <span className="text-sm">AI 正在识别面料…</span>
                </div>
              )}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                重新上传
              </button>
            </div>

            {aiDone && (
              <section>
                <p className="mb-3 text-xs text-muted-foreground">
                  为你匹配到 {aiResults.length} 款相似面料
                </p>
                <ProductGrid products={aiResults} />
              </section>
            )}
          </div>
        )}
      </div>
    )
  }

  // ---- text search view ----
  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="sticky top-0 z-20 flex items-center gap-2 bg-background/90 px-3 py-3 backdrop-blur">
        <button type="button" onClick={pop} aria-label="返回" className="p-1 text-foreground">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                runSearch(query)
              }
            }}
            placeholder="搜索面料名称或编号"
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="清空">
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => runSearch(query)}
          className="shrink-0 text-sm font-medium text-primary"
        >
          搜索
        </button>
      </header>

      {!showResults ? (
        <div className="flex flex-col gap-6 px-4 py-4">
          {recentSearches.length > 0 && (
            <section>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-medium text-foreground">最近搜索</h2>
                <button
                  type="button"
                  onClick={clearRecent}
                  aria-label="清空历史"
                  className="flex items-center gap-1 text-xs text-muted-foreground"
                >
                  <Trash2 className="h-3.5 w-3.5" /> 清空
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => runSearch(s)}
                    className="rounded-full bg-muted px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="mb-3 text-sm font-medium text-foreground">热门搜索</h2>
            <div className="flex flex-wrap gap-2">
              {hotSearches.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => runSearch(s)}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-secondary-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </section>
        </div>
      ) : results.length > 0 ? (
        <div className="px-4 py-3">
          <p className="mb-3 text-xs text-muted-foreground">
            找到 {results.length} 个与“{submitted}”相关的结果
          </p>
          <ProductGrid products={results} />
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 py-24 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
            <PackageOpen className="h-7 w-7 text-secondary-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">没有找到相关面料</p>
          <p className="text-xs text-muted-foreground">换个关键词试试，或浏览热门搜索</p>
        </div>
      )}
    </div>
  )
}
