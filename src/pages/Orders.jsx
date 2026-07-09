import { useState } from 'react'
import { PageHeaderSection, PanelSection } from '../components/6-section'
import { FadeIn, SlideUp } from '../components/15-animation'
import { Table } from '../components/3-data-display'
import { Modal } from '../components/5-feedback'
import { Button } from '../components/1-basic'

const dummyOrders = [
  { id: 'ORD-1001', customer: 'Budi Santoso', date: '2023-10-25', items: 3, total: 450000, status: 'Completed' },
  { id: 'ORD-1002', customer: 'Siti Aminah', date: '2023-10-26', items: 1, total: 120000, status: 'Pending' },
  { id: 'ORD-1003', customer: 'Andi Wijaya', date: '2023-10-27', items: 5, total: 850000, status: 'Completed' },
  { id: 'ORD-1004', customer: 'Rina Melati', date: '2023-10-28', items: 2, total: 340000, status: 'Pending' },
  { id: 'ORD-1005', customer: 'Dewi Lestari', date: '2023-10-29', items: 4, total: 600000, status: 'Completed' },
]

export default function Orders() {
  const [orders, setOrders] = useState(dummyOrders)
  const [viewingOrder, setViewingOrder] = useState(null)

  const columns = [
    { key: 'id', label: 'Order ID', cellClassName: 'font-semibold text-stone-700' },
    { key: 'customer', label: 'Customer' },
    { key: 'date', label: 'Date', cellClassName: 'text-stone-500' },
    { key: 'items', label: 'Items', cellClassName: 'text-center' },
    {
      key: 'total',
      label: 'Total',
      render: (val) => `Rp ${Number(val).toLocaleString('id-ID')}`,
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
          val === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
        }`}>
          {val}
        </span>
      ),
    },
  ]

  const totalOrders = orders.length
  const completedOrders = orders.filter(o => o.status === 'Completed').length
  const pendingOrders = orders.filter(o => o.status === 'Pending').length

  return (
    <section>
      <FadeIn>
        <PageHeaderSection
          title="Orders"
          subtitle="Track and manage all customer orders, payments, and delivery status."
        />
      </FadeIn>

      <SlideUp delay="0s">
        <div className="dashboard-grid" style={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', marginBottom: '24px' }}>
          <div className="metric-card pink-card">
            <h3 className="metric-label">Total Orders</h3>
            <h2>{totalOrders}</h2>
            <p className="metric-note">All time</p>
          </div>
          <div className="metric-card purple-card">
            <h3 className="metric-label">Completed</h3>
            <h2>{completedOrders}</h2>
            <p className="metric-note">Successfully fulfilled</p>
          </div>
          <div className="metric-card gold-card">
            <h3 className="metric-label">Pending</h3>
            <h2>{pendingOrders}</h2>
            <p className="metric-note">Awaiting confirmation</p>
          </div>
        </div>
      </SlideUp>

      <SlideUp delay="0.1s">
        <PanelSection title="Order List">
          <Table
            columns={columns}
            data={orders}
            renderActions={(row) => (
              <button
                className="btn-small view"
                onClick={() => setViewingOrder(row)}
              >
                View
              </button>
            )}
          />
        </PanelSection>
      </SlideUp>

      <Modal
        isOpen={viewingOrder !== null}
        onClose={() => setViewingOrder(null)}
        title={`Order Details - ${viewingOrder?.id}`}
      >
        {viewingOrder && (
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="block text-stone-500">Customer</span>
                <span className="font-medium text-stone-800">{viewingOrder.customer}</span>
              </div>
              <div>
                <span className="block text-stone-500">Date</span>
                <span className="font-medium text-stone-800">{viewingOrder.date}</span>
              </div>
              <div>
                <span className="block text-stone-500">Total Items</span>
                <span className="font-medium text-stone-800">{viewingOrder.items} products</span>
              </div>
              <div>
                <span className="block text-stone-500">Status</span>
                <span className="font-medium text-stone-800">{viewingOrder.status}</span>
              </div>
            </div>
            <div className="border-t border-stone-200 mt-4 pt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>Rp {Number(viewingOrder.total).toLocaleString('id-ID')}</span>
              </div>
            </div>
            <div className="pt-4 border-t border-stone-200 mt-4 flex gap-2">
              <Button variant="primary" onClick={() => setViewingOrder(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
