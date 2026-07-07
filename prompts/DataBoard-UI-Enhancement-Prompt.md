# 提示词：DataBoard UI 美化与视觉升级（商业级）

> 将以下全部内容复制发送给 AI（Claude / ChatGPT / DeepSeek 等），即可获得完整的前端界面美化方案和代码。
> 本提示词基于工程级强化版，在保持模块化、可扩展的基础上，提升视觉专业度和科技感，达到阿里云 DataV、腾讯云可视化级别的商业产品质感。


## 项目背景

你是一个资深 UI/UX 设计师兼前端工程师。请帮我美化一个已有的 **DataBoard（数据看板）** 项目。

**技术栈**：Vue 3 + Vite + JavaScript + ECharts 5 + Pinia + Vue Router 4

**现有代码结构**（保持不变，只改样式和动效）：
```
src/
├── modules/overview/
│   ├── components/     # Header.vue, StatCard.vue, ChartCard.vue
│   ├── views/          # OverviewView.vue
│   ├── utils/          # chartHelper.js
│   └── mocks/          # dashboardMock.js
├── common/
│   ├── styles/         # global.css
│   ├── logs/           # logger.js
│   └── composables/    # useAutoRefresh.js
├── stores/             # dashboardStore.js
└── router/             # index.js
```

**目标**：
- 视觉达到商业级数据大屏标准（参考：阿里云 DataV、腾讯云、Grafana、Azure Dashboard）
- 增强科技感：深色主题 + 发光边缘 + 毛玻璃 + 微交互
- 保持教学友好：代码清晰、中文注释、结构不变

**强制约束（必须严格遵守）**：
1. `ChartCard.vue` 当前使用原生 `echarts.init()` 初始化，**禁止**改用 `vue-echarts` 组件或 `<v-chart>`，保持现有实现方式不变。
2. 当前项目未安装 `countup.js` 和 `@vueuse/core`，`useCountUp` 和 `useAnimation` **必须手写实现**，禁止新增 npm 依赖。
3. `global.css` 顶部必须通过 `@import './tokens.css';` 引入设计令牌，所有组件样式统一引用 CSS 变量，禁止硬编码颜色/间距值。


## 美化要求

### 1. 设计令牌系统（Design Tokens）

请创建/更新 `src/common/styles/tokens.css`，将所有设计变量定义为 CSS 自定义属性，便于全局复用：

```css
:root {
  /* 品牌色 */
  --color-primary: #4facfe;
  --color-primary-dark: #3b8fd9;
  --color-secondary: #00f2fe;
  
  /* 语义色 */
  --color-success: #00d4aa;
  --color-warning: #fbbf24;
  --color-danger: #f87171;
  --color-info: #60a5fa;
  
  /* 背景色阶 */
  --bg-page: #0b0f1a;
  --bg-page-gradient: linear-gradient(135deg, #0b0f1a 0%, #141b2d 100%);
  --bg-card: rgba(255, 255, 255, 0.04);
  --bg-card-hover: rgba(255, 255, 255, 0.08);
  --bg-card-glow: rgba(79, 172, 254, 0.1);
  
  /* 文字色阶 */
  --text-primary: #ffffff;
  --text-secondary: #e2e8f0;
  --text-body: #94a3b8;
  --text-muted: #64748b;
  
  /* 边框 */
  --border-default: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(79, 172, 254, 0.4);
  --border-glow: rgba(79, 172, 254, 0.3);
  
  /* 字体 */
  --font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', -apple-system, sans-serif;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 20px;
  --font-size-2xl: 24px;
  --font-size-3xl: 28px;
  --font-size-4xl: 32px;
  
  /* 字重 */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* 间距 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 12px;
  --spacing-lg: 16px;
  --spacing-xl: 20px;
  --spacing-2xl: 24px;
  --spacing-3xl: 32px;
  --spacing-4xl: 40px;
  
  /* 圆角 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  
  /* 阴影 */
  --shadow-card: 0 8px 32px rgba(0, 0, 0, 0.4);
  --shadow-card-hover: 0 12px 48px rgba(0, 0, 0, 0.6);
  --shadow-glow: 0 0 30px rgba(79, 172, 254, 0.15);
  --shadow-glow-strong: 0 0 50px rgba(79, 172, 254, 0.25);
  
  /* 动效时长 */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-chart: 1200ms;
  
  /* 缓动函数 */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

**要求**：
- 所有组件/样式必须引用这些 CSS 变量，禁止硬编码颜色/间距值
- 在 `global.css` 顶部 `@import` 或 `@layer` 引入 tokens.css


### 2. 背景升级（重点）

当前页面背景是纯色 `#0b0f1a`，请升级为三层叠加：

