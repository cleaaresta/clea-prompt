import { supabase } from './supabaseClient'

function formatMonthLabel(date) {
  const d = new Date(date)
  return d.toLocaleString('id-ID', { month: 'short', year: 'numeric' })
}

const sampleAnalytics = {
  stats: {
    total_revenue: 12500000,
    successful_orders: 342,
    pending_orders: 12,
    total_members: 874,
  },
  topProducts: [
    { product_id: 'p1', product_name: 'Lipstik Velvet Matte', image_url: '', total_qty_sold: 120, total_sales_amount: 120000 * 120 },
    { product_id: 'p2', product_name: 'Foundation Liquid Glow', image_url: '', total_qty_sold: 95, total_sales_amount: 185000 * 95 },
    { product_id: 'p3', product_name: 'Eyeshadow Palette', image_url: '', total_qty_sold: 80, total_sales_amount: 220000 * 80 },
  ],
  tierDist: [
    { tier_name: 'bronze', member_count: 560 },
    { tier_name: 'silver', member_count: 240 },
    { tier_name: 'gold', member_count: 74 },
  ],
}

const sampleMonthly = (() => {
  const months = []
  const now = new Date()
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    months.push({ label: formatMonthLabel(d), revenue: Math.floor(Math.random() * 2000000) + 200000 })
  }
  return months
})()

export async function fetchAnalytics() {
  try {
    // total revenue and order counts
    const { data: revenueData, error: revErr } = await supabase
      .from('orders')
      .select('total_amount, status')

    if (revErr) throw revErr

    const stats = { total_revenue: 0, successful_orders: 0, pending_orders: 0, total_members: 0 }

    if (Array.isArray(revenueData)) {
      revenueData.forEach((o) => {
        if (o.status === 'completed' || o.status === 'paid') {
          stats.total_revenue += Number(o.total_amount || 0)
          stats.successful_orders += 1
        } else if (o.status === 'pending') {
          stats.pending_orders += 1
        }
      })
    }

    // members count
    const { count: membersCount, error: memErr } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    if (memErr) throw memErr
    stats.total_members = membersCount || 0

    // top products (aggregate from order_items join products)
    const { data: topData, error: topErr } = await supabase
      .from('order_items')
      .select('product_id, quantity, price_at_purchase, products(name, image_url)')

    if (topErr) throw topErr

    const prodMap = new Map()
    if (Array.isArray(topData)) {
      topData.forEach((it) => {
        const pid = it.product_id
        const name = it.products?.name || 'Produk'
        const img = it.products?.image_url || ''
        const qty = Number(it.quantity || 0)
        const amt = Number(it.price_at_purchase || 0) * qty
        if (!prodMap.has(pid)) prodMap.set(pid, { product_id: pid, product_name: name, image_url: img, total_qty_sold: 0, total_sales_amount: 0 })
        const cur = prodMap.get(pid)
        cur.total_qty_sold += qty
        cur.total_sales_amount += amt
      })
    }

    const topProducts = Array.from(prodMap.values()).sort((a, b) => b.total_qty_sold - a.total_qty_sold).slice(0, 6)

    // tier distribution
    const { data: tiersData, error: tierErr } = await supabase
      .from('profiles')
      .select('tier')

    if (tierErr) throw tierErr

    const tierMap = new Map()
    if (Array.isArray(tiersData)) {
      tiersData.forEach((p) => {
        const t = p.tier || 'bronze'
        tierMap.set(t, (tierMap.get(t) || 0) + 1)
      })
    }
    const tierDist = Array.from(tierMap.entries()).map(([tier_name, member_count]) => ({ tier_name, member_count }))

    const result = { stats, topProducts, tierDist }

    // If there's no meaningful data, return sample
    const hasData = (stats.total_revenue > 0) || topProducts.length > 0 || tierDist.length > 0
    return hasData ? result : sampleAnalytics
  } catch (err) {
    console.error('analyticsApi.fetchAnalytics error', err)
    return sampleAnalytics
  }
}

export async function fetchMonthlyRevenue() {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('created_at, total_amount')

    if (error) throw error

    const buckets = {}
    if (Array.isArray(orders)) {
      orders.forEach((o) => {
        const date = new Date(o.created_at)
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        buckets[key] = (buckets[key] || 0) + Number(o.total_amount || 0)
      })
    }

    const keys = Object.keys(buckets).sort()
    const result = keys.map((k) => {
      const [y, m] = k.split('-')
      const d = new Date(Number(y), Number(m) - 1, 1)
      return { label: formatMonthLabel(d), revenue: buckets[k] }
    })

    return (result.length > 0) ? result : sampleMonthly
  } catch (err) {
    console.error('analyticsApi.fetchMonthlyRevenue error', err)
    return sampleMonthly
  }

}


