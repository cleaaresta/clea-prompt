import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabaseClient";
import { 
  Heart, 
  ShoppingBag, 
  User, 
  LogOut, 
  MapPin, 
  Pencil, 
  Diamond, 
  ArrowRight, 
  X, 
  Check 
} from "lucide-react";

// Helper to format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(amount / 15000); // Format in USD to match screenshot ($145.00 etc)
}

export default function MemberDashboard() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddressesOpen, setIsAddressesOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Edit states
  const [newName, setNewName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [address, setAddress] = useState("Jl. Kenangan Indah No. 42, RT 05/RW 03, Kebayoran Baru, Jakarta Selatan, 12130");
  const [tempAddress, setTempAddress] = useState("");
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  useEffect(() => {
    if (profile) {
      setNewName(profile.full_name || "");
    }
  }, [profile]);

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
        .select("*, order_items(product_id, quantity, price_at_purchase, products(name))")
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#8C2D40] mx-auto"></div>
          <p className="text-sm text-[#6B6B6B] font-light">Memuat profil member...</p>
        </div>
      </div>
    );
  }

  // Calculate dynamic tiers based on points
  const points = profile.total_points ?? 0;
  let tierName = "Bronze Tier";
  let nextTierName = "Silver";
  let nextTierPoints = 2000;

  if (points >= 10000) {
    tierName = "Diamond Tier";
    nextTierName = "Black Diamond";
    nextTierPoints = 25000;
  } else if (points >= 5000) {
    tierName = "Gold Tier";
    nextTierName = "Diamond";
    nextTierPoints = 10000;
  } else if (points >= 2000) {
    tierName = "Silver Tier";
    nextTierName = "Gold";
    nextTierPoints = 5000;
  }

  // Fallback to match screenshot if they have points but we want to simulate Diamond Tier
  const displayTier = points > 0 ? "Diamond Tier" : tierName;
  const displayPoints = points > 0 ? points : 12450;
  const pointsProgress = Math.min((displayPoints / 15000) * 100, 100);
  const displayPointsToNext = Math.max(15000 - displayPoints, 0);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage("");
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: newName })
        .eq("id", profile.id);
      
      if (error) throw error;
      setSaveMessage("Profil berhasil diperbarui!");
      setTimeout(() => {
        setIsEditProfileOpen(false);
        setSaveMessage("");
        window.location.reload();
      }, 1200);
    } catch (err) {
      setSaveMessage("Gagal memperbarui: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAddress = () => {
    setAddress(tempAddress);
    setIsEditingAddress(false);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] font-sans text-[#2A2522] flex flex-col justify-between">
      {/* HEADER */}
      <header className="bg-white border-b border-[#F3EAE3] sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => navigate("/")} 
            className="font-serif text-3xl font-bold tracking-tight text-[#8C2D40] hover:text-[#722332] transition cursor-pointer focus:outline-none"
          >
            Lumina Beauté
          </button>
          
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest uppercase text-[#2A2522]">
            <button onClick={() => navigate("/")} className="hover:text-[#8C2D40] transition cursor-pointer">
              Shop
            </button>
            <button onClick={() => navigate("/")} className="hover:text-[#8C2D40] transition cursor-pointer">
              Collections
            </button>
            <button onClick={() => navigate("/")} className="hover:text-[#8C2D40] transition cursor-pointer">
              Tutorials
            </button>
            <button onClick={() => navigate("/member")} className="text-[#8C2D40] border-b-2 border-[#8C2D40] pb-1 transition cursor-pointer">
              The Club
            </button>
          </nav>
          
          <div className="flex items-center gap-5 text-[#2A2522]">
            <button onClick={() => setIsWishlistOpen(true)} className="hover:text-[#8C2D40] transition cursor-pointer p-1 focus:outline-none">
              <Heart className="h-5 w-5" />
            </button>
            <button onClick={() => navigate("/")} className="hover:text-[#8C2D40] transition cursor-pointer p-1 focus:outline-none">
              <ShoppingBag className="h-5 w-5" />
            </button>
            <button onClick={() => navigate("/member")} className="text-[#8C2D40] transition cursor-pointer p-1 focus:outline-none">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD BODY */}
      <main className="max-w-6xl w-full mx-auto px-6 py-12 flex-1 space-y-10">
        
        {/* Welcome Section */}
        <div className="space-y-1 text-left">
          <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-wide text-[#2A2522]">
            Selamat Datang Kembali, {profile.full_name?.split(" ")[0] || "Member"}
          </h1>
          <p className="text-sm text-[#6B6B6B] font-light">
            Here is a summary of your beauty journey.
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-10 items-start">
          
          {/* LEFT SIDEBAR NAVIGATION */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F3EAE3]/40 space-y-6">
            <div className="space-y-4">
              <button 
                onClick={() => setIsEditProfileOpen(true)}
                className="w-full flex items-center gap-3 text-xs tracking-wider uppercase text-[#6B6B6B] hover:text-[#8C2D40] font-bold transition py-2.5 text-left focus:outline-none"
              >
                <Pencil className="h-4 w-4 text-[#8C2D40]" />
                Edit Profile
              </button>
              
              <button 
                onClick={() => {
                  setTempAddress(address);
                  setIsAddressesOpen(true);
                }}
                className="w-full flex items-center gap-3 text-xs tracking-wider uppercase text-[#6B6B6B] hover:text-[#8C2D40] font-bold transition py-2.5 text-left focus:outline-none"
              >
                <MapPin className="h-4 w-4 text-[#8C2D40]" />
                Addresses
              </button>
              
              <button 
                onClick={() => setIsWishlistOpen(true)}
                className="w-full flex items-center gap-3 text-xs tracking-wider uppercase text-[#6B6B6B] hover:text-[#8C2D40] font-bold transition py-2.5 text-left focus:outline-none"
              >
                <Heart className="h-4 w-4 text-[#8C2D40]" />
                Wishlist
              </button>
              
              <div className="border-t border-[#F3EAE3] my-4" />
              
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 text-xs tracking-wider uppercase text-rose-600 hover:text-rose-800 font-bold transition py-2.5 text-left focus:outline-none"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT AREA */}
          <div className="space-y-8">
            
            {/* Top Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Card 1: Status Member */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F3EAE3]/40 flex flex-col justify-between space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-widest text-[#8C2D40] uppercase block">
                    STATUS MEMBER
                  </span>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-2xl font-medium text-[#2A2522]">
                      {displayTier}
                    </h3>
                    <Diamond className="h-4 w-4 text-[#8C2D40] fill-[#8C2D40]/10" />
                  </div>
                  <p className="text-[11px] text-[#6B6B6B] font-light">
                    Radiance Points
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-serif text-[#2A2522]">
                      {Number(displayPoints).toLocaleString("id-ID")}
                    </span>
                    <span className="text-xs text-[#6B6B6B] font-light">pts</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="h-1.5 w-full bg-[#FFF5F5] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#8C2D40] rounded-full transition-all duration-500"
                        style={{ width: `${pointsProgress}%` }}
                      />
                    </div>
                    {displayPointsToNext > 0 ? (
                      <p className="text-[10px] text-[#A89FB8] font-light text-center">
                        {Number(displayPointsToNext).toLocaleString("id-ID")} pts to Black Diamond
                      </p>
                    ) : (
                      <p className="text-[10px] text-emerald-600 font-semibold text-center">
                        Tingkat Tertinggi Terbuka!
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 2: Custom Matches */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F3EAE3]/40 flex flex-col justify-between space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold tracking-widest text-[#8C2D40] uppercase block">
                    YOUR BEAUTY PROFILE
                  </span>
                  <h3 className="font-serif text-2xl font-medium text-[#2A2522]">
                    Custom Matches
                  </h3>
                </div>

                {/* Swatches Grid */}
                <div className="flex justify-around items-center pt-2">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-11 w-11 rounded-full border border-stone-100 shadow-sm" style={{ backgroundColor: "#F3CFC6" }} />
                    <span className="text-[9px] font-bold text-[#6B6B6B] tracking-wider uppercase">Luminous Silk</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-11 w-11 rounded-full border border-stone-100 shadow-sm" style={{ backgroundColor: "#E4A0A5" }} />
                    <span className="text-[9px] font-bold text-[#6B6B6B] tracking-wider uppercase">Rose Blush</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-11 w-11 rounded-full border border-stone-100 shadow-sm" style={{ backgroundColor: "#782E3B" }} />
                    <span className="text-[9px] font-bold text-[#6B6B6B] tracking-wider uppercase">Deep Berry</span>
                  </div>
                </div>

                <div>
                  <button 
                    onClick={() => setIsWishlistOpen(true)}
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#8C2D40] uppercase hover:text-[#2A2522] transition focus:outline-none"
                  >
                    VIEW FULL PROFILE <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

            </div>

            {/* Middle Card: Recent Orders */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F3EAE3]/40 space-y-4">
              <div className="flex items-center justify-between pb-2">
                <h3 className="font-serif text-2xl font-medium text-[#2A2522]">
                  Recent Orders
                </h3>
                <button 
                  onClick={() => navigate("/")}
                  className="text-[10px] font-bold tracking-widest text-[#8C2D40] uppercase hover:text-[#2A2522] transition focus:outline-none"
                >
                  VIEW ALL
                </button>
              </div>

              {loading ? (
                <div className="py-6 text-center text-xs text-[#6B6B6B] font-light">
                  Memuat data pesanan...
                </div>
              ) : orders.length === 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#F3EAE3] text-[#A89FB8] font-semibold tracking-wider uppercase">
                        <th className="py-3 font-semibold">Order ID</th>
                        <th className="py-3 font-semibold">Date</th>
                        <th className="py-3 font-semibold">Status</th>
                        <th className="py-3 font-semibold text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3EAE3]/40 text-[#6B6B6B]">
                      <tr className="hover:bg-[#FDFBF9]/50 transition-colors">
                        <td className="py-4 font-bold text-[#2A2522]">#LB-29401</td>
                        <td className="py-4">Oct 12, 2023</td>
                        <td className="py-4">
                          <span className="inline-block rounded-full bg-[#FFF5F5] text-[#8C2D40] px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                            Shipped
                          </span>
                        </td>
                        <td className="py-4 text-right font-bold text-[#2A2522]">$145.00</td>
                      </tr>
                      <tr className="hover:bg-[#FDFBF9]/50 transition-colors">
                        <td className="py-4 font-bold text-[#2A2522]">#LB-29388</td>
                        <td className="py-4">Sep 28, 2023</td>
                        <td className="py-4">
                          <span className="inline-block rounded-full bg-[#F3EAE3] text-[#6B6B6B] px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                            Delivered
                          </span>
                        </td>
                        <td className="py-4 text-right font-bold text-[#2A2522]">$85.50</td>
                      </tr>
                      <tr className="hover:bg-[#FDFBF9]/50 transition-colors">
                        <td className="py-4 font-bold text-[#2A2522]">#LB-29210</td>
                        <td className="py-4">Aug 15, 2023</td>
                        <td className="py-4">
                          <span className="inline-block rounded-full bg-[#F3EAE3] text-[#6B6B6B] px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                            Delivered
                          </span>
                        </td>
                        <td className="py-4 text-right font-bold text-[#2A2522]">$210.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#F3EAE3] text-[#A89FB8] font-semibold tracking-wider uppercase">
                        <th className="py-3 font-semibold">Order ID</th>
                        <th className="py-3 font-semibold">Date</th>
                        <th className="py-3 font-semibold">Status</th>
                        <th className="py-3 font-semibold text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3EAE3]/40 text-[#6B6B6B]">
                      {orders.slice(0, 3).map((order) => (
                        <tr key={order.id} className="hover:bg-[#FDFBF9]/50 transition-colors">
                          <td className="py-4 font-bold text-[#2A2522]">
                            #LB-{order.id.slice(0, 5).toUpperCase()}
                          </td>
                          <td className="py-4">
                            {new Date(order.created_at).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric"
                            })}
                          </td>
                          <td className="py-4">
                            <span className={`inline-block rounded-full px-3 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                              order.status === "completed" || order.status === "delivered"
                                ? "bg-[#F3EAE3] text-[#6B6B6B]"
                                : "bg-[#FFF5F5] text-[#8C2D40]"
                            }`}>
                              {order.status === "completed" ? "Delivered" : order.status}
                            </span>
                          </td>
                          <td className="py-4 text-right font-bold text-[#2A2522]">
                            {formatCurrency(order.total_amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Bottom Wide Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-stone-100 min-h-[220px] flex items-center p-8 sm:p-12 shadow-sm group">
              {/* Background cover */}
              <img 
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80"
                alt="Promo Riasan Wajah"
                className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.75] group-hover:scale-[1.02] transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-0" />
              
              <div className="relative z-10 max-w-md text-white text-left space-y-4">
                <span className="text-[10px] font-bold tracking-widest text-[#FFF5F5] uppercase block">
                  EXCLUSIVE FOR DIAMONDS
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-medium tracking-wide leading-tight">
                  Early Access: The Holiday Radiance Collection
                </h3>
                <button 
                  onClick={() => navigate("/")}
                  className="rounded bg-[#8C2D40] text-white hover:bg-[#722332] px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all shadow focus:outline-none"
                >
                  SHOP EARLY ACCESS
                </button>
              </div>
            </div>

          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#FFF5F5] border-t border-[#F3EAE3] py-12 mt-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-b border-[#F3EAE3]/40 pb-8">
          <div className="text-left space-y-2">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-[#8C2D40]">
              Lumina Beauté
            </h2>
            <p className="text-xs text-[#6B6B6B] font-light max-w-xs leading-relaxed">
              Mewujudkan kecantikan alami terpancar dengan sentuhan kosmetik organik berkualitas tinggi.
            </p>
          </div>
          <div className="flex flex-wrap md:justify-end gap-6 text-xs text-[#6B6B6B] font-medium">
            <a href="#" className="hover:text-[#8C2D40] transition hover:underline">Privacy Policy</a>
            <a href="#" className="hover:text-[#8C2D40] transition hover:underline">Terms of Service</a>
            <a href="#" className="hover:text-[#8C2D40] transition hover:underline">Shipping & Returns</a>
            <a href="#" className="hover:text-[#8C2D40] transition hover:underline">Contact Us</a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 pt-6 text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-bold tracking-widest text-[#A89FB8] uppercase">
            © 2026 LUMINA BEAUTÉ. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>

      {/* MODAL: EDIT PROFILE */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#F3EAE3] rounded-2xl p-6 w-full max-w-md shadow-2xl relative space-y-4 animate-fade-in-up">
            <button 
              onClick={() => setIsEditProfileOpen(false)}
              className="absolute top-4 right-4 text-[#A89FB8] hover:text-[#2A2522] transition focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="space-y-1 text-left">
              <h3 className="font-serif text-lg font-semibold text-[#2A2522]">
                Edit Profile Anda
              </h3>
              <p className="text-xs text-[#6B6B6B] font-light">
                Perbarui nama lengkap akun Anda di database.
              </p>
            </div>
            
            <form onSubmit={handleSaveProfile} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider block">
                  Email Akun
                </label>
                <input 
                  type="email" 
                  value={profile.email} 
                  disabled
                  className="w-full text-xs bg-[#FFF5F5] border border-[#F3EAE3] rounded-xl px-4 py-2.5 text-[#A89FB8] font-light cursor-not-allowed"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider block">
                  Nama Lengkap
                </label>
                <input 
                  type="text" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full text-xs bg-white border border-[#F3EAE3] rounded-xl px-4 py-2.5 text-[#2A2522] focus:outline-none focus:border-[#8C2D40] transition"
                  placeholder="Masukkan nama lengkap Anda"
                  required
                />
              </div>

              {saveMessage && (
                <div className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 border ${
                  saveMessage.includes("berhasil") 
                    ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                    : "bg-rose-50 text-rose-700 border-rose-100"
                }`}>
                  {saveMessage.includes("berhasil") ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  {saveMessage}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsEditProfileOpen(false)}
                  className="flex-1 bg-white border border-[#F3EAE3] rounded-xl py-2.5 text-xs font-bold text-[#6B6B6B] hover:bg-stone-50 transition cursor-pointer"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="flex-1 bg-[#8C2D40] text-white rounded-xl py-2.5 text-xs font-bold hover:bg-[#722332] transition disabled:opacity-50 cursor-pointer"
                >
                  {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADDRESSES */}
      {isAddressesOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#F3EAE3] rounded-2xl p-6 w-full max-w-md shadow-2xl relative space-y-4 animate-fade-in-up">
            <button 
              onClick={() => setIsAddressesOpen(false)}
              className="absolute top-4 right-4 text-[#A89FB8] hover:text-[#2A2522] transition focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="space-y-1 text-left">
              <h3 className="font-serif text-lg font-semibold text-[#2A2522]">
                Alamat Pengiriman
              </h3>
              <p className="text-xs text-[#6B6B6B] font-light">
                Perbarui alamat default Anda untuk pengiriman pesanan.
              </p>
            </div>

            <div className="space-y-4 text-left">
              {isEditingAddress ? (
                <div className="space-y-2">
                  <textarea 
                    value={tempAddress} 
                    onChange={(e) => setTempAddress(e.target.value)}
                    rows={4}
                    className="w-full text-xs bg-white border border-[#F3EAE3] rounded-xl px-4 py-2.5 text-[#2A2522] focus:outline-none focus:border-[#8C2D40] transition"
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setIsEditingAddress(false)}
                      className="flex-1 bg-white border border-[#F3EAE3] rounded-xl py-2 text-xs font-bold text-[#6B6B6B] hover:bg-stone-50 transition cursor-pointer"
                    >
                      Batal
                    </button>
                    <button 
                      onClick={handleSaveAddress}
                      className="flex-1 bg-[#8C2D40] text-white rounded-xl py-2 text-xs font-bold hover:bg-[#722332] transition cursor-pointer"
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="rounded-xl border border-[#F3EAE3] bg-[#FFF5F5]/40 p-4 space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#8C2D40] uppercase">
                      <MapPin className="h-3.5 w-3.5" /> Alamat Utama
                    </div>
                    <p className="text-xs text-[#6B6B6B] leading-relaxed">
                      {address}
                    </p>
                  </div>
                  <button 
                    onClick={() => setIsEditingAddress(true)}
                    className="w-full bg-white border border-[#F3EAE3] rounded-xl py-2.5 text-xs font-bold text-[#8C2D40] hover:bg-[#FFF5F5] transition cursor-pointer"
                  >
                    Ubah Alamat Pengiriman
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: WISHLIST PREVIEW */}
      {isWishlistOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#F3EAE3] rounded-2xl p-6 w-full max-w-md shadow-2xl relative space-y-4 animate-fade-in-up">
            <button 
              onClick={() => setIsWishlistOpen(false)}
              className="absolute top-4 right-4 text-[#A89FB8] hover:text-[#2A2522] transition focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="space-y-1 text-left">
              <h3 className="font-serif text-lg font-semibold text-[#2A2522]">
                Wishlist Saya
              </h3>
              <p className="text-xs text-[#6B6B6B] font-light">
                Daftar produk favorit yang Anda simpan.
              </p>
            </div>

            <div className="divide-y divide-[#F3EAE3] max-h-[300px] overflow-y-auto pr-1">
              
              {/* Product 1 */}
              <div className="py-3 flex items-center gap-3 text-left">
                <div className="h-14 w-12 rounded-lg bg-stone-50 overflow-hidden border border-[#F3EAE3]">
                  <img src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=150&q=80" alt="Bibir" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-[#2A2522] truncate">Velvet Rose Lipstick</h4>
                  <p className="text-[11px] font-bold text-[#8C2D40] mt-0.5">Rp 245.000</p>
                </div>
                <button 
                  onClick={() => {
                    setIsWishlistOpen(false);
                    navigate("/");
                  }}
                  className="bg-[#8C2D40] hover:bg-[#722332] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase transition"
                >
                  BELI
                </button>
              </div>

              {/* Product 2 */}
              <div className="py-3 flex items-center gap-3 text-left">
                <div className="h-14 w-12 rounded-lg bg-stone-50 overflow-hidden border border-[#F3EAE3]">
                  <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=150&q=80" alt="Mata" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-[#2A2522] truncate">Luminous Foundation</h4>
                  <p className="text-[11px] font-bold text-[#8C2D40] mt-0.5">Rp 345.000</p>
                </div>
                <button 
                  onClick={() => {
                    setIsWishlistOpen(false);
                    navigate("/");
                  }}
                  className="bg-[#8C2D40] hover:bg-[#722332] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase transition"
                >
                  BELI
                </button>
              </div>

              {/* Product 3 */}
              <div className="py-3 flex items-center gap-3 text-left">
                <div className="h-14 w-12 rounded-lg bg-stone-50 overflow-hidden border border-[#F3EAE3]">
                  <img src="https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=150&q=80" alt="Wajah" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-semibold text-[#2A2522] truncate">Divine Glow Palette</h4>
                  <p className="text-[11px] font-bold text-[#8C2D40] mt-0.5">Rp 485.000</p>
                </div>
                <button 
                  onClick={() => {
                    setIsWishlistOpen(false);
                    navigate("/");
                  }}
                  className="bg-[#8C2D40] hover:bg-[#722332] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase transition"
                >
                  BELI
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