**层级 1：深空渐变**
```css
background: linear-gradient(135deg, #0b0f1a 0%, #141b2d 100%);
```

**层级 2：径向发光（Radial Glow）**
```css
/* 在背景中增加 2-3 个径向渐变光斑，模拟环境光 */
background-image:
  radial-gradient(ellipse 80% 50% at 20% 40%, rgba(79, 172, 254, 0.08), transparent),
  radial-gradient(ellipse 60% 40% at 80% 60%, rgba(0, 242, 254, 0.06), transparent);
```

**层级 3：网格暗纹（Grid Pattern）**
```css
/* 使用 SVG data URI 或 CSS 渐变实现极淡的网格 */
background-image:
  linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
background-size: 60px 60px;
```

**可选：Noise 纹理**
```css
/* 使用 base64 编码的噪点 SVG 叠加，opacity: 0.03 ~ 0.05 */
```

**实现位置**：在 `body` 或 `#app` 的 `::before` 伪元素上叠加，避免影响内容交互。


### 3. 卡片美化（玻璃拟态 + 扫描光）

**当前效果**：半透明背景 + 边框
**目标效果**：毛玻璃 + 边缘发光 + 扫描光

```css
.glass-card {
  background: var(--bg-card);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  position: relative;
  overflow: hidden;
  transition: all var(--duration-normal) var(--ease-out);
}

/* 扫描光效果：Hover 时从左到右扫过一道光 */
.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.05),
    rgba(79, 172, 254, 0.1),
    rgba(255, 255, 255, 0.05),
    transparent
  );
  transition: left var(--duration-slow) var(--ease-out);
  pointer-events: none;
  z-index: 1;
}

.glass-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-hover);
  box-shadow: var(--shadow-glow), var(--shadow-card-hover);
}

.glass-card:hover::before {
  left: 100%;
}
```

**要求**：
- 所有卡片组件（StatCard、ChartCard）统一应用 `.glass-card`
- Hover 时边框变为发光色，阴影加深
- 扫描光只在 Hover 时触发一次


### 4. 角标装饰（Corner Decoration）

为 ChartCard 增加四角科技感 L 型装饰：

```css
.chart-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: var(--radius-lg);
  /* 四角各 8px 的 L 型线条 */
  background: 
    linear-gradient(to right, var(--border-glow) 2px, transparent 2px) 0 0 / 8px 8px no-repeat,
    linear-gradient(to bottom, var(--border-glow) 2px, transparent 2px) 0 0 / 8px 8px no-repeat,
    linear-gradient(to left, var(--border-glow) 2px, transparent 2px) 100% 0 / 8px 8px no-repeat,
    linear-gradient(to bottom, var(--border-glow) 2px, transparent 2px) 100% 0 / 8px 8px no-repeat,
    linear-gradient(to right, var(--border-glow) 2px, transparent 2px) 0 100% / 8px 8px no-repeat,
    linear-gradient(to top, var(--border-glow) 2px, transparent 2px) 0 100% / 8px 8px no-repeat,
    linear-gradient(to left, var(--border-glow) 2px, transparent 2px) 100% 100% / 8px 8px no-repeat,
    linear-gradient(to top, var(--border-glow) 2px, transparent 2px) 100% 100% / 8px 8px no-repeat;
  pointer-events: none;
  opacity: 0.6;
  transition: opacity var(--duration-normal);
}

.chart-card:hover::after {
  opacity: 1;
}
```

**注意**：如果卡片已有 `::before`（扫描光），角标装饰不要再用伪元素，改用内部 `<div class="corner-decor">` 实现，避免伪元素冲突。


### 5. Header 升级

**新增元素**：
- 左侧：LOGO 图标 + 标题（渐变文字）
- 中间：分隔线 + 副标题
- 右侧：实时时间 + 在线状态指示器 + 数据更新时间

