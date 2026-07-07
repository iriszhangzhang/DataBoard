# 提示词：生成 DataBoard 数据看板项目（工程级强化版）

> 将以下全部内容复制发送给 AI（Claude / ChatGPT / DeepSeek 等），即可生成一个完整、可运行、工程级的教学数据大屏项目。


## 项目背景

你是一个资深前端工程师和数据大屏专家。请帮我生成一个名为 **DataBoard（数据看板）** 的开源教学级数据可视化大屏项目。

**项目定位**：面向零基础学习者，从 0 到 1 完整演示数据大屏搭建全流程。代码需同时满足“教学友好”（清晰注释）和“工程规范”（模块化、可扩展）两个标准。

**技术栈**：Vue 3 + Vite + JavaScript + ECharts 5 + Pinia + Vue Router 4

**核心要求**：
1. 所有代码完整可运行，执行 `npm install && npm run dev` 即可在浏览器中看到大屏页面
2. 数据与视图分离，使用 Mock 数据驱动，且预留真实 API 切换能力
3. 页面为深色科技风数据大屏，包含统计卡片 + 3 种以上图表
4. 代码结构模块化，按业务领域组织，包含日志系统、自动刷新、响应式适配
5. 包含完整的工程化配置（ESLint + Prettier + Vitest + Playwright + Husky）
6. 代码中包含中文注释，方便零基础学习者理解


## 一、项目目录结构

请严格按照以下目录结构生成所有文件：

```
DataBoard/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── LICENSE
├── .gitignore
├── .eslintrc.cjs
├── .prettierrc
├── .husky/
│   └── pre-commit
├── .env
├── .env.example
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── router/
│   │   └── index.js
│   ├── stores/
│   │   └── dashboardStore.js
│   ├── modules/
│   │   └── overview/
│   │       ├── views/
│   │       │   └── OverviewView.vue
│   │       ├── components/
│   │       │   ├── Header.vue
│   │       │   ├── StatCard.vue
│   │       │   └── ChartCard.vue
│   │       ├── services/
│   │       │   ├── request.js
│   │       │   └── dashboardService.js
│   │       ├── mocks/
│   │       │   └── dashboardMock.js
│   │       ├── utils/
│   │       │   └── chartHelper.js
│   │       └── types/
│   │           └── dashboard.d.ts
│   ├── common/
│   │   ├── logs/
│   │   │   └── logger.js
│   │   ├── styles/
│   │   │   └── global.css
│   │   └── composables/
│   │       └── useAutoRefresh.js
│   └── assets/
│       └── (空)
├── tests/
│   ├── unit/
│   │   └── logger.test.js
│   └── e2e/
│       └── dashboard.spec.js
└── .vscode/
    └── settings.json
```


## 二、数据定义与 Mock 层

### 1. 数据类型定义（src/modules/overview/types/dashboard.d.ts）

请定义以下 TypeScript 类型（使用 JSDoc 注释，方便 JS 项目获得类型提示）：

```typescript
/**
 * @typedef {Object} StatItem
 * @property {string} label - 指标名称
 * @property {string} value - 指标数值
 * @property {string} icon - 图标（emoji）
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
```

### 2. Mock 数据（src/modules/overview/mocks/dashboardMock.js）

生成与上述类型完全一致的 Mock 数据，包含：
- 4 个核心指标（总销售额、订单总数、用户数量、转化率）
- 12 个月度销售数据（1月-12月）
- 8 周趋势数据（第1周-第8周）
- 5 个品类分布数据（电子产品、服装服饰、食品饮料、家居用品、其他）

### 3. 请求层（src/modules/overview/services/request.js）

生成 Axios 封装，包含：
- 根据 `import.meta.env.VITE_USE_MOCK` 环境变量自动切换数据源
- 请求/响应拦截器，自动记录日志
- 统一错误处理

```javascript
// 伪代码示例
const isMock = import.meta.env.VITE_USE_MOCK === 'true'

export const fetchDashboardData = async () => {
  if (isMock) {
    const mock = await import('../mocks/dashboardMock.js')
    return mock.default
  }
  const { data } = await request.get('/dashboard')
  return data
}
```

### 4. 数据服务（src/modules/overview/services/dashboardService.js）

