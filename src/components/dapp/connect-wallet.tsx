'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { motion } from 'framer-motion'
import { Wallet, Shield, TrendingUp } from 'lucide-react'

export function ConnectWallet() {
  const features = [
    {
      icon: Shield,
      title: '安全保障',
      description: '多重签名和时间锁保护您的资金安全'
    },
    {
      icon: TrendingUp,
      title: '稳定收益',
      description: '8-15%年化收益，Delta中性对冲策略'
    },
    {
      icon: Wallet,
      title: '简单易用',
      description: '一键存入USDT，自动开始赚取收益'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="w-20 h-20 rounded-full hype-gradient flex items-center justify-center mx-auto mb-6">
          <Wallet className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          连接钱包开始使用
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
          连接您的Web3钱包，即可开始使用HypeUSD协议，享受Delta中性稳定币的高收益体验
        </p>
        <ConnectButton />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="glass-effect rounded-2xl p-6 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <feature.icon className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
