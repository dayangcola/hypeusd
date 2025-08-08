'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// 交易限额与手续费配置（演示与真实一致的UI/逻辑约束）
export const LIMITS = {
  minDeposit: 100,
  maxDeposit: 10000,
  dailyLimit: 50000,
  precision: 2,
}

export const FEE_STRUCTURE = {
  depositFee: 0.001, // 0.1%
  redeemFee: 0.001,  // 0.1%
}

// 演示模式的交易记录
export interface DemoTransaction {
  id: string
  type: 'deposit' | 'withdraw' | 'mint' | 'burn' | 'hedge' | 'rebalance' | 'spot' | 'unhedge'
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
  isProcessing: boolean
  lastError?: string
  lastTransactionHash?: string
  currentFlow: 'idle' | 'mint' | 'redeem'
  
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

  // 限额与授权状态
  dailyUsedAmount: number
  dailyLimitResetAt: number
  approvalStatus: {
    USDT: boolean
    hypeUSD: boolean
  }
  
  // 操作方法
  enableDemoMode: () => void
  disableDemoMode: () => void
  
  // 模拟交易
  simulateDeposit: (amount: number) => Promise<void>
  simulateWithdraw: (amount: number) => Promise<void>

   // 授权与校验
  simulateApproval: (token: 'USDT' | 'hypeUSD') => Promise<void>
  checkDailyLimit: (amount: number) => boolean
  calculateFees: (amount: number, type: 'mint' | 'redeem') => number
  
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
      isProcessing: false,
      lastError: undefined,
      lastTransactionHash: undefined,
      currentFlow: 'idle',
      
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
      totalSteps: 4,

      // 限额/授权初始状态
      dailyUsedAmount: 0,
      dailyLimitResetAt: Date.now(),
      approvalStatus: {
        USDT: false,
        hypeUSD: false,
      },
      
      // 操作方法
      enableDemoMode: () => set({ isDemoMode: true }),
      disableDemoMode: () => set({ isDemoMode: false }),
      
