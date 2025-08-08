'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 演示模式的交易记录
export interface DemoTransaction {
  id: string
  type: 'deposit' | 'withdraw' | 'mint' | 'burn' | 'hedge' | 'rebalance'
  amount: number
  token: 'USDT' | 'hypeUSD' | 'BTC'
  timestamp: number
  status: 'pending' | 'completed' | 'failed'
  txHash?: string
  description: string
}

// Delta对冲状态
export interface HedgePosition {
  btcSpot: number        // BTC现货数量
  btcShort: number       // BTC空单数量  
  deltaRatio: number     // Delta比率 (%)
  pnl: number           // 盈亏
  fundingRate: number   // 资金费率
  lastRebalance: number // 上次再平衡时间
}

// 演示模式状态
interface DemoState {
  // 基础设置
  isDemoMode: boolean
  
  // 用户数据
  demoWallet: {
    address: string
    usdtBalance: number
    hypeUSDBalance: number
    totalValue: number
    pendingRewards: number
    totalEarned: number
    apy: number
  }
  
  // 协议数据
  protocolData: {
    tvl: number
    totalUsers: number
    currentAPY: number
    deltaRatio: number
    btcPrice: number
    fundingRate: number
  }
  
  // 对冲头寸
  hedgePosition: HedgePosition
  
  // 交易历史
  transactions: DemoTransaction[]
  
  // 当前步骤
  currentStep: number
  totalSteps: number
  
  // 操作方法
  enableDemoMode: () => void
  disableDemoMode: () => void
  
  // 模拟交易
  simulateDeposit: (amount: number) => Promise<void>
  simulateWithdraw: (amount: number) => Promise<void>
  
  // 更新数据
  updateProtocolData: () => void
  updateHedgePosition: () => void
  
  // 步骤控制
  nextStep: () => void
  prevStep: () => void
  setStep: (step: number) => void
  
  // 重置演示
  resetDemo: () => void
}

// 生成模拟交易历史
const generateMockTransactions = (): DemoTransaction[] => [
  {
    id: '1',
    type: 'deposit',
    amount: 5000,
    token: 'USDT',
    timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000,
    status: 'completed',
    txHash: '0x1234...5678',
    description: '存入USDT'
  },
  {
    id: '2', 
    type: 'mint',
    amount: 4995,
    token: 'hypeUSD',
    timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000 + 1000,
    status: 'completed',
    txHash: '0x2345...6789',
    description: '铸造hypeUSD'
  },
  {
    id: '3',
    type: 'hedge',
    amount: 0.12,
    token: 'BTC',
    timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000 + 2000,
    status: 'completed',
    txHash: '0x3456...7890',
    description: '开立BTC空单对冲'
  }
]