封装业务数据获取逻辑，供组件调用。


## 三、日志系统（src/common/logs/logger.js）

生成一个完整的日志工具，支持：
- `logger.debug(msg, meta)` - 调试信息
- `logger.info(msg, meta)` - 一般信息
- `logger.warn(msg, meta)` - 警告
- `logger.error(msg, meta)` - 错误

要求：
- 开发环境（`import.meta.env.DEV`）输出到 console
- 生产环境可扩展为发送到日志平台
- 每条日志包含时间戳和级别


## 四、状态管理（src/stores/dashboardStore.js）

使用 Pinia 管理大屏全局状态：
- state：`dashboardData`、`loading`、`error`、`lastUpdateTime`
- actions：`fetchDashboardData()` - 获取数据并更新状态
- getters：`stats`、`salesData`、`trendData`、`categoryData`


## 五、自动刷新（src/common/composables/useAutoRefresh.js）

生成一个 Vue Composable：
- 参数：`fetchFn`（数据获取函数）、`interval`（刷新间隔，默认 30000ms）
- 返回值：`{ data, loading, error, refresh }`
- 组件挂载时自动开始刷新，卸载时清理定时器
- 每次刷新时记录日志


## 六、图表工具（src/modules/overview/utils/chartHelper.js）

生成 3 个 ECharts 配置生成函数，所有配置适配深色主题：

### 1. getBarChartOption(data, xKey, yKey)
- 柱状图，渐变色（蓝青），圆角
- 适配深色背景（轴标签颜色 #a8b2c9，分割线半透明）

### 2. getLineChartOption(data, xKey, yKey)
- 折线图，平滑曲线，面积渐变填充
- 适配深色背景

### 3. getPieChartOption(data, nameKey, valueKey)
- 环形饼图（半径 50%-70%），带标签和百分比
- 配色方案：科技感蓝青紫渐变色板


## 七、组件文件

### 1. Header.vue（src/modules/overview/components/Header.vue）
- Props：`title`、`subtitle`、`currentTime`
- 标题使用渐变文字效果（#4facfe → #00f2fe）
- 右上角显示当前实时时间（每秒更新）
- 毛玻璃效果底部边框

### 2. StatCard.vue（src/modules/overview/components/StatCard.vue）
- Props：`label`、`value`、`icon`
- 毛玻璃卡片效果（背景 rgba(255,255,255,0.04)，边框 rgba(255,255,255,0.08)）
- 数值大字显示，带轻微动画（数字变化时过渡）

### 3. ChartCard.vue（src/modules/overview/components/ChartCard.vue）
- Props：`title`、`option`
- 包含 ECharts 容器
- 自动初始化图表
- 监听 `option` 变化更新图表
- 监听窗口 resize 自适应
- 使用 `nextTick` 确保 DOM 渲染完成


## 八、主视图（src/modules/overview/views/OverviewView.vue）

组装以下区块：
1. **顶部**：Header 组件（传入 title、subtitle、currentTime）
2. **统计卡片行**：4 个 StatCard 组件（从 store 获取 stats 数据）
3. **图表区域**：网格布局，3 列
   - 左：柱状图（月度销售趋势）
   - 中：折线图（周度趋势）
   - 右：饼图（品类分布）

要求：
- 使用 Pinia store 获取数据
- 使用 `useAutoRefresh` 实现数据自动刷新
- 加载状态显示 Loading 效果
- 错误状态显示错误提示
- 数据更新时间显示在页面底部


## 九、根组件（src/App.vue）

- 引入全局样式
- 使用 RouterView 渲染路由
- 设置根节点 ID 为 `app`


## 十、路由配置（src/router/index.js）

- 创建路由实例，使用 `createRouter` + `createWebHistory`
- 配置 `/` 路径指向 OverviewView
- 导出路由实例


## 十一、全局样式（src/common/styles/global.css）

- 全局重置（margin:0，padding:0，box-sizing:border-box）
- 深色主题背景（#0b0f1a）
- 字体设置（PingFang SC、Microsoft YaHei）
- 毛玻璃卡片样式类 `.glass-card`
- 网格布局样式类 `.chart-grid`
- 滚动条美化（暗色风格）
- 响应式适配：以 1920×1080 为设计基准，使用 `transform: scale()` 适配 1366×768 屏幕


