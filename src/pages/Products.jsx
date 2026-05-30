import { Button, Badge } from '../components/1-basic'
import { Table } from '../components/3-data-display'
import { PageHeaderSection, PanelSection } from '../components/6-section'
import { EditButton, DeleteButton } from '../components/13-action'
import { FadeIn } from '../components/15-animation'

export default function Products() {
  const products = [
    { id: 1, name: 'Lipstick Red', category: 'Lips', price: '$12.99', stock: 45 },
    { id: 2, name: 'Foundation Light', category: 'Base', price: '$24.99', stock: 32 },
    { id: 3, name: 'Eyeshadow Palette', category: 'Eyes', price: '$18.99', stock: 28 },
    { id: 4, name: 'Blush Rose', category: 'Face', price: '$15.99', stock: 52 },
  ]

  const columns = [
    { key: 'name', label: 'Product Name' },
    {
      key: 'category',
      label: 'Category',
      render: (val) => <Badge>{val}</Badge>,
    },
    { key: 'price', label: 'Price' },
    {
      key: 'stock',
      label: 'Stock',
      render: (val) => (
        <span className={val > 40 ? 'stock-high' : 'stock-med'}>
          {val} pcs
        </span>
      ),
    },
  ]

  return (
    <section>
      <FadeIn>
        <PageHeaderSection
          title="Products"
          subtitle="Manage makeup products, variants, and pricing."
        />
      </FadeIn>
      <PanelSection
        title="All Products"
        headerAction={<Button variant="primary" size="sm">+ Add Product</Button>}
      >
        <Table
          columns={columns}
          data={products}
          renderActions={(row) => (
            <>
              <EditButton />
              <DeleteButton />
            </>
          )}
        />
      </PanelSection>
    </section>
  )
}
