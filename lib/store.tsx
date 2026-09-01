"use client"

import type React from "react"
import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { initialRecords, type SampleRecord } from "@/lib/data"

export type Tab = "cards" | "favorites" | "profile"

export type Screen =
  | { type: "product"; id: string }
  | { type: "search" }
  | { type: "colorFamily" }
  | { type: "records" }
  | { type: "recordDetail"; id: string }
  | { type: "service" }
  | { type: "profileInfo" }

type Toast = { id: number; message: string }

export type Profile = {
  nickname: string
  phone: string
  stall: string
  region: string
}

type StoreValue = {
  // favorites
  favorites: string[]
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  // auth
  isLoggedIn: boolean
  login: () => void
  logout: () => void
  // profile
  profile: Profile
  updateProfile: (p: Profile) => void
  // records
  records: SampleRecord[]
  addRecord: (r: Omit<SampleRecord, "id" | "createdAt" | "status">) => void
  // search history
  recentSearches: string[]
  addRecentSearch: (q: string) => void
  clearRecent: () => void
  // navigation
  tab: Tab
  setTab: (t: Tab) => void
  stack: Screen[]
  push: (s: Screen) => void
  pop: () => void
  currentScreen: Screen | null
  // toast
  toast: Toast | null
  showToast: (message: string) => void
}

const StoreContext = createContext<StoreValue | null>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(["p1", "p5"])
  const [isLoggedIn, setLoggedIn] = useState(false)
  const [profile, setProfile] = useState<Profile>({
    nickname: "陈女士",
    phone: "138 **** 6621",
    stall: "东升面料 A12 档口",
    region: "广东 · 佛山",
  })
  const [records, setRecords] = useState<SampleRecord[]>(initialRecords)
  const [recentSearches, setRecentSearches] = useState<string[]>(["亚麻", "鼠尾草"])
  const [tab, setTab] = useState<Tab>("cards")
  const [stack, setStack] = useState<Screen[]>([])
  const [toast, setToast] = useState<Toast | null>(null)

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }, [])

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites])

  const login = useCallback(() => setLoggedIn(true), [])
  const logout = useCallback(() => setLoggedIn(false), [])

  const updateProfile = useCallback((p: Profile) => setProfile(p), [])

  const addRecord = useCallback((r: Omit<SampleRecord, "id" | "createdAt" | "status">) => {
    const now = new Date()
    const pad = (n: number) => String(n).padStart(2, "0")
    const createdAt = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(
      now.getHours(),
    )}:${pad(now.getMinutes())}`
    setRecords((prev) => [
      { ...r, id: `r${Date.now()}`, createdAt, status: "pending" },
      ...prev,
    ])
  }, [])

  const addRecentSearch = useCallback((q: string) => {
    const query = q.trim()
    if (!query) return
    setRecentSearches((prev) => [query, ...prev.filter((s) => s !== query)].slice(0, 8))
  }, [])

  const clearRecent = useCallback(() => setRecentSearches([]), [])

  const push = useCallback((s: Screen) => setStack((prev) => [...prev, s]), [])
  const pop = useCallback(() => setStack((prev) => prev.slice(0, -1)), [])

  const showToast = useCallback((message: string) => {
    const id = Date.now()
    setToast({ id, message })
    setTimeout(() => {
      setToast((t) => (t && t.id === id ? null : t))
    }, 1800)
  }, [])

  const value = useMemo<StoreValue>(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
      isLoggedIn,
      login,
      logout,
      profile,
      updateProfile,
      records,
      addRecord,
      recentSearches,
      addRecentSearch,
      clearRecent,
      tab,
      setTab,
      stack,
      push,
      pop,
      currentScreen: stack.length ? stack[stack.length - 1] : null,
      toast,
      showToast,
    }),
    [
      favorites,
      toggleFavorite,
      isFavorite,
      isLoggedIn,
      login,
      logout,
      profile,
      updateProfile,
      records,
      addRecord,
      recentSearches,
      addRecentSearch,
      clearRecent,
      tab,
      stack,
      push,
      pop,
      toast,
      showToast,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error("useStore must be used within StoreProvider")
  return ctx
}
