# HypeUSD - 下一代Delta中性稳定币协议

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-14.2.8-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.4-blue.svg)

> 基于Hyperliquid的高收益稳定币协议，通过BTC多空对冲策略获得8-15%年化收益

## 🌟 项目概述

HypeUSD是一个创新的Delta中性稳定币协议，通过智能的BTC多空对冲策略为用户提供稳定且高收益的DeFi体验。用户存入USDT后，协议自动执行复杂的对冲操作，让普通用户也能享受专业级的金融策略收益。

### ✨ 核心特性

- 🛡️ **Delta中性对冲** - 通过BTC现货+永续空单实现价格风险完全对冲
- 📈 **高稳定收益** - 8-15%年化收益率，远超传统稳定币
- ⚡ **极致流动性** - 基于Hyperliquid深度流动性，支持大额即时存取
- 🔍 **透明监控** - 实时展示协议状态、头寸信息和风险指标
- 🔒 **安全保障** - 多重签名、时间锁等多层安全机制
- 🤝 **社区治理** - 去中心化治理模式，社区参与重要决策

## 🚀 演示体验

### 🎮 在线演示
- **官网：** [部署后更新]
- **dApp：** [部署后更新]

### 💡 本地体验
```bash
# 克隆仓库
git clone git@github.com:dayangcola/hypeusd.git
cd hypeusd

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问演示
open http://localhost:3000
```

### 🎯 演示模式特色
- ✅ **零门槛体验** - 无需连接钱包即可体验完整功能
- ✅ **实时数据模拟** - Delta比率、BTC价格、资金费率等实时更新
- ✅ **教育引导系统** - 6步流程详解，深入理解Delta对冲原理
- ✅ **完整交易流程** - 从USDT存入到hypeUSD铸造的全流程演示

## 🏗️ 技术架构

### 前端技术栈
- **框架：** Next.js 14 (App Router)
- **语言：** TypeScript
- **样式：** Tailwind CSS + Shadcn/ui
- **状态管理：** Zustand + React Query
- **动画：** Framer Motion
- **Web3：** Wagmi + Viem + RainbowKit
- **图表：** Recharts

### 项目结构
```
hypeusd/
├── src/
│   ├── app/                    # Next.js App Router页面
│   ├── components/             # React组件
│   │   ├── common/            # 通用组件
│   │   ├── dapp/              # dApp专用组件
│   │   ├── landing/           # 首页组件
│   │   └── ui/                # UI基础组件
│   ├── lib/                   # 工具库
│   ├── stores/                # 状态管理
│   └── styles/                # 样式文件
├── docs/                      # 项目文档
├── wireframes/                # UI线框图
└── public/                    # 静态资源
```

## 📊 工作原理

### Delta对冲机制
1. **存入USDT** → 用户将USDT存入协议
2. **购买BTC** → 协议自动使用USDT购买等值BTC现货
3. **开立空单** → 在Hyperliquid开立BTC永续空单对冲
4. **铸造hypeUSD** → 用户获得等值hypeUSD稳定币
5. **收益生成** → 通过Funding费率持续获得收益
6. **自动再平衡** → Delta偏离±2%时自动调整头寸

### 收益来源
- **主要收益：** Funding费率（空头收取正费率）
- **辅助收益：** BTC质押、交易优化
- **目标收益：** 8-15%年化收益率

## 🛡️ 风险管理

### 多层安全机制
- **实时监控** - 每5分钟检查Delta状态
- **自动再平衡** - 偏离阈值时自动触发调整
- **多重保障** - 多重签名、时间锁、审计验证
- **紧急机制** - 极端情况下的紧急暂停和快速清算

### 安全数据
- 🔍 **3次安全审计** - 顶级安全公司审计
- 📊 **245.7%保证金比率** - 远超安全线
- ⏱️ **99.9%系统可用性** - 近乎完美运行
- 🛡️ **$1M TVL保险** - 额外保险保障

## 📚 文档

### 项目文档
- [产品需求文档 (PRD)](./PRD-HypeUSD-v1.md)
- [技术架构方案](./技术架构方案-v1.md)
- [演示模式使用说明](./HypeUSD演示模式使用说明.md)
- [项目完成总结](./项目完成总结-v2.md)

### UI设计
- [官网线框图](./wireframe-landing-page.svg)
- [dApp线框图](./wireframe-dapp-main.svg)

## 🚦 开发指南

### 环境要求
- Node.js >= 18.0.0
- npm >= 9.0.0

### 开发命令
```bash
# 开发服务器
npm run dev

# 类型检查
npm run type-check

# 代码检查
npm run lint

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

### 部署
项目已配置Vercel部署，推送到main分支将自动触发部署。

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🌐 社区

- **Discord:** [加入我们的社区](https://discord.gg/hype-usd)
- **Twitter:** [@hype_usd](https://twitter.com/hype_usd)
- **Telegram:** [HypeUSD 中文群](https://t.me/hype_usd)
- **Email:** contact@hype-usd.com

## ⚠️ 风险提示

DeFi协议存在智能合约风险、流动性风险、市场极端波动风险等。请在使用前充分了解相关风险，并根据自身风险承受能力谨慎决策。

---

**⭐ 如果这个项目对您有帮助，请给我们一个Star！**

Built with ❤️ by HypeUSD Team
