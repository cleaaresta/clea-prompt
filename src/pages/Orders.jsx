import { useEffect, useMemo, useState } from "react";
import { PageHeaderSection } from "../components/6-section";
import { FadeIn, SlideUp } from "../components/15-animation";
import { supabase } from "../lib/supabaseClient";

// Shadcn UI Components
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";

function StatusBadge({ status }) {
  const styles = {
    completed: "orders-status-completed",
    processing: "orders-status-processing",
    pending: "orders-status-pending",
    cancelled: "orders-status-cancelled",
  };
  return (
    <span className={`orders-status-badge ${styles[status] || ""}`}>
      {status}
    </span>
  );
}

function OrderDetailDialog({ order }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="orders-view-btn">View</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Order {order.id.slice(0, 8)}</DialogTitle>
          <DialogDescription>
            Detail order dari {order.profiles?.full_name || "Customer"}
          </DialogDescription>
        </DialogHeader>
        <div className="orders-dialog-body">
          <div className="orders-dialog-row">
            <span className="orders-dialog-label">Customer</span>
            <span className="orders-dialog-value">
              {order.profiles?.full_name || "Customer"}
            </span>
          </div>
          <div className="orders-dialog-row">
            <span className="orders-dialog-label">Date</span>
            <span className="orders-dialog-value">
              {new Date(order.created_at).toLocaleDateString()}
            </span>
          </div>
          <div className="orders-dialog-row">
            <span className="orders-dialog-label">Items</span>
            <span className="orders-dialog-value">
              {order.order_items?.length || 0} products
            </span>
          </div>
          <div className="orders-dialog-row">
            <span className="orders-dialog-label">Status</span>
            <StatusBadge status={order.status} />
          </div>
          <div className="orders-dialog-divider" />
          <div className="orders-dialog-row orders-dialog-total">
            <span className="orders-dialog-label">Total</span>
            <span className="orders-dialog-value">
              Rp {Number(order.total_amount).toLocaleString("id-ID")}
            </span>
          </div>
        </div>
        <DialogFooter showCloseButton>
          <Button variant="default" size="sm">
            Print Receipt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function OrdersTable({ orders, onStatusChange }) {
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
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-8 text-muted-foreground"
              >
                No orders found for this filter.
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-semibold text-primary">
                  {order.id.slice(0, 8)}
                </TableCell>
                <TableCell>{order.profiles?.full_name || "Customer"}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-center">
                  {order.order_items?.length || 0}
                </TableCell>
                <TableCell className="font-semibold">
                  Rp {Number(order.total_amount).toLocaleString("id-ID")}
                </TableCell>
                <TableCell>
                  <select
                    value={order.status}
                    onChange={(event) =>
                      onStatusChange(order.id, event.target.value)
                    }
                    className="rounded-md border border-stone-300 bg-white px-2 py-1 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </TableCell>
                <TableCell className="text-center">
                  <OrderDetailDialog order={order} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select(
        "*, profiles(full_name), order_items(quantity, price_at_purchase, product_id)",
      )
      .order("created_at", { ascending: false });

    if (!error) {
      setOrders(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      await loadOrders();
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, nextStatus) => {
    const currentOrder = orders.find((order) => order.id === orderId);
    if (!currentOrder) return;

    if (currentOrder.status === nextStatus) return;

    const updates = { status: nextStatus };
    if (nextStatus === "completed") {
      const pointsEarned = Math.floor(
        Number(currentOrder.total_amount) / 10000,
      );
      updates.points_earned = pointsEarned;
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id, total_points, tier")
        .eq("id", currentOrder.user_id)
        .maybeSingle();

      if (!profileError && profileData) {
        const newTotalPoints =
          Number(profileData.total_points || 0) + pointsEarned;
        const nextTier =
          newTotalPoints >= 1500
            ? "gold"
            : newTotalPoints >= 500
              ? "silver"
              : "bronze";
        await supabase
          .from("profiles")
          .update({ total_points: newTotalPoints, tier: nextTier })
          .eq("id", currentOrder.user_id);
      }
    }

    const { error } = await supabase
      .from("orders")
      .update(updates)
      .eq("id", orderId);
    if (!error) {
      setOrders((current) =>
        current.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: nextStatus,
                points_earned: updates.points_earned ?? order.points_earned,
              }
            : order,
        ),
      );
    }
  };

  const completedOrders = useMemo(
    () => orders.filter((order) => order.status === "completed"),
    [orders],
  );
  const pendingOrders = useMemo(
    () => orders.filter((order) => order.status === "pending"),
    [orders],
  );
  const cancelledOrders = useMemo(
    () => orders.filter((order) => order.status === "cancelled"),
    [orders],
  );

  return (
    <section>
      <FadeIn>
        <PageHeaderSection
          title="Orders"
          subtitle="Track and manage all customer orders, payments, and delivery status."
        />
      </FadeIn>

      <SlideUp delay="0s">
        <div className="orders-summary-grid">
          <div className="orders-summary-card orders-summary-all">
            <p className="orders-summary-label">Total Orders</p>
            <h2 className="orders-summary-value">{orders.length}</h2>
            <p className="orders-summary-note">All time</p>
          </div>
          <div className="orders-summary-card orders-summary-completed">
            <p className="orders-summary-label">Completed</p>
            <h2 className="orders-summary-value">{completedOrders.length}</h2>
            <p className="orders-summary-note">Successfully fulfilled</p>
          </div>
          <div className="orders-summary-card orders-summary-pending">
            <p className="orders-summary-label">Pending</p>
            <h2 className="orders-summary-value">{pendingOrders.length}</h2>
            <p className="orders-summary-note">Awaiting confirmation</p>
          </div>
          <div className="orders-summary-card orders-summary-cancelled">
            <p className="orders-summary-label">Cancelled</p>
            <h2 className="orders-summary-value">{cancelledOrders.length}</h2>
            <p className="orders-summary-note">Rejected or voided</p>
          </div>
        </div>
      </SlideUp>

      <SlideUp delay="0.1s">
        <div className="panel orders-panel">
          <Tabs defaultValue="all">
            <div className="orders-tabs-header">
              <h3 className="panel-title" style={{ margin: 0 }}>
                Order List
              </h3>
              <TabsList>
                <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({completedOrders.length})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending ({pendingOrders.length})
                </TabsTrigger>
                <TabsTrigger value="cancelled">
                  Cancelled ({cancelledOrders.length})
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all">
              {loading ? (
                <p className="p-4 text-sm text-stone-500">Loading orders...</p>
              ) : (
                <OrdersTable
                  orders={orders}
                  onStatusChange={handleStatusChange}
                />
              )}
            </TabsContent>
            <TabsContent value="completed">
              {loading ? (
                <p className="p-4 text-sm text-stone-500">Loading orders...</p>
              ) : (
                <OrdersTable
                  orders={completedOrders}
                  onStatusChange={handleStatusChange}
                />
              )}
            </TabsContent>
            <TabsContent value="pending">
              {loading ? (
                <p className="p-4 text-sm text-stone-500">Loading orders...</p>
              ) : (
                <OrdersTable
                  orders={pendingOrders}
                  onStatusChange={handleStatusChange}
                />
              )}
            </TabsContent>
            <TabsContent value="cancelled">
              {loading ? (
                <p className="p-4 text-sm text-stone-500">Loading orders...</p>
              ) : (
                <OrdersTable
                  orders={cancelledOrders}
                  onStatusChange={handleStatusChange}
                />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </SlideUp>
    </section>
  );
}
