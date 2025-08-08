'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Shield, 
  Zap, 
  BarChart3, 
  Lock, 
  RefreshCw,
  DollarSign,
  Globe,
  Users
} from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: Shield,
      title: 'Delta中性对冲',
      description: '通过BTC现货+永续空单实现价格风险完全对冲，保障本金安全',
      benefits: ['零价格波动风险', '自动再平衡', '智能对冲算法'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: TrendingUp,
      title: '稳定高收益',
      description: '多重收益来源确保8-15%年化收益，远超传统稳定币',
      benefits: ['Funding费率收益', 'BTC质押收益', '交易费优化'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: '极致流动性',
      description: '基于Hyperliquid深度流动性，支持大额即时存取',
      benefits: ['无滑点交易', '24/7可用', '毫秒级执行'],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: BarChart3,
      title: '透明监控',
      description: '实时展示协议状态、头寸信息和风险指标',
      benefits: ['实时数据', '开源审计', '链上验证'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Lock,
      title: '安全保障',
      description: '多重安全机制和风险管理，保护用户资产安全',
      benefits: ['多重签名', '时间锁', '紧急暂停'],
      color: 'from-red-500 to-rose-500'
    },
    {
      icon: Users,
      title: '社区治理',
      description: '去中心化治理模式，让社区参与协议重要决策',
      benefits: ['投票权利', '收益分享', '参数调整'],
      color: 'from-indigo-500 to-blue-500'
    }
  ]

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            为什么选择
            <span className="hype-gradient-text"> HypeUSD</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            革命性的Delta对冲稳定币协议，为DeFi带来全新的收益体验
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-full">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl blur-xl`} />
                
                {/* Card */}
                <div className="relative glass-effect rounded-3xl p-8 h-full hover:bg-gray-800/30 transition-all duration-300 border border-gray-800 group-hover:border-gray-600">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-300 text-base leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Benefits */}
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center space-x-3 text-sm text-gray-400">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color}`} />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="glass-effect rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              准备好体验下一代DeFi了吗？
            </h3>
            <p className="text-gray-300 mb-8 text-lg">
              加入HypeUSD，开启您的高收益稳定币之旅
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 hype-gradient text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity duration-200">
                立即开始
              </button>
              <button className="px-8 py-4 bg-gray-800 text-white rounded-xl font-semibold text-lg hover:bg-gray-700 transition-colors duration-200">
                查看文档
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
