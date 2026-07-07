/**
 * Dashboard Mock 数据
 * 数据结构与真实 API 保持一致
 */

export const stats = [
  { label: '总销售额', value: '¥ 1,286', icon: '📊', trend: '+12.5%' },
  { label: '订单总数', value: '3,842', icon: '📦', trend: '+8.2%' },
  { label: '用户数量', value: '9,531', icon: '👥', trend: '+5.4%' },
  { label: '转化率', value: '23.8%', icon: '📈', trend: '-1.2%' },
]

export const title = 'DataBoard · 数据看板'
export const subtitle = '开源教学级数据可视化大屏项目'

export const salesData = [
  { month: '1月', value: 120 },
  { month: '2月', value: 200 },
  { month: '3月', value: 150 },
  { month: '4月', value: 180 },
  { month: '5月', value: 90 },
  { month: '6月', value: 220 },
  { month: '7月', value: 260 },
  { month: '8月', value: 300 },
  { month: '9月', value: 280 },
  { month: '10月', value: 340 },
  { month: '11月', value: 380 },
  { month: '12月', value: 420 },
]

export const trendData = [
  { week: '第1周', value: 30 },
  { week: '第2周', value: 45 },
  { week: '第3周', value: 28 },
  { week: '第4周', value: 52 },
  { week: '第5周', value: 38 },
  { week: '第6周', value: 60 },
  { week: '第7周', value: 43 },
  { week: '第8周', value: 55 },
  { week: '第9周', value: 48 },
  { week: '第10周', value: 62 },
  { week: '第11周', value: 35 },
  { week: '第12周', value: 58 },
]

export const categoryData = [
  { name: '电子产品', value: 35 },
  { name: '服装服饰', value: 25 },
  { name: '食品饮料', value: 20 },
  { name: '家居用品', value: 15 },
  { name: '其他', value: 5 },
]

export default {
  title,
  subtitle,
  stats,
  salesData,
  trendData,
  categoryData,
}