export const useDemoStore = create<DemoState>()(
  persist(
    (set, get) => ({
      // 初始状态
      isDemoMode: false,
      
      demoWallet: {
        address: '0xDemo...Address',
        usdtBalance: 15247.83,
        hypeUSDBalance: 12845.67,
        totalValue: 12845.67,
        pendingRewards: 45.23,
        totalEarned: 287.56,
        apy: 12.8
      },
      
      protocolData: {
        tvl: 2847629,
        totalUsers: 1247,
        currentAPY: 12.8,
        deltaRatio: 0.02,
        btcPrice: 42500,
        fundingRate: 0.025
      },
      
      hedgePosition: {
        btcSpot: 0.30,
        btcShort: 0.299,
        deltaRatio: 0.02,
        pnl: 125.5,
        fundingRate: 0.025,
        lastRebalance: Date.now() - 2 * 60 * 60 * 1000
      },
      
      transactions: generateMockTransactions(),
      
      currentStep: 0,
      totalSteps: 6,
      
      // 操作方法
      enableDemoMode: () => set({ isDemoMode: true }),
      disableDemoMode: () => set({ isDemoMode: false }),
      
      // 模拟存款流程
      simulateDeposit: async (amount: number) => {
        const state = get()
        
        // 1. 添加存款交易
        const depositTx: DemoTransaction = {
          id: Date.now().toString(),
          type: 'deposit',
          amount,
          token: 'USDT',
          timestamp: Date.now(),
          status: 'pending',
          description: `存入 ${amount} USDT`
        }
        
        set({
          transactions: [depositTx, ...state.transactions],
          currentStep: 1
        })
        
        // 模拟交易处理时间
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // 2. 完成存款，开始购买BTC
        const mintTx: DemoTransaction = {
          id: (Date.now() + 1).toString(),
          type: 'mint',
          amount: amount * 0.999, // 扣除0.1%手续费
          token: 'hypeUSD',
          timestamp: Date.now(),
          status: 'pending',
          description: `铸造 ${(amount * 0.999).toFixed(2)} hypeUSD`
        }
        
        // 3. 开立对冲头寸
        const hedgeTx: DemoTransaction = {
          id: (Date.now() + 2).toString(),
          type: 'hedge',
          amount: amount / state.protocolData.btcPrice,
          token: 'BTC',
          timestamp: Date.now(),
          status: 'pending',
          description: '开立BTC空单对冲'
        }
        
        set({
          transactions: [hedgeTx, mintTx, ...state.transactions.map(tx => 
            tx.id === depositTx.id ? { ...tx, status: 'completed' as const } : tx
          )],
          currentStep: 2,
          demoWallet: {
            ...state.demoWallet,
            usdtBalance: state.demoWallet.usdtBalance - amount,
            hypeUSDBalance: state.demoWallet.hypeUSDBalance + amount * 0.999,
            totalValue: state.demoWallet.totalValue + amount * 0.999
          },
          protocolData: {
            ...state.protocolData,
            tvl: state.protocolData.tvl + amount
          }
        })
        
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // 完成所有交易
        set({
          transactions: state.transactions.map(tx => ({ ...tx, status: 'completed' as const })),
          currentStep: 3
        })
      },
      
      // 模拟赎回流程
      simulateWithdraw: async (amount: number) => {
        const state = get()
        
        const withdrawTx: DemoTransaction = {
          id: Date.now().toString(),
          type: 'withdraw',
          amount,
          token: 'hypeUSD',
          timestamp: Date.now(),
          status: 'pending',
          description: `赎回 ${amount} hypeUSD`
        }
        
        set({
          transactions: [withdrawTx, ...state.transactions]
        })
        
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        set({
          transactions: state.transactions.map(tx => 
            tx.id === withdrawTx.id ? { ...tx, status: 'completed' } : tx
          ),
          demoWallet: {
            ...state.demoWallet,
            hypeUSDBalance: state.demoWallet.hypeUSDBalance - amount,
            usdtBalance: state.demoWallet.usdtBalance + amount * 0.999,
            totalValue: state.demoWallet.totalValue - amount
          }
        })
      },
      
      // 更新协议数据 (模拟实时变化)
      updateProtocolData: () => {
        const state = get()
        const variation = (Math.random() - 0.5) * 0.1 // ±5% 变化
        
        set({
          protocolData: {
            ...state.protocolData,
            btcPrice: state.protocolData.btcPrice * (1 + variation * 0.01),
            fundingRate: Math.max(0, state.protocolData.fundingRate * (1 + variation * 0.1)),
            deltaRatio: Math.abs(state.protocolData.deltaRatio + variation * 0.01)
          }
        })
      },
      
      // 更新对冲头寸
      updateHedgePosition: () => {
        const state = get()
        
        // 模拟Delta偏离和自动再平衡
        const drift = (Math.random() - 0.5) * 0.05
        const newDelta = state.hedgePosition.deltaRatio + drift
        
        // 如果偏离超过2%，触发再平衡
        if (Math.abs(newDelta) > 0.02) {
          const rebalanceTx: DemoTransaction = {
            id: Date.now().toString(),
            type: 'rebalance',
            amount: Math.abs(drift),
            token: 'BTC',
            timestamp: Date.now(),
            status: 'completed',
            description: `自动再平衡 Delta至 ${(newDelta * 100).toFixed(3)}%`
          }
          
          set({
            transactions: [rebalanceTx, ...state.transactions.slice(0, 9)], // 保持最新10条
            hedgePosition: {
              ...state.hedgePosition,
              deltaRatio: newDelta * 0.1, // 再平衡后Delta接近0
              lastRebalance: Date.now()
            }
          })
        } else {
          set({
            hedgePosition: {
              ...state.hedgePosition,
              deltaRatio: newDelta,
              pnl: state.hedgePosition.pnl + state.protocolData.fundingRate * 0.1
            }
          })
        }
      },
      
      // 步骤控制
      nextStep: () => {
        const state = get()
        if (state.currentStep < state.totalSteps) {
          set({ currentStep: state.currentStep + 1 })
        }
      },
      
      prevStep: () => {
        const state = get()
        if (state.currentStep > 0) {
          set({ currentStep: state.currentStep - 1 })
        }
      },
      
      setStep: (step: number) => {
        const state = get()
        if (step >= 0 && step <= state.totalSteps) {
          set({ currentStep: step })
        }
      },
      
      // 重置演示
      resetDemo: () => {
        set({
          currentStep: 0,
          transactions: generateMockTransactions(),
          demoWallet: {
            address: '0xDemo...Address',
            usdtBalance: 15247.83,
            hypeUSDBalance: 12845.67,
            totalValue: 12845.67,
            pendingRewards: 45.23,
            totalEarned: 287.56,
            apy: 12.8
          }
        })
      }
    }),
    {
      name: 'demo-storage',
      partialize: (state) => ({ 
        isDemoMode: state.isDemoMode,
        currentStep: state.currentStep 
      })
    }
  )
)
