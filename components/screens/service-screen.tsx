"use client"

import { ChevronLeft, Download, Phone } from "lucide-react"
import { useStore } from "@/lib/store"

export function ServiceScreen() {
  const { pop, showToast } = useStore()
  const phone = "0757-8888 6621"

  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="sticky top-0 z-20 flex items-center gap-2 bg-background/90 px-3 py-3 backdrop-blur">
        <button type="button" onClick={pop} aria-label="返回" className="p-1 text-foreground">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-base font-medium text-foreground">专属客服</h1>
      </header>

      <div className="flex flex-col items-center px-4 py-6">
        <div className="w-full rounded-3xl border border-border bg-card p-6">
          <div className="flex flex-col items-center gap-3">
            <img
              src="/staff-avatar.png"
              alt="客服头像"
              className="h-20 w-20 rounded-full object-cover"
            />
            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">林晓 · 专属顾问</p>
              <p className="mt-0.5 text-sm text-muted-foreground">工作时间 9:00 - 21:00</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm text-secondary-foreground">
              <Phone className="h-4 w-4" />
              {phone}
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl bg-muted p-5">
            <img
              src="/service-qr.png"
              alt="客服微信二维码"
              className="h-40 w-40 rounded-xl bg-background object-cover"
            />
            <p className="text-xs text-muted-foreground">长按或扫码添加客服微信</p>
          </div>
        </div>

        <div className="mt-4 flex w-full gap-3">
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground"
          >
            <Phone className="h-4 w-4" />
            拨打电话
          </a>
          <button
            type="button"
            onClick={() => showToast("二维码已保存到相册")}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card py-3 text-sm font-medium text-foreground"
          >
            <Download className="h-4 w-4" />
            保存二维码
          </button>
        </div>
      </div>
    </div>
  )
}
