"use client"

/**
 * 品牌水印：重复平铺的“锦 · 云锦色卡”文字，半透明叠加在图片上。
 * 用文字 logo 与登录页保持一致的品牌标识。
 */
export function Watermark({ className = "" }: { className?: string }) {
  const cell = (
    <div className="flex rotate-[-24deg] items-center gap-1 whitespace-nowrap text-background/45">
      <span className="font-serif text-sm font-semibold leading-none">锦</span>
      <span className="text-[10px] tracking-wide">云锦色卡</span>
    </div>
  )

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="grid h-full w-full grid-cols-3 place-items-center gap-y-10 py-6 [text-shadow:0_1px_2px_rgba(0,0,0,0.25)]">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i}>{cell}</div>
        ))}
      </div>
    </div>
  )
}
