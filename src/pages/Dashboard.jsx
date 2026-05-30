import PageHeader from '../components/PageHeader'
import { Button } from '../components/1-basic'
import { StatCard } from '../components/3-data-display'
import { DashboardSection, ChartSection } from '../components/6-section'
import { ExportButton } from '../components/13-action'
import { FadeIn, SlideUp } from '../components/15-animation'
import { BarChart, DonutChart } from '../components/9-chart'

export default function Dashboard() {
  const salesData = [
    { label: 'Mon', value: 420 },
    { label: 'Tue', value: 380 },
    { label: 'Wed', value: 510 },
    { label: 'Thu', value: 460 },
    { label: 'Fri', value: 620 },
    { label: 'Sat', value: 780 },
    { label: 'Sun', value: 540 },
  ]

  const categoryData = [
    { label: 'Lips', value: 35 },
    { label: 'Eyes', value: 28 },
    { label: 'Face', value: 22 },
    { label: 'Base', value: 15 },
  ]

  return (
    <section>
      <FadeIn>
        <PageHeader
          title="Dashboard Overview"
          subtitle="Track revenue, sales, customers, and inventory performance."
        />
      </FadeIn>
      <DashboardSection
        note="Welcome back, manager! Berikut ringkasan performa toko makeupmu hari ini."
        actions={
          <>
            <Button variant="primary" size="sm">New Sale</Button>
            <ExportButton />
          </>
        }
      />
      <div className="dashboard-grid">
        <SlideUp delay="0s">
          <StatCard label="Today's Revenue" value="$3,247" note="+12% from yesterday" variant="pink" />
        </SlideUp>
        <SlideUp delay="0.1s">
          <StatCard label="Sales Today" value="24" note="+8% from yesterday" variant="purple" />
        </SlideUp>
        <SlideUp delay="0.2s">
          <StatCard label="Customers" value="143" note="+5% from last week" variant="blue" />
        </SlideUp>
        <SlideUp delay="0.3s">
          <StatCard label="Avg. Order" value="$135" note="+3% from last week" variant="gold" />
        </SlideUp>
      </div>
      <div className="dashboard-panels">
        <section className="panel">
          <div className="panel-title">Weekly Sales Trend</div>
          <BarChart data={salesData} height={220} />
        </section>
        <section className="panel">
          <div className="panel-title">Sales by Category</div>
          <DonutChart segments={categoryData} size={180} />
        </section>
      </div>
    </section>
  )
}
