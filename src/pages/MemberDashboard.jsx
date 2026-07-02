import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { PageHeaderSection } from "../components/6-section";
import { FadeIn } from "../components/15-animation";
import { Badge } from "../components/1-basic";

function tierStyles(tier) {
  switch (tier) {
    case "gold":
      return "bg-amber-500 text-white";
    case "silver":
      return "bg-slate-400 text-white";
    default:
      return "bg-stone-600 text-white";
  }
}

export default function MemberDashboard() {
  const { profile } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      if (!profile?.id) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("orders")
        .select(
          "*, order_items(product_id, quantity, price_at_purchase, products(name))",
        )
        .eq("user_id", profile.id)
        .order("created_at", { ascending: false });

      if (!error) {
        setOrders(data || []);
      }
      setLoading(false);
    };

    loadOrders();
  }, [profile?.id]);

  if (!profile) {
    return (
      <section className="space-y-6">
        <FadeIn>
          <PageHeaderSection
            title="Member Dashboard"
            subtitle="Pantau profil, poin, dan riwayat pesanan Anda."
          />
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-500">Memuat data member...</p>
          </div>
        </FadeIn>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <FadeIn>
        <PageHeaderSection
          title="Member Dashboard"
          subtitle="Pantau profil, poin, dan riwayat pesanan Anda."
        />
      </FadeIn>

      <div className="grid gap-4 xl:grid-cols-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-stone-500">Nama</p>
          <p className="mt-2 text-xl font-semibold text-stone-800">
            {profile.full_name || "Member"}
          </p>
          <p className="mt-3 text-sm text-stone-500">Email</p>
          <p className="text-sm font-medium text-stone-700">{profile.email || "-"}</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-stone-500">Tier Aktif</p>
          <div className="mt-3 inline-flex items-center gap-2">
            <Badge className={tierStyles(profile.tier || "bronze")}> 
              {String(profile.tier || "bronze").toUpperCase()}
            </Badge>
          </div>
          <p className="mt-3 text-sm text-stone-500">
            Pertahankan poin untuk naik level.
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-stone-500">Total Poin</p>
          <p className="mt-2 text-3xl font-semibold text-stone-800">
            {profile.total_points ?? 0}
          </p>
          <p className="mt-2 text-sm text-stone-500">
            Kumpulkan poin dari setiap pembelian.
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-stone-500">Role</p>
          <p className="mt-2 text-xl font-semibold text-stone-800 capitalize">
            {profile.role || "member"}
          </p>
          <p className="mt-3 text-sm text-stone-500">
            Akses halaman member khusus.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-stone-800">
            Riwayat Pesanan
          </h3>
          <p className="text-sm text-stone-500">
            Total pesanan: {orders.length}
          </p>
        </div>

        {loading ? (
          <p className="mt-3 text-sm text-stone-500">
            Memuat riwayat pesanan...
          </p>
        ) : orders.length === 0 ? (
          <p className="mt-3 text-sm text-stone-500">Belum ada pesanan.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-stone-800">
                      Order #{order.id.slice(0, 8)}
                    </p>
                    <p className="text-sm text-stone-500">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-stone-500">Status</p>
                    <p className="text-base font-semibold capitalize text-stone-800">
                      {order.status}
                    </p>
                  </div>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <div>
                    <p className="text-sm text-stone-500">Total</p>
                    <p className="font-semibold text-stone-800">
                      Rp {Number(order.total_amount).toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-stone-500">Points Earned</p>
                    <p className="font-semibold text-stone-800">
                      {order.points_earned ?? 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-stone-500">Produk</p>
                    <p className="font-semibold text-stone-800">
                      {(order.order_items || []).length} item
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-white p-4">
                  <p className="text-sm font-semibold text-stone-800">Detail Produk</p>
                  <ul className="mt-3 space-y-2 text-sm text-stone-600">
                    {(order.order_items || []).map((item) => (
                      <li key={`${order.id}-${item.product_id}`}>
                        • {item.products?.name || "Produk"} × {item.quantity} = Rp {Number(item.price_at_purchase).toLocaleString("id-ID")}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
