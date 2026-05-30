import { Button } from '../components/1-basic'
import { Table } from '../components/3-data-display'
import { PageHeaderSection, PanelSection } from '../components/6-section'
import { CustomerStatus } from '../components/12-status'
import { DeleteButton } from '../components/13-action'
import { FadeIn } from '../components/15-animation'

export default function Customers() {
  const customers = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@email.com', purchases: 12, status: 'VIP' },
    { id: 2, name: 'Emily Davis', email: 'emily@email.com', purchases: 8, status: 'Regular' },
    { id: 3, name: 'Jessica Smith', email: 'jessica@email.com', purchases: 5, status: 'Regular' },
    { id: 4, name: 'Amanda Wilson', email: 'amanda@email.com', purchases: 24, status: 'VIP' },
  ]

  const columns = [
    { key: 'name', label: 'Name', cellClassName: 'font-weight-600' },
    { key: 'email', label: 'Email' },
    { key: 'purchases', label: 'Purchases' },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <CustomerStatus status={val} />,
    },
  ]

  return (
    <section>
      <FadeIn>
        <PageHeaderSection
          title="Customers"
          subtitle="View customer profiles, loyalty status, and purchase history."
        />
      </FadeIn>
      <PanelSection
        title="Customer List"
        headerAction={<Button variant="primary" size="sm">+ Add Customer</Button>}
      >
        <Table
          columns={columns}
          data={customers}
          renderActions={() => (
            <>
              <button className="btn-small view">View</button>
              <DeleteButton label="Remove" />
            </>
          )}
        />
      </PanelSection>
    </section>
  )
}
