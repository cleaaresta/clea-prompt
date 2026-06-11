import { useState } from 'react'
import { PageHeaderSection } from '../components/6-section'
import { FadeIn, SlideUp } from '../components/15-animation'

// Shadcn UI Components
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs'
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell
} from '../components/ui/table'
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter, DialogClose
} from '../components/ui/dialog'
import { Button } from '../components/ui/button'

const allOrders = [
  { id: 'ORD-001', customer: 'Sarah Johnson', date: '2026-06-10', items: 3, total: '$89.97', status: 'Completed', payment: 'Credit Card' },
  { id: 'ORD-002', customer: 'Emily Davis', date: '2026-06-10', items: 1, total: '$24.99', status: 'Processing', payment: 'E-Wallet' },
  { id: 'ORD-003', customer: 'Jessica Smith', date: '2026-06-09', items: 5, total: '$142.50', status: 'Completed', payment: 'Bank Transfer' },
  { id: 'ORD-004', customer: 'Amanda Wilson', date: '2026-06-09', items: 2, total: '$57.98', status: 'Pending', payment: 'Cash' },
  { id: 'ORD-005', customer: 'Olivia Brown', date: '2026-06-08', items: 4, total: '$112.00', status: 'Completed', payment: 'Credit Card' },
  { id: 'ORD-006', customer: 'Sophia Martinez', date: '2026-06-08', items: 1, total: '$18.99', status: 'Cancelled', payment: 'E-Wallet' },
  { id: 'ORD-007', customer: 'Isabella Garcia', date: '2026-06-07', items: 3, total: '$76.50', status: 'Completed', payment: 'Credit Card' },
  { id: 'ORD-008', customer: 'Mia Rodriguez', date: '2026-06-07', items: 2, total: '$49.98', status: 'Processing', payment: 'Bank Transfer' },
]

function StatusBadge({ status }) {
  const styles = {
    Completed: 'orders-status-completed',
    Processing: 'orders-status-processing',
    Pending: 'orders-status-pending',
    Cancelled: 'orders-status-cancelled',
  }
  return <span className={`orders-status-badge ${styles[status] || ''}`}>{status}</span>
}

function OrderDetailDialog({ order }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="orders-view-btn">View</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Order {order.id}</DialogTitle>
          <DialogDescription>
            Detail order dari {order.customer}
          </DialogDescription>
        </DialogHeader>
        <div className="orders-dialog-body">
          <div className="orders-dialog-row">
            <span className="orders-dialog-label">Customer</span>
            <span className="orders-dialog-value">{order.customer}</span>
          </div>
          <div className="orders-dialog-row">
            <span className="orders-dialog-label">Date</span>
            <span className="orders-dialog-value">{order.date}</span>
          </div>
          <div className="orders-dialog-row">
            <span className="orders-dialog-label">Items</span>
            <span className="orders-dialog-value">{order.items} products</span>
          </div>
          <div className="orders-dialog-row">
            <span className="orders-dialog-label">Payment</span>
            <span className="orders-dialog-value">{order.payment}</span>
          </div>
          <div className="orders-dialog-row">
            <span className="orders-dialog-label">Status</span>
            <StatusBadge status={order.status} />
          </div>
          <div className="orders-dialog-divider" />
          <div className="orders-dialog-row orders-dialog-total">
            <span className="orders-dialog-label">Total</span>
            <span className="orders-dialog-value">{order.total}</span>
          </div>
        </div>
        <DialogFooter showCloseButton>
          <Button variant="default" size="sm">Print Receipt</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function OrdersTable({ orders }) {
  return (
    <div className="orders-table-wrapper">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-center">Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No orders found for this filter.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-semibold text-primary">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell className="text-muted-foreground">{order.date}</TableCell>
                <TableCell className="text-center">{order.items}</TableCell>
                <TableCell className="font-semibold">{order.total}</TableCell>
                <TableCell>{order.payment}</TableCell>
                <TableCell><StatusBadge status={order.status} /></TableCell>
                <TableCell className="text-center">
                  <OrderDetailDialog order={order} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default function Orders() {
  const completedOrders = allOrders.filter(o => o.status === 'Completed')
  const processingOrders = allOrders.filter(o => o.status === 'Processing')
  const pendingOrders = allOrders.filter(o => o.status === 'Pending')
  const cancelledOrders = allOrders.filter(o => o.status === 'Cancelled')

  return (
    <section>
      <FadeIn>
        <PageHeaderSection
          title="Orders"
          subtitle="Track and manage all customer orders, payments, and delivery status."
        />
      </FadeIn>

      {/* Summary Cards */}
      <SlideUp delay="0s">
        <div className="orders-summary-grid">
          <div className="orders-summary-card orders-summary-all">
            <p className="orders-summary-label">Total Orders</p>
            <h2 className="orders-summary-value">{allOrders.length}</h2>
            <p className="orders-summary-note">All time</p>
          </div>
          <div className="orders-summary-card orders-summary-completed">
            <p className="orders-summary-label">Completed</p>
            <h2 className="orders-summary-value">{completedOrders.length}</h2>
            <p className="orders-summary-note">Successfully fulfilled</p>
          </div>
          <div className="orders-summary-card orders-summary-processing">
            <p className="orders-summary-label">Processing</p>
            <h2 className="orders-summary-value">{processingOrders.length}</h2>
            <p className="orders-summary-note">Being prepared</p>
          </div>
          <div className="orders-summary-card orders-summary-pending">
            <p className="orders-summary-label">Pending</p>
            <h2 className="orders-summary-value">{pendingOrders.length}</h2>
            <p className="orders-summary-note">Awaiting confirmation</p>
          </div>
        </div>
      </SlideUp>

      {/* Tabs + Table — Shadcn UI Components */}
      <SlideUp delay="0.1s">
        <div className="panel orders-panel">
          <Tabs defaultValue="all">
            <div className="orders-tabs-header">
              <h3 className="panel-title" style={{ margin: 0 }}>Order List</h3>
              <TabsList>
                <TabsTrigger value="all">All ({allOrders.length})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({completedOrders.length})</TabsTrigger>
                <TabsTrigger value="processing">Processing ({processingOrders.length})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled ({cancelledOrders.length})</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all">
              <OrdersTable orders={allOrders} />
            </TabsContent>
            <TabsContent value="completed">
              <OrdersTable orders={completedOrders} />
            </TabsContent>
            <TabsContent value="processing">
              <OrdersTable orders={processingOrders} />
            </TabsContent>
            <TabsContent value="pending">
              <OrdersTable orders={pendingOrders} />
            </TabsContent>
            <TabsContent value="cancelled">
              <OrdersTable orders={cancelledOrders} />
            </TabsContent>
          </Tabs>
        </div>
      </SlideUp>
    </section>
  )
}
