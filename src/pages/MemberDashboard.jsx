import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { PageHeaderSection } from "../components/6-section";
import { FadeIn } from "../components/15-animation";
import { Badge } from "../components/1-basic";
import Avatar from "../components/11-media/Avatar";
import StatCard from "../components/3-data-display/StatCard";

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

function formatPoints(points) {
  return Number(points ?? 0).toLocaleString("id-ID");
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
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/40">
            <p className="text-sm text-slate-500">Memuat data member...</p>
          </div>
        </FadeIn>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <FadeIn>
        <div className="rounded-[32px] bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-500 p-8 text-white shadow-2xl shadow-fuchsia-500/20">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-200/80">
                Selamat datang, {profile.full_name?.split(" ")[0] || "Member"}
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                Dashboard Loyalty Member
              </h1>
              <p className="mt-2 max-w-xl text-sm text-slate-100/90">
                Lihat poin, tier, dan riwayat pesanan kamu dalam satu tampilan.
              </p>
            </div>
            <div className="flex items-center gap-4 rounded-3xl bg-white/10 p-4 backdrop-blur-xl">
              <Avatar name={profile.full_name} size={64} />
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-200/70">
                  Member
                </p>
                <p className="text-xl font-semibold">
                  {profile.full_name || "Guest"}
                </p>
                <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-slate-100">
                  {profile.role || "member"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="grid gap-4 xl:grid-cols-4">
        <StatCard
          label="Total Poin"
          value={`Rp ${formatPoints(profile.total_points ?? 0)}`}
          note="Kumpulkan poin setiap kali Anda membayar."
          variant="pink"
        />
        <StatCard
          label="Tier Saat Ini"
          value={String(profile.tier || "bronze").toUpperCase()}
          note="Dapatkan lebih banyak keuntungan dengan naik level."
          variant="violet"
        />
        <StatCard
          label="Pesanan Selesai"
          value={orders.length}
          note="Jumlah transaksi yang berhasil."
          variant="indigo"
        />
        <StatCard
          label="Status Akun"
          value={profile.role || "member"}
          note="Akses eksklusif untuk halaman member."
          variant="sky"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Profil Member
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Informasi pribadi dan email terdaftar.
              </p>
            </div>
            <Badge className={tierStyles(profile.tier || "bronze")}>
              {" "}
              {String(profile.tier || "bronze").toUpperCase()}{" "}
            </Badge>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Nama</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {profile.full_name || "Member"}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Email</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {profile.email || "-"}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Total Poin</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {formatPoints(profile.total_points ?? 0)}
              </p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Role</p>
              <p className="mt-2 text-lg font-semibold text-slate-900 capitalize">
                {profile.role || "member"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
          <h2 className="text-xl font-semibold text-slate-900">
            Target Poin Bulan Ini
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Kumpulkan poin untuk naik ke tier berikutnya.
          </p>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-slate-700">
                  Bronze ke Silver
                </p>
                <p className="text-sm font-semibold text-slate-900">2000</p>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                  style={{
                    width: `${Math.min((profile.total_points ?? 0) / 20, 100)}%`,
                  }}
                />
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-slate-700">
                  Silver ke Gold
                </p>
                <p className="text-sm font-semibold text-slate-900">5000</p>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                  style={{
                    width: `${Math.min((profile.total_points ?? 0) / 50, 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-xl font-semibold text-slate-900">
            Riwayat Pesanan
          </h3>
          <p className="text-sm text-slate-500">
            Total pesanan: {orders.length}
          </p>
        </div>

        {loading ? (
          <p className="mt-3 text-sm text-slate-500">
            Memuat riwayat pesanan...
          </p>
        ) : orders.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500">Belum ada pesanan.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-[26px] border border-slate-200 bg-slate-50 p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">
                      Order #{order.id.slice(0, 8)}
                    </p>
                    <p className="text-sm text-slate-500">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">Status</p>
                    <p className="text-base font-semibold capitalize text-slate-800">
                      {order.status}
                    </p>
                  </div>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-3xl bg-white p-4">
                    <p className="text-sm text-slate-500">Total</p>
                    <p className="font-semibold text-slate-900">
                      Rp {Number(order.total_amount).toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white p-4">
                    <p className="text-sm text-slate-500">Points Earned</p>
                    <p className="font-semibold text-slate-900">
                      {order.points_earned ?? 0}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white p-4">
                    <p className="text-sm text-slate-500">Produk</p>
                    <p className="font-semibold text-slate-900">
                      {(order.order_items || []).length} item
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-[24px] bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Detail Produk
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-600">
                    {(order.order_items || []).map((item) => (
                      <li
                        key={`${order.id}-${item.product_id}`}
                        className="rounded-2xl bg-slate-100 p-3"
                      >
                        <span className="font-medium text-slate-800">
                          {item.products?.name || "Produk"}
                        </span>
                        <span className="text-slate-500">
                          {" "}
                          × {item.quantity}
                        </span>
                        <span className="float-right font-semibold text-slate-800">
                          Rp{" "}
                          {Number(item.price_at_purchase).toLocaleString(
                            "id-ID",
                          )}
                        </span>
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
