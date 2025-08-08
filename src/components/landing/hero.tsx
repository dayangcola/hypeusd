'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Shield, Zap, Play, Globe, Link as LinkIcon } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto pt-20 pb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-gray-800/50 border border-gray-700 rounded-full px-4 py-2 mb-8"
          >
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">Hyperliquid优质流动性 + CoreWriter全链上对冲</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            下一代
            <span className="hype-gradient-text"> Delta中性</span>
            <br />
            稳定币协议
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            通过BTC多空对冲策略，为您的USDT提供
            <span className="text-green-400 font-semibold"> 8-15%年化收益</span>，
            同时保持价格稳定性
          </motion.p>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <div className="flex items-center space-x-2 text-gray-300">
              <Shield className="w-5 h-5 text-blue-400" />
              <span>低风险对冲</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span>高稳定收益</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>即时流动性</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span>Hyperliquid流动性</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <LinkIcon className="w-5 h-5 text-purple-400" />
              <span>CoreWriter原子化对冲</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/dapp"
              className="group px-8 py-4 hype-gradient text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-all duration-200 flex items-center space-x-2 pulse-glow"
            >
              <span>开始使用</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              href="/dapp"
              className="group px-8 py-4 bg-blue-500/20 border-2 border-blue-500/30 text-blue-400 rounded-xl font-semibold text-lg hover:border-blue-400 hover:bg-blue-500/30 transition-all duration-200 flex items-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>免费体验</span>
            </Link>
            <Link
              href="/docs"
              className="px-8 py-4 bg-transparent border-2 border-gray-600 text-white rounded-xl font-semibold text-lg hover:border-gray-400 hover:bg-gray-800/20 transition-all duration-200"
            >
              了解更多
            </Link>
          </motion.div>

          {/* Stats Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold hype-gradient-text mb-2">12.8%</div>
              <div className="text-gray-400">当前APY</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold hype-gradient-text mb-2">$2.8M</div>
              <div className="text-gray-400">总锁仓量</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold hype-gradient-text mb-2">1,247</div>
              <div className="text-gray-400">活跃用户</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-600 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}
