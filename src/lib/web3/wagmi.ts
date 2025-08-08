import { createConfig, http } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { getDefaultConfig } from '@rainbow-me/rainbowkit'

const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || 'default-project-id'

export const config = getDefaultConfig({
  appName: 'HypeUSD',
  projectId,
  chains: [mainnet, sepolia],
  ssr: true,
})

// Contract addresses
export const CONTRACTS = {
  HYPE_USD: process.env.NEXT_PUBLIC_HYPE_USD_CONTRACT as `0x${string}` || '0x',
  USDT: process.env.NEXT_PUBLIC_USDT_CONTRACT as `0x${string}` || '0x',
} as const

// Network configuration
export const NETWORK_CONFIG = {
  chainId: process.env.NEXT_PUBLIC_NETWORK === 'mainnet' ? mainnet.id : sepolia.id,
  blockExplorer: process.env.NEXT_PUBLIC_NETWORK === 'mainnet' 
    ? 'https://etherscan.io' 
    : 'https://sepolia.etherscan.io',
}
