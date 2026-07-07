<template>
  <div class="detail-view">
    <div class="detail-header animate-in">
      <div class="header-left">
        <h2 class="page-title">数据明细</h2>
        <p class="page-desc">查看各项指标的详细原始数据</p>
      </div>
      <div class="header-right">
        <div class="tab-group">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            :class="['tab-btn', { active: activeTab === tab.key }]"
            @click="activeTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>
        <div class="search-box">
          <input v-model="searchQuery" type="text" placeholder="搜索..." class="search-input" />
        </div>
      </div>
    </div>

    <div class="table-card glass-card animate-in">
      <div class="table-scroll">
        <table class="data-table">
          <thead>
            <tr>
              <th
                v-for="col in columns"
                :key="col.key"
                :class="{ sortable: col.sortable }"
                @click="col.sortable && toggleSort(col.key)"
              >
                {{ col.label }}
                <span v-if="col.sortable" class="sort-icon">
                  {{ sortKey === col.key ? (sortAsc ? '↑' : '↓') : '↕' }}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, i) in paginatedData" :key="i" class="data-row">
              <td v-for="col in columns" :key="col.key">{{ row[col.key] }}</td>
            </tr>
            <tr v-if="paginatedData.length === 0">
              <td :colspan="columns.length" class="empty-state">无匹配数据</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-footer">
        <span class="table-info"
          >共 {{ filteredData.length }} 条，第 {{ currentPage }} / {{ totalPages }} 页</span
        >
        <div class="pagination">
          <button :disabled="currentPage <= 1" class="page-btn" @click="currentPage--">‹</button>
          <span class="page-indicator">{{ currentPage }}</span>
          <button :disabled="currentPage >= totalPages" class="page-btn" @click="currentPage++">
            ›
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import dashboardData from '../../../data/dashboardData.js'

const activeTab = ref('sales')
const searchQuery = ref('')
const currentPage = ref(1)
const sortKey = ref('')
const sortAsc = ref(true)
const pageSize = 8

const tabs = [
  { key: 'sales', label: '月度销售' },
  { key: 'trend', label: '周度趋势' },
  { key: 'category', label: '品类分布' },
]

const columns = computed(() => {
  const map = {
    sales: [
      { key: 'month', label: '月份', sortable: true },
      { key: 'value', label: '销售额', sortable: true },
    ],
    trend: [
      { key: 'week', label: '周次', sortable: true },
      { key: 'value', label: '趋势值', sortable: true },
    ],
    category: [
      { key: 'name', label: '品类', sortable: true },
      { key: 'value', label: '占比(%)', sortable: true },
    ],
  }
  return map[activeTab.value] || []
})

const rawData = computed(() => {
  const map = {
    sales: dashboardData.salesData,
    trend: dashboardData.trendData,
    category: dashboardData.categoryData,
  }
  return map[activeTab.value] || []
})

const filteredData = computed(() => {
  let data = rawData.value
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    data = data.filter((row) => Object.values(row).some((v) => String(v).toLowerCase().includes(q)))
  }
  if (sortKey.value) {
    data = [...data].sort((a, b) => {
      const av = a[sortKey.value]
      const bv = b[sortKey.value]
      const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv))
      return sortAsc.value ? cmp : -cmp
    })
  }
  return data
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredData.value.length / pageSize)))

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredData.value.slice(start, start + pageSize)
})

function toggleSort(key) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    sortAsc.value = true
  }
  currentPage.value = 1
}
</script>

<style scoped>
.detail-view {
  padding: var(--spacing-2xl) var(--spacing-3xl);
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-2xl);
  gap: var(--spacing-xl);
}

.page-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin: 0;
}

.page-desc {
  font-size: var(--font-size-sm);
  color: var(--text-body);
  margin-top: var(--spacing-xs);
}

.header-right {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

.tab-group {
  display: flex;
  background: rgba(255, 255, 255, 0.04);
  border-radius: var(--radius-md);
  padding: 3px;
}

.tab-btn {
  padding: 6px 16px;
  border: none;
  background: transparent;
  color: var(--text-body);
  font-size: var(--font-size-sm);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--duration-fast);
}

.tab-btn.active {
  background: var(--color-primary);
  color: #fff;
}

.search-input {
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
  outline: none;
  width: 180px;
}

.search-input:focus {
  border-color: var(--color-primary);
}

.table-card {
  padding: 0;
  overflow: hidden;
}

.table-scroll {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  text-align: left;
  padding: 14px var(--spacing-2xl);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--text-body);
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid var(--border-default);
  white-space: nowrap;
  user-select: none;
}

.data-table th.sortable {
  cursor: pointer;
}

.data-table th.sortable:hover {
  color: var(--color-primary);
}

.sort-icon {
  margin-left: 4px;
  font-size: 12px;
  opacity: 0.5;
}

.data-row td {
  padding: 12px var(--spacing-2xl);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-default);
  transition: background var(--duration-fast);
}

.data-row:hover td {
  background: rgba(255, 255, 255, 0.02);
}

.empty-state {
  text-align: center;
  padding: 40px !important;
  color: var(--text-muted);
}

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px var(--spacing-2xl);
  border-top: 1px solid var(--border-default);
}

.table-info {
  font-size: var(--font-size-xs);
  color: var(--text-muted);
}

.pagination {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.page-btn {
  width: 28px;
  height: 28px;
  border: 1px solid var(--border-default);
  background: transparent;
  color: var(--text-body);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  transition: all var(--duration-fast);
}

.page-btn:hover:not(:disabled) {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.page-indicator {
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  min-width: 20px;
  text-align: center;
}

@media screen and (max-width: 768px) {
  .detail-header {
    flex-direction: column;
  }
  .header-right {
    width: 100%;
  }
  .search-input {
    width: 100%;
  }
}
</style>
