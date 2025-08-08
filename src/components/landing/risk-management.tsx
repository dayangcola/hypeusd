'use client'

import { motion } from 'framer-motion'
import { Shield, Eye, Clock, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react'

export function RiskManagement() {
  const riskFeatures = [
    {
      icon: Eye,
      title: '实时监控',
      description: '每5分钟监控Delta值，确保协议始终保持中性状态',
      metrics: ['Delta监控', '头寸跟踪', '风险评估'],
      status: 'active'
    },
    {
      icon: RefreshCw,
      title: '自动再平衡',
      description: '当Delta偏离±2%时自动触发再平衡机制',
      metrics: ['自动执行', '最优路径', '成本最小'],
      status: 'active'
    },
    {
      icon: Shield,
      title: '多重保障',
      description: '多重签名、时间锁等多层安全机制保护用户资金',
      metrics: ['多重签名', '时间锁', '审计验证'],
      status: 'secure'
    },
    {
      icon: AlertTriangle,
      title: '紧急机制',
      description: '极端情况下的紧急暂停和快速清算保护机制',
      metrics: ['紧急暂停', '快速清算', '用户保护'],
      status: 'standby'
    }
  ]

  const securityStats = [
    { label: '安全审计', value: '3次', description: '顶级安全公司审计' },
    { label: '保证金比率', value: '245.7%', description: '远超安全线' },
    { label: '系统可用性', value: '99.9%', description: '近乎完美运行' },
    { label: 'TVL保险', value: '$1M', description: '额外保险保障' }
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
            全方位
            <span className="hype-gradient-text"> 风险管理</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            多层安全机制和智能风险控制，确保您的资金安全和协议稳定运行
          </p>
        </motion.div>

        {/* Risk Management Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {riskFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="glass-effect rounded-3xl p-6 h-full hover:bg-gray-800/30 transition-all duration-300">
                {/* Status Indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${
                    feature.status === 'active' 
                      ? 'bg-green-500/20 text-green-400'
                      : feature.status === 'secure'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    feature.status === 'active' 
                      ? 'bg-green-400 animate-pulse'
                      : feature.status === 'secure'
                      ? 'bg-blue-400'
                      : 'bg-yellow-400'
                  }`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Metrics */}
                <ul className="space-y-2">
                  {feature.metrics.map((metric, metricIndex) => (
                    <li key={metricIndex} className="flex items-center space-x-2 text-xs text-gray-400">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      <span>{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="glass-effect rounded-3xl p-8 mb-16"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">安全数据</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {securityStats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold hype-gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-white font-medium mb-1">{stat.label}</div>
                <div className="text-gray-400 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Risk Disclosure */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="glass-effect rounded-3xl p-8"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-3">风险提示</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                虽然HypeUSD采用了多重安全机制和Delta中性策略来降低风险，但DeFi协议仍存在智能合约风险、
                流动性风险、市场极端波动风险等。请您在使用前充分了解相关风险，并根据自身风险承受能力
                谨慎决策。
              </p>
              <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                <span>• 智能合约风险</span>
                <span>• 流动性风险</span>
                <span>• 市场风险</span>
                <span>• 技术风险</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
