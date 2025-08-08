'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useState } from 'react'
import { DashboardView } from '@/components/dapp/dashboard-view'
import { ConnectWallet } from '@/components/dapp/connect-wallet'
import { DemoDashboard } from '@/components/dapp/demo-dashboard'
import { useDemoStore } from '@/stores/demoStore'
import { Play, Wallet, Eye, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DappPage() {
  const { isConnected } = useAccount()
  const { isDemoMode, enableDemoMode, disableDemoMode } = useDemoStore()
  const [showModeSelector, setShowModeSelector] = useState(!isConnected && !isDemoMode)

  const handleSelectMode = (mode: 'demo' | 'wallet') => {
    if (mode === 'demo') {
      enableDemoMode()
    } else {
      disableDemoMode()
    }
    setShowModeSelector(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            HypeUSD dApp
            {isDemoMode && (
              <span className="ml-3 px-3 py-1 bg-blue-500/20 text-blue-400 text-sm rounded-full border border-blue-500/30">
                演示模式
              </span>
            )}
          </h1>
          <p className="text-gray-400">Delta对冲稳定币协议</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {!isDemoMode && <ConnectButton />}
          
          {/* 模式切换按钮 */}
          <button
            onClick={() => setShowModeSelector(true)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
          >
            {isDemoMode ? '退出演示' : '演示模式'}
          </button>
        </div>
      </div>

      {/* 模式选择器 */}
      {showModeSelector && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="glass-effect rounded-3xl p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">选择体验模式</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              您可以选择连接钱包进行真实交易，或使用演示模式体验完整功能流程
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* 演示模式 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectMode('demo')}
                className="cursor-pointer group"
              >
                <div className="bg-blue-500/10 border-2 border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/40 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-blue-400" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4">演示模式</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    无需连接钱包，使用模拟数据体验完整的Delta对冲流程。
                    了解工作原理，零风险体验。
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-400 mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span>完整功能演示</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span>实时数据模拟</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span>零风险体验</span>
                    </div>
                  </div>
                  
                  <button className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors group-hover:bg-blue-600">
                    开始演示
                    <ArrowRight className="w-4 h-4 ml-2 inline group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </motion.div>

              {/* 钱包模式 */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectMode('wallet')}
                className="cursor-pointer group"
              >
                <div className="bg-green-500/10 border-2 border-green-500/20 rounded-2xl p-8 hover:border-green-500/40 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Wallet className="w-8 h-8 text-green-400" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4">连接钱包</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    连接您的Web3钱包，使用真实的USDT进行交易。
                    开始赚取真实的收益。
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-400 mb-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span>真实资产交易</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span>实际收益获得</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      <span>需要连接钱包</span>
                    </div>
                  </div>
                  
                  <button className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors group-hover:bg-green-600">
                    连接钱包
                    <ArrowRight className="w-4 h-4 ml-2 inline group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-2 text-sm text-gray-500">
              <Eye className="w-4 h-4" />
              <span>您可以随时切换模式</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      {isDemoMode ? (
        <DemoDashboard />
      ) : isConnected ? (
        <DashboardView />
      ) : (
        !showModeSelector && <ConnectWallet />
      )}
    </div>
  )
}
