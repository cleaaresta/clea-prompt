export default function Analytics() {
  return (
    <section>
      <div className="page-header-section">
        <h2 className="page-section-title">Analytics</h2>
        <p className="page-section-text">Review sales trends, category performance, and revenue insights.</p>
      </div>
      <div className="analytics-grid">
        <div className="panel">
          <h3 className="panel-title">Monthly Revenue</h3>
          <div className="chart-placeholder-large">Chart: Revenue Trend</div>
        </div>
        <div className="panel">
          <h3 className="panel-title">Top Products</h3>
          <div className="stats-list">
            <div className="stat-item">
              <span>Lipstick Red</span>
              <span className="stat-value">152 sales</span>
            </div>
            <div className="stat-item">
              <span>Eyeshadow Palette</span>
              <span className="stat-value">98 sales</span>
            </div>
            <div className="stat-item">
              <span>Foundation Light</span>
              <span className="stat-value">87 sales</span>
            </div>
          </div>
        </div>
        <div className="panel">
          <h3 className="panel-title">Customer Insights</h3>
          <div className="stats-list">
            <div className="stat-item">
              <span>New Customers</span>
              <span className="stat-value">24</span>
            </div>
            <div className="stat-item">
              <span>Repeat Rate</span>
              <span className="stat-value">68%</span>
            </div>
            <div className="stat-item">
              <span>Avg. Order Value</span>
              <span className="stat-value">$135</span>
            </div>
          </div>
        </div>
        <div className="panel">
          <h3 className="panel-title">Category Performance</h3>
          <div className="chart-placeholder-large">Chart: Category Breakdown</div>
        </div>
      </div>
    </section>
  )
}
