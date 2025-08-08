'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, DollarSign, Shield } from 'lucide-react'

export function Stats() {
  const stats = [
    {
      icon: DollarSign,
      value: '$2,847,629',
      label: '总锁仓量(TVL)',
      change: '+4.6%',
      changeType: 'positive' as const,
      description: '过去24小时'
    },
    {
      icon: TrendingUp,
      value: '12.8%',
      label: '当前APY',
      change: '+0.3%',
      changeType: 'positive' as const,
      description: '基于Funding费率'
    },
    {
      icon: Users,
      value: '1,247',
      label: '活跃用户',
      change: '+156',
      changeType: 'positive' as const,
      description: '本周新增'
    },
    {
      icon: Shield,
      value: '0.02%',
      label: 'Delta偏差',
      change: '-0.01%',
      changeType: 'positive' as const,
      description: '近乎完美对冲'
    }
  ]

  return (
    <section className="py-20 bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            协议实时数据
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            透明化的协议数据，实时展示HypeUSD的健康状态和收益表现
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-effect rounded-2xl p-6 h-full hover:bg-gray-800/30 transition-all duration-300 group">
                {/* Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl hype-gradient group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change}
                  </div>
                </div>

                {/* Value */}
                <div className="mb-2">
                  <div className="text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>

                {/* Description */}
                <div className="text-sm text-gray-500">
                  {stat.description}
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="glass-effect rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">99.8%</div>
                <div className="text-gray-300">系统正常运行时间</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">&lt; 2min</div>
                <div className="text-gray-300">平均交易确认时间</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-2">245.7%</div>
                <div className="text-gray-300">保证金安全比率</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
