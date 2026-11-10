<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  ArrowDownUp,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Box,
  Check,
  ChevronDown,
  Clock3,
  Coins,
  Copy,
  ExternalLink,
  Heart,
  Image,
  Info,
  Landmark,
  LockKeyhole,
  Menu,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Ticket,
  TrendingUp,
  Video,
  WalletCards,
  X,
} from '@lucide/vue'

// The site intentionally keeps i18n local and dependency-free until the product
// has a router/backend. English is the public default; Chinese remains available
// as a complete alternate copy deck and the preference survives page reloads.
const storedLocale = typeof window !== 'undefined' ? window.localStorage.getItem('keepora-locale') : null
const locale = ref(storedLocale === 'zh' ? 'zh' : 'en')
const tokenAddress = 'GS5RcmQpm6gFHMKURnJBCScMB81659KwYoLxN4zypump'
const englishCopy = {
  '产品预览 · Market prototype': 'Product preview · Market prototype',
  '暂未连接钱包或智能合约': 'Wallet and smart contracts are not connected yet',
  '了解交易流程': 'See how it works',
  '首页': 'Home',
  '全部藏品': 'All collectibles',
  '设计师玩具': 'Designer toys',
  '搪胶公仔': 'Vinyl figures',
  '人偶模型': 'Character figures',
  '我的收藏': 'My favorites',
  '主要导航': 'Primary navigation',
  '藏品市集': 'Collectibles market',
  '交易保障': 'Trade protection',
  '质押与奖励': 'Staking & rewards',
  '路线图': 'Roadmap',
  '成为卖家': 'Become a seller',
  '连接钱包': 'Connect wallet',
  '关闭菜单': 'Close menu',
  '打开菜单': 'Open menu',
  '移动导航': 'Mobile navigation',
  '收藏的下一站 · ON SOLANA': 'The next stop for collectors · ON SOLANA',
  '让每件藏品，': 'Every collectible,',
  '都有迹可循。': 'with a story you can trace.',
  '潮玩二手市集，为实物藏品记录来历、交易与流转。认真收藏，也认真留证。': 'A resale market for art toys that records provenance, trades, and custody for physical collectibles. Collect with care, and keep the proof.',
  '逛逛藏品': 'Explore collectibles',
  '交易如何运作': 'How trading works',
  '实物先行': 'Physical first',
  '交易有据': 'Trades with proof',
  '社区共建': 'Built with the community',
  '青蓝色龙纹的收藏级设计师公仔': 'Collector-grade designer figure with a blue dragon motif',
  '参考藏品 · 演示照片': 'Reference collectible · Demo photo',
  '一件实物，销毁后留下永久链上凭证。': 'One physical item, one permanent on-chain credential after destruction.',
  '商品凭证': 'Item credential',
  '规划中': 'Planned',
  '示例报价': 'Example price',
  '售出后销毁实物，管理员审核后生成 NFT 并永久上链': 'After sale, the physical item is destroyed; an administrator reviews the video before minting a permanent NFT on-chain',
  '平台特征': 'Platform principles',
  '从实物出发': 'Start with the physical item',
  '照片、购买凭证与鉴定信息共同构成商品档案': 'Photos, purchase proof, and verification form the item record',
  '状态清晰可见': 'Status stays visible',
  '订单托管、销毁视频与审核步骤逐项记录': 'Escrow, destruction video, and review are recorded step by step',
  '凭证陪伴交易': 'Proof travels with the trade',
  '商品凭证与交易证明对应实物与交易历史': 'Item credentials and trade proofs map to the physical item and its history',
  '现在，': 'Find what is ',
  '值得收藏。': 'worth collecting.',
  '为探索体验准备的示例藏品 · 所有商品与价格均为演示数据': 'Sample collectibles for exploration · All items and prices are demo data',
  '藏品图片摄影与许可信息已列在每件商品详情中': 'Photo credits and licenses are listed in each item detail',
  '演示藏品照片均有来源': 'Every demo photo is credited',
  '商品类别': 'Item categories',
  '搜索藏品': 'Search collectibles',
  '搜索藏品或系列': 'Search items or series',
  '排序方式': 'Sort order',
  '推荐排序': 'Recommended',
  '价格由低到高': 'Price: low to high',
  '价格由高到低': 'Price: high to low',
  '查看 {name} 详情': 'View {name} details',
  '凭证资料已登记': 'Proof registered',
  '移出收藏': 'Remove from favorites',
  '加入收藏': 'Add to favorites',
  '预览': 'Preview',
  '参考示例': 'Demo reference',
  '还没有收藏藏品': 'No saved collectibles yet',
  '没有找到相关藏品': 'No matching collectibles',
  '点击藏品图片上的心形图标，即可加入本地收藏。': 'Click the heart on an item to save it locally.',
  '试试另一个关键词，或切换到全部藏品。': 'Try another keyword, or switch to all collectibles.',
  '查看全部藏品': 'View all collectibles',
  '目前展示的商品名称、成色描述、TRF 报价与凭证标记均为网页演示内容，不代表真实库存、卖家或链上商品记录。': 'Item names, condition notes, TRF prices, and proof labels shown here are website demo content. They do not represent real inventory, sellers, or on-chain records.',
  '实物在前，': 'Physical items first, ',
  '凭证随行。': 'proof along the way.',
  '从售出、视频销毁到管理员审核和铸造，状态都能被看懂。': 'From sale to video destruction, administrator review, and minting, every status stays understandable.',
  '真实交易需在售出后提交销毁视频，由系统管理员审核通过后生成 NFT；本页面藏品图片仅作界面示意。': 'A live sale requires a destruction video after the sale. A system administrator must approve it before the NFT is minted; images here are interface examples only.',
  '白皮书流程 · 设计草案': 'Whitepaper flow · Design draft',
  '建好商品档案': 'Build the item record',
  '卖家提交照片、购买凭证与序列信息，通过平台或合作鉴定方审核后才能进入市集。': 'Sellers submit photos, purchase proof, and serial details before platform or partner verification can approve a listing.',
  '商品系列': 'Item series',
  '鉴定与成色': 'Verification & condition',
  '购买凭证哈希': 'Purchase proof hash',
  '售出后拍摄销毁视频': 'Record the destruction video after sale',
  '交易完成后，卖家必须拍摄完整销毁过程并提交视频；实物销毁不可逆，视频哈希写入待审核档案。': 'After the sale, the seller must record and submit the complete destruction process. The physical destruction is irreversible, and the video hash is attached to the review record.',
  '销毁视频': 'Destruction video',
  '视频哈希与时间戳': 'Video hash & timestamp',
  '不可逆实物状态': 'Irreversible physical state',
  '管理员审核后铸造 NFT': 'Mint NFT after administrator review',
  '系统管理员核验销毁视频与订单后，才生成 Item NFT；争议期结束后生成 Trade Proof NFT，凭证在链上永久保存。': 'A system administrator verifies the destruction video and order before minting the Item NFT. After the dispute window, the Trade Proof NFT is minted and both credentials remain permanently recorded on-chain.',
  '系统管理员审核': 'System administrator review',
  '审核通过后铸造': 'Mint after approval',
  '链上永久记录': 'Permanent on-chain record',
  '交易历史': 'Trade history',
  '设计示意': 'Design preview',
  '实物照片示意': 'Physical photo preview',
  '蓝龙 Dunny 商品凭证中的实物照片示意': 'Physical photo preview for the Blue Dragon Dunny credential',
  '商品类型': 'Item type',
  '链上凭证': 'On-chain credential',
  '未来支持': 'Planned support',
  '审核后铸造': 'Minted after review',
  '销毁视频哈希': 'Destruction video hash',
  '销毁完成 · 待管理员审核': 'Destruction complete · Pending administrator review',
  '管理员已审核 · NFT 永久上链': 'Administrator approved · NFT permanently on-chain',
  '权利范围': 'Rights covered',
  '商品记录与交易历史': 'Item record and trade history',
  '链下数据': 'Off-chain data',
  '图片、成色与购买凭证哈希': 'Images, condition, and purchase proof hash',
  '商品凭证不代表品牌方背书，亦不会转移商标、版权或角色形象权利。': 'An item credential is not brand endorsement and does not transfer trademark, copyright, or character rights.',
  '买家付款': 'Buyer pays',
  '订单托管': 'Order escrow',
  '确认售出': 'Sale confirmed',
  '卖家拍摄销毁视频': 'Seller records destruction video',
  '管理员审核': 'Administrator review',
  '铸造 NFT & 永久上链': 'Mint NFT & record permanently on-chain',
  '奖励来自参与，': 'Rewards come from participation, ',
  '不来自承诺。': 'not promises.',
  '依照白皮书建议参数制作的交互式质押权重试算，不展示或预测收益。': 'An interactive staking-weight sandbox based on proposed whitepaper parameters. It does not show or predict returns.',
  '白皮书草案参数': 'Whitepaper draft parameters',
  '质押权重试算': 'Staking weight sandbox',
  '本地交互': 'Local interaction',
  '假设锁仓数量': 'Assumed locked amount',
  '重置': 'Reset',
  '选择 TRF 锁仓数量': 'Choose TRF locked amount',
  '锁仓周期': 'Lock period',
  '时间系数': 'Time multiplier',
  '会员凭证': 'Membership credential',
  '草案加成': 'Draft boost',
  '选择会员凭证': 'Choose membership credential',
  '无会员凭证': 'No membership credential',
  '示例权重': 'Example weight',
  '仅按锁仓数量与草案系数试算': 'Local example: locked amount × draft multipliers',
  '不构成奖励金额或 APY': 'Not a reward amount or APY',
  '已实现\n交易手续费': 'Realized\ntrading fees',
  '公开批准\n社区预算': 'Approved\ncommunity budget',
  '质押者\n按权重分享': 'Stakers\nshare by weight',
  '奖励分配思路': 'How rewards are allocated',
  '每个周期的奖励上限取决于已实现的可分配收入与经治理批准的预算。白皮书提出按锁仓数量、锁仓时间、会员凭证与持有时间计算权重。': 'Each period is capped by realized distributable revenue and a governance-approved budget. The whitepaper proposes weighting by locked amount, lock duration, membership credential, and holding time.',
  '当期奖励池 × 个人权重 ÷ 全部有效权重': 'Current reward pool × personal weight ÷ all active weight',
  '草案参数可能调整；当前未部署质押、奖励池或会员 NFT 合约。奖励来自真实收入或事先公开的代币预算，不承诺固定 APY、收益、回购或代币价格。': 'Draft parameters may change. Staking, reward pool, and membership NFT contracts are not deployed. Rewards depend on realized revenue or a disclosed token budget; no fixed APY, yield, buyback, or token price is promised.',
  '查看奖励规则说明': 'View reward rules',
  '质押与奖励采用动态参数，详见 WHITEPAPER.md 第 5 节': 'Staking and rewards use dynamic parameters; see section 5 of WHITEPAPER.md',
  '机制先写清楚，': 'Define the mechanics,',
  '再逐步验证。': 'then validate them.',
  '白皮书初始模型用于讨论与测试，代币供给、分配和释放尚非已部署事实。': 'The whitepaper model is for discussion and testing. Supply, allocation, and vesting are not deployed facts.',
  '查看模型说明': 'View model notes',
  '代币初始分配与解锁计划均为白皮书建议模型': 'Initial token allocation and unlocks are proposed whitepaper parameters',
  '建议初始总量': 'Proposed initial supply',
  '提案参数 · 尚未发行': 'Proposal parameter · Not issued',
  '社区、质押与交易奖励': 'Community, staking & trade rewards',
  '金库与商品采购': 'Treasury & item acquisition',
  '流动性与做市': 'Liquidity & market making',
  '团队与核心贡献者': 'Team & core contributors',
  '生态与合作伙伴': 'Ecosystem & partners',
  '投资者与顾问': 'Investors & advisors',
  '团队代币：建议 12 个月 cliff + 36 个月线性释放': 'Team tokens: proposed 12-month cliff + 36-month linear vesting',
  '多签与时间锁管理 · 草案建议': 'Multisig and timelock management · Draft proposal',
  '每一步，都经得起': 'Every step should stand up to ',
  '检验。': 'scrutiny.',
  '路线图阶段是拟议方向；当前网站是产品交互预览。': 'Roadmap phases are proposed directions; this site is a product interaction preview.',
  '当前规划': 'Current planning',
  '机制设计与测试网': 'Mechanism design & testnet',
  '完善数据模型、代币经济模拟和合约规格；发布测试网前端并开展内部安全测试。': 'Complete the data model, token simulation, and contract specs; publish the testnet frontend and run internal security tests.',
  '产品与审计准备': 'Product & audit preparation',
  '规划中': 'Planned',
  'Genesis 与凭证 NFT': 'Genesis & credential NFTs',
  '测试 Genesis Pass、交易证明与社区任务，并验证质押和随机数机制。': 'Test Genesis Pass, trade proofs, and community quests while validating staking and randomness mechanics.',
  '参与机制验证': 'Participation validation',
  '市集 Alpha': 'Marketplace Alpha',
  '邀请卖家试运行报价、托管、销毁视频提交、管理员审核与凭证铸造。': 'Invite sellers to pilot quotes, escrow, destruction-video submission, administrator review, and credential minting.',
  '小范围交易测试': 'Small-scale trade tests',
  '后续阶段': 'Later phase',
  '奖励季与社区治理': 'Reward seasons & community governance',
  '按真实交易数据逐步开放奖池、质押奖励预算与社区参数提案。': 'Open reward pools, staking budgets, and community parameter proposals gradually using real trade data.',
  '持续披露与共同治理': 'Ongoing disclosure & shared governance',
  '藏得认真，': 'Collect with care, ',
  '就该有迹可循。': 'and keep the proof.',
  '从一件实物开始，让每一次交易都留下清楚的来历。': 'Start with one physical item and leave clear provenance at every trade.',
  '探索示例市集': 'Explore the demo market',
  '为实物藏品而设计的 Solana 二手市集。': 'A Solana resale market designed for physical collectibles.',
  '为实物藏品而设计的 Solana 二手市集。': 'A Solana resale market designed for physical collectibles.',
  '藏品市集': 'Collectibles market',
  '质押模型': 'Staking model',
  '不是任何商品品牌的官方商城或授权销售渠道。': 'Not an official store or authorized sales channel for any product brand.',
  '演示图片来源与许可：': 'Demo image sources and licenses:',
  '收藏组合': 'Collection set',
  '关闭': 'Close',
  '详情': 'details',
  '原型藏品': 'Prototype item',
  '资料审核': 'Data review',
  '商品图片 · 演示来源': 'Item image · Demo source',
  '摄影': 'Photo',
  '原型藏品': 'Prototype item',
  '示例报价 · 非实时价格': 'Example price · Not live',
  '市场和法币参考价格尚未接入': 'Market and fiat reference prices are not connected',
  '藏品详情': 'Item details',
  '凭证记录': 'Proof record',
  '概念演示状态': 'Concept demo status',
  '尚无审核记录': 'No review record yet',
  '交易网络': 'Trade network',
  '真实上架需完成卖家身份认证、商品资料提交与审核；本页面藏品图片仅作界面示意。': 'A live listing requires seller verification, item submission, and review. Images on this page are interface examples only.',
  '照片来源已注明': 'Photo source credited',
  '购买凭证与鉴定资料': 'Purchase proof & verification',
  '正式商品上架时由卖家提交': 'Submitted by the seller for a live listing',
  'Item NFT 与交易历史': 'Item NFT & trade history',
  '销毁视频凭证': 'Destruction video proof',
  '卖出后由卖家拍摄并提交，等待系统管理员审核': 'Recorded and submitted by the seller after sale; pending administrator review',
  '管理员审核状态': 'Administrator review status',
  '审核通过后生成 NFT，永久记录在 Solana 链上': 'NFT is minted after approval and recorded permanently on Solana',
  '预览订单费用': 'Preview order costs',
  '预览不会扣款、签名或创建链上订单': 'Preview does not charge, sign, or create an on-chain order',
  '返回藏品详情': 'Back to item details',
  '本地试算': 'Local calculation',
  '费用明细': 'Cost breakdown',
  '不会创建实际订单': 'No real order will be created',
  '藏品价格': 'Item price',
  '演示报价': 'Demo quote',
  '市场服务费': 'Marketplace fee',
  '建议比例 · 10%': 'Proposed rate · 10%',
  '试算合计': 'Estimated total',
  '服务费用未计入': 'Service costs not included',
  '订单托管为白皮书拟议流程': 'Order escrow is a proposed whitepaper flow',
  '真实交易需等待钱包、订单合约、销毁视频审核与 NFT 铸造机制接入。': 'Live trading awaits wallet, order contracts, destruction-video review, and NFT minting.',
  '完成费用预览': 'Finish cost preview',
  '预览完成：尚未签名、扣款或提交订单': 'Preview complete: nothing signed, charged, or submitted',
  '市场 10% 服务费为白皮书初始建议比例，尚未实施': 'The 10% marketplace fee is a whitepaper proposal and is not implemented',
  'SELLER READINESS': 'SELLER READINESS',
  '每件上架，都有准备。': 'Every listing starts prepared.',
  '未来开放上架前，卖家需要准备以下商品资料：': 'Before listings open, sellers will need the following item materials:',
  '商品本体与高清照片': 'The item and high-resolution photos',
  '清楚记录各角度、配件与包装': 'Clear views of angles, accessories, and packaging',
  '购买凭证与序列信息': 'Purchase proof and serial details',
  '平台或合作鉴定方审核后建立档案': 'Record created after platform or partner review',
  '售出后拍摄完整销毁视频': 'Record the complete destruction video after sale',
  '视频需覆盖实物销毁全过程，并提交视频哈希与时间戳': 'The video must cover the full destruction and include its hash and timestamp',
  '报价、时限与履约保证金': 'Price, timeline, and performance deposit',
  '拟以 TRF 报价，并在售出后按规则完成销毁': 'Proposed TRF quote, with destruction completed after sale under the rules',
  '卖家认证、销毁视频提交和管理员审核功能尚未接入。此清单仅供浏览，不会收集或提交信息。': 'Seller verification, destruction-video submission, and administrator review are not connected. This checklist is for browsing only and collects no information.',
  '了解': 'Got it',
  'WALLET CONNECTION': 'WALLET CONNECTION',
  '钱包接入尚在规划。': 'Wallet connection is on the roadmap.',
  '这是 Keepora.xyz 的产品交互预览。连接钱包、链上支付、NFT 铸造和质押操作暂未启用。': 'This is a Keepora.xyz product preview. Wallet connection, on-chain payments, NFT minting, and staking are not enabled.',
  '目标网络': 'Target network',
  '待集成': 'To be integrated',
  '返回浏览': 'Back to browsing',
  '关闭提示': 'Dismiss notification',
  '已加入本地收藏': 'Saved locally',
  '已从本地收藏移除': 'Removed from local favorites',
  'TRF、NFT 与实体商品的具体关系以正式用户协议和订单规则为准。任何奖励均受真实平台收入与治理预算约束，不构成固定收益或投资回报承诺。': 'The relationship between TRF, NFTs, and physical items will be defined by the final terms and order rules. Rewards depend on realized platform revenue and governance budgets and are not a fixed return or investment promise.',
}

