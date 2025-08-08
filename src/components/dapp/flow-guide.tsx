'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  DollarSign, 
  Bitcoin, 
  TrendingDown, 
  Coins, 
  ArrowRight, 
  ArrowDown,
  TrendingUp,
  Shield,
  Activity,
  Zap,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Play
} from 'lucide-react'

interface FlowStep {
  id: number
  icon: React.ComponentType<any>
  title: string
  description: string
  details: string[]
  visualization: React.ReactNode
  explanation: string
}

export function FlowGuide() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)

  const flowSteps: FlowStep[] = [
    {
      id: 1,
      icon: DollarSign,
      title: '用户存入USDT',
      description: '用户将USDT存入HypeUSD协议开始生息之旅',
      details: [
        '支持任意数量的USDT存入',
        '实时汇率1:1转换',
        '仅收取0.1%的协议手续费',
        '资金立即开始工作'
      ],
      visualization: (
        <div className="flex items-center justify-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
            <span className="text-green-400 font-bold">用户</span>
          </div>
          <ArrowRight className="w-6 h-6 text-gray-400" />
          <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
            <DollarSign className="w-8 h-8 text-blue-400" />
          </div>
          <ArrowRight className="w-6 h-6 text-gray-400" />
          <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
            <span className="text-purple-400 font-bold text-xs">协议</span>
          </div>
        </div>
      ),
      explanation: 'USDT作为稳定币，为整个Delta对冲策略提供稳定的本金基础。'
    },
    {
      id: 2,
      icon: Bitcoin,
      title: '自动购买BTC',
      description: '协议使用USDT在市场上购买等值的BTC现货',
      details: [
        '使用最优市场价格购买',
        '分批执行降低价格冲击',
        '全部资金用于购买BTC',
        '获得BTC价格上涨敞口'
      ],
      visualization: (
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-blue-400" />
            </div>
            <ArrowRight className="w-6 h-6 text-gray-400" />
            <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center">
              <Bitcoin className="w-8 h-8 text-orange-400" />
            </div>
          </div>
          <div className="text-center text-sm text-gray-400">
            市场交易：USDT → BTC
          </div>
        </div>
      ),
      explanation: '购买BTC现货让协议获得加密货币市场的上涨收益潜力。'
    },
    {
      id: 3,
      icon: TrendingDown,
      title: '开立BTC空单',
      description: '在Hyperliquid上开立等量BTC永续合约空单进行对冲',
      details: [
        '空单数量=BTC现货数量',
        '使用Hyperliquid深度流动性',
        '实现价格风险完全对冲',
        '保持Delta中性状态'
      ],
      visualization: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-sm text-green-400">BTC多头</div>
              <div className="text-xs text-gray-400">现货持仓</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-2">
                <TrendingDown className="w-8 h-8 text-red-400" />
              </div>
              <div className="text-sm text-red-400">BTC空头</div>
              <div className="text-xs text-gray-400">永续合约</div>
            </div>
          </div>
          <div className="text-center">
            <Shield className="w-8 h-8 text-blue-400 mx-auto" />
            <div className="text-sm text-blue-400 mt-1">价格风险对冲</div>
          </div>
        </div>
      ),
      explanation: '通过永续合约空单完全对冲BTC价格波动风险，实现Delta中性。'
    },
    {
      id: 4,
      icon: Coins,
      title: '铸造hypeUSD',
      description: '用户获得等值hypeUSD稳定币，开始获得收益',
      details: [
        '1:1比例铸造hypeUSD',
        '立即开始产生收益',
        '保持稳定币特性',
        '可随时赎回USDT'
      ],
      visualization: (
        <div className="flex items-center justify-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
            <span className="text-purple-400 font-bold text-xs">协议</span>
          </div>
          <ArrowRight className="w-6 h-6 text-gray-400" />
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center">
            <Coins className="w-8 h-8 text-cyan-400" />
          </div>
          <ArrowRight className="w-6 h-6 text-gray-400" />
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
            <span className="text-green-400 font-bold">用户</span>
          </div>
        </div>
      ),
      explanation: 'hypeUSD作为生息稳定币，让用户在保持资金稳定性的同时获得收益。'
    },
    {
      id: 5,
      icon: Zap,
      title: '持续收益生成',
      description: '通过Funding费率和多种收益源持续为用户创造价值',
      details: [
        'Funding费率收益(主要)',
        'BTC质押收益',
        '交易费用优化',
        '自动复投增值'
      ],
      visualization: (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-1">
                <span className="text-green-400 text-xs font-bold">Fund</span>
              </div>
              <div className="text-xs text-green-400">资金费率</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-1">
                <Bitcoin className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-xs text-blue-400">质押收益</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-1">
                <Activity className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-xs text-purple-400">交易优化</div>
            </div>
          </div>
          <ArrowDown className="w-6 h-6 text-gray-400 mx-auto" />
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">8-15% APY</div>
            <div className="text-xs text-gray-400">预期年化收益</div>
          </div>
        </div>
      ),
      explanation: '多重收益源确保协议能够持续为用户创造稳定的高收益。'
    },
    {
      id: 6,
      icon: Activity,
      title: '自动再平衡',
      description: 'Delta偏离阈值时自动调整头寸维持对冲效果',
      details: [
        '实时监控Delta比率',
        '偏离±2%时自动触发',
        '最优执行路径',
        '保持对冲效果'
      ],
      visualization: (
        <div className="space-y-4">
          <div className="relative">
            <div className="w-full h-4 bg-gray-700 rounded-full">
              <div className="absolute inset-0 flex">
                <div className="w-1/4 bg-red-500/30 rounded-l-full"></div>
                <div className="w-1/2 bg-green-500/30"></div>
                <div className="w-1/4 bg-red-500/30 rounded-r-full"></div>
              </div>
              <motion.div
                className="absolute top-0 w-2 h-4 bg-white rounded-full"
                animate={{ left: "48%" }}
                transition={{ type: "spring" }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>-5%</span>
              <span>0%</span>
              <span>+5%</span>
            </div>
          </div>
          <div className="text-center">
            <Shield className="w-8 h-8 text-green-400 mx-auto mb-1" />
            <div className="text-sm text-green-400">Delta中性维持</div>
          </div>
        </div>
      ),
      explanation: '自动再平衡机制确保协议始终保持Delta中性，维护稳定币特性。'
    }
  ]

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % flowSteps.length)
  }

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + flowSteps.length) % flowSteps.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-3xl p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full hype-gradient flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Delta对冲流程详解</h3>
            <p className="text-gray-400">深入了解HypeUSD的工作原理</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isExpanded 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {isExpanded ? '收起' : '展开详情'}
        </button>
      </div>

      {/* 步骤指示器 */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={prevStep}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex space-x-2">
          {flowSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentStep ? 'bg-blue-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextStep}
          className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 当前步骤展示 */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* 左侧：步骤信息 */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl hype-gradient flex items-center justify-center">
              {(() => {
                const IconComponent = flowSteps[currentStep].icon
                return <IconComponent className="w-8 h-8 text-white" />
              })()}
            </div>
            <div>
              <div className="text-sm text-blue-400 font-medium">
                步骤 {flowSteps[currentStep].id}/6
              </div>
              <h4 className="text-xl font-bold text-white">
                {flowSteps[currentStep].title}
              </h4>
            </div>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed">
            {flowSteps[currentStep].description}
          </p>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4"
            >
              <h5 className="text-lg font-semibold text-white">详细说明</h5>
              <ul className="space-y-2">
                {flowSteps[currentStep].details.map((detail, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 text-gray-300"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-400" />
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </ul>
              
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <h6 className="text-blue-400 font-medium mb-2">💡 关键洞察</h6>
                <p className="text-gray-300 text-sm">
                  {flowSteps[currentStep].explanation}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* 右侧：可视化 */}
        <div className="bg-gray-800/50 rounded-2xl p-8 flex items-center justify-center">
          {flowSteps[currentStep].visualization}
        </div>
      </motion.div>

      {/* 自动播放控制 */}
      <div className="mt-8 flex items-center justify-center space-x-4">
        <button
          onClick={() => {
            const interval = setInterval(nextStep, 3000)
            setTimeout(() => clearInterval(interval), 18000) // 播放一轮
          }}
          className="px-6 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-xl font-medium hover:bg-blue-500/30 transition-colors flex items-center space-x-2"
        >
          <Play className="w-4 h-4" />
          <span>自动播放</span>
        </button>
        
        <div className="text-sm text-gray-400">
          点击圆点或使用箭头导航不同步骤
        </div>
      </div>
    </motion.div>
  )
}