## 十二、响应式适配方案

在 `App.vue` 或 `global.css` 中实现：
- 设计基准：1920×1080
- 当窗口宽度 < 1366px 时，整体缩放适配
- 使用 `transform: scale()` 方案，保持比例


## 十三、配置文件

### 1. package.json

```json
{
  "name": "databoard",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --fix",
    "format": "prettier . --write",
    "test": "vitest",
    "test:e2e": "playwright test",
    "prepare": "husky"
  },
  "dependencies": {
    "echarts": "^5.4.3",
    "pinia": "^2.1.7",
    "vue": "^3.4.0",
    "vue-router": "^4.2.5"
  },
  "devDependencies": {
    "@playwright/test": "^1.40.0",
    "@vitejs/plugin-vue": "^5.0.0",
    "@vue/eslint-config-prettier": "^9.0.0",
    "eslint": "^8.55.0",
    "eslint-plugin-vue": "^9.19.2",
    "husky": "^9.0.0",
    "prettier": "^3.1.0",
    "vite": "^5.0.0",
    "vitest": "^1.0.0"
  }
}
```

### 2. vite.config.js
- 配置 Vue 插件
- 设置端口 5173，自动打开浏览器
- 配置别名 `@` 指向 `src`

### 3. .eslintrc.cjs
- 使用 `plugin:vue/vue3-recommended` 和 `@vue/eslint-config-prettier`
- 关闭 `vue/multi-word-component-names`（教学项目允许）

### 4. .prettierrc
```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100
}
```

### 5. index.html
- 标准 HTML5 模板
- 语言设置为 `zh-CN`
- 引入 `main.js`

### 6. .env 和 .env.example
```env
VITE_USE_MOCK=true
VITE_API_BASE_URL=
```

### 7. .gitignore
忽略：`node_modules/`、`.vscode/`、`.idea/`、`dist/`、`*.log`、`.DS_Store`、`Thumbs.db`


## 十四、测试文件

### 1. 单元测试（tests/unit/logger.test.js）
- 测试 `logger.info` 能正常调用
- 测试 `logger.error` 能正常调用
- 测试日志包含时间戳

### 2. E2E 测试（tests/e2e/dashboard.spec.js）
- 使用 Playwright 打开页面 `http://localhost:5173`
- 验证页面标题包含 "DataBoard" 或 "数据看板"
- 验证至少一个 `.stat-card` 元素存在
- 验证至少一个 `.chart-container` 元素存在
- 验证控制台无严重错误


## 十五、README.md

包含：
- 项目标题和徽章
- 项目简介
- 技术栈列表
- 项目结构说明
- 快速开始（克隆、安装、运行）
- 环境变量说明
- 学习路线（6 个阶段）
- 测试说明
- 开源协议（MIT）


## 十六、LICENSE

MIT 协议，版权持有人：**iriszhangzhang**


## 十七、最终验收标准

生成完成后，请确认：

- [ ] 所有文件已生成，目录结构完整
- [ ] `npm install` 可正常安装依赖
- [ ] `npm run dev` 可启动开发服务器，浏览器自动打开
- [ ] 页面显示深色主题数据大屏
- [ ] 顶部显示标题 + 副标题 + 当前时间
- [ ] 4 个统计卡片显示正常
- [ ] 3 个图表（柱状图、折线图、饼图）正常渲染
- [ ] 控制台无严重错误
- [ ] `npm run lint` 无报错
- [ ] `npm run test` 通过
- [ ] 日志系统在控制台输出 info/warn/error 日志
- [ ] 数据每 30 秒自动刷新一次


## 十八、交付说明

请生成以上完整项目代码。用户只需执行以下命令即可运行：

```bash
npm install
npm run dev
```

浏览器将自动打开 `http://localhost:5173` 展示大屏页面。


**提示词结束**


## 使用说明

1. 复制上述全部提示词
2. 发送给 AI（推荐 Claude 3.5 Sonnet / DeepSeek / ChatGPT-4）
3. AI 将生成完整的工程级项目代码
4. 将代码保存到本地 `DataBoard` 目录
5. 执行 `npm install && npm run dev`
6. 浏览器自动打开，展示数据大屏页面


