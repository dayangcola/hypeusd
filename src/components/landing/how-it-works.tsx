'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Wallet, Bitcoin, TrendingDown, Coins, Globe, Link as LinkIcon } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      icon: Wallet,
      title: '存入USDT',
      description: '用户将USDT存入HypeUSD协议',
      details: ['支持任意金额', '实时汇率转换', '无需KYC']
    },
    {
      icon: Globe,
      title: '在Hyperliquid购买BTC',
      description: '通过Hyperliquid深度订单簿完成等值BTC现货撮合',
      details: ['深度充足', '低滑点', '高吞吐']
    },
    {
      icon: TrendingDown,
      title: 'CoreWriter原子化对冲',
      description: '通过CoreWriter组合原子交易：买现货 + 卖永续，同步完成对冲并链上结算',
      details: ['原子性执行', '全链上透明', '可审计']
    },
    {
      icon: Coins,
      title: '铸造hypeUSD',
      description: '用户获得等值hypeUSD并开始赚取收益',
      details: ['1:1兑换', '即时到账', '持续收益']
    }
  ]

  return (
    <section className="py-20 bg-gray-900/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            工作原理
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            简单四步，即可开始您的DeFi高收益之旅
          </p>
        </motion.div>

        {/* Desktop Flow */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Steps */}
            <div className="grid grid-cols-4 gap-8 relative">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-24 left-full w-8 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 z-10 hidden lg:block" />
                  )}

                  {/* Step Card */}
                  <div className="glass-effect rounded-3xl p-8 text-center hover:bg-gray-800/30 transition-all duration-300 group">
                    {/* Step Number */}
                    <div className="w-12 h-12 rounded-full hype-gradient flex items-center justify-center text-white font-bold text-lg mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className="mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mx-auto group-hover:bg-gray-700 transition-colors duration-300">
                        <step.icon className="w-8 h-8 text-blue-400" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-gray-300 mb-6">{step.description}</p>

                    {/* Details */}
                    <ul className="space-y-2 text-sm">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center justify-center space-x-2 text-gray-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Flow */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Connection Arrow */}
              {index < steps.length - 1 && (
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-blue-400 rotate-90" />
                </div>
              )}

              {/* Step Card */}
              <div className="glass-effect rounded-3xl p-6">
                <div className="flex items-start space-x-4">
                  {/* Step Number & Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full hype-gradient flex items-center justify-center text-white font-bold text-lg mb-4">
                      {index + 1}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-300 mb-4">{step.description}</p>
                    <ul className="space-y-1">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center space-x-2 text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-effect rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4">
              整个过程完全自动化
            </h3>
            <p className="text-gray-300 mb-6">
              您只需要存入USDT，其余所有步骤都由智能合约自动执行。
              享受简单、安全、高效的DeFi体验。
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span>无需手动操作</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span>24/7自动运行</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
                <span>智能风险管理</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
