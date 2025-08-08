'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Star, TrendingUp, Users } from 'lucide-react'

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-green-600/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-3xl blur-3xl" />
          
          <div className="relative glass-effect rounded-3xl p-12 md:p-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2 mb-8">
                <Star className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400 font-medium">现在开始，享受高收益</span>
              </div>

              {/* Heading */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                开始您的
                <span className="hype-gradient-text"> DeFi收益</span>
                之旅
              </h2>

              {/* Description */}
              <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                加入已有超过1000名用户信赖的HypeUSD协议，
                体验安全稳定的高收益稳定币
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-3">
                    <TrendingUp className="w-6 h-6 text-green-400 mr-2" />
                    <span className="text-2xl font-bold text-green-400">12.8%</span>
                  </div>
                  <p className="text-gray-300">当前年化收益率</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-3">
                    <Users className="w-6 h-6 text-blue-400 mr-2" />
                    <span className="text-2xl font-bold text-blue-400">1,247</span>
                  </div>
                  <p className="text-gray-300">活跃用户数量</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="flex items-center justify-center mb-3">
                    <span className="text-2xl font-bold text-purple-400">$2.8M</span>
                  </div>
                  <p className="text-gray-300">总锁仓量</p>
                </motion.div>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
              >
                <Link
                  href="/dapp"
                  className="group px-10 py-4 hype-gradient text-white rounded-xl font-bold text-lg hover:opacity-90 transition-all duration-200 flex items-center space-x-3 pulse-glow"
                >
                  <span>立即开始</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
                <Link
                  href="/docs"
                  className="px-10 py-4 bg-gray-800/50 border border-gray-600 text-white rounded-xl font-bold text-lg hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-200"
                >
                  了解更多
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-gray-400"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span>智能合约已审计</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>开源代码</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>24/7客户支持</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
