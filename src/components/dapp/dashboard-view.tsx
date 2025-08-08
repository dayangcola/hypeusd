'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Wallet, Activity, DollarSign } from 'lucide-react'

export function DashboardView() {
  // Mock data - 在实际项目中这些会从智能合约获取
  const mockData = {
    balance: '12,845.67',
    value: '$12,845.67',
    pendingRewards: '45.23',
    apy: '12.8',
    dailyReward: '$1.42',
    totalRewards: '$287.56'
  }

  return (
    <div className="space-y-8">
      {/* Portfolio Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-effect rounded-3xl p-8"
      >
        <h2 className="text-2xl font-bold text-white mb-6">我的资产</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <Wallet className="w-6 h-6 text-blue-400 mr-2" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{mockData.balance}</div>
            <div className="text-gray-400 text-sm">hypeUSD余额</div>
            <div className="text-gray-500 text-xs">≈ {mockData.value}</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 text-green-400 mr-2" />
            </div>
            <div className="text-2xl font-bold text-green-400 mb-1">{mockData.apy}%</div>
            <div className="text-gray-400 text-sm">当前APY</div>
            <div className="text-gray-500 text-xs">基于Funding费率</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <DollarSign className="w-6 h-6 text-yellow-400 mr-2" />
            </div>
            <div className="text-2xl font-bold text-yellow-400 mb-1">+{mockData.pendingRewards}</div>
            <div className="text-gray-400 text-sm">未结算收益</div>
            <div className="text-gray-500 text-xs">hypeUSD</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <Activity className="w-6 h-6 text-purple-400 mr-2" />
            </div>
            <div className="text-2xl font-bold text-purple-400 mb-1">{mockData.totalRewards}</div>
            <div className="text-gray-400 text-sm">累计收益</div>
            <div className="text-gray-500 text-xs">总收益金额</div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="glass-effect rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">存入 USDT</h3>
          <p className="text-gray-400 mb-6">存入USDT并铸造hypeUSD开始赚取收益</p>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="输入USDT数量"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button className="w-full py-3 hype-gradient text-white rounded-xl font-semibold hover:opacity-90 transition-opacity">
              存入并铸造
            </button>
          </div>
        </div>

        <div className="glass-effect rounded-3xl p-8">
          <h3 className="text-xl font-bold text-white mb-4">赎回 hypeUSD</h3>
          <p className="text-gray-400 mb-6">赎回hypeUSD获得USDT</p>
          <div className="space-y-4">
            <input
              type="number"
              placeholder="输入hypeUSD数量"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button className="w-full py-3 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-600 transition-colors">
              销毁并赎回
            </button>
          </div>
        </div>
      </motion.div>

      {/* Protocol Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="glass-effect rounded-3xl p-8"
      >
        <h3 className="text-xl font-bold text-white mb-6">协议状态</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-gray-400 text-sm mb-1">总锁仓量 (TVL)</div>
            <div className="text-2xl font-bold text-blue-400">$2,847,629</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">Delta状态</div>
            <div className="text-2xl font-bold text-green-400">0.02%</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">保证金比率</div>
            <div className="text-2xl font-bold text-purple-400">245.7%</div>
          </div>
        </div>
      </motion.div>

      {/* Coming Soon Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="glass-effect rounded-3xl p-8 text-center"
      >
        <h3 className="text-xl font-bold text-white mb-4">🚀 功能开发中</h3>
        <p className="text-gray-400">
          完整的dApp功能正在开发中，包括智能合约集成、实时数据获取等。
          目前展示的是UI界面预览。
        </p>
      </motion.div>
    </div>
  )
}
