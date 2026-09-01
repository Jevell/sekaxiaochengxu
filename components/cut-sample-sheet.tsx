"use client"

import { useState } from "react"
import { CheckCircle2, Minus, Plus, X } from "lucide-react"
import type { Product } from "@/lib/data"
import { useStore } from "@/lib/store"

export function CutSampleSheet({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addRecord } = useStore()
  const [color, setColor] = useState(product.colorName)
  const [quantity, setQuantity] = useState(1)
  const [remark, setRemark] = useState("")
  const [contact, setContact] = useState("陈女士")
  const [phone, setPhone] = useState("13800006621")
  const [stall, setStall] = useState("东升面料 A12 档口")
  const [done, setDone] = useState(false)
  const [error, setError] = useState("")

  function submit() {
    if (!contact.trim() || !phone.trim() || !stall.trim()) {
      setError("请填写完整的联系人、电话和档口名称")
      return
    }
    if (!/^\d{11}$/.test(phone.trim())) {
      setError("请输入正确的 11 位手机号")
      return
    }
    setError("")
    addRecord({
      productId: product.id,
      productName: product.name,
      productCode: product.code,
      image: product.images[0],
      color,
      quantity,
      remark: remark.trim(),
      contact: contact.trim(),
      phone: `${phone.slice(0, 3)}****${phone.slice(7)}`,
      stall: stall.trim(),
    })
    setDone(true)
  }

  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end">
      <button
        type="button"
        aria-label="关闭"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-[1px]"
      />
      <div className="animate-in slide-in-from-bottom relative max-h-[88%] overflow-y-auto rounded-t-3xl bg-card">
        {done ? (
          <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
              <CheckCircle2 className="h-9 w-9 text-primary" />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">申请提交成功</p>
              <p className="mt-1 text-sm text-muted-foreground">
                我们会尽快为您处理，可在“剪样申请”中查看进度
              </p>
            </div>
            <div className="flex w-full items-center gap-3 rounded-2xl bg-muted p-3 text-left">
              <img
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                className="h-14 w-14 rounded-xl object-cover"
              />
              <div className="text-sm">
                <p className="font-medium text-foreground">{product.name}</p>
                <p className="text-xs text-muted-foreground">
                  {color} · {quantity} 份
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground"
            >
              完成
            </button>
          </div>
        ) : (
          <>
            <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card px-4 py-3">
              <h2 className="text-base font-semibold text-foreground">申请剪样</h2>
              <button type="button" onClick={onClose} aria-label="关闭" className="text-muted-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col gap-5 px-4 py-4">
              {/* selected product */}
              <div className="flex items-center gap-3 rounded-2xl bg-muted p-3">
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  className="h-16 w-16 rounded-xl object-cover"
                />
                <div className="text-sm">
                  <p className="font-medium text-foreground">{product.name}</p>
                  <p className="text-xs text-muted-foreground">编号 {product.code}</p>
                </div>
              </div>

              <Field label="颜色">
                <input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-primary"
                />
              </Field>

              <Field label="数量">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="减少"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium text-foreground">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                    aria-label="增加"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </Field>

              <Field label="备注">
                <textarea
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  rows={2}
                  placeholder="选填，如颜色偏好、寄送要求等"
                  className="w-full resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
                />
              </Field>

              <div className="h-px bg-border" />

              <Field label="联系人">
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="请输入联系人姓名"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
                />
              </Field>

              <Field label="联系电话">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))}
                  inputMode="numeric"
                  placeholder="请输入手机号"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
                />
              </Field>

              <Field label="档口名称">
                <input
                  value={stall}
                  onChange={(e) => setStall(e.target.value)}
                  placeholder="请输入档口名称"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
                />
              </Field>

              {error && <p className="text-xs text-destructive">{error}</p>}
            </div>

            <div className="sticky bottom-0 border-t border-border bg-card px-4 py-3">
              <button
                type="button"
                onClick={submit}
                className="w-full rounded-full bg-primary py-3 text-sm font-medium text-primary-foreground"
              >
                提交申请
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  )
}
