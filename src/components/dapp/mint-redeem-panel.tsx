'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useDemoStore, LIMITS } from '@/stores/demoStore'

interface MintRedeemPanelProps {
  mode: 'demo' | 'wallet'
}

export function MintRedeemPanel({ mode }: MintRedeemPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-3xl p-6"
    >
      <h3 className="text-xl font-bold text-white mb-6">铸造 / 赎回</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MintPanel mode={mode} />
        <RedeemPanel mode={mode} />
      </div>
    </motion.div>
  )
}

function MintPanel({ mode }: MintRedeemPanelProps) {
  const {
    demoWallet,
    protocolData,
    isProcessing,
    approvalStatus,
    simulateApproval,
    simulateDeposit,
    calculateFees,
    checkDailyLimit,
    dailyUsedAmount,
    lastError,
  } = useDemoStore()

  const [amount, setAmount] = useState<number>(1000)
  const fee = useMemo(() => calculateFees(amount, 'mint'), [amount, calculateFees])
  const willMint = useMemo(() => Math.max(0, amount - fee), [amount, fee])
  const canMint = useMemo(() => {
    if (amount < LIMITS.minDeposit || amount > LIMITS.maxDeposit) return false
    if (!checkDailyLimit(amount)) return false
    if (amount > demoWallet.usdtBalance) return false
    return true
  }, [amount, demoWallet.usdtBalance, checkDailyLimit])

  const handleAction = async () => {
    if (!approvalStatus.USDT) {
      await simulateApproval('USDT')
      return
    }
    await simulateDeposit(amount)
  }

  return (
    <div className="bg-gray-800/50 rounded-2xl p-5 border border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-white font-semibold">存入 USDT → 铸造 hypeUSD</h4>
        <div className="text-xs text-gray-400">
          今日已用额度: <span className="text-white font-semibold">{dailyUsedAmount.toLocaleString()}</span> / {LIMITS.dailyLimit.toLocaleString()} USDT
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>输入金额</span>
            <span>余额: {demoWallet.usdtBalance.toFixed(LIMITS.precision)} USDT</span>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min={LIMITS.minDeposit}
              max={LIMITS.maxDeposit}
              step={1}
              className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              placeholder={`最小 ${LIMITS.minDeposit}`}
            />
            <button
              onClick={() => setAmount(Math.min(LIMITS.maxDeposit, Math.floor(demoWallet.usdtBalance)))}
              className="px-3 py-2 text-xs bg-gray-700 hover:bg-gray-600 rounded-md text-gray-200"
            >
              MAX
            </button>
          </div>
          <div className="text-xs text-gray-400 mt-1">限额: {LIMITS.minDeposit} - {LIMITS.maxDeposit} USDT，1:1 汇率</div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <InfoRow label="手续费" value={`-${fee.toFixed(LIMITS.precision)} USDT (0.1%)`} />
          <InfoRow label="预计获得" value={`${willMint.toFixed(LIMITS.precision)} hypeUSD`} />
          <InfoRow label="当前APY" value={`${protocolData.currentAPY.toFixed(2)}%`} />
          <InfoRow label="协议TVL" value={`$${protocolData.tvl.toLocaleString()}`} />
        </div>

        {lastError && (
          <div className="text-xs text-red-400">{lastError}</div>
        )}

        <button
          disabled={isProcessing || !canMint}
          onClick={handleAction}
          className={`w-full py-3 rounded-lg font-semibold transition-opacity ${
            !approvalStatus.USDT
              ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
              : canMint
              ? 'hype-gradient text-white hover:opacity-90'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isProcessing
            ? '处理中...'
            : !approvalStatus.USDT
            ? '授权 USDT'
            : '存入并铸造'}
        </button>
      </div>
    </div>
  )
}

function RedeemPanel({ mode }: MintRedeemPanelProps) {
  const {
    demoWallet,
    isProcessing,
    approvalStatus,
    simulateApproval,
    simulateWithdraw,
    calculateFees,
  } = useDemoStore()

  const [amount, setAmount] = useState<number>(500)
  const fee = useMemo(() => calculateFees(amount, 'redeem'), [amount, calculateFees])
  const willReceive = useMemo(() => Math.max(0, amount - fee), [amount, fee])
  const canRedeem = useMemo(() => amount > 0 && amount <= demoWallet.hypeUSDBalance, [amount, demoWallet.hypeUSDBalance])

  const handleAction = async () => {
    if (!approvalStatus.hypeUSD) {
      await simulateApproval('hypeUSD')
      return
    }
    await simulateWithdraw(amount)
  }

  return (
    <div className="bg-gray-800/50 rounded-2xl p-5 border border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-white font-semibold">销毁 hypeUSD → 取回 USDT</h4>
        <div className="text-xs text-gray-400">余额: <span className="text-white font-semibold">{demoWallet.hypeUSDBalance.toFixed(LIMITS.precision)}</span> hypeUSD</div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span>输入金额</span>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min={1}
              step={1}
              className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
              placeholder={`可用 ${demoWallet.hypeUSDBalance.toFixed(LIMITS.precision)}`}
            />
            <button
              onClick={() => setAmount(Math.floor(demoWallet.hypeUSDBalance))}
              className="px-3 py-2 text-xs bg-gray-700 hover:bg-gray-600 rounded-md text-gray-200"
            >
              MAX
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <InfoRow label="手续费" value={`-${fee.toFixed(LIMITS.precision)} hypeUSD (0.1%)`} />
          <InfoRow label="预计得到" value={`${willReceive.toFixed(LIMITS.precision)} USDT`} />
        </div>

        <button
          disabled={isProcessing || !canRedeem}
          onClick={handleAction}
          className={`w-full py-3 rounded-lg font-semibold transition-opacity ${
            !approvalStatus.hypeUSD
              ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
              : canRedeem
              ? 'hype-gradient text-white hover:opacity-90'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isProcessing
            ? '处理中...'
            : !approvalStatus.hypeUSD
            ? '授权 hypeUSD'
            : '销毁并赎回'}
        </button>
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between bg-gray-900/30 rounded-lg px-3 py-2">
      <span className="text-gray-400 text-xs">{label}</span>
      <span className="text-white text-sm font-medium">{value}</span>
    </div>
  )
}

export default MintRedeemPanel