**在线状态指示器**：
```html
<span class="status-dot"></span>
<span class="status-text">在线</span>
```
```css
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-success);
  box-shadow: 0 0 8px var(--color-success);
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

**呼吸动画**：让状态点有节奏地闪烁，暗示系统健康。


### 6. StatCard 升级（数字滚动 + 图标光晕）

**数字滚动动画**：
- 使用 `countup.js` 或手写 `useCountUp` composable
- 统计数值从 0 滚动到目标值，带缓动效果
- 支持带单位/前缀的字符串（如 `¥ 1,286`、`23.8%`），只动画数字部分

**图标光晕**：
```css
.stat-icon {
  position: relative;
  font-size: 40px;
}
.stat-icon::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(79, 172, 254, 0.15), transparent);
  z-index: -1;
}
```

**趋势标签**：
- 上升趋势：绿色 + ↑ 箭头
- 下降趋势：红色 + ↓ 箭头
- 增加颜色语义，不是所有都是蓝色


### 7. ChartCard 升级

**标题区**：
- 左侧增加 3px 高的主色渐变条作为装饰
- 标题字体加粗，颜色为主色

**加载骨架**：
- 数据加载中显示骨架屏（Skeleton）
- 3 条灰白色渐变动画条，模拟图表轮廓

**数据更新时间戳**：
- ChartCard 右下角显示 "更新于 HH:mm:ss"
- 字体 12px，颜色 `#64748b`


### 8. 页面入场动画（错落出现）

使用 `useAnimation` composable 实现模块依次入场：

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeInUp var(--duration-slow) var(--ease-out) both;
}

/* 依次延迟：Header 0ms, Stats 80ms, Charts 160ms, Footer 240ms */
.delay-1 { animation-delay: 80ms; }
.delay-2 { animation-delay: 160ms; }
.delay-3 { animation-delay: 240ms; }
.delay-4 { animation-delay: 320ms; }
```

**要求**：
- OverviewView 的 Header、Stats 行、Chart 区域、Footer 分别添加不同 delay
- 动画只在首次加载时触发，数据刷新时不重复触发


### 9. 数据刷新动画

**数字刷新**：
- 数据更新时，数值先缩小到 0.9，再弹回 1（scale 脉冲）
```css
@keyframes dataPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
.stat-value.updated {
  animation: dataPulse var(--duration-normal) var(--ease-spring);
}
```

**图表刷新**：
- ECharts `setOption` 时开启动画
- 统一配置：`animationDuration: 1200`，`animationEasing: 'cubicOut'`
- 折线图/柱状图数据变化时平滑过渡


### 10. 图表样式统一

更新 `src/modules/overview/utils/chartHelper.js`，所有图表配置统一：

```javascript
// 统一基础配置
const baseChartOption = {
  backgroundColor: 'transparent',
  textStyle: { color: '#94a3b8', fontFamily: 'Inter, PingFang SC, Microsoft YaHei' },
  tooltip: {
    backgroundColor: 'rgba(11, 15, 26, 0.9)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    textStyle: { color: '#e2e8f0' },
    padding: [12, 16],
    borderRadius: 8,
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '15%',
    containLabel: true,
  },
  animationDuration: 1200,
  animationEasing: 'cubicOut',
}

// 统一配色板
const chartColors = ['#4facfe', '#00f2fe', '#43e97b', '#fa709a', '#fee140', '#a18cd1']

// 坐标轴共用样式
const axisStyle = {
  axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } },
  axisLabel: { color: '#94a3b8', fontSize: 12 },
  splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.06)' } },
}
```

**要求**：
- 所有图表取消独立的 tooltip / grid / axis 配置，继承 `baseChartOption`
- 柱状图、折线图、饼图配色从 `chartColors` 统一取用


### 11. 响应式增强

- 设计基准：1920×1080
- 适配范围：1366×768 ~ 2560×1440
- 除了原有的 `transform: scale()` 方案，新增 `rem` 动态计算（可选）

```css
/* 动态计算根字体：12px = 1920px 宽度 */
html {
  font-size: calc(100vw / 1920 * 12);
}

