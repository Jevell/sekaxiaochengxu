"use client"

import { useState } from "react"
import { Check, Phone } from "lucide-react"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

export function LoginPage() {
  const { login, showToast } = useStore()
  const [agreed, setAgreed] = useState(false)

  function handleWechatLogin() {
    if (!agreed) {
      showToast("请先勾选同意用户协议")
      return
    }
    login()
    showToast("微信授权登录成功")
  }

  function handlePhoneLogin() {
    if (!agreed) {
      showToast("请先勾选同意用户协议")
      return
    }
    login()
    showToast("登录成功")
  }

  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-background px-8">
      {/* brand */}
      <div className="flex flex-col items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
          <span className="font-serif text-3xl font-semibold">廣</span>
        </div>
        <h1 className="mt-6 font-serif text-2xl font-semibold text-foreground">廣承布业●色卡集</h1>
        <p className="mt-2 text-sm text-muted-foreground">登录后查看面料详情与剪样申请</p>
      </div>

      {/* actions */}
      <div className="mt-10 flex w-full flex-col gap-3">
        <button
          type="button"
          onClick={handleWechatLogin}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground transition-opacity active:opacity-90"
        >
          <WechatIcon className="h-5 w-5" />
          微信一键登录
        </button>

        <button
          type="button"
          onClick={handlePhoneLogin}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border bg-card text-sm font-medium text-foreground transition-colors active:bg-secondary"
        >
          <Phone className="h-4 w-4" />
          手机号登录
        </button>

        {/* agreement */}
        <div className="mt-3 flex items-start justify-center gap-2 px-2">
          <button
            type="button"
            role="checkbox"
            aria-checked={agreed}
            aria-label="同意用户协议与隐私政策"
            onClick={() => setAgreed((v) => !v)}
            className={cn(
              "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
              agreed ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/50 bg-transparent",
            )}
          >
            {agreed && <Check className="h-3 w-3" strokeWidth={3} />}
          </button>
          <p className="text-xs leading-relaxed text-muted-foreground">
            我已阅读并同意
            <span className="text-primary">《用户协议》</span>
            与
            <span className="text-primary">《隐私政策》</span>
          </p>
        </div>
      </div>
    </div>
  )
}

function WechatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8.69 4C4.9 4 1.83 6.53 1.83 9.65c0 1.79 1.01 3.38 2.6 4.44l-.65 1.96 2.28-1.15c.81.16 1.46.32 2.27.32.2 0 .41-.01.61-.03a4.6 4.6 0 0 1-.19-1.29c0-2.7 2.6-4.88 5.8-4.88.2 0 .4.01.6.03C14.7 6.06 12 4 8.69 4Zm-2.2 3.66a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7Zm4.55 0a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7Z" />
      <path d="M22.17 13.9c0-2.62-2.6-4.75-5.5-4.75-3.06 0-5.48 2.13-5.48 4.75 0 2.63 2.42 4.76 5.48 4.76.64 0 1.28-.16 1.92-.32l1.76.97-.48-1.62c1.28-.98 2.3-2.28 2.3-3.79Zm-7.27-1.13a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4Zm3.62 0a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4Z" />
    </svg>
  )
}
