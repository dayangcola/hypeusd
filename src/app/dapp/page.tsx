'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { DashboardView } from '@/components/dapp/dashboard-view'
import { ConnectWallet } from '@/components/dapp/connect-wallet'

export default function DappPage() {
  const { isConnected } = useAccount()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">HypeUSD dApp</h1>
          <p className="text-gray-400">Delta对冲稳定币协议</p>
        </div>
        <ConnectButton />
      </div>

      {/* Main Content */}
      {isConnected ? <DashboardView /> : <ConnectWallet />}
    </div>
  )
}