/* 限制最大缩放 */
@media screen and (min-width: 2560px) {
  html { font-size: 16px; }
}
```

**要求**：
- 统计卡片在 1200px 以下变为 2 列
- 图表区域在 1200px 以下变为 1 列
- 所有间距、字号使用 CSS 变量，便于整体缩放


### 12. 新增 Composables

#### useCountUp.js
```javascript
// src/common/composables/useCountUp.js
// 功能：数字从 0 滚动到目标值，支持带单位的前缀/后缀
// 参数：targetValue（目标数值或字符串）、duration（动画时长，默认 1500ms）
// 返回：animatedValue（响应式当前值）
// 要求：使用 requestAnimationFrame + 缓动函数实现
```

#### useAnimation.js
```javascript
// src/common/composables/useAnimation.js
// 功能：元素错落入场动画
// 参数：items（数组）、delayStep（每项延迟，默认 80ms）
// 返回：animationClasses（每个元素对应的动画 class 数组）
```


### 13. 新增/修改的文件清单

请生成或修改以下文件：

1. **`src/common/styles/tokens.css`**（新建）：设计令牌 CSS 变量
2. **`src/common/styles/global.css`**（修改）：引入 tokens、背景三层叠加、滚动条美化、全局动效类
3. **`src/common/composables/useCountUp.js`**（新建）：数字滚动动画
4. **`src/modules/overview/components/Header.vue`**（修改）：状态栏、在线指示器、装饰线
5. **`src/modules/overview/components/StatCard.vue`**（修改）：数字滚动、图标光晕、趋势语义色
6. **`src/modules/overview/components/ChartCard.vue`**（修改）：角标装饰、加载骨架、时间戳
7. **`src/modules/overview/views/OverviewView.vue`**（修改）：入场动画、背景光晕装饰
8. **`src/modules/overview/utils/chartHelper.js`**（修改）：统一 ECharts 动画和配色


### 14. package.json 依赖更新

如需新增依赖，请更新 package.json：
```json
{
  "dependencies": {
    "@vueuse/core": "^10.7.0",
    "countup.js": "^2.8.0"
  }
}
```

**注意**：
- 如果学校网络/项目限制不允许安装新依赖，请优先使用手写实现（useCountUp、useAnimation）
- 图标统一使用 Emoji 或纯 CSS 实现，避免引入图标库


## 效果预期

完成美化后，页面应呈现以下视觉效果：

1. **背景**：深空蓝渐变 + 径向发光光斑 + 极淡网格暗纹，不是纯黑平面
2. **Header**：渐变标题 + 在线状态呼吸灯 + 实时时钟 + 装饰分割线
3. **StatCard**：毛玻璃卡片 + 数字滚动动画 + 图标光晕 + Hover 扫描光 + 趋势语义色
4. **ChartCard**：标题装饰条 + 四角 L 型角标 + 加载骨架 + 统一 ECharts 动画
5. **整体**：卡片 Hover 上浮 + 边框发光 + 阴影加深 + 错落入场 + 数据刷新脉冲


## 验收标准

- [ ] `npm run dev` 正常运行，页面显示美化后的大屏
- [ ] 背景可见渐变光晕和网格暗纹（非纯色）
- [ ] Header 有在线状态指示器（呼吸动画）
- [ ] 统计数字有从 0 到目标值的滚动动画
- [ ] 卡片 Hover 时上浮 + 边框高亮 + 扫描光从左到右扫过
- [ ] ChartCard 四角有 L 型装饰线
- [ ] 页面首次加载时模块依次错落出现（Header → Stats → Charts → Footer）
- [ ] 数据每 30 秒刷新时，数值有 scale 脉冲动画
- [ ] 所有图表动画时长 1200ms，缓动函数 cubicOut
- [ ] `npm run lint` 无报错
- [ ] 所有代码包含中文注释


## 交付说明

1. 复制上述全部提示词
2. 发送给 AI（推荐 Claude 3.5 Sonnet / DeepSeek / ChatGPT-4）
3. AI 将生成完整的 UI 美化方案代码
4. 将代码应用到你的 DataBoard 项目中
5. 执行 `npm run dev` 查看效果

如需调整配色、动画速度或组件样式，直接修改 `tokens.css` 中的 CSS 变量即可全局生效。
