'use client'

import { Header } from '@/components/common/header'

export default function DappLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="pt-20">
        {children}
      </main>
    </div>
  )
}