      // 模拟存款流程（存USDT -> 购买BTC现货 -> 开空单 -> 对冲完成 -> 铸造hypeUSD）
      simulateDeposit: async (amount: number) => {
        const state = get()

        // 每日限额重置（跨天自动刷新）
        const now = Date.now()
        const oneDayMs = 24 * 60 * 60 * 1000
        if (now - state.dailyLimitResetAt > oneDayMs) {
          set({ dailyUsedAmount: 0, dailyLimitResetAt: now })
        }

        // 基本校验
        if (Number.isNaN(amount) || amount <= 0) {
          set({ lastError: '请输入正确的金额' });
          return
        }
        if (amount < LIMITS.minDeposit) {
          set({ lastError: `最低存入 ${LIMITS.minDeposit} USDT` });
          return
        }
        if (amount > LIMITS.maxDeposit) {
          set({ lastError: `单笔最多 ${LIMITS.maxDeposit} USDT` });
          return
        }
        if (!state.checkDailyLimit(amount)) {
          set({ lastError: '超过今日额度，请明日再试' });
          return
        }
        if (amount > state.demoWallet.usdtBalance) {
          set({ lastError: 'USDT 余额不足' });
          return
        }
        if (!state.approvalStatus.USDT) {
          set({ lastError: '请先授权 USDT' });
          return
        }

        set({ isProcessing: true, lastError: undefined })
        
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
          currentStep: 1,
          currentFlow: 'mint',
          totalSteps: 5,
        })
        
        // 模拟交易处理时间
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // 2. 使用USDT购买BTC现货（1:1价值）
        const spotAmount = amount / state.protocolData.btcPrice
        const buySpotTx: DemoTransaction = {
          id: (Date.now() + 1).toString(),
          type: 'spot',
          amount: spotAmount,
          token: 'BTC',
          timestamp: Date.now(),
          status: 'pending',
          description: `购买BTC现货 ${spotAmount.toFixed(6)} BTC`
        }

        // 3. 开立BTC空单对冲
        const hedgeTx: DemoTransaction = {
          id: (Date.now() + 2).toString(),
          type: 'hedge',
          amount: spotAmount,
          token: 'BTC',
          timestamp: Date.now(),
          status: 'pending',
          description: '开立BTC永续空单对冲'
        }
        
        set((prev) => ({
          transactions: [
            hedgeTx,
            buySpotTx,
            ...prev.transactions.map(tx => tx.id === depositTx.id ? { ...tx, status: 'completed' as const } : tx),
          ],
          currentStep: 2, // 购买BTC现货
          demoWallet: {
            ...prev.demoWallet,
            usdtBalance: parseFloat((prev.demoWallet.usdtBalance - amount).toFixed(LIMITS.precision)),
            totalValue: parseFloat((prev.demoWallet.totalValue).toFixed(LIMITS.precision))
          },
          protocolData: {
            ...prev.protocolData,
            tvl: prev.protocolData.tvl + amount
          },
          dailyUsedAmount: prev.dailyUsedAmount + amount
        }))
        
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // 4. 完成对冲（将spot与hedge标记完成，Delta趋近0）
        set((prev) => ({
          transactions: prev.transactions.map(tx =>
            (tx.id === buySpotTx.id || tx.id === hedgeTx.id) ? { ...tx, status: 'completed' as const } : tx
          ),
          hedgePosition: {
            ...prev.hedgePosition,
            btcSpot: parseFloat((prev.hedgePosition.btcSpot + spotAmount).toFixed(6)),
            btcShort: parseFloat((prev.hedgePosition.btcShort + spotAmount).toFixed(6)),
            deltaRatio: 0.0,
          },
          currentStep: 3, // 对冲完成
        }))

        await new Promise(resolve => setTimeout(resolve, 800))

        // 5. 铸造 hypeUSD（扣除手续费），进入“铸造完成”步骤
        const minted = parseFloat((amount * (1 - FEE_STRUCTURE.depositFee)).toFixed(LIMITS.precision))
        const mintTx: DemoTransaction = {
          id: (Date.now() + 3).toString(),
          type: 'mint',
          amount: minted,
          token: 'hypeUSD',
          timestamp: Date.now(),
          status: 'completed',
          description: `铸造 ${minted.toFixed(LIMITS.precision)} hypeUSD`
        }
        set((prev) => ({
          transactions: [mintTx, ...prev.transactions],
          demoWallet: {
            ...prev.demoWallet,
            hypeUSDBalance: parseFloat((prev.demoWallet.hypeUSDBalance + minted).toFixed(LIMITS.precision)),
            totalValue: parseFloat((prev.demoWallet.totalValue + minted).toFixed(LIMITS.precision))
          },
          currentStep: 4,
          isProcessing: false
        }))
        // 为了让您清楚看到第4步（铸造hypeUSD），此处停留 1.2 秒再进入第5步
        await new Promise(resolve => setTimeout(resolve, 1200))
        set({ currentStep: 5 })
      },
      
      // 模拟赎回流程（销毁hypeUSD -> 关闭对冲仓位 -> 取回USDT）
      simulateWithdraw: async (amount: number) => {
        const state = get()
        // 基本校验
        if (Number.isNaN(amount) || amount <= 0) {
          set({ lastError: '请输入正确的金额' });
          return
        }
        if (amount > state.demoWallet.hypeUSDBalance) {
          set({ lastError: 'hypeUSD 余额不足' });
          return
        }
        if (!state.approvalStatus.hypeUSD) {
          set({ lastError: '请先授权 hypeUSD' });
          return
        }

        set({ isProcessing: true, lastError: undefined })

        const burnTx: DemoTransaction = {
          id: Date.now().toString(),
          type: 'burn',
          amount,
          token: 'hypeUSD',
          timestamp: Date.now(),
          status: 'pending',
          description: `销毁 ${amount} hypeUSD`
        }
        
        // 进度：1/4（开始赎回：销毁hypeUSD）
        set({ transactions: [burnTx, ...state.transactions], currentStep: 1, currentFlow: 'redeem', totalSteps: 4 })
        
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // 关闭对冲仓位（等量平掉空单与现货），生成记录
        const closeHedgeTx: DemoTransaction = {
          id: (Date.now() + 1).toString(),
          type: 'unhedge',
          amount: Math.min(state.hedgePosition.btcShort, state.hedgePosition.btcSpot),
          token: 'BTC',
          timestamp: Date.now(),
          status: 'completed',
          description: '关闭对冲仓位（平空并卖出现货）'
        }

        // 进度：2/4（关闭对冲仓位）
        set((prev) => ({
          transactions: [closeHedgeTx, ...prev.transactions.map(tx => (tx.id === burnTx.id ? { ...tx, status: 'completed' as const } : tx))],
          hedgePosition: {
            ...prev.hedgePosition,
            btcSpot: Math.max(0, prev.hedgePosition.btcSpot - closeHedgeTx.amount),
            btcShort: Math.max(0, prev.hedgePosition.btcShort - closeHedgeTx.amount),
            deltaRatio: 0.0,
          },
          currentStep: 2,
        }))

        await new Promise(resolve => setTimeout(resolve, 1000))

        // 赎回获得USDT（扣除手续费）
        const received = parseFloat((amount * (1 - FEE_STRUCTURE.redeemFee)).toFixed(LIMITS.precision))
        const redeemTx: DemoTransaction = {
          id: (Date.now() + 1).toString(),
          type: 'withdraw',
          amount: received,
          token: 'USDT',
          timestamp: Date.now(),
          status: 'pending',
          description: `赎回 ${received.toFixed(LIMITS.precision)} USDT`
        }

        // 进度：3/4（生成赎回USDT记录）
        set((prev) => ({
          transactions: [
            redeemTx,
            ...prev.transactions.map(tx => (tx.id === burnTx.id ? { ...tx, status: 'completed' as const } : tx)),
          ],
          demoWallet: {
            ...prev.demoWallet,
            hypeUSDBalance: parseFloat((prev.demoWallet.hypeUSDBalance - amount).toFixed(LIMITS.precision)),
            usdtBalance: parseFloat((prev.demoWallet.usdtBalance + received).toFixed(LIMITS.precision)),
            totalValue: parseFloat((prev.demoWallet.totalValue - amount).toFixed(LIMITS.precision))
          },
          currentStep: 3,
        }))

        await new Promise(resolve => setTimeout(resolve, 1200))
        // 进度：4/4（赎回完成）
        set((prev) => ({
          transactions: prev.transactions.map(tx => ({ ...tx, status: 'completed' as const })),
          isProcessing: false,
          currentStep: 4,
        }))
      },

      // 授权模拟
      simulateApproval: async (token: 'USDT' | 'hypeUSD') => {
        const state = get()
        set({ isProcessing: true, lastError: undefined })
        await new Promise(resolve => setTimeout(resolve, 1000))
        set({
          approvalStatus: {
            ...state.approvalStatus,
            [token]: true,
          },
          isProcessing: false,
        })
      },

      // 校验每日可用额度
      checkDailyLimit: (amount: number) => {
        const state = get()
        return state.dailyUsedAmount + amount <= LIMITS.dailyLimit
      },

      // 手续费计算
      calculateFees: (amount: number, type: 'mint' | 'redeem') => {
        if (amount <= 0 || Number.isNaN(amount)) return 0
        const rate = type === 'mint' ? FEE_STRUCTURE.depositFee : FEE_STRUCTURE.redeemFee
        return parseFloat((amount * rate).toFixed(LIMITS.precision))
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
          currentFlow: 'idle',
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
