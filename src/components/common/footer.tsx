'use client'

import Link from 'next/link'
import { Twitter, Github, MessageCircle, Mail, ExternalLink } from 'lucide-react'

export function Footer() {
  const navigation = {
    product: [
      { name: 'dApp', href: '/dapp' },
      { name: 'API', href: '/api' },
      { name: '审计报告', href: '/audits' },
      { name: '路线图', href: '/roadmap' },
    ],
    resources: [
      { name: '文档', href: '/docs' },
      { name: 'GitHub', href: 'https://github.com/hype-usd', external: true },
      { name: '白皮书', href: '/whitepaper' },
      { name: 'FAQ', href: '/faq' },
    ],
    community: [
      { name: 'Discord', href: 'https://discord.gg/hype-usd', external: true },
      { name: 'Twitter', href: 'https://twitter.com/hype_usd', external: true },
      { name: 'Telegram', href: 'https://t.me/hype_usd', external: true },
      { name: '邮件订阅', href: '/newsletter' },
    ],
    legal: [
      { name: '隐私政策', href: '/privacy' },
      { name: '服务条款', href: '/terms' },
      { name: '风险提示', href: '/risks' },
      { name: '联系我们', href: '/contact' },
    ],
  }

  type NavigationItem = {
    name: string
    href: string
    external?: boolean
  }

  const socialLinks = [
    {
      name: 'Twitter',
      href: 'https://twitter.com/hype_usd',
      icon: Twitter,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/hype-usd',
      icon: Github,
    },
    {
      name: 'Discord',
      href: 'https://discord.gg/hype-usd',
      icon: MessageCircle,
    },
    {
      name: 'Email',
      href: 'mailto:contact@hype-usd.com',
      icon: Mail,
    },
  ]

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 rounded-xl hype-gradient flex items-center justify-center">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <span className="text-white text-2xl font-bold">HypeUSD</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                下一代Delta中性稳定币协议，通过智能对冲策略为用户提供安全稳定的高收益体验。
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors duration-200"
                  >
                    <item.icon className="w-5 h-5 text-gray-400 hover:text-white" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Sections */}
            <div>
              <h3 className="text-white font-semibold mb-4">产品</h3>
              <ul className="space-y-3">
                {navigation.product.map((item: NavigationItem) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                    >
                      {item.name}
                      {item.external && <ExternalLink className="w-3 h-3 ml-1" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">资源</h3>
              <ul className="space-y-3">
                {navigation.resources.map((item: NavigationItem) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                    >
                      {item.name}
                      {item.external && <ExternalLink className="w-3 h-3 ml-1" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">社区</h3>
              <ul className="space-y-3">
                {navigation.community.map((item: NavigationItem) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                    >
                      {item.name}
                      {item.external && <ExternalLink className="w-3 h-3 ml-1" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">法律</h3>
              <ul className="space-y-3">
                {navigation.legal.map((item: NavigationItem) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-white font-semibold mb-2">订阅我们的更新</h3>
              <p className="text-gray-400 text-sm">获取最新的协议更新和DeFi洞察</p>
            </div>
            <div className="flex space-x-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="输入您的邮箱"
                className="flex-1 md:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button className="px-6 py-2 hype-gradient text-white rounded-lg font-medium hover:opacity-90 transition-opacity duration-200">
                订阅
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 HypeUSD. 保留所有权利.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>协议版本: v1.0.0</span>
              <span>•</span>
              <span>网络状态: 
                <span className="text-green-400 ml-1">正常</span>
              </span>
              <span>•</span>
              <span>最后更新: 2分钟前</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
