import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
} from "../components/ui/table";
import {
  User,
  ShoppingBag,
  Search,
  X,
  LogOut,
  Pencil,
  Check,
  Loader2,
  Gift,
  Percent,
  Truck,
  Crown,
  ArrowRight,
  Lock,
  Globe,
} from "lucide-react";

// ─────────────────────────────────────────────
//  MOCK DATA — Ganti dengan fetch API jika perlu
// ─────────────────────────────────────────────
const MOCK_PROFILE = {
  full_name: "Clea Aresta",
  email: "clea@luminabeaute.com",
  joinDate: "9 Juli 2026",
};

const MOCK_STATS = {
  totalTransactions: 12,
  totalSpent: 2_450_000,
};

const MOCK_ACTIVITIES = [
  { id: 1, date: "5 Jul 2026", type: "Pembelian: Divine Glow Palette",       status: "Selesai",   statusColor: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  { id: 2, date: "28 Jun 2026", type: "Redeem Reward: Voucher Rp 50.000",    status: "Selesai",   statusColor: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  { id: 3, date: "15 Jun 2026", type: "Pembelian: Velvet Rose Lipstick",     status: "Selesai",   statusColor: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  { id: 4, date: "10 Mei 2026", type: "Upgrade Level: Bronze → Gold",        status: "Selesai",   statusColor: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  { id: 5, date: "1  Mei 2026", type: "Pendaftaran Akun Baru",               status: "Selesai",   statusColor: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
];

// Urutan tier dari terendah ke tertinggi
const TIER_ORDER = ["bronze", "gold", "diamond"];

const TIER_META = {
  bronze: {
    label: "Basic (Bronze)",
    badgeClass: "bg-stone-100 text-stone-700 border-stone-300",
    points: 850,
    targetPoints: 5000,
    nextTierLabel: "Premium (Gold)",
  },
  gold: {
    label: "Premium (Gold)",
    badgeClass: "bg-[#FFF5F5] text-[#8C2D40] border-[#8C2D40]/30",
    points: 4500,
    targetPoints: 15000,
    nextTierLabel: "VIP (Diamond)",
  },
  diamond: {
    label: "VIP (Diamond)",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-300",
    points: 12450,
    targetPoints: 15000,
    nextTierLabel: "Maksimum",
  },
};

// Social icons (same as ProductCatalog.jsx)
function InstagramIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function FacebookIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function TwitterIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

// ─────────────────────────────────────────────
//  KOMPONEN UTAMA
// ─────────────────────────────────────────────
export default function MemberPage() {
  const { profile: authProfile, session, signOut } = useAuth();
  const navigate = useNavigate();

  // Local state (tidak terhubung ke database sama sekali)
  const [tier, setTier]           = useState("bronze");
  const [fullName, setFullName]   = useState(
    authProfile?.full_name || MOCK_PROFILE.full_name
  );
  const [activities, setActivities] = useState(MOCK_ACTIVITIES);

  // Modal states
  const [isEditOpen,    setIsEditOpen]    = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);

  // Form & UI states
  const [editName,    setEditName]    = useState(fullName);
  const [saveMsg,     setSaveMsg]     = useState("");
  const [showSearch,  setShowSearch]  = useState(false);
  const [searchTerm,  setSearchTerm]  = useState("");
  const [upgradeAnim, setUpgradeAnim] = useState(false);

  // Derived values
  const email    = authProfile?.email || session?.email || MOCK_PROFILE.email;
  const joinDate = authProfile?.created_at
    ? new Date(authProfile.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
    : MOCK_PROFILE.joinDate;

  const tierMeta      = TIER_META[tier] ?? TIER_META.bronze;
  const tierIndex     = TIER_ORDER.indexOf(tier);
  const canUpgrade    = tierIndex < TIER_ORDER.length - 1;
  const nextTier      = canUpgrade ? TIER_ORDER[tierIndex + 1] : null;
  const progressPct   = Math.min((tierMeta.points / tierMeta.targetPoints) * 100, 100);

  // ── Handlers ──────────────────────────────
  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!editName.trim()) return;
    setFullName(editName.trim());
    setSaveMsg("Profil berhasil diperbarui!");
    setTimeout(() => { setIsEditOpen(false); setSaveMsg(""); }, 1400);
  };

  const handleUpgrade = () => {
    if (!canUpgrade) return;
    setUpgradeAnim(true);
    setTimeout(() => {
      // Tambah riwayat aktivitas secara lokal
      const newActivity = {
        id: Date.now(),
        date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
        type: `Upgrade Level: ${TIER_META[tier].label} → ${TIER_META[nextTier].label}`,
        status: "Selesai",
        statusColor: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      };
      setActivities((prev) => [newActivity, ...prev].slice(0, 5));
      setTier(nextTier);
      setUpgradeAnim(false);
      setIsUpgradeOpen(false);
    }, 900);
  };

  // ── Render ────────────────────────────────
  return (
    <div className="min-h-screen bg-[#FDFBF9] font-sans text-[#2A2522] flex flex-col">

      {/* Top Banner */}
      <div className="bg-[#8C2D40] py-2 px-4 text-center text-xs tracking-widest text-[#FFF5F5] uppercase">
        Pengiriman gratis untuk pesanan di atas Rp 500.000
      </div>

      {/* ── HEADER ─────────────────────────────── */}
      <header className="sticky top-0 z-50 w-full border-b border-[#F3EAE3] bg-white/95 py-4 px-6 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-2xl font-bold tracking-widest text-[#8C2D40] transition hover:opacity-90"
          >
            LUMINA BEAUTÉ
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest text-[#2A2522] uppercase">
            <button
              onClick={() => navigate("/")}
              className="hover:text-[#8C2D40] transition cursor-pointer"
            >
              Beranda
            </button>
            <button
              onClick={() => navigate("/")}
              className="hover:text-[#8C2D40] transition cursor-pointer"
            >
              Tentang Kami
            </button>
            <button
              onClick={() => navigate("/")}
              className="hover:text-[#8C2D40] transition cursor-pointer"
            >
              Koleksi Kami
            </button>
            <button
              onClick={() => navigate("/")}
              className="hover:text-[#8C2D40] transition cursor-pointer"
            >
              Ulasan
            </button>
            <button
              onClick={() => navigate("/member")}
              className="hover:text-[#8C2D40] transition cursor-pointer font-bold text-[#8C2D40]"
            >
              Member
            </button>
          </nav>

          {/* Header Action Icons */}
          <div className="flex items-center gap-4">
            {/* Search Toggler */}
            <div className="relative flex items-center">
              {showSearch && (
                <input
                  id="header-search-input"
                  type="search"
                  placeholder="Cari..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="mr-2 w-40 sm:w-60 rounded-full border border-[#F3EAE3] bg-[#FDFBF9] px-3 py-1 text-xs outline-none transition-all duration-300 focus:border-[#8C2D40]"
                />
              )}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="rounded-full p-2 text-[#2A2522] hover:bg-[#FFF5F5] hover:text-[#8C2D40] transition"
                aria-label="Cari produk"
              >
                {showSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </button>
            </div>

            {/* Shopping Bag Button */}
            <button
              onClick={() => navigate("/")}
              className="rounded-full p-2 text-[#2A2522] hover:bg-[#FFF5F5] hover:text-[#8C2D40] transition relative"
              aria-label="Keranjang Belanja"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-[#8C2D40]" />
            </button>

            {/* Profile User Icon */}
            <button
              onClick={() => navigate("/member")}
              className="rounded-full p-2 text-[#2A2522] hover:bg-[#FFF5F5] hover:text-[#8C2D40] transition"
              aria-label="Akun Saya"
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN ───────────────────────────────── */}
      <main className="mx-auto max-w-7xl w-full px-6 py-12 flex-1 space-y-12">

        {/* 1 ─ PROFIL HEADER */}
        <section className="bg-[#FFF5F5] border border-[#F3EAE3] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm animate-fade-in-up">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">

            {/* Avatar */}
            <div className="h-24 w-24 rounded-full border-2 border-[#8C2D40]/30 bg-white overflow-hidden flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                alt={fullName}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="space-y-1.5">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-wide text-[#2A2522] leading-none">
                  {fullName}
                </h1>
                <span className={`inline-block rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-widest font-sans ${tierMeta.badgeClass}`}>
                  {tierMeta.label}
                </span>
              </div>
              <p className="text-sm text-[#6B6B6B] font-sans font-normal">{email}</p>
              <p className="text-xs text-[#A89FB8] font-sans font-normal">Bergabung sejak {joinDate}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => { setEditName(fullName); setIsEditOpen(true); }}
              variant="outline"
              className="rounded-full border-[#F3EAE3] bg-white hover:bg-[#FFF5F5] hover:text-[#8C2D40] text-[11px] font-semibold uppercase tracking-widest font-sans px-6 h-10"
            >
              <Pencil className="h-3.5 w-3.5 mr-1.5" /> Edit Profil
            </Button>
            <Button
              onClick={() => setIsUpgradeOpen(true)}
              disabled={!canUpgrade}
              className="rounded-full bg-[#8C2D40] hover:bg-[#732231] text-white text-[11px] font-semibold uppercase tracking-widest font-sans px-6 h-10 shadow-md shadow-[#8C2D40]/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Crown className="h-3.5 w-3.5 mr-1.5" />
              {canUpgrade ? "Upgrade Tier" : "Tier Tertinggi"}
            </Button>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="rounded-full bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-[11px] font-semibold uppercase tracking-widest font-sans px-6 h-10"
            >
              <LogOut className="h-3.5 w-3.5 mr-1.5" /> Logout
            </Button>
          </div>
        </section>

        {/* 2 ─ STATISTIK */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-up">

          {/* Card Transaksi */}
          <Card className="rounded-2xl border border-[#F3EAE3] bg-white p-6 shadow-sm hover:shadow-md transition">
            <CardHeader className="p-0 space-y-1">
              <span className="text-[10px] font-sans font-bold tracking-widest text-[#8C2D40] uppercase">Total Transaksi</span>
              <CardTitle className="font-serif text-3xl font-medium text-[#2A2522]">
                {MOCK_STATS.totalTransactions} Kali
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-3">
              <p className="text-xs font-sans text-[#6B6B6B]">Akumulasi belanja Anda:</p>
              <p className="text-lg font-sans font-semibold text-[#8C2D40] mt-1">
                Rp {MOCK_STATS.totalSpent.toLocaleString("id-ID")}
              </p>
            </CardContent>
          </Card>

          {/* Card Poin */}
          <Card className="rounded-2xl border border-[#F3EAE3] bg-white p-6 shadow-sm hover:shadow-md transition">
            <CardHeader className="p-0 space-y-1">
              <span className="text-[10px] font-sans font-bold tracking-widest text-[#8C2D40] uppercase">Poin Kecantikan</span>
              <CardTitle className="font-serif text-3xl font-medium text-[#2A2522]">
                {tierMeta.points.toLocaleString("id-ID")} pts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 mt-3 space-y-2">
              <div className="h-1.5 w-full bg-[#FFF5F5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#8C2D40] rounded-full transition-all duration-700"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              {canUpgrade ? (
                <p className="text-[10px] font-sans text-[#A89FB8]">
                  {(tierMeta.targetPoints - tierMeta.points).toLocaleString("id-ID")} poin lagi menuju {tierMeta.nextTierLabel}
                </p>
              ) : (
                <p className="text-[10px] font-sans font-semibold text-emerald-600">✓ Membership VIP Tertinggi Aktif!</p>
              )}
            </CardContent>
          </Card>

          {/* Card Tier */}
          <Card className="rounded-2xl border border-[#F3EAE3] bg-white p-6 shadow-sm hover:shadow-md transition">
            <CardHeader className="p-0 space-y-1">
              <span className="text-[10px] font-sans font-bold tracking-widest text-[#8C2D40] uppercase">Tier Membership</span>
              <div className="flex items-center gap-2">
                <CardTitle className="font-serif text-3xl font-medium text-[#2A2522] uppercase">
                  {tier}
                </CardTitle>
                <Crown className="h-5 w-5 text-amber-500 fill-amber-500/20" />
              </div>
            </CardHeader>
            <CardContent className="p-0 mt-3">
              <p className="text-xs font-sans text-[#6B6B6B] leading-relaxed">
                Nikmati penawaran eksklusif, promo hadiah mingguan, dan gratis ongkir sesuai level aktif Anda.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* 3 ─ RIWAYAT AKTIVITAS */}
        <section className="rounded-3xl border border-[#F3EAE3] bg-white p-6 sm:p-8 space-y-6 shadow-sm animate-fade-in-up">
          <div className="border-b border-[#F3EAE3] pb-4 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-sans font-bold tracking-widest text-[#8C2D40] uppercase">Aktivitas Terbaru</span>
              <h2 className="font-serif text-2xl font-medium text-[#2A2522]">Riwayat Aktivitas & Transaksi</h2>
            </div>
            <span className="text-xs font-sans text-[#A89FB8]">5 data terakhir</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#F3EAE3]/40">
            <Table className="w-full text-left text-xs font-sans">
              <TableHeader className="bg-[#FFF5F5]/30">
                <TableRow className="border-b border-[#F3EAE3]">
                  <TableHead className="py-3.5 px-4 text-[10px] font-bold text-[#A89FB8] tracking-widest uppercase">Tanggal</TableHead>
                  <TableHead className="py-3.5 px-4 text-[10px] font-bold text-[#A89FB8] tracking-widest uppercase">Jenis Aktivitas</TableHead>
                  <TableHead className="py-3.5 px-4 text-[10px] font-bold text-[#A89FB8] tracking-widest uppercase text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((act) => (
                  <tr key={act.id} className="border-b border-[#F3EAE3]/40 hover:bg-[#FDFBF9]/50 transition-colors">
                    <td className="py-4 px-4 text-[#6B6B6B] font-normal whitespace-nowrap">{act.date}</td>
                    <td className="py-4 px-4 font-medium text-[#2A2522]">{act.type}</td>
                    <td className="py-4 px-4 text-right">
                      <span className={`inline-block rounded-full px-3 py-0.5 text-[9px] font-bold uppercase tracking-widest ${act.statusColor}`}>
                        {act.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* 4 ─ MEMBER BENEFITS */}
        <section className="space-y-8 animate-fade-in-up">
          <div className="space-y-2 text-center">
            <span className="text-[10px] font-sans font-bold tracking-widest text-[#8C2D40] uppercase">Exclusively For You</span>
            <h2 className="font-serif text-3xl font-medium tracking-wide text-[#2A2522]">Keuntungan Berdasarkan Level</h2>
            <div className="mx-auto h-[1px] w-24 bg-[#8C2D40]/30" />
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Bronze */}
            <BenefitCard
              active={tier === "bronze"}
              locked={false}
              title="Bronze (Basic)"
              benefits={["Diskon 5% untuk semua pembelian.", "Gratis ongkir min. belanja Rp 500.000.", "Voucher selamat datang."]}
            />
            {/* Gold */}
            <BenefitCard
              active={tier === "gold"}
              locked={tier === "bronze"}
              title="Gold (Premium)"
              benefits={["Diskon 10% untuk seluruh produk.", "Gratis ongkir min. belanja Rp 200.000.", "Voucher ulang tahun Rp 100.000."]}
            />
            {/* Diamond */}
            <BenefitCard
              active={tier === "diamond"}
              locked={tier !== "diamond"}
              title="Diamond (VIP)"
              benefits={["Diskon 15% tanpa minimum pembelian.", "Gratis ongkir sameday seluruh Indonesia.", "Akses Early Access produk baru."]}
            />
          </div>
        </section>
      </main>

      {/* ── FOOTER ─────────────────────────────── */}
      <footer className="bg-[#FFF5F5] border-t border-[#F3EAE3] text-[#2A2522] pt-16 pb-8 px-6 mt-16">
        <div className="mx-auto max-w-7xl space-y-12">
          <div className="grid gap-10 md:grid-cols-4">

            <div className="space-y-4 text-left">
              <h3 className="font-serif text-lg font-bold tracking-widest text-[#8C2D40] uppercase">LUMINA BEAUTÉ</h3>
              <p className="text-xs leading-relaxed text-[#6B6B6B] font-light">
                Menghadirkan keharmonisan kecantikan melalui formulasi bahan alami dan teknologi mutakhir.
              </p>
              <div className="flex items-center gap-3 pt-2">
                {[Globe, InstagramIcon, FacebookIcon, TwitterIcon].map((Icon, i) => (
                  <a key={i} href="#" className="rounded-full bg-white p-2 text-[#2A2522] border border-[#F3EAE3] hover:text-[#8C2D40] hover:border-[#8C2D40] transition">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-3 text-left">
              <h4 className="text-xs font-bold tracking-widest text-[#2A2522] uppercase">Belanja</h4>
              <ul className="space-y-2 text-xs text-[#6B6B6B] font-light">
                {["Koleksi Bibir", "Riasan Mata", "Riasan Wajah"].map((l) => (
                  <li key={l}><Link to="/" className="hover:text-[#8C2D40] hover:underline transition">{l}</Link></li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 text-left">
              <h4 className="text-xs font-bold tracking-widest text-[#2A2522] uppercase">Layanan</h4>
              <ul className="space-y-2 text-xs text-[#6B6B6B] font-light">
                {["Hubungi Kami", "Status Pengiriman", "Kebijakan Pengembalian", "FAQ"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-[#8C2D40] hover:underline transition">{l}</a></li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 text-left">
              <h4 className="text-xs font-bold tracking-widest text-[#2A2522] uppercase">Berlangganan</h4>
              <p className="text-xs text-[#6B6B6B] font-light">Dapatkan kabar terbaru tentang peluncuran eksklusif kami.</p>
              <form className="relative flex items-center border-b border-[#2A2522] py-2" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Alamat Email Anda" className="w-full bg-transparent text-xs outline-none pr-8 py-1 placeholder-[#A89FB8] text-[#2A2522]" />
                <button type="submit" className="absolute right-0 text-[#2A2522] hover:text-[#8C2D40] transition" aria-label="Submit">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#F3EAE3] pt-6 gap-4 text-[10px] font-bold tracking-widest text-[#A89FB8] uppercase">
            <span>© 2026 LUMINA BEAUTÉ. ALL RIGHTS RESERVED.</span>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Cookies"].map((l) => (
                <a key={l} href="#" className="hover:text-[#8C2D40] transition">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── MODAL: EDIT PROFIL ──────────────────── */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FDFBF9] border border-[#F3EAE3] rounded-2xl p-6 w-full max-w-md shadow-2xl relative space-y-4 animate-fade-in-up">
            <button onClick={() => { setIsEditOpen(false); setSaveMsg(""); }} className="absolute top-4 right-4 text-[#A89FB8] hover:text-[#2A2522] transition">
              <X className="h-5 w-5" />
            </button>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-semibold text-[#8C2D40]">Edit Profil Anda</h3>
              <p className="text-xs text-[#6B6B6B] font-light">Perbarui nama lengkap akun member Anda.</p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-wider block">Email Akun (Tetap)</label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full text-xs bg-[#FFF5F5] border border-[#F3EAE3] rounded-xl px-4 py-2.5 text-[#A89FB8] cursor-not-allowed"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-wider block">Nama Lengkap Baru</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full text-xs bg-white border border-[#F3EAE3] rounded-xl px-4 py-2.5 text-[#2A2522] focus:outline-none focus:border-[#8C2D40] transition"
                  placeholder="Masukkan nama lengkap"
                  required
                />
              </div>

              {saveMsg && (
                <div className="p-3 rounded-xl text-xs font-medium flex items-center gap-2 border bg-emerald-50 text-emerald-700 border-emerald-100">
                  <Check className="h-4 w-4" /> {saveMsg}
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <Button type="button" onClick={() => { setIsEditOpen(false); setSaveMsg(""); }} variant="outline"
                  className="flex-1 rounded-xl border-[#F3EAE3] text-xs font-bold text-[#6B6B6B] hover:bg-stone-50">
                  Batal
                </Button>
                <Button type="submit"
                  className="flex-1 rounded-xl bg-[#8C2D40] text-white text-xs font-bold hover:bg-[#722332]">
                  Simpan Perubahan
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: UPGRADE TIER ─────────────────── */}
      {isUpgradeOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FDFBF9] border border-[#F3EAE3] rounded-2xl p-6 w-full max-w-md shadow-2xl relative space-y-4 animate-fade-in-up">
            <button onClick={() => setIsUpgradeOpen(false)} className="absolute top-4 right-4 text-[#A89FB8] hover:text-[#2A2522] transition">
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-2 text-center">
              <Crown className="h-10 w-10 text-amber-500 fill-amber-500/20 mx-auto" />
              <h3 className="font-serif text-xl font-semibold text-[#8C2D40]">Upgrade Level Membership</h3>
              <p className="text-xs text-[#6B6B6B] font-light max-w-xs mx-auto">
                Tingkatkan status keanggotaan untuk menikmati lebih banyak benefit eksklusif.
              </p>
            </div>

            <div className="bg-[#FFF5F5] rounded-xl border border-[#F3EAE3] p-4 space-y-2.5">
              <div className="flex justify-between text-xs border-b border-[#F3EAE3]/40 pb-2">
                <span className="text-[#6B6B6B]">Level Saat Ini</span>
                <span className="font-bold text-[#2A2522]">{tierMeta.label}</span>
              </div>
              <div className="flex justify-between text-xs pt-1">
                <span className="text-[#6B6B6B]">Level Berikutnya</span>
                <span className="font-bold text-[#8C2D40] uppercase">
                  {canUpgrade ? TIER_META[nextTier].label : "—"}
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <Button type="button" onClick={() => setIsUpgradeOpen(false)} variant="outline"
                className="flex-1 rounded-xl border-[#F3EAE3] text-xs font-bold text-[#6B6B6B] hover:bg-stone-50">
                Batal
              </Button>
              <Button
                onClick={handleUpgrade}
                disabled={upgradeAnim || !canUpgrade}
                className="flex-1 rounded-xl bg-[#8C2D40] text-white text-xs font-bold hover:bg-[#722332] disabled:opacity-50"
              >
                {upgradeAnim ? "Memproses..." : "Upgrade Sekarang"}
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ─────────────────────────────────────────────
//  SUBCOMPONENT: Kartu Benefit per Tier
// ─────────────────────────────────────────────
function BenefitCard({ active, locked, title, benefits }) {
  return (
    <Card
      className={`rounded-2xl border bg-white p-6 space-y-4 shadow-sm transition flex flex-col ${
        active  ? "border-[#8C2D40] ring-4 ring-[#FFF5F5]" :
        locked  ? "border-[#F3EAE3] opacity-60"            :
                  "border-[#F3EAE3]"
      }`}
    >
      <div className="flex items-center justify-between pb-2 border-b border-[#F3EAE3]">
        <h3 className="font-serif text-lg font-semibold text-[#2A2522]">{title}</h3>
        {active && (
          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
            Level Aktif
          </span>
        )}
        {locked && !active && (
          <span className="flex items-center gap-1 text-[9px] text-[#A89FB8] font-bold uppercase">
            <Lock className="h-3 w-3" /> Terkunci
          </span>
        )}
      </div>
      <ul className="space-y-3.5 text-xs text-[#6B6B6B] font-light">
        {benefits.map((b, i) => {
          const Icon = i === 0 ? Percent : i === 1 ? Truck : Gift;
          return (
            <li key={i} className="flex items-start gap-2.5">
              <Icon className="h-4 w-4 text-[#8C2D40] flex-shrink-0 mt-0.5" />
              <span>{b}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
