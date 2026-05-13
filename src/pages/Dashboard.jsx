import PageHeader from '../components/PageHeader'

export default function Dashboard() {
  return (
    <section>
      <PageHeader
        title="Dashboard Overview"
        subtitle="Track revenue, sales, customers, and inventory performance."
      />
      <div className="dashboard-top">
        <div className="dashboard-intro">
          <p className="dashboard-note">
            Welcome back, manager! Berikut ringkasan performa toko makeupmu hari ini.
          </p>
        </div>
        <div className="dashboard-cta">
          <button className="button button-primary button-sm">New Sale</button>
          <button className="button button-secondary button-sm">Export Report</button>
        </div>
      </div>
      <div className="dashboard-grid">
        <article className="metric-card pink-card">
          <p className="metric-label">Today’s Revenue</p>
          <h2>$3,247</h2>
          <p className="metric-note">+12% from yesterday</p>
        </article>
        <article className="metric-card purple-card">
          <p className="metric-label">Sales Today</p>
          <h2>24</h2>
          <p className="metric-note">+8% from yesterday</p>
        </article>
        <article className="metric-card blue-card">
          <p className="metric-label">Customers</p>
          <h2>143</h2>
          <p className="metric-note">+5% from last week</p>
        </article>
        <article className="metric-card gold-card">
          <p className="metric-label">Avg. Order</p>
          <h2>$135</h2>
          <p className="metric-note">+3% from last week</p>
        </article>
      </div>
      <div className="dashboard-panels">
        <section className="panel">
          <div className="panel-title">Weekly Sales Trend</div>
          <div className="chart-placeholder">Chart area</div>
        </section>
        <section className="panel">
          <div className="panel-title">Sales by Category</div>
          <div className="chart-placeholder">Pie chart area</div>
        </section>
      </div>
    </section>
  )
}