function t(source, params = {}) {
  const translated = locale.value === 'en' ? (englishCopy[source] || source) : source
  return translated.replace(/\{(\w+)\}/g, (_, key) => params[key] ?? '')
}

function toggleLocale() {
  locale.value = locale.value === 'en' ? 'zh' : 'en'
  localStorage.setItem('keepora-locale', locale.value)
  document.documentElement.lang = locale.value
}

const listingCopy = {
  '001': { name: 'Blue Dragon Dunny', subtitle: 'Porcelain Series · Designer Vinyl', condition: 'Well preserved', edition: 'Single collectible', imageAlt: 'White vinyl figure with a blue dragon motif' },
  '002': { name: 'Molly · Artist Edition', subtitle: 'Molly (art toy) · Display collection', condition: 'Display-grade condition', edition: 'Designer toy', imageAlt: 'Molly art toy figure' },
  '003': { name: 'Mist White Hootlum', subtitle: 'HOOTLUM vinyl art figure · White', condition: 'New display piece', edition: 'White edition', imageAlt: 'White Hootlum vinyl art figure' },
  '004': { name: 'Kirishima Nendoroid', subtitle: 'Nendoroid · Kirishima', condition: 'Includes display base', edition: 'Articulated figure', imageAlt: 'Japanese articulated figure in an interior scene' },
  '005': { name: 'Nendoroid Collection Wall', subtitle: 'Boxed figure series · Collection set', condition: 'Collection preview', edition: 'Collection set', imageAlt: 'Wall displaying boxed Nendoroid figures' },
}

