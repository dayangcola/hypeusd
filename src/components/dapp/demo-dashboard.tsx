'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useDemoStore } from '@/stores/demoStore'
import { FlowGuide } from './flow-guide'
import { MintRedeemPanel } from './mint-redeem-panel'
import { 
  Play, 
  Pause, 
  RotateCcw, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  ArrowRight,
  DollarSign,
  Bitcoin,
  Shield,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'

interface DemoStep {
  id: number
  title: string
  description: string
  action?: string
  status: 'pending' | 'active' | 'completed'
}

export function DemoDashboard() {
  const {
    isDemoMode,
    demoWallet,
    protocolData,
    hedgePosition,
    transactions,
    currentStep,
    totalSteps,
    enableDemoMode,
    simulateDeposit,
    updateProtocolData,
    updateHedgePosition,
    nextStep,
    resetDemo
  } = useDemoStore()

  const [isPlaying, setIsPlaying] = useState(false)
  const [depositAmount, setDepositAmount] = useState(1000)

  // 演示步骤定义
  const demoSteps: DemoStep[] = [
    {
      id: 0,
      title: '欢迎使用演示模式',
      description: '无需连接钱包，体验完整的Delta对冲稳定币流程',
      action: '开始演示',
      status: currentStep === 0 ? 'active' : currentStep > 0 ? 'completed' : 'pending'
    },
    {
      id: 1,
      title: '存入USDT',
      description: '用户存入USDT到协议中',
      status: currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : 'pending'
    },
    {
      id: 2,
      title: '购买BTC现货',
      description: '协议自动使用USDT购买等值BTC',
      status: currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : 'pending'
    },
    {
      id: 3,
      title: '开立空单对冲',
      description: '在Hyperliquid开立BTC永续空单',
      status: currentStep === 3 ? 'active' : currentStep > 3 ? 'completed' : 'pending'
    },
    {
      id: 4,
      title: '铸造hypeUSD',
      description: '用户获得等值hypeUSD稳定币',
      status: currentStep === 4 ? 'active' : currentStep > 4 ? 'completed' : 'pending'
    },
    {
      id: 5,
      title: '收益生成',
      description: '通过Funding费率持续获得收益',
      status: currentStep === 5 ? 'active' : currentStep > 5 ? 'completed' : 'pending'
    },
    {
      id: 6,
      title: '自动再平衡',
      description: 'Delta偏离时自动调整头寸',
      status: currentStep === 6 ? 'active' : 'pending'
    }
  ]

  // 自动播放演示
  useEffect(() => {
    if (!isPlaying || !isDemoMode) return

    const interval = setInterval(() => {
      updateProtocolData()
      updateHedgePosition()
    }, 3000)

    return () => clearInterval(interval)
  }, [isPlaying, isDemoMode, updateProtocolData, updateHedgePosition])

  // 启动演示模式
  const startDemo = async () => {
    enableDemoMode()
    setIsPlaying(true)
    nextStep()
  }

  // 执行存款演示
  const handleDemoDeposit = async () => {
    await simulateDeposit(depositAmount)
    setIsPlaying(true)
  }

  return (
    <div className="space-y-8">
      {/* 演示模式头部 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-effect rounded-3xl p-8 border-2 border-blue-500/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Play className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">演示模式</h2>
              <p className="text-gray-400">体验Delta对冲稳定币的完整流程</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isPlaying 
                  ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 mr-2 inline" />
                  暂停
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2 inline" />
                  播放
                </>
              )}
            </button>
            
            <button
              onClick={resetDemo}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2 inline" />
              重置
            </button>
          </div>
        </div>

        {/* 步骤进度 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">流程进度</span>
            <span className="text-sm text-blue-400">{currentStep}/{totalSteps}</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <motion.div
              className="h-2 rounded-full hype-gradient"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {!isDemoMode ? (
          <div className="text-center">
            <button
              onClick={startDemo}
              className="px-8 py-4 hype-gradient text-white rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
            >
              开始演示
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 当前步骤 */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold text-white mb-4">当前步骤</h3>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-gray-800/50 rounded-2xl p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full hype-gradient flex items-center justify-center text-white font-bold">
                      {currentStep}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-2">
                        {demoSteps[currentStep]?.title}
                      </h4>
                      <p className="text-gray-300 mb-4">
                        {demoSteps[currentStep]?.description}
                      </p>
                      
                      {currentStep === 1 && (
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4">
                            <input
                              type="number"
                              value={depositAmount}
                              onChange={(e) => setDepositAmount(Number(e.target.value))}
                              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                              placeholder="输入USDT数量"
                            />
                            <span className="text-gray-400">USDT</span>
                          </div>
                          <button
                            onClick={handleDemoDeposit}
                            className="w-full py-3 hype-gradient text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
                          >
                            模拟存入
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 快速统计 */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">实时状态</h3>
              <div className="space-y-4">
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Delta比率</span>
                    <span className={`font-bold ${
                      Math.abs(hedgePosition.deltaRatio) < 0.02 ? 'text-green-400' : 'text-yellow-400'
                    }`}>
                      {(hedgePosition.deltaRatio * 100).toFixed(3)}%
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">BTC价格</span>
                    <span className="text-white font-bold">
                      ${protocolData.btcPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">资金费率</span>
                    <span className="text-green-400 font-bold">
                      {(protocolData.fundingRate * 100).toFixed(3)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {isDemoMode && (
        <>
          {/* Mint/Redeem 交互面板（放在完整流程上方）*/}
          <MintRedeemPanel mode="demo" />

          {/* 流程步骤展示 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">完整流程</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {demoSteps.slice(1, 5).map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                    step.status === 'completed' 
                      ? 'border-green-500/50 bg-green-500/10'
                      : step.status === 'active'
                      ? 'border-blue-500/50 bg-blue-500/10'
                      : 'border-gray-700 bg-gray-800/30'
                  }`}
                >
                  {/* 状态图标 */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 ${
                    step.status === 'completed' ? 'bg-green-500' :
                    step.status === 'active' ? 'bg-blue-500' : 'bg-gray-600'
                  }`}>
                    {step.status === 'completed' ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : step.status === 'active' ? (
                      <Activity className="w-4 h-4 text-white animate-pulse" />
                    ) : (
                      <Clock className="w-4 h-4 text-white" />
                    )}
                  </div>

                  <h4 className="font-semibold text-white text-sm mb-2">{step.title}</h4>
                  <p className="text-gray-400 text-xs">{step.description}</p>

                  {/* 连接线 */}
                  {index < 3 && (
                    <ArrowRight className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 流程引导 */}
          <FlowGuide />

          {/* Delta对冲可视化 */}
          <DeltaHedgeVisualization />

          {/* 交易历史 */}
          <TransactionHistory />
        </>
      )}
    </div>
  )
}

// Delta对冲可视化组件
function DeltaHedgeVisualization() {
  const { hedgePosition, protocolData } = useDemoStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-effect rounded-3xl p-8"
    >
      <h3 className="text-xl font-bold text-white mb-6">Delta对冲状态</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 左侧：头寸信息 */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-white mb-4">头寸详情</h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bitcoin className="w-5 h-5 text-orange-400" />
                  <span className="text-gray-300">BTC现货</span>
                </div>
                <span className="text-green-400 font-bold">+{hedgePosition.btcSpot.toFixed(4)} BTC</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                  <span className="text-gray-300">BTC空单</span>
                </div>
                <span className="text-red-400 font-bold">-{hedgePosition.btcShort.toFixed(4)} BTC</span>
              </div>
              
              <div className="border-t border-gray-700 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">净敞口</span>
                  <span className={`font-bold ${
                    Math.abs(hedgePosition.btcSpot - hedgePosition.btcShort) < 0.01 
                      ? 'text-green-400' : 'text-yellow-400'
                  }`}>
                    {Math.abs(hedgePosition.btcSpot - hedgePosition.btcShort).toFixed(4)} BTC
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-white mb-4">收益信息</h4>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Funding收益</span>
                <span className="text-green-400 font-bold">+${hedgePosition.pnl.toFixed(2)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">当前费率</span>
                <span className="text-blue-400 font-bold">{(protocolData.fundingRate * 100).toFixed(3)}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-300">下次费率</span>
                <span className="text-gray-400">8小时后</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：Delta图表 */}
        <div className="bg-gray-800/50 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Delta监控</h4>
          
          <div className="space-y-6">
            {/* Delta指示器 */}
            <div className="relative">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-white mb-2">
                  {(hedgePosition.deltaRatio * 100).toFixed(3)}%
                </div>
                <div className="text-gray-400">当前Delta比率</div>
              </div>
              
              {/* Delta范围指示器 */}
              <div className="relative w-full h-4 bg-gray-700 rounded-full overflow-hidden">
                <div className="absolute inset-0 flex">
                  <div className="w-1/4 bg-red-500/30"></div>
                  <div className="w-1/2 bg-green-500/30"></div>
                  <div className="w-1/4 bg-red-500/30"></div>
                </div>
                
                {/* 当前位置指示器 */}
                <motion.div
                  className="absolute top-0 w-2 h-4 bg-white rounded-full"
                  animate={{
                    left: `${Math.max(0, Math.min(100, 50 + hedgePosition.deltaRatio * 500))}%`
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>-5%</span>
                <span>0% (目标)</span>
                <span>+5%</span>
              </div>
            </div>

            {/* 状态指示 */}
            <div className={`p-4 rounded-xl border-2 ${
              Math.abs(hedgePosition.deltaRatio) < 0.02 
                ? 'border-green-500/50 bg-green-500/10'
                : 'border-yellow-500/50 bg-yellow-500/10'
            }`}>
              <div className="flex items-center space-x-3">
                {Math.abs(hedgePosition.deltaRatio) < 0.02 ? (
                  <>
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-medium">对冲状态良好</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 font-medium">需要再平衡</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// 交易历史组件
function TransactionHistory() {
  const { transactions } = useDemoStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-effect rounded-3xl p-8"
    >
      <h3 className="text-xl font-bold text-white mb-6">交易历史</h3>
      
      <div className="space-y-4">
        {transactions.slice(0, 8).map((tx, index) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transition-colors"
          >
            <div className="flex items-center space-x-4">
              {/* 交易类型图标 */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                tx.type === 'deposit' ? 'bg-green-500/20 text-green-400' :
                tx.type === 'withdraw' ? 'bg-red-500/20 text-red-400' :
                tx.type === 'mint' ? 'bg-blue-500/20 text-blue-400' :
                tx.type === 'hedge' ? 'bg-purple-500/20 text-purple-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {tx.type === 'deposit' && <TrendingUp className="w-5 h-5" />}
                {tx.type === 'withdraw' && <TrendingDown className="w-5 h-5" />}
                {tx.type === 'mint' && <Zap className="w-5 h-5" />}
                {tx.type === 'hedge' && <Shield className="w-5 h-5" />}
                {tx.type === 'rebalance' && <Activity className="w-5 h-5" />}
              </div>
              
              <div>
                <div className="font-medium text-white">{tx.description}</div>
                <div className="text-sm text-gray-400">
                  {new Date(tx.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`font-bold ${
                tx.type === 'deposit' || tx.type === 'mint' ? 'text-green-400' : 'text-white'
              }`}>
                {tx.type === 'deposit' || tx.type === 'withdraw' ? '+' : ''}
                {tx.amount.toLocaleString()} {tx.token}
              </div>
              
              <div className={`w-2 h-2 rounded-full ${
                tx.status === 'completed' ? 'bg-green-400' :
                tx.status === 'pending' ? 'bg-yellow-400 animate-pulse' :
                'bg-red-400'
              }`} />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
