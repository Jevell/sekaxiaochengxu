"use client"

import { useState } from "react"
import { Check, ChevronLeft, Pencil, User, X } from "lucide-react"
import { useStore, type Profile } from "@/lib/store"
import { cn } from "@/lib/utils"

const FIELDS: { key: keyof Profile; label: string; placeholder: string }[] = [
  { key: "nickname", label: "昵称", placeholder: "请输入昵称" },
  { key: "phone", label: "手机号", placeholder: "请输入手机号" },
  { key: "stall", label: "常用档口", placeholder: "请输入常用档口" },
  { key: "region", label: "所在地区", placeholder: "请输入所在地区" },
]

export function ProfileInfoScreen() {
  const { pop, profile, updateProfile, showToast } = useStore()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<Profile>(profile)

  function startEdit() {
    setDraft(profile)
    setEditing(true)
  }

  function cancel() {
    setDraft(profile)
    setEditing(false)
  }

  function save() {
    if (!draft.nickname.trim()) {
      showToast("昵称不能为空")
      return
    }
    updateProfile({
      nickname: draft.nickname.trim(),
      phone: draft.phone.trim(),
      stall: draft.stall.trim(),
      region: draft.region.trim(),
    })
    setEditing(false)
    showToast("资料已保存")
  }

  return (
    <div className="flex min-h-full flex-col bg-background">
      <header className="sticky top-0 z-20 flex items-center gap-2 bg-background/90 px-3 py-3 backdrop-blur">
        <button
          type="button"
          onClick={editing ? cancel : pop}
          aria-label={editing ? "取消" : "返回"}
          className="p-1 text-foreground"
        >
          {editing ? <X className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
        </button>
        <h1 className="flex-1 text-base font-medium text-foreground">
          {editing ? "编辑资料" : "我的资料"}
        </h1>
        {editing ? (
          <button
            type="button"
            onClick={save}
            className="flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground"
          >
            <Check className="h-4 w-4" />
            保存
          </button>
        ) : (
          <button
            type="button"
            onClick={startEdit}
            className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-sm text-foreground"
          >
            <Pencil className="h-4 w-4" />
            编辑
          </button>
        )}
      </header>

      <div className="flex flex-col items-center py-6">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <User className="h-10 w-10" />
          {editing && (
            <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background">
              <Pencil className="h-3 w-3" />
            </span>
          )}
        </div>
        {editing && <p className="mt-2 text-xs text-muted-foreground">点击更换头像</p>}
      </div>

      <div className="px-4">
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          {FIELDS.map((field, i) => (
            <div
              key={field.key}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 text-sm",
                i !== FIELDS.length - 1 && "border-b border-border",
              )}
            >
              <span className="w-20 shrink-0 text-muted-foreground">{field.label}</span>
              {editing ? (
                <input
                  value={draft[field.key]}
                  onChange={(e) => setDraft((d) => ({ ...d, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  className="flex-1 bg-transparent text-right font-medium text-foreground outline-none placeholder:text-muted-foreground/60"
                />
              ) : (
                <span className="flex-1 text-right font-medium text-foreground">
                  {profile[field.key]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