function listingText(item, field) {
  return locale.value === 'en' ? listingCopy[item.id]?.[field] || item[field] : item[field]
}

function listingSearchText(item) {
  const copy = listingCopy[item.id] || {}
  return `${item.name} ${item.subtitle} ${item.category} ${Object.values(copy).join(' ')}`.toLocaleLowerCase()
}

const categories = ['全部藏品', '设计师玩具', '搪胶公仔', '人偶模型', '我的收藏']
const listings = [
  {
    id: '001',
    name: '蓝龙 Dunny',
    subtitle: '瓷绘系列 · 设计师搪胶',
    category: '搪胶公仔',
    price: 2480,
    condition: '保存良好',
    edition: '单件藏品',
    image: '/images/collectibles/dragon.jpg',
    imageAlt: '白色搪胶公仔，绘有青蓝色龙纹',
    credit: 'Neoclassicism Enthusiast',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Dunny_vinyl_figure_which_portrays_a_dragon_embroidered_on_a_silk_brocade_door_valance_and_side_panels_(Chinese,_17th-18th_century)_in_The_MET_collection.jpg',
    license: 'CC BY-SA 4.0',
    source: 'Wikimedia Commons',
    color: 'mint',
    verified: true,
  },
  {
    id: '002',
    name: 'Molly · 艺术家款',
    subtitle: 'Molly (art toy) · 收藏展示',
    category: '设计师玩具',
    price: 1860,
    condition: '展示级成色',
    edition: '设计师玩具',
    image: '/images/collectibles/molly.jpg',
    imageAlt: 'Molly 艺术玩具人物公仔',
    credit: 'Ameba25',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Molly_(art_toy).jpg',
    license: 'CC0',
    source: 'Wikimedia Commons',
    color: 'coral',
    verified: false,
  },
  {
    id: '003',
    name: '雾白 Hootlum',
    subtitle: 'HOOTLUM vinyl art figure · White',
    category: '设计师玩具',
    price: 1320,
    condition: '全新摆件',
    edition: 'White edition',
    image: '/images/collectibles/hootlum.jpg',
    imageAlt: '白色 Hootlum 搪胶艺术公仔',
    credit: 'Thomas Victor Lopez',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:HOOTLUM_vinyl_art_figure_(white_edition).jpg',
    license: 'CC BY-SA 4.0',
    source: 'Wikimedia Commons',
    color: 'lilac',
    verified: true,
  },
  {
    id: '004',
    name: 'Kirishima Nendoroid',
    subtitle: 'Nendoroid · ねんどろいど 桐島',
    category: '人偶模型',
    price: 980,
    condition: '含展示底座',
    edition: '可动人偶',
    image: '/images/collectibles/nendoroid.jpg',
    imageAlt: '摆放在室内场景中的日系可动人偶',
    credit: 'Duong Tran Dinh',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:KanColle_Nendoroid_-_Kirishima.jpg',
    license: 'CC BY 2.0',
    source: 'Wikimedia Commons',
    color: 'yellow',
    verified: false,
  },
  {
    id: '005',
    name: 'Nendoroid 收藏墙',
    subtitle: '盒装人偶系列 · 收藏组合',
    category: '人偶模型',
    price: 3200,
    condition: '组合预览',
    edition: '收藏组合',
    image: '/images/collectibles/nendoroid-set.jpg',
    imageAlt: '一面墙陈列着盒装 Nendoroid 收藏人偶',
    credit: 'Danny Choo',
    creditUrl: 'https://commons.wikimedia.org/wiki/File:Nendoroid_Collection.jpg',
    license: 'CC BY-SA 2.0',
    source: 'Wikimedia Commons',
    color: 'blue',
    verified: true,
  },
]

const selectedCategory = ref('全部藏品')
const query = ref('')
const searchInput = ref(null)
const sortOrder = ref('recommended')
const favorites = ref(new Set())
const activeListing = ref(null)
const dialogTab = ref('item')
const showCheckout = ref(false)
const showSellerPanel = ref(false)
const showWalletPanel = ref(false)
const mobileMenuOpen = ref(false)
const toastMessage = ref('')
const rewardAmount = ref(2500)
const rewardLock = ref(90)
const memberPass = ref('none')
let toastTimer

const visibleListings = computed(() => {
  const normalized = query.value.trim().toLocaleLowerCase()
  let result = listings.filter((item) => {
    const matchesCategory =
      selectedCategory.value === '全部藏品' ||
      (selectedCategory.value === '我的收藏'
        ? favorites.value.has(item.id)
        : item.category === selectedCategory.value)
    const matchesSearch = !normalized || listingSearchText(item).includes(normalized)
    return matchesCategory && matchesSearch
  })

  if (sortOrder.value === 'low') result = [...result].sort((a, b) => a.price - b.price)
  if (sortOrder.value === 'high') result = [...result].sort((a, b) => b.price - a.price)
  return result
})

const rewardMultiplier = computed(() => {
  const time = rewardLock.value === 30 ? 1 : rewardLock.value === 90 ? 1.25 : 1.6
  const membership = memberPass.value === 'genesis' ? 1.25 : memberPass.value === 'collector' ? 1.1 : 1
  return (time * membership).toFixed(2)
})

const exampleWeight = computed(() => Math.round(Math.max(0, Number(rewardAmount.value) || 0) * Number(rewardMultiplier.value)))

function notify(message) {
  toastMessage.value = message
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => (toastMessage.value = ''), 3000)
}

async function copyTokenAddress() {
  try {
    await navigator.clipboard.writeText(tokenAddress)
    notify('Token address copied')
  } catch {
    notify('Copy unavailable - select the address manually')
  }
}

function openListing(listing, checkout = false) {
  activeListing.value = listing
  dialogTab.value = 'item'
  showCheckout.value = checkout
  document.body.classList.add('dialog-open')
}

function closeDialogs() {
  activeListing.value = null
  showSellerPanel.value = false
  showWalletPanel.value = false
  showCheckout.value = false
  document.body.classList.remove('dialog-open')
}

function toggleFavorite(id) {
  const updated = new Set(favorites.value)
  if (updated.has(id)) updated.delete(id)
  else updated.add(id)
  favorites.value = updated
  localStorage.setItem('keepora-favorites', JSON.stringify([...updated]))
  notify(t(updated.has(id) ? '已加入本地收藏' : '已从本地收藏移除'))
}

function scrollToSection(section) {
  mobileMenuOpen.value = false
  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function handleEscape(event) {
  if (event.key === 'Escape') closeDialogs()
}

function handleSearchShortcut(event) {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    searchInput.value?.focus()
  }
}

