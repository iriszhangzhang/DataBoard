/**
 * @typedef {Object} StatItem
 * @property {string} label - 指标名称
 * @property {string} value - 指标数值
 * @property {string} icon - 图标（emoji）
 * @property {string} trend - 环比趋势
 */

/**
 * @typedef {Object} TrendDataItem
 * @property {string} month - 月份
 * @property {number} value - 数值
 */

/**
 * @typedef {Object} CategoryDataItem
 * @property {string} name - 分类名称
 * @property {number} value - 数值
 */

/**
 * @typedef {Object} DashboardData
 * @property {string} title - 大屏标题
 * @property {string} subtitle - 大屏副标题
 * @property {StatItem[]} stats - 核心指标数组
 * @property {TrendDataItem[]} salesData - 月度销售数据
 * @property {TrendDataItem[]} trendData - 周度趋势数据
 * @property {CategoryDataItem[]} categoryData - 品类分布数据
 */
