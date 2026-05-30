import { List } from '../components/3-data-display'
import { PageHeaderSection, ChartSection } from '../components/6-section'
import { BarChart } from '../components/9-chart'
import { FadeIn, SlideUp } from '../components/15-animation'

export default function Analytics() {
  const revenueData = [
    { label: 'Jan', value: 4200 },
    { label: 'Feb', value: 3800 },
    { label: 'Mar', value: 5100 },
    { label: 'Apr', value: 4600 },
    { label: 'May', value: 6200 },
    { label: 'Jun', value: 7800 },
  ]

  const topProducts = [
    { label: 'Lipstick Red', value: '152 sales' },
    { label: 'Eyeshadow Palette', value: '98 sales' },
    { label: 'Foundation Light', value: '87 sales' },
  ]

  const customerInsights = [
    { label: 'New Customers', value: '24' },
    { label: 'Repeat Rate', value: '68%' },
    { label: 'Avg. Order Value', value: '$135' },
  ]

  return (
    <section>
      <FadeIn>
        <PageHeaderSection
          title="Analytics"
          subtitle="Review sales trends, category performance, and revenue insights."
        />
      </FadeIn>
      <div className="analytics-grid">
        <SlideUp delay="0s">
          <section className="panel">
            <h3 className="panel-title">Monthly Revenue</h3>
            <BarChart data={revenueData} height={260} />
          </section>
        </SlideUp>
        <SlideUp delay="0.1s">
          <section className="panel">
            <h3 className="panel-title">Top Products</h3>
            <List items={topProducts} />
          </section>
        </SlideUp>
        <SlideUp delay="0.2s">
          <section className="panel">
            <h3 className="panel-title">Customer Insights</h3>
            <List items={customerInsights} />
          </section>
        </SlideUp>
        <SlideUp delay="0.3s">
          <ChartSection title="Category Performance" type="large" />
        </SlideUp>
      </div>
    </section>
  )
}