onMounted(() => {
  document.documentElement.lang = locale.value
  try {
    favorites.value = new Set(JSON.parse(localStorage.getItem('keepora-favorites') || '[]'))
  } catch {
    favorites.value = new Set()
  }
  window.addEventListener('keydown', handleEscape)
  window.addEventListener('keydown', handleSearchShortcut)
})

onUnmounted(() => {
  clearTimeout(toastTimer)
  window.removeEventListener('keydown', handleEscape)
  window.removeEventListener('keydown', handleSearchShortcut)
  document.body.classList.remove('dialog-open')
})

watch([showSellerPanel, showWalletPanel], ([seller, wallet]) => {
  if (seller || wallet) document.body.classList.add('dialog-open')
  else if (!activeListing.value) document.body.classList.remove('dialog-open')
})
</script>

<template>
  <div class="orb-root">
    <span class="orb-sky" aria-hidden="true"></span>
    <span class="orb-aura orb-aura-a" aria-hidden="true"></span>
    <span class="orb-aura orb-aura-b" aria-hidden="true"></span>
    <span class="orb-spine" aria-hidden="true">
      <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
    </span>

    <div class="orb-hud">
      <button class="orb-locale" type="button" :aria-label="locale === 'en' ? 'Switch to Chinese' : '切换到英文'" @click="toggleLocale">{{ locale === 'en' ? '中' : 'EN' }}</button>
      <button class="orb-hud-btn" type="button" @click="showSellerPanel = true">{{ t('成为卖家') }} <Plus :size="13" /></button>
      <button class="orb-hud-btn orb-hud-primary" type="button" @click="showWalletPanel = true"><WalletCards :size="15" />{{ t('连接钱包') }}</button>
    </div>

    <main id="top" class="orb-flow">
      <section class="orb-scene orb-cover">
        <div class="orb-cover-top">
          <a class="orb-lockup" href="#top" :aria-label="`Keepora.xyz ${t('首页')}`" @click.prevent="scrollToSection('top')">
            <img class="orb-lockup-mark" src="/brand/logo.svg" alt="" />
            <span class="orb-lockup-type">
              <span class="orb-wordmark">keepora<span class="orb-wordmark-tld">.xyz</span></span>
              <span class="orb-motto">COLLECT WITH CONTEXT.</span>
            </span>
          </a>
          <p class="orb-status"><span class="orb-led" aria-hidden="true"></span>{{ t('产品预览 · Market prototype') }}</p>
        </div>

        <div class="orb-cover-body">
          <div class="orb-cover-copy">
            <p class="orb-eyebrow">{{ t('收藏的下一站 · ON SOLANA') }}</p>
            <h1 class="orb-title">{{ t('让每件藏品，') }}<span class="orb-title-glow">{{ t('都有迹可循。') }}</span></h1>
            <p class="orb-lede">{{ t('潮玩二手市集，为实物藏品记录来历、交易与流转。认真收藏，也认真留证。') }}</p>
            <div class="orb-cover-actions">
              <button class="orb-cta" type="button" @click="scrollToSection('market')">{{ t('逛逛藏品') }} <ArrowRight :size="16" /></button>
              <button class="orb-cta-quiet" type="button" @click="scrollToSection('protocol')">{{ t('交易如何运作') }} <ArrowUpRight :size="15" /></button>
            </div>
            <p class="orb-cover-note">
              <span>{{ t('暂未连接钱包或智能合约') }}</span>
              <a class="orb-inline" href="#protocol" @click.prevent="scrollToSection('protocol')">{{ t('了解交易流程') }} <ArrowUpRight :size="12" /></a>
            </p>
          </div>

          <article class="orb-plate">
            <figure class="orb-plate-media">
              <img class="orb-plate-img" src="/images/collectibles/dragon.jpg" :alt="t('青蓝色龙纹的收藏级设计师公仔')" />
              <figcaption class="orb-plate-chips">
                <span class="orb-chip"><span class="orb-led" aria-hidden="true"></span>PHOTO REF / 001</span>
                <span class="orb-chip">ITEM PHOTO</span>
              </figcaption>
              <span class="orb-plate-flag"><BadgeCheck :size="13" /> {{ t('参考藏品 · 演示照片') }}</span>
            </figure>
            <div class="orb-plate-copy">
              <p class="orb-plate-kickers">
                <span class="orb-kicker">THE COLLECTOR'S EDIT · 001</span>
                <span class="orb-kicker"><Box :size="12" /> DESIGNER VINYL</span>
              </p>
              <h2 class="orb-plate-title">{{ locale === 'en' ? 'Blue Dragon' : '蓝龙' }}<br /><span>Dunny</span></h2>
              <p class="orb-plate-line">{{ t('一件实物，销毁后留下永久链上凭证。') }}</p>
              <dl class="orb-specs">
                <div class="orb-spec"><dt>{{ t('商品凭证') }}</dt><dd>ITEM NFT <small>{{ t('审核后铸造') }}</small></dd></div>
                <div class="orb-spec"><dt>{{ t('示例报价') }}</dt><dd>2,480 <em>TRF</em></dd></div>
              </dl>
              <p class="orb-plate-fine"><ShieldCheck :size="12" /><span>{{ t('售出后销毁实物，管理员审核后生成 NFT 并永久上链') }}</span></p>
            </div>
          </article>
        </div>

        <div class="orb-telemetry" aria-label="Prototype mint address">
          <div class="orb-telemetry-id">
            <span class="orb-telemetry-key">PROTOTYPE MINT <span>SOLANA</span></span>
            <code class="orb-telemetry-addr">{{ tokenAddress }}</code>
          </div>
          <button class="orb-telemetry-copy" type="button" aria-label="Copy prototype mint address" title="Copy prototype mint address" @click="copyTokenAddress">
            <Copy :size="13" />
            <span>COPY</span>
          </button>
        </div>
      </section>

      <section class="orb-scene orb-facts" :aria-label="t('平台特征')">
        <ol class="orb-fact-list">
          <li class="orb-fact">
            <span class="orb-fact-no" aria-hidden="true">01</span>
            <span class="orb-fact-key">{{ t('从实物出发') }}</span>
            <p class="orb-fact-text">{{ t('照片、购买凭证与鉴定信息共同构成商品档案') }}</p>
          </li>
          <li class="orb-fact">
            <span class="orb-fact-no" aria-hidden="true">02</span>
            <span class="orb-fact-key">{{ t('状态清晰可见') }}</span>
            <p class="orb-fact-text">{{ t('订单托管、销毁视频与审核步骤逐项记录') }}</p>
          </li>
          <li class="orb-fact">
            <span class="orb-fact-no" aria-hidden="true">03</span>
            <span class="orb-fact-key">{{ t('凭证陪伴交易') }}</span>
            <p class="orb-fact-text">{{ t('商品凭证与交易证明对应实物与交易历史') }}</p>
          </li>
        </ol>
      </section>

      <section id="market" class="orb-scene orb-market">
        <header class="orb-head">
          <p class="orb-kicker">THE COLLECTOR'S MARKET</p>
          <div class="orb-head-row">
            <h2 class="orb-h2">{{ t('现在，') }}<span class="orb-h2-glow">{{ t('值得收藏。') }}</span></h2>
            <button class="orb-quiet" type="button" @click="notify(t('藏品图片摄影与许可信息已列在每件商品详情中'))"><Image :size="14" /> {{ t('演示藏品照片均有来源') }}</button>
          </div>
          <p class="orb-sub">{{ t('为探索体验准备的示例藏品 · 所有商品与价格均为演示数据') }}</p>
        </header>

        <div class="orb-market-bar">
          <div class="orb-filter-row" role="tablist" :aria-label="t('商品类别')">
            <button v-for="category in categories" :key="category" class="orb-filter" :class="{ 'orb-filter-on': selectedCategory === category }" type="button" role="tab" :aria-selected="selectedCategory === category" @click="selectedCategory = category">
              {{ t(category) }}<span v-if="category === '我的收藏'" class="orb-filter-count">{{ favorites.size }}</span>
            </button>
          </div>
          <div class="orb-tool-row">
            <label class="orb-search">
              <Search :size="16" />
              <input ref="searchInput" v-model="query" type="search" :aria-label="t('搜索藏品')" :placeholder="t('搜索藏品或系列')" />
              <kbd class="orb-kbd">Ctrl K</kbd>
            </label>
            <label class="orb-sort">
              <ArrowDownUp :size="14" />
              <select v-model="sortOrder" :aria-label="t('排序方式')">
                <option value="recommended">{{ t('推荐排序') }}</option>
                <option value="low">{{ t('价格由低到高') }}</option>
                <option value="high">{{ t('价格由高到低') }}</option>
              </select>
              <ChevronDown :size="13" />
            </label>
          </div>
        </div>

        <ol v-if="visibleListings.length" class="orb-lot-rail">
          <li v-for="(item, index) in visibleListings" :key="item.id" class="orb-lot" :style="{ '--orb-i': index }">
            <figure class="orb-lot-frame">
              <button class="orb-lot-open" type="button" :aria-label="t('查看 {name} 详情', { name: listingText(item, 'name') })" @click="openListing(item)">
                <img :src="item.image" :alt="listingText(item, 'imageAlt')" loading="lazy" />
                <span class="orb-lot-code">TRF / {{ item.id }}</span>
              </button>
              <button class="orb-lot-fav" :class="{ 'orb-lot-fav-on': favorites.has(item.id) }" type="button" :aria-label="favorites.has(item.id) ? t('移出收藏') : t('加入收藏')" :aria-pressed="favorites.has(item.id)" @click="toggleFavorite(item.id)"><Heart :size="16" :fill="favorites.has(item.id) ? 'currentColor' : 'none'" /></button>
              <span class="orb-lot-demo">{{ t('预览') }}</span>
              <span class="orb-lot-no" aria-hidden="true">{{ item.id }}</span>
            </figure>
            <div class="orb-lot-copy">
              <span class="orb-lot-series">{{ listingText(item, 'subtitle') }}</span>
              <h3 class="orb-lot-title"><button class="orb-lot-name" type="button" @click="openListing(item)"><span>{{ listingText(item, 'name') }}</span><ArrowUpRight :size="15" /></button></h3>
              <ul class="orb-lot-meta">
                <li v-if="item.verified"><span class="orb-tag"><BadgeCheck :size="11" />{{ t('凭证资料已登记') }}</span></li>
                <li><span class="orb-state" aria-hidden="true"></span>{{ listingText(item, 'condition') }}</li>
                <li>{{ listingText(item, 'edition') }}</li>
              </ul>
              <p class="orb-lot-price"><strong>{{ item.price.toLocaleString('en-US') }}</strong><span>TRF</span><small class="orb-lot-fine">{{ t('参考示例') }}</small></p>
            </div>
          </li>
        </ol>

        <div v-else class="orb-empty">
          <span class="orb-empty-mark" aria-hidden="true"><Search :size="18" /></span>
          <h3>{{ t(selectedCategory === '我的收藏' ? '还没有收藏藏品' : '没有找到相关藏品') }}</h3>
          <p>{{ t(selectedCategory === '我的收藏' ? '点击藏品图片上的心形图标，即可加入本地收藏。' : '试试另一个关键词，或切换到全部藏品。') }}</p>
          <button type="button" @click="selectedCategory = '全部藏品'; query = ''">{{ t('查看全部藏品') }} <ArrowRight :size="14" /></button>
        </div>

        <p class="orb-note"><Info :size="13" /> {{ t('目前展示的商品名称、成色描述、TRF 报价与凭证标记均为网页演示内容，不代表真实库存、卖家或链上商品记录。') }}</p>
      </section>

      <section id="protocol" class="orb-scene orb-protocol">
        <header class="orb-head">
          <p class="orb-kicker">BUILT AROUND REAL TRADES</p>
          <div class="orb-head-row">
            <h2 class="orb-h2">{{ t('实物在前，') }}<span class="orb-h2-glow">{{ t('凭证随行。') }}</span></h2>
            <span class="orb-pill">{{ t('白皮书流程 · 设计草案') }}</span>
          </div>
          <p class="orb-sub">{{ t('从售出、视频销毁到管理员审核和铸造，状态都能被看懂。') }}</p>
        </header>

        <ol class="orb-stations">
          <li class="orb-station">
            <div class="orb-station-head">
              <span class="orb-station-no">01 / ITEM</span>
              <span class="orb-station-icon orb-tone-a"><Box :size="18" /></span>
            </div>
            <div class="orb-station-copy">
              <h3>{{ t('建好商品档案') }}</h3>
              <p>{{ t('卖家提交照片、购买凭证与序列信息，通过平台或合作鉴定方审核后才能进入市集。') }}</p>
              <ul class="orb-station-tags"><li>{{ t('商品系列') }}</li><li>{{ t('鉴定与成色') }}</li><li>{{ t('购买凭证哈希') }}</li></ul>
            </div>
          </li>
          <li class="orb-station">
            <div class="orb-station-head">
              <span class="orb-station-no">02 / BURN</span>
              <span class="orb-station-icon orb-tone-b"><Video :size="18" /></span>
            </div>
            <div class="orb-station-copy">
              <h3>{{ t('售出后拍摄销毁视频') }}</h3>
              <p>{{ t('交易完成后，卖家必须拍摄完整销毁过程并提交视频；实物销毁不可逆，视频哈希写入待审核档案。') }}</p>
              <ul class="orb-station-tags"><li>{{ t('销毁视频') }}</li><li>{{ t('视频哈希与时间戳') }}</li><li>{{ t('不可逆实物状态') }}</li></ul>
            </div>
          </li>
          <li class="orb-station">
            <div class="orb-station-head">
              <span class="orb-station-no">03 / MINT</span>
              <span class="orb-station-icon orb-tone-c"><ShieldCheck :size="18" /></span>
            </div>
            <div class="orb-station-copy">
              <h3>{{ t('管理员审核后铸造 NFT') }}</h3>
              <p>{{ t('系统管理员核验销毁视频与订单后，才生成 Item NFT；争议期结束后生成 Trade Proof NFT，凭证在链上永久保存。') }}</p>
              <ul class="orb-station-tags"><li>{{ t('系统管理员审核') }}</li><li>{{ t('审核通过后铸造') }}</li><li>{{ t('链上永久记录') }}</li></ul>
            </div>
          </li>
        </ol>

        <article class="orb-passport">
          <header class="orb-passport-bar">
            <span class="orb-passport-key"><span class="orb-led" aria-hidden="true"></span>ITEM PASSPORT</span>
            <span class="orb-passport-state">{{ t('设计示意') }}</span>
          </header>
          <div class="orb-passport-body">
            <figure class="orb-passport-media">
              <img src="/images/collectibles/dragon.jpg" :alt="t('蓝龙 Dunny 商品凭证中的实物照片示意')" loading="lazy" />
              <figcaption class="orb-passport-caption">{{ t('实物照片示意') }}</figcaption>
            </figure>
            <div class="orb-passport-copy">
              <div class="orb-passport-head">
                <div>
                  <span class="orb-passport-code">COLLECTIBLE / 001</span>
                  <h3>{{ locale === 'en' ? 'Blue Dragon Dunny' : '蓝龙 Dunny' }}</h3>
                </div>
                <span class="orb-stamp" aria-hidden="true"><BadgeCheck :size="16" /></span>
              </div>
              <dl class="orb-passport-specs">
                <div><dt>{{ t('商品类型') }}</dt><dd>{{ locale === 'en' ? 'Designer vinyl' : '设计师搪胶' }}</dd></div>
                <div><dt>{{ t('链上凭证') }}</dt><dd><span class="orb-state" aria-hidden="true"></span>Item NFT <span class="orb-muted">{{ t('审核后铸造') }}</span></dd></div>
                <div><dt>{{ t('权利范围') }}</dt><dd>{{ t('商品记录与交易历史') }}</dd></div>
                <div><dt>{{ t('链下数据') }}</dt><dd>{{ t('销毁视频哈希') }}</dd></div>
              </dl>
              <p class="orb-passport-note">{{ t('商品凭证不代表品牌方背书，亦不会转移商标、版权或角色形象权利。') }}</p>
            </div>
          </div>
        </article>

        <ol class="orb-chain">
          <li class="orb-chain-node"><span class="orb-led" aria-hidden="true"></span><span>{{ t('买家付款') }}</span></li>
          <li class="orb-chain-arrow" aria-hidden="true"><ArrowRight :size="13" /></li>
          <li class="orb-chain-node"><span class="orb-led" aria-hidden="true"></span><span>{{ t('订单托管') }}</span></li>
          <li class="orb-chain-arrow" aria-hidden="true"><ArrowRight :size="13" /></li>
          <li class="orb-chain-node"><span class="orb-led" aria-hidden="true"></span><span>{{ t('确认售出') }}</span></li>
          <li class="orb-chain-arrow" aria-hidden="true"><ArrowRight :size="13" /></li>
          <li class="orb-chain-node"><span class="orb-led" aria-hidden="true"></span><span>{{ t('卖家拍摄销毁视频') }}</span></li>
          <li class="orb-chain-arrow" aria-hidden="true"><ArrowRight :size="13" /></li>
          <li class="orb-chain-node"><span class="orb-led" aria-hidden="true"></span><span>{{ t('系统管理员审核') }}</span></li>
          <li class="orb-chain-arrow" aria-hidden="true"><ArrowRight :size="13" /></li>
          <li class="orb-chain-node orb-chain-done"><span class="orb-led" aria-hidden="true"></span><span>{{ t('铸造 NFT & 永久上链') }}</span></li>
        </ol>
      </section>

      <section id="rewards" class="orb-scene orb-rewards">
        <header class="orb-head">
          <p class="orb-kicker">REWARDS FROM REAL ACTIVITY</p>
          <div class="orb-head-row">
            <h2 class="orb-h2">{{ t('奖励来自参与，') }}<span class="orb-h2-glow">{{ t('不来自承诺。') }}</span></h2>
            <span class="orb-pill">{{ t('白皮书草案参数') }}</span>
          </div>
          <p class="orb-sub">{{ t('依照白皮书建议参数制作的交互式质押权重试算，不展示或预测收益。') }}</p>
        </header>

        <div class="orb-lab">
          <div class="orb-calc">
            <p class="orb-calc-head">
              <span class="orb-calc-title"><span class="orb-calc-icon"><Coins :size="16" /></span>{{ t('质押权重试算') }}</span>
              <span class="orb-calc-local">{{ t('本地交互') }}</span>
            </p>
            <label class="orb-label" for="stake-amount">{{ t('假设锁仓数量') }} <span>TRF</span></label>
            <div class="orb-amount">
              <input id="stake-amount" v-model.number="rewardAmount" type="number" min="0" max="100000000" inputmode="decimal" />
              <span>TRF</span>
              <button type="button" @click="rewardAmount = 2500">{{ t('重置') }}</button>
            </div>
            <div class="orb-range">
              <input v-model.number="rewardAmount" type="range" min="0" max="50000" step="100" :aria-label="t('选择 TRF 锁仓数量')" />
              <div class="orb-range-ends"><span>0 TRF</span><span>50,000 TRF</span></div>
            </div>

            <p class="orb-label">{{ t('锁仓周期') }} <span>{{ t('时间系数') }}</span></p>
            <div class="orb-segment" :aria-label="t('锁仓周期')">
              <button v-for="lock in [{ days: 30, factor: '1.00×' }, { days: 90, factor: '1.25×' }, { days: 180, factor: '1.60×' }]" :key="lock.days" class="orb-segment-btn" :class="{ 'orb-segment-on': rewardLock === lock.days }" type="button" @click="rewardLock = lock.days"><span>{{ lock.days }} {{ locale === 'en' ? 'days' : '天' }}</span><small>{{ lock.factor }}</small></button>
            </div>

            <p class="orb-label">{{ t('会员凭证') }} <span>{{ t('草案加成') }}</span></p>
            <div class="orb-select">
              <Ticket :size="15" />
              <select v-model="memberPass" :aria-label="t('选择会员凭证')">
                <option value="none">{{ t('无会员凭证') }}</option>
                <option value="collector">Collector Pass</option>
                <option value="genesis">Genesis Pass</option>
              </select>
              <ChevronDown :size="13" />
            </div>

            <p class="orb-weight">
              <span class="orb-weight-key">{{ t('示例权重') }}<small>{{ t('仅按锁仓数量与草案系数试算') }}</small></span>
              <strong>{{ exampleWeight.toLocaleString('en-US') }}<span>w</span></strong>
            </p>
          </div>

          <div class="orb-orbit">
            <span class="orb-orbit-ring" aria-hidden="true"></span>
            <span class="orb-orbit-ring orb-orbit-ring-b" aria-hidden="true"></span>
            <span class="orb-orbit-core"><img src="/brand/logo.svg" alt="Keepora proof mark" /></span>
            <ul class="orb-orbit-nodes">
              <li class="orb-orbit-node orb-node-a"><TrendingUp :size="15" /><span v-html="t('已实现\n交易手续费').replace(/\n/g, '<br />')"></span></li>
              <li class="orb-orbit-node orb-node-b"><Landmark :size="15" /><span v-html="t('公开批准\n社区预算').replace(/\n/g, '<br />')"></span></li>
              <li class="orb-orbit-node orb-node-c"><Coins :size="15" /><span v-html="t('质押者\n按权重分享').replace(/\n/g, '<br />')"></span></li>
            </ul>
            <span class="orb-orbit-caption">ONLY REALIZED FUNDS</span>
          </div>
        </div>

        <div class="orb-explainer">
          <span class="orb-tiny">{{ t('奖励分配思路') }}</span>
          <p>{{ t('每个周期的奖励上限取决于已实现的可分配收入与经治理批准的预算。白皮书提出按锁仓数量、锁仓时间、会员凭证与持有时间计算权重。') }}</p>
          <p class="orb-formula"><code>{{ t('当期奖励池 × 个人权重 ÷ 全部有效权重') }}</code><ArrowUpRight :size="13" /></p>
        </div>

        <div class="orb-disclosure">
          <ShieldCheck :size="15" />
          <p>{{ t('草案参数可能调整；当前未部署质押、奖励池或会员 NFT 合约。奖励来自真实收入或事先公开的代币预算，不承诺固定 APY、收益、回购或代币价格。') }}</p>
          <button type="button" :aria-label="t('查看奖励规则说明')" @click="notify(t('质押与奖励采用动态参数，详见 WHITEPAPER.md 第 5 节'))"><Info :size="16" /></button>
        </div>
      </section>

      <section id="tokenomics" class="orb-scene orb-supply">
        <header class="orb-head">
          <p class="orb-kicker">TRF · PROPOSED TOKEN MODEL</p>
          <div class="orb-head-row">
            <h2 class="orb-h2">{{ t('机制先写清楚，') }}<br /><span class="orb-h2-glow">{{ t('再逐步验证。') }}</span></h2>
            <button class="orb-quiet" type="button" @click="notify(t('代币初始分配与解锁计划均为白皮书建议模型'))">{{ t('查看模型说明') }} <ArrowUpRight :size="14" /></button>
          </div>
          <p class="orb-sub">{{ t('白皮书初始模型用于讨论与测试，代币供给、分配和释放尚非已部署事实。') }}</p>
        </header>

        <div class="orb-total">
          <p class="orb-total-key">{{ t('建议初始总量') }}</p>
          <p class="orb-total-figure">1,000,000,000 <span>TRF</span></p>
          <p class="orb-total-note">{{ t('提案参数 · 尚未发行') }}</p>
        </div>

        <table class="orb-allocation">
          <tbody>
            <tr class="orb-alloc-row"><th scope="row"><span class="orb-swatch orb-swatch-1" aria-hidden="true"></span>{{ t('社区、质押与交易奖励') }}</th><td><span class="orb-bar" style="--pct: 30%" aria-hidden="true"></span>30%</td></tr>
            <tr class="orb-alloc-row"><th scope="row"><span class="orb-swatch orb-swatch-2" aria-hidden="true"></span>{{ t('金库与商品采购') }}</th><td><span class="orb-bar" style="--pct: 20%" aria-hidden="true"></span>20%</td></tr>
            <tr class="orb-alloc-row"><th scope="row"><span class="orb-swatch orb-swatch-3" aria-hidden="true"></span>{{ t('流动性与做市') }}</th><td><span class="orb-bar" style="--pct: 15%" aria-hidden="true"></span>15%</td></tr>
            <tr class="orb-alloc-row"><th scope="row"><span class="orb-swatch orb-swatch-4" aria-hidden="true"></span>{{ t('团队与核心贡献者') }}</th><td><span class="orb-bar" style="--pct: 15%" aria-hidden="true"></span>15%</td></tr>
            <tr class="orb-alloc-row"><th scope="row"><span class="orb-swatch orb-swatch-5" aria-hidden="true"></span>{{ t('生态与合作伙伴') }}</th><td><span class="orb-bar" style="--pct: 10%" aria-hidden="true"></span>10%</td></tr>
            <tr class="orb-alloc-row"><th scope="row"><span class="orb-swatch orb-swatch-6" aria-hidden="true"></span>{{ t('投资者与顾问') }}</th><td><span class="orb-bar" style="--pct: 10%" aria-hidden="true"></span>10%</td></tr>
          </tbody>
        </table>

        <div class="orb-allocation-foot">
          <span><LockKeyhole :size="13" />{{ t('团队代币：建议 12 个月 cliff + 36 个月线性释放') }}</span>
          <span>{{ t('多签与时间锁管理 · 草案建议') }}</span>
        </div>
      </section>

      <section id="roadmap" class="orb-scene orb-roadmap">
        <header class="orb-head">
          <p class="orb-kicker">FROM CONCEPT TO COMMUNITY</p>
          <div class="orb-head-row">
            <h2 class="orb-h2">{{ t('每一步，都经得起') }}<span class="orb-h2-glow">{{ t('检验。') }}</span></h2>
            <span class="orb-pill">DRAFT ROADMAP</span>
          </div>
          <p class="orb-sub">{{ t('路线图阶段是拟议方向；当前网站是产品交互预览。') }}</p>
        </header>

        <ol class="orb-phases">
          <li class="orb-phase orb-phase-now">
            <span class="orb-phase-no">PHASE 00</span>
            <div class="orb-phase-copy">
              <span class="orb-phase-state">{{ t('当前规划') }}</span>
              <h3>{{ t('机制设计与测试网') }}</h3>
              <p>{{ t('完善数据模型、代币经济模拟和合约规格；发布测试网前端并开展内部安全测试。') }}</p>
              <span class="orb-phase-tail">{{ t('产品与审计准备') }}</span>
            </div>
          </li>
          <li class="orb-phase">
            <span class="orb-phase-no">PHASE 01</span>
            <div class="orb-phase-copy">
              <span class="orb-phase-state">{{ t('规划中') }}</span>
              <h3>{{ t('Genesis 与凭证 NFT') }}</h3>
              <p>{{ t('测试 Genesis Pass、交易证明与社区任务，并验证质押和随机数机制。') }}</p>
              <span class="orb-phase-tail">{{ t('参与机制验证') }}</span>
            </div>
          </li>
          <li class="orb-phase">
            <span class="orb-phase-no">PHASE 02</span>
            <div class="orb-phase-copy">
              <span class="orb-phase-state">{{ t('规划中') }}</span>
              <h3>{{ t('市集 Alpha') }}</h3>
              <p>{{ t('邀请卖家试运行报价、托管、销毁视频提交、管理员审核与凭证铸造。') }}</p>
              <span class="orb-phase-tail">{{ t('小范围交易测试') }}</span>
            </div>
          </li>
          <li class="orb-phase">
            <span class="orb-phase-no">PHASE 03–04</span>
            <div class="orb-phase-copy">
              <span class="orb-phase-state">{{ t('后续阶段') }}</span>
              <h3>{{ t('奖励季与社区治理') }}</h3>
              <p>{{ t('按真实交易数据逐步开放奖池、质押奖励预算与社区参数提案。') }}</p>
              <span class="orb-phase-tail">{{ t('持续披露与共同治理') }}</span>
            </div>
          </li>
        </ol>
      </section>

      <section class="orb-scene orb-close">
        <span class="orb-close-orb"><img src="/brand/logo.svg" alt="" /></span>
        <p class="orb-kicker">A MARKET BUILT FOR COLLECTORS</p>
        <h2 class="orb-close-title">{{ t('藏得认真，') }}<span class="orb-h2-glow">{{ t('就该有迹可循。') }}</span></h2>
        <p class="orb-close-line">{{ t('从一件实物开始，让每一次交易都留下清楚的来历。') }}</p>
        <button class="orb-cta orb-cta-wide" type="button" @click="scrollToSection('market')">{{ t('探索示例市集') }} <ArrowRight :size="16" /></button>
        <ul class="orb-trust">
          <li><span class="orb-led orb-led-a" aria-hidden="true"></span>{{ t('实物先行') }}</li>
          <li><span class="orb-led orb-led-b" aria-hidden="true"></span>{{ t('交易有据') }}</li>
          <li><span class="orb-led orb-led-c" aria-hidden="true"></span>{{ t('社区共建') }}</li>
        </ul>
        <a class="orb-follow" href="https://x.com/keepora" target="_blank" rel="noreferrer" aria-label="Follow @keepora on X">
          <X :size="14" stroke-width="2.5" />
          <span>FOLLOW @KEEPORA ON X</span>
          <ExternalLink :size="10" />
        </a>
      </section>
    </main>

    <footer class="orb-foot">
      <div class="orb-foot-brand">
        <a class="orb-lockup" href="#top" aria-label="Keepora.xyz" @click.prevent="scrollToSection('top')">
          <img class="orb-lockup-mark" src="/brand/logo.svg" alt="" />
          <span class="orb-lockup-type">
            <span class="orb-wordmark">keepora<span class="orb-wordmark-tld">.xyz</span></span>
            <span class="orb-motto">COLLECT WITH CONTEXT.</span>
          </span>
        </a>
        <p class="orb-foot-line">{{ t('为实物藏品而设计的 Solana 二手市集。') }}<br /><span>Collect with context.</span></p>
      </div>
      <div class="orb-foot-links">
        <a href="#market" @click.prevent="scrollToSection('market')">{{ t('藏品市集') }}</a>
        <a href="#protocol" @click.prevent="scrollToSection('protocol')">{{ t('交易保障') }}</a>
        <a href="#rewards" @click.prevent="scrollToSection('rewards')">{{ t('质押模型') }}</a>
        <a href="#roadmap" @click.prevent="scrollToSection('路线图')">{{ t('路线图') }}</a>
      </div>
      <div class="orb-foot-legal">
        <span>© 2026 Keepora.xyz · Independent collector marketplace</span>
        <span>{{ t('不是任何商品品牌的官方商城或授权销售渠道。') }}</span>
      </div>
      <div class="orb-foot-disclaimer"><Info :size="12" /><span>{{ t('TRF、NFT 与实体商品的具体关系以正式用户协议和订单规则为准。任何奖励均受真实平台收入与治理预算约束，不构成固定收益或投资回报承诺。') }}</span></div>
      <div class="orb-foot-credits">
        <span>{{ t('演示图片来源与许可：') }}</span>
        <a href="https://commons.wikimedia.org/wiki/File:Dunny_vinyl_figure_which_portrays_a_dragon_embroidered_on_a_silk_brocade_door_valance_and_side_panels_(Chinese,_17th-18th_century)_in_The_MET_collection.jpg" target="_blank" rel="noreferrer">Dunny · CC BY-SA 4.0</a>
        <a href="https://commons.wikimedia.org/wiki/File:Molly_(art_toy).jpg" target="_blank" rel="noreferrer">Molly · CC0</a>
        <a href="https://commons.wikimedia.org/wiki/File:HOOTLUM_vinyl_art_figure_(white_edition).jpg" target="_blank" rel="noreferrer">Hootlum · CC BY-SA 4.0</a>
        <a href="https://commons.wikimedia.org/wiki/File:KanColle_Nendoroid_-_Kirishima.jpg" target="_blank" rel="noreferrer">Nendoroid · CC BY 2.0</a>
        <a href="https://commons.wikimedia.org/wiki/File:Nendoroid_Collection.jpg" target="_blank" rel="noreferrer">{{ t('收藏组合') }} · CC BY-SA 2.0</a>
      </div>
    </footer>

    <nav class="orb-dock" :aria-label="t('主要导航')">
      <a class="orb-dock-link" href="#market" @click.prevent="scrollToSection('market')"><Box :size="15" /><span>{{ t('藏品市集') }}</span></a>
      <a class="orb-dock-link" href="#protocol" @click.prevent="scrollToSection('protocol')"><ShieldCheck :size="15" /><span>{{ t('交易保障') }}</span></a>
      <a class="orb-dock-link" href="#rewards" @click.prevent="scrollToSection('rewards')"><Coins :size="15" /><span>{{ t('质押与奖励') }}</span></a>
      <a class="orb-dock-link" href="#roadmap" @click.prevent="scrollToSection('roadmap')"><Clock3 :size="15" /><span>{{ t('路线图') }}</span></a>
      <button class="orb-dock-menu" type="button" :aria-expanded="mobileMenuOpen" :aria-label="mobileMenuOpen ? t('关闭菜单') : t('打开菜单')" @click="mobileMenuOpen = !mobileMenuOpen">
        <X v-if="mobileMenuOpen" :size="17" />
        <Menu v-else :size="17" />
      </button>
    </nav>

    <nav v-if="mobileMenuOpen" class="orb-sheet" :aria-label="t('移动导航')">
      <a href="#market" @click.prevent="scrollToSection('market')">{{ t('藏品市集') }} <ArrowRight :size="14" /></a>
      <a href="#protocol" @click.prevent="scrollToSection('protocol')">{{ t('交易保障') }} <ArrowRight :size="14" /></a>
      <a href="#rewards" @click.prevent="scrollToSection('rewards')">{{ t('质押与奖励') }} <ArrowRight :size="14" /></a>
      <a href="#roadmap" @click.prevent="scrollToSection('roadmap')">{{ t('路线图') }} <ArrowRight :size="14" /></a>
      <button type="button" @click="showWalletPanel = true; mobileMenuOpen = false"><WalletCards :size="15" /> {{ t('连接钱包') }}</button>
    </nav>

    <Transition name="modal-fade">
      <div v-if="activeListing" class="orb-overlay" @mousedown.self="closeDialogs">
        <section class="orb-dialog" role="dialog" aria-modal="true" :aria-label="`${listingText(activeListing, 'name')} ${t('详情')}`">
          <div class="orb-dialog-bar">
            <span class="orb-dialog-code">DEMO ITEM / {{ activeListing.id }}</span>
            <button class="orb-x" type="button" :aria-label="t('关闭')" @click="closeDialogs"><X :size="18" /></button>
          </div>

          <div class="orb-dialog-body">
            <div class="orb-dialog-media">
              <figure class="orb-dialog-frame">
                <img :src="activeListing.image" :alt="listingText(activeListing, 'imageAlt')" />
                <figcaption class="orb-dialog-caption">{{ t('商品图片 · 演示来源') }}</figcaption>
              </figure>
              <p class="orb-credit"><Image :size="13" /><span>{{ t('摄影') }} <a :href="activeListing.creditUrl" target="_blank" rel="noreferrer">{{ activeListing.credit }} <ExternalLink :size="10" /></a> · {{ activeListing.license }}</span></p>
            </div>

            <div class="orb-dialog-copy">
              <template v-if="!showCheckout">
                <div class="orb-dialog-head">
                  <p class="orb-overline"><span class="orb-dot" aria-hidden="true"></span>{{ t('原型藏品') }}</p>
                  <h2>{{ listingText(activeListing, 'name') }}</h2>
                  <p>{{ listingText(activeListing, 'subtitle') }}</p>
                </div>
                <div class="orb-price">
                  <span class="orb-price-key">{{ t('示例报价 · 非实时价格') }}</span>
                  <strong>{{ activeListing.price.toLocaleString('en-US') }} <small>TRF</small></strong>
                  <span class="orb-price-fiat">{{ t('市场和法币参考价格尚未接入') }}</span>
                </div>
                <div class="orb-tabs" role="tablist">
                  <button class="orb-tab" :class="{ 'orb-tab-on': dialogTab === 'item' }" type="button" role="tab" :aria-selected="dialogTab === 'item'" @click="dialogTab = 'item'">{{ t('藏品详情') }}</button>
                  <button class="orb-tab" :class="{ 'orb-tab-on': dialogTab === 'proof' }" type="button" role="tab" :aria-selected="dialogTab === 'proof'" @click="dialogTab = 'proof'">{{ t('凭证记录') }}</button>
                </div>
                <div v-if="dialogTab === 'item'" class="orb-pane">
                  <p class="orb-condition"><span class="orb-state" aria-hidden="true"></span><span>{{ listingText(activeListing, 'condition') }}</span><span class="orb-sep" aria-hidden="true"></span><span>{{ listingText(activeListing, 'edition') }}</span></p>
                  <dl class="orb-fact-sheet">
                    <div><dt>{{ t('商品系列') }}</dt><dd>{{ listingText(activeListing, 'name') }}</dd></div>
                    <div><dt>{{ t('资料审核') }}</dt><dd>{{ activeListing.verified ? t('概念演示状态') : t('尚无审核记录') }}</dd></div>
                    <div><dt>{{ t('交易网络') }}</dt><dd>Solana · {{ t('未来支持') }}</dd></div>
                  </dl>
                  <div class="orb-notice"><ShieldCheck :size="15" /><p>{{ t('真实交易需在售出后提交销毁视频，由系统管理员审核通过后生成 NFT；本页面藏品图片仅作界面示意。') }}</p></div>
                </div>
                <div v-else class="orb-pane orb-history">
                  <div class="orb-history-step"><span class="orb-history-icon orb-hi-a"><Image :size="14" /></span><span><strong>{{ t('照片来源已注明') }}</strong><small>Wikimedia Commons · {{ activeListing.license }}</small></span><BadgeCheck :size="14" /></div>
                  <div class="orb-history-step"><span class="orb-history-icon orb-hi-b"><PackageCheck :size="14" /></span><span><strong>{{ t('购买凭证与鉴定资料') }}</strong><small>{{ t('正式商品上架时由卖家提交') }}</small></span><Clock3 :size="14" /></div>
                  <div class="orb-history-step"><span class="orb-history-icon orb-hi-c"><Video :size="14" /></span><span><strong>{{ t('销毁视频凭证') }}</strong><small>{{ t('卖出后由卖家拍摄并提交，等待系统管理员审核') }}</small></span><Clock3 :size="14" /></div>
                  <div class="orb-history-step"><span class="orb-history-icon orb-hi-d"><ShieldCheck :size="14" /></span><span><strong>{{ t('管理员审核状态') }}</strong><small>{{ t('销毁完成 · 待管理员审核') }}</small></span><Clock3 :size="14" /></div>
                  <div class="orb-history-step"><span class="orb-history-icon orb-hi-e"><Sparkles :size="14" /></span><span><strong>{{ t('Item NFT 与交易历史') }}</strong><small>{{ t('审核通过后生成 NFT，永久记录在 Solana 链上') }}</small></span><Clock3 :size="14" /></div>
                </div>
                <div class="orb-dialog-actions">
                  <button class="orb-buy" type="button" @click="showCheckout = true">{{ t('预览订单费用') }} <ArrowRight :size="16" /></button>
                  <button class="orb-fav" type="button" :aria-label="favorites.has(activeListing.id) ? t('移出收藏') : t('加入收藏')" @click="toggleFavorite(activeListing.id)"><Heart :size="17" :fill="favorites.has(activeListing.id) ? 'currentColor' : 'none'" /></button>
                </div>
                <p class="orb-action-note"><Info :size="12" />{{ t('预览不会扣款、签名或创建链上订单') }}</p>
              </template>

              <template v-else>
                <button class="orb-back" type="button" @click="showCheckout = false"><ArrowRight class="orb-back-arrow" :size="14" /> {{ t('返回藏品详情') }}</button>
                <div class="orb-dialog-head">
                  <p class="orb-overline"><span>ORDER PREVIEW</span><span class="orb-dot" aria-hidden="true"></span>{{ t('本地试算') }}</p>
                  <h2>{{ t('费用明细') }}</h2>
                  <p>{{ listingText(activeListing, 'name') }} · {{ t('不会创建实际订单') }}</p>
                </div>
                <div class="orb-ledger">
                  <div><span>{{ t('藏品价格') }} <small>{{ t('演示报价') }}</small></span><strong>{{ activeListing.price.toLocaleString('en-US') }} TRF</strong></div>
                  <div><span>{{ t('市场服务费') }} <small>{{ t('建议比例 · 10%') }}</small></span><strong>{{ Math.round(activeListing.price * 0.1).toLocaleString('en-US') }} TRF</strong></div>
                  <div class="orb-ledger-total"><span>{{ t('试算合计') }} <small>{{ t('服务费用未计入') }}</small></span><strong>{{ Math.round(activeListing.price * 1.1).toLocaleString('en-US') }} <small>TRF</small></strong></div>
                </div>
                <div class="orb-escrow"><LockKeyhole :size="15" /><div><strong>{{ t('订单托管为白皮书拟议流程') }}</strong><span>{{ t('真实交易需等待钱包、订单合约、销毁视频审核与 NFT 铸造机制接入。') }}</span></div></div>
                <button class="orb-buy orb-buy-quiet" type="button" @click="notify(t('预览完成：尚未签名、扣款或提交订单'))">{{ t('完成费用预览') }} <Check :size="15" /></button>
                <p class="orb-action-note"><Info :size="12" />{{ t('市场 10% 服务费为白皮书初始建议比例，尚未实施') }}</p>
              </template>
            </div>
          </div>
        </section>
      </div>
    </Transition>

    <Transition name="modal-fade">
      <div v-if="showSellerPanel" class="orb-overlay" @mousedown.self="closeDialogs">
        <section class="orb-panel" role="dialog" aria-modal="true" aria-labelledby="seller-dialog-title">
          <div class="orb-panel-bar">
            <span class="orb-panel-mark"><PackageCheck :size="16" /></span>
            <span class="orb-tiny">SELLER READINESS</span>
            <button class="orb-x" type="button" :aria-label="t('关闭')" @click="closeDialogs"><X :size="18" /></button>
          </div>
          <h2 id="seller-dialog-title">{{ t('每件上架，都有准备。') }}</h2>
          <p class="orb-panel-lede">{{ t('未来开放上架前，卖家需要准备以下商品资料：') }}</p>
          <ol class="orb-checklist">
            <li><span class="orb-check-no">01</span><span><strong>{{ t('商品本体与高清照片') }}</strong><small>{{ t('清楚记录各角度、配件与包装') }}</small></span><Check :size="15" /></li>
            <li><span class="orb-check-no">02</span><span><strong>{{ t('购买凭证与序列信息') }}</strong><small>{{ t('平台或合作鉴定方审核后建立档案') }}</small></span><Check :size="15" /></li>
            <li><span class="orb-check-no">03</span><span><strong>{{ t('售出后拍摄完整销毁视频') }}</strong><small>{{ t('视频需覆盖实物销毁全过程，并提交视频哈希与时间戳') }}</small></span><Check :size="15" /></li>
            <li><span class="orb-check-no">04</span><span><strong>{{ t('报价、时限与履约保证金') }}</strong><small>{{ t('拟以 TRF 报价，并在售出后按规则完成销毁') }}</small></span><Check :size="15" /></li>
          </ol>
          <div class="orb-panel-note"><Info :size="14" /><span>{{ t('卖家认证、销毁视频提交和管理员审核功能尚未接入。此清单仅供浏览，不会收集或提交信息。') }}</span></div>
          <button class="orb-cta orb-panel-cta" type="button" @click="closeDialogs">{{ t('了解') }} <ArrowRight :size="15" /></button>
        </section>
      </div>
    </Transition>

    <Transition name="modal-fade">
      <div v-if="showWalletPanel" class="orb-overlay" @mousedown.self="closeDialogs">
        <section class="orb-panel" role="dialog" aria-modal="true" aria-labelledby="wallet-dialog-title">
          <div class="orb-panel-bar">
            <span class="orb-panel-mark"><img src="/brand/logo.svg" alt="" /></span>
            <span class="orb-tiny">WALLET CONNECTION</span>
            <button class="orb-x" type="button" :aria-label="t('关闭')" @click="closeDialogs"><X :size="18" /></button>
          </div>
          <h2 id="wallet-dialog-title">{{ t('钱包接入尚在规划。') }}</h2>
          <p class="orb-panel-lede">{{ t('这是 Keepora.xyz 的产品交互预览。连接钱包、链上支付、NFT 铸造和质押操作暂未启用。') }}</p>
          <p class="orb-network"><span class="orb-network-led" aria-hidden="true"></span>{{ t('目标网络') }} <strong>Solana</strong><span class="orb-network-dev">{{ t('待集成') }}</span></p>
          <button class="orb-cta orb-panel-cta" type="button" @click="closeDialogs">{{ t('返回浏览') }} <ArrowRight :size="15" /></button>
        </section>
      </div>
    </Transition>

    <Transition name="toast">
      <div v-if="toastMessage" class="orb-toast"><span class="orb-toast-led" aria-hidden="true"></span>{{ toastMessage }}<button :aria-label="t('关闭提示')" type="button" @click="toastMessage = ''"><X :size="13" /></button></div>
    </Transition>
  </div>
</template>
