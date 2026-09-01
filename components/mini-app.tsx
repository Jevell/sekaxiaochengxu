"use client"

import { useState } from "react"
import type { Product } from "@/lib/data"
import { products } from "@/lib/data"
import { StoreProvider, useStore } from "@/lib/store"
import { BottomNav } from "@/components/bottom-nav"
import { Toast } from "@/components/toast"
import { CutSampleSheet } from "@/components/cut-sample-sheet"
import { ColorCardPage } from "@/components/pages/color-card-page"
import { FavoritesPage } from "@/components/pages/favorites-page"
import { ProfilePage } from "@/components/pages/profile-page"
import { LoginPage } from "@/components/pages/login-page"
import { SearchScreen } from "@/components/screens/search-screen"
import { ProductDetail } from "@/components/screens/product-detail"
import { RecordsScreen } from "@/components/screens/records-screen"
import { RecordDetail } from "@/components/screens/record-detail"
import { ServiceScreen } from "@/components/screens/service-screen"
import { ProfileInfoScreen } from "@/components/screens/profile-info-screen"
import { ColorFamilyScreen } from "@/components/screens/color-family-screen"

function TabPages() {
  const { tab, isLoggedIn } = useStore()

  return (
    <div className="h-full min-h-full">
      {tab === "cards" && <ColorCardPage />}
      {tab === "favorites" && <FavoritesPage />}
      {tab === "profile" && (isLoggedIn ? <ProfilePage /> : <LoginPage />)}
    </div>
  )
}

function ScreenOverlay({ onApplySample }: { onApplySample: (p: Product) => void }) {
  const { currentScreen } = useStore()

  if (!currentScreen) return null

  return (
    <div className="no-scrollbar absolute inset-0 z-30 overflow-y-auto bg-background">
      {currentScreen.type === "search" && <SearchScreen />}
      {currentScreen.type === "colorFamily" && <ColorFamilyScreen />}
      {currentScreen.type === "product" && (
        <ProductDetail
          product={products.find((p) => p.id === currentScreen.id)!}
          onApplySample={onApplySample}
        />
      )}
      {currentScreen.type === "records" && <RecordsScreen />}
      {currentScreen.type === "recordDetail" && <RecordDetail id={currentScreen.id} />}
      {currentScreen.type === "service" && <ServiceScreen />}
      {currentScreen.type === "profileInfo" && <ProfileInfoScreen />}
    </div>
  )
}

function AppInner() {
  const { currentScreen } = useStore()
  const [cutSample, setCutSample] = useState<Product | null>(null)

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      {/* tab pages scroll independently underneath */}
      <div className="no-scrollbar flex-1 overflow-y-auto">
        <TabPages />
      </div>

      {/* full-frame overlay, own scroll, does not move with tab pages */}
      <ScreenOverlay onApplySample={setCutSample} />

      {/* bottom nav only on tab pages */}
      {!currentScreen && <BottomNav />}

      {cutSample && <CutSampleSheet product={cutSample} onClose={() => setCutSample(null)} />}
      <Toast />
    </div>
  )
}

export function MiniApp() {
  return (
    <StoreProvider>
      {/* device frame: phone on mobile, centered tablet-style frame on larger screens */}
      <div className="flex min-h-dvh items-stretch justify-center bg-secondary/40 md:items-center md:py-8">
        <div className="relative flex h-dvh w-full max-w-md flex-col overflow-hidden bg-background shadow-sm md:h-[90vh] md:max-h-[900px] md:w-[720px] md:max-w-none md:rounded-[2rem] md:border-8 md:border-foreground/90 md:shadow-2xl">
          <AppInner />
        </div>
      </div>
    </StoreProvider>
  )
}
