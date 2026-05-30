import { Table } from '../components/3-data-display'
import { PageHeaderSection, PanelSection } from '../components/6-section'
import { StockStatus } from '../components/12-status'
import { EditButton } from '../components/13-action'
import { FadeIn } from '../components/15-animation'

export default function Inventory() {
  const items = [
    { id: 1, name: 'Lipstick Red', sku: 'LIP-001', quantity: 45, reorder: 20, status: 'In Stock' },
    { id: 2, name: 'Foundation Light', sku: 'FND-002', quantity: 12, reorder: 15, status: 'Low' },
    { id: 3, name: 'Eyeshadow Palette', sku: 'EYE-003', quantity: 3, reorder: 10, status: 'Critical' },
    { id: 4, name: 'Blush Rose', sku: 'BLS-004', quantity: 52, reorder: 20, status: 'In Stock' },
  ]

  const columns = [
    { key: 'name', label: 'Product' },
    { key: 'sku', label: 'SKU', cellClassName: 'monospace' },
    { key: 'quantity', label: 'Quantity', cellClassName: 'text-center' },
    { key: 'reorder', label: 'Reorder Level', cellClassName: 'text-center' },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StockStatus status={val} />,
    },
  ]

  return (
    <section>
      <FadeIn>
        <PageHeaderSection
          title="Inventory"
          subtitle="Monitor stock levels and reorder status for all makeup items."
        />
      </FadeIn>
      <PanelSection title="Stock Status">
        <Table
          columns={columns}
          data={items}
          renderActions={() => <EditButton label="Update" />}
        />
      </PanelSection>
    </section>
  )
}
