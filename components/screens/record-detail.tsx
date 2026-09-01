"use client"

import { ChevronLeft } from "lucide-react"
import { statusMeta, type SampleStatus } from "@/lib/data"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

const flow: SampleStatus[] = ["pending", "processing", "done"]

export function RecordDetail({ id }: { id: string }) {
  const { pop, records } = useStore()
  const record = records.find((r) => r.id === id)

  if (!record) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center bg-background text-sm text-muted-foreground">
        未找到申请记录
      </div>
    )
  }

  const meta = statusMeta[record.status]
  const activeStep = flow.indexOf(record.status)

  const info = [
    { label: "颜色", value: record.color },
    { label: "数量", value: `${record.quantity} 份` },
    { label: "备注", value: record.remark || "无" },
    { label: "联系人", value: record.contact },
    { label: "联系电话", value: record.phone },
    { label: "档口名称", value: record.stall },
    { label: "提交时间", value: record.createdAt },
  ]

  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="sticky top-0 z-20 flex items-center gap-2 bg-background/90 px-3 py-3 backdrop-blur">
        <button type="button" onClick={pop} aria-label="返回" className="p-1 text-foreground">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <h1 className="text-base font-medium text-foreground">申请详情</h1>
      </header>

      <div className="flex flex-col gap-4 px-4 py-4">
        {/* product */}
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
          <img
            src={record.image || "/placeholder.svg"}
            alt={record.productName}
            className="h-16 w-16 rounded-xl object-cover"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{record.productName}</p>
            <p className="mt-1 text-xs text-muted-foreground">编号 {record.productCode}</p>
          </div>
          <span className={cn("rounded-full px-2.5 py-1 text-xs", meta.className)}>{meta.label}</span>
        </div>

        {/* status flow */}
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center">
            {flow.map((s, i) => (
              <div key={s} className="flex flex-1 items-center last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium",
                      i <= activeStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span
                    className={cn(
                      "text-xs",
                      i <= activeStep ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {statusMeta[s].label}
                  </span>
                </div>
                {i < flow.length - 1 && (
                  <span
                    className={cn(
                      "mx-1 mb-5 h-0.5 flex-1 rounded-full",
                      i < activeStep ? "bg-primary" : "bg-muted",
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* info */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {info.map((item, i) => (
            <div
              key={item.label}
              className={cn(
                "flex items-start justify-between gap-6 px-4 py-3 text-sm",
                i !== info.length - 1 && "border-b border-border",
              )}
            >
              <span className="shrink-0 text-muted-foreground">{item.label}</span>
              <span className="text-right font-medium text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
