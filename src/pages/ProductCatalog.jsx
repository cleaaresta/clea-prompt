import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Badge } from "../components/1-basic";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { FadeIn } from "../components/15-animation";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import {
  Search,
  ShoppingBag,
  User,
  Star,
  ArrowRight,
  Globe,
  Menu,
  X,
  Check,
  ChevronRight,
  Loader2,
} from "lucide-react";

const DEFAULT_PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80";

function InstagramIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

const sampleProducts = [
  {
    id: "p1",
    name: "Velvet Rose Lipstick",
    description:
      "Warna mawar beludru yang mewah dengan formula melembapkan dan hasil akhir matte yang tahan lama.",
    price: 245000,
    stock: 18,
    image_url:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=900&q=80",
    tag: "NEW",
    stars: 5,
    reviews: 120,
  },
  {
    id: "p2",
    name: "Divine Glow Palette",
    description:
      "Palet riasan mata dengan 9 warna shimmer dan matte berpigmentasi tinggi untuk kilau surgawi.",
    price: 485000,
    stock: 12,
    image_url:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80",
    tag: "",
    stars: 5,
    reviews: 88,
  },
  {
    id: "p3",
    name: "Luminous Foundation",
    description:
      "Alas bedak cair ringan dengan hidrasi penuh untuk hasil wajah dewy, berkilau alami sepanjang hari.",
    price: 345000,
    stock: 20,
    image_url:
      "https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=900&q=80",
    tag: "NEW",
    stars: 5,
    reviews: 282,
  },
  {
    id: "p4",
    name: "Rose Petal Blush",
    description: "Formula blush bubuk halus dengan warna segar alami kelopak mawar yang mudah dibaurkan.",
    price: 185000,
    stock: 9,
    image_url:
      "https://images.unsplash.com/photo-1556228724-4b08e69034db?auto=format&fit=crop&w=900&q=80",
    tag: "",
    stars: 5,
    reviews: 74,
  },
  {
    id: "p5",
    name: "Lash Luxe Mascara",
    description: "Bulu mata terlihat lebih tebal, hitam pekat, dan lentik dramatis tanpa gumpalan sepanjang hari.",
    price: 199000,
    stock: 0,
    image_url:
      "https://images.unsplash.com/photo-1533520462624-7ac87d53b780?auto=format&fit=crop&w=900&q=80",
    tag: "",
    stars: 5,
    reviews: 95,
  },
  {
    id: "p6",
    name: "Precision Liquid Liner",
    description: "Ujung aplikator presisi ultra tipis untuk garis mata hitam pekat yang tahan air dan keringat.",
    price: 165000,
    stock: 25,
    image_url:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80",
    tag: "NEW",
    stars: 5,
    reviews: 41,
  },
  {
    id: "p7",
    name: "Hydrating Dewy Setting Spray",
    description: "Mengunci riasan wajah agar tahan lama sekaligus memberikan kesegaran dewy alami yang mewah.",
    price: 215000,
    stock: 14,
    image_url:
      "https://images.unsplash.com/photo-1598133894003-60dfb7e9907b?auto=format&fit=crop&w=900&q=80",
    tag: "",
    stars: 5,
    reviews: 112,
  },
  {
    id: "p8",
    name: "Liquid Illuminator",
    description: "Highlighter cair berkilau halus untuk menonjolkan tulang pipi dan memberikan kilau sehat dari dalam.",
    price: 275000,
    stock: 7,
    image_url:
      "https://images.unsplash.com/photo-1562941301-3db7b73316cd?auto=format&fit=crop&w=900&q=80",
    tag: "BEST SELLER",
    stars: 5,
    reviews: 154,
  },
];

function StockBadge({ stock }) {
  const isAvailable = stock > 0;
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide transition-all ${isAvailable
        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
        : "bg-rose-50 text-rose-700 border border-rose-200"
        }`}
    >
      {isAvailable ? "Tersedia" : "Habis"}
    </span>
  );
}

export default function ProductCatalog() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showHeaderSearch, setShowHeaderSearch] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("id, name, description, price, stock, image_url")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Gagal memuat produk dari database:", error);
        setProducts(sampleProducts);
      } else {
        // Map database products to support stars & review counts if missing
        const mappedData = (data && data.length > 0 ? data : sampleProducts).map(
          (product) => {
            const sample = sampleProducts.find((p) => p.name === product.name);
            return {
              ...product,
              tag: sample?.tag || (product.stock === 0 ? "OUT OF STOCK" : ""),
              stars: sample?.stars || 5,
              reviews: sample?.reviews || Math.floor(Math.random() * 150) + 20,
            };
          }
        );
        setProducts(mappedData);
      }
      setLoading(false);
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStock =
        stockFilter === "all"
          ? true
          : stockFilter === "available"
            ? product.stock > 0
            : product.stock <= 0;

      let matchesCategory = true;
      if (selectedCategory !== "all") {
        const name = product.name.toLowerCase();
        const desc = (product.description || "").toLowerCase();

        if (selectedCategory === "BIBIR") {
          matchesCategory =
            name.includes("lip") ||
            name.includes("bibir") ||
            desc.includes("lip") ||
            desc.includes("bibir");
        } else if (selectedCategory === "MATA") {
          matchesCategory =
            name.includes("eye") ||
            name.includes("mata") ||
            name.includes("alis") ||
            name.includes("liner") ||
            name.includes("mascara") ||
            desc.includes("eye") ||
            desc.includes("mata") ||
            desc.includes("alis") ||
            desc.includes("liner") ||
            desc.includes("mascara");
        } else if (selectedCategory === "WAJAH") {
          matchesCategory =
            name.includes("foundation") ||
            name.includes("blush") ||
            name.includes("powder") ||
            name.includes("setting") ||
            name.includes("highlighter") ||
            name.includes("glow") ||
            name.includes("wajah") ||
            desc.includes("foundation") ||
            desc.includes("blush") ||
            desc.includes("powder") ||
            desc.includes("setting") ||
            desc.includes("highlighter") ||
            desc.includes("glow") ||
            desc.includes("wajah");
        }
      }

      return matchesSearch && matchesStock && matchesCategory;
    });
  }, [products, searchTerm, stockFilter, selectedCategory]);

  const handlePurchaseClick = () => {
    if (!session) {
      const message = encodeURIComponent(
        "Silakan daftar akun terlebih dahulu untuk melakukan pembelian."
      );
      navigate(`/register?message=${message}`);
      return;
    }

    navigate("/member");
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(
      selectedCategory === categoryName ? "all" : categoryName
    );
    const element = document.getElementById("catalog-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMiniCardClick = (productName) => {
    const foundProduct = products.find(
      (p) => p.name.toLowerCase() === productName.toLowerCase()
    );
    if (foundProduct) {
      setSelectedProduct(foundProduct);
    } else {
      const sample = sampleProducts.find(
        (p) => p.name.toLowerCase() === productName.toLowerCase()
      );
      if (sample) {
        setSelectedProduct(sample);
      }
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
      setTimeout(() => {
        setNewsletterSubscribed(false);
      }, 5000);
    }
  };

  const handleUserIconClick = () => {
    if (session) {
      navigate("/member");
    } else {
      navigate("/login");
    }
  };

  const handleSearchIconClick = () => {
    setShowHeaderSearch(!showHeaderSearch);
    if (!showHeaderSearch) {
      setTimeout(() => {
        document.getElementById("header-search-input")?.focus();
      }, 100);
    }
  };

  const handleHomeClick = () => {
    setSelectedCategory("all");
    setSearchTerm("");
    setStockFilter("all");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePhilosophyClick = (e) => {
    e.preventDefault();
    const element = document.getElementById("philosophy");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCatalogClick = (e) => {
    e.preventDefault();
    const element = document.getElementById("catalog-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleReviewsClick = (e) => {
    e.preventDefault();
    const element = document.getElementById("reviews-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getBestsellerData = (name, defaultImage, defaultPrice) => {
    const found = products.find(p => p.name.toLowerCase() === name.toLowerCase());
    return {
      name: found ? found.name : name,
      price: found ? found.price : defaultPrice,
      image_url: found && found.image_url ? found.image_url : defaultImage,
    };
  };

  const foundationData = getBestsellerData("Luminous Foundation", "https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=300&q=80", 345000);
  const lipstickData = getBestsellerData("Velvet Rose Lipstick", "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=300&q=80", 245000);
  const paletteData = getBestsellerData("Divine Glow Palette", "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80", 485000);

  return (
    <div className="min-h-screen bg-[#FDFBF9] font-sans text-[#2A2522]">
      {/* Top Banner / Promotional Line */}
      <div className="bg-[#8C2D40] py-2 px-4 text-center text-xs tracking-widest text-[#FFF5F5] uppercase">
        Pengiriman gratis untuk pesanan di atas Rp 500.000
      </div>

      {/* Header Bar */}
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
              onClick={handleHomeClick}
              className="hover:text-[#8C2D40] transition cursor-pointer"
            >
              Beranda
            </button>
            <button
              onClick={handlePhilosophyClick}
              className="hover:text-[#8C2D40] transition cursor-pointer"
            >
              Tentang Kami
            </button>
            <button
              onClick={handleCatalogClick}
              className="hover:text-[#8C2D40] transition cursor-pointer"
            >
              Koleksi Kami
            </button>

            <button
              onClick={handleReviewsClick}
              className="hover:text-[#8C2D40] transition cursor-pointer"
            >
              Ulasan
            </button>
            {session && (
              <button
                onClick={() => navigate("/member")}
                className="hover:text-[#8C2D40] transition cursor-pointer font-bold text-[#8C2D40]"
              >
                Member
              </button>
            )}
          </nav>

          {/* Header Action Icons */}
          <div className="flex items-center gap-4">
            {/* Header Search Toggler */}
            <div className="relative flex items-center">
              {showHeaderSearch && (
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
                onClick={handleSearchIconClick}
                className="rounded-full p-2 text-[#2A2522] hover:bg-[#FFF5F5] hover:text-[#8C2D40] transition"
                aria-label="Cari produk"
              >
                {showHeaderSearch ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </button>
            </div>

            {/* Shopping Bag Button */}
            <button
              onClick={() => navigate(session ? "/member" : "/login")}
              className="rounded-full p-2 text-[#2A2522] hover:bg-[#FFF5F5] hover:text-[#8C2D40] transition relative"
              aria-label="Keranjang Belanja"
            >
              <ShoppingBag className="h-5 w-5" />
              {session && (
                <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-[#8C2D40]" />
              )}
            </button>

            {/* Profile User Icon */}
            <button
              onClick={handleUserIconClick}
              className="rounded-full p-2 text-[#2A2522] hover:bg-[#FFF5F5] hover:text-[#8C2D40] transition"
              aria-label="Akun Saya"
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 space-y-16">

        {/* HERO SECTION */}
        <section className="grid gap-8 lg:grid-cols-12 items-stretch">
          {/* Hero Banner Left Card */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-3xl min-h-[450px] lg:min-h-[550px] flex flex-col justify-end p-8 sm:p-12 shadow-md">
            {/* Background Image */}
            <img
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80"
              alt="Model makeup glow"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

            {/* Text Content Overlay */}
            <div className="relative z-10 space-y-4 text-white max-w-xl animate-fade-in-up">
              <span className="inline-block text-xs font-bold tracking-widest text-[#FFF5F5]/90 uppercase bg-[#8C2D40] px-3 py-1 rounded-full">
                NEW SEASON GLOW
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight tracking-wide">
                Pancarkan Kepercayaan Dirimu Bersama Lumina Beauté
              </h1>
              <p className="text-white/85 text-sm sm:text-base leading-relaxed font-light">
                "Temukan koleksi makeup terbaik yang dirancang khusus untuk menonjolkan aura alami dan meningkatkan rasa percaya dirimu setiap hari."
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <a href="#catalog-section">
                  <Button className="rounded-full bg-[#8C2D40] hover:bg-[#732231] text-white px-8 py-5 text-sm font-semibold tracking-wider transition uppercase shadow-lg shadow-[#8C2D40]/30 border-none">
                    Jelajah Sekarang
                  </Button>
                </a>
                <a href="#philosophy">
                  <Button
                    variant="outline"
                    className="rounded-full border-white/60 hover:border-white text-white bg-transparent hover:bg-white/10 px-8 py-5 text-sm font-semibold tracking-wider transition uppercase"
                  >
                    Lihat Detail
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Hero Banner Right Column */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-[#F3EAE3] bg-white p-8 sm:p-10 shadow-sm space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-wide text-[#2A2522]">
                The Art of Radiance
              </h2>
              <p className="text-[#6B6B6B] text-sm sm:text-base leading-relaxed font-light">
                Discover our new luminous collection designed to enhance your natural glow with a luxurious, dewy finish.
              </p>
              <a href="#catalog-section">
                <button className="inline-flex items-center gap-2 border-b border-[#2A2522] pb-1 text-sm font-semibold uppercase tracking-wider text-[#2A2522] hover:text-[#8C2D40] hover:border-[#8C2D40] transition">
                  Shop the Collection <ArrowRight className="h-4 w-4" />
                </button>
              </a>
            </div>

            {/* Miniature Bestsellers display */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#F3EAE3] pb-2">
                <h3 className="font-serif text-lg font-medium text-[#2A2522]">Bestsellers</h3>
                <button
                  onClick={() => handleCategoryClick("all")}
                  className="text-xs font-semibold tracking-widest text-[#8C2D40] uppercase hover:underline cursor-pointer"
                >
                  Semua
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* Luminous Foundation Item */}
                <button
                  onClick={() => handleMiniCardClick(foundationData.name)}
                  className="group text-left space-y-2 focus:outline-none cursor-pointer"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#FDFBF9] border border-[#F3EAE3]">
                    <img
                      src={foundationData.image_url}
                      alt={foundationData.name}
                      className="h-full w-full object-cover object-center transition group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-[#2A2522] line-clamp-1 group-hover:text-[#8C2D40] transition">
                      {foundationData.name}
                    </h4>
                    <p className="text-[11px] font-semibold text-[#8C2D40]">
                      Rp {Number(foundationData.price).toLocaleString("id-ID")}
                    </p>
                  </div>
                </button>

                {/* Velvet Rose Lipstick Item */}
                <button
                  onClick={() => handleMiniCardClick(lipstickData.name)}
                  className="group text-left space-y-2 focus:outline-none cursor-pointer"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#FDFBF9] border border-[#F3EAE3]">
                    <img
                      src={lipstickData.image_url}
                      alt={lipstickData.name}
                      className="h-full w-full object-cover object-center transition group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-[#2A2522] line-clamp-1 group-hover:text-[#8C2D40] transition">
                      {lipstickData.name}
                    </h4>
                    <p className="text-[11px] font-semibold text-[#8C2D40]">
                      Rp {Number(lipstickData.price).toLocaleString("id-ID")}
                    </p>
                  </div>
                </button>

                {/* Divine Glow Palette Item */}
                <button
                  onClick={() => handleMiniCardClick(paletteData.name)}
                  className="group text-left space-y-2 focus:outline-none cursor-pointer"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-xl bg-[#FDFBF9] border border-[#F3EAE3]">
                    <img
                      src={paletteData.image_url}
                      alt={paletteData.name}
                      className="h-full w-full object-cover object-center transition group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-medium text-[#2A2522] line-clamp-1 group-hover:text-[#8C2D40] transition">
                      {paletteData.name}
                    </h4>
                    <p className="text-[11px] font-semibold text-[#8C2D40]">
                      Rp {Number(paletteData.price).toLocaleString("id-ID")}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CURASI KOLEKSI KAMI */}
        <section className="space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-medium tracking-wide text-[#2A2522]">
              Koleksi Kami
            </h2>
            <div className="mx-auto h-[1px] w-24 bg-[#8C2D40]/30" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-20 max-w-4xl mx-auto pt-4">
            {/* BIBIR */}
            <button
              onClick={() => handleCategoryClick("BIBIR")}
              className={`flex flex-col items-center gap-3 group focus:outline-none cursor-pointer ${selectedCategory === "BIBIR" ? "scale-105" : ""
                }`}
            >
              <div
                className={`relative h-28 w-28 overflow-hidden rounded-full border bg-white shadow-sm transition p-1 ${selectedCategory === "BIBIR"
                  ? "border-[#8C2D40] ring-4 ring-[#FFF5F5]"
                  : "border-[#F3EAE3] group-hover:border-[#8C2D40]/50"
                  }`}
              >
                <img
                  src="https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=300&q=80"
                  alt="BIBIR"
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
              <span
                className={`text-xs font-bold tracking-widest uppercase transition ${selectedCategory === "BIBIR"
                  ? "text-[#8C2D40] font-extrabold"
                  : "text-[#2A2522] group-hover:text-[#8C2D40]"
                  }`}
              >
                BIBIR
              </span>
            </button>

            {/* MATA */}
            <button
              onClick={() => handleCategoryClick("MATA")}
              className={`flex flex-col items-center gap-3 group focus:outline-none cursor-pointer ${selectedCategory === "MATA" ? "scale-105" : ""
                }`}
            >
              <div
                className={`relative h-28 w-28 overflow-hidden rounded-full border bg-white shadow-sm transition p-1 ${selectedCategory === "MATA"
                  ? "border-[#8C2D40] ring-4 ring-[#FFF5F5]"
                  : "border-[#F3EAE3] group-hover:border-[#8C2D40]/50"
                  }`}
              >
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80"
                  alt="MATA"
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
              <span
                className={`text-xs font-bold tracking-widest uppercase transition ${selectedCategory === "MATA"
                  ? "text-[#8C2D40] font-extrabold"
                  : "text-[#2A2522] group-hover:text-[#8C2D40]"
                  }`}
              >
                MATA
              </span>
            </button>

            {/* WAJAH */}
            <button
              onClick={() => handleCategoryClick("WAJAH")}
              className={`flex flex-col items-center gap-3 group focus:outline-none cursor-pointer ${selectedCategory === "WAJAH" ? "scale-105" : ""
                }`}
            >
              <div
                className={`relative h-28 w-28 overflow-hidden rounded-full border bg-white shadow-sm transition p-1 ${selectedCategory === "WAJAH"
                  ? "border-[#8C2D40] ring-4 ring-[#FFF5F5]"
                  : "border-[#F3EAE3] group-hover:border-[#8C2D40]/50"
                  }`}
              >
                <img
                  src="https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&w=300&q=80"
                  alt="WAJAH"
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
              <span
                className={`text-xs font-bold tracking-widest uppercase transition ${selectedCategory === "WAJAH"
                  ? "text-[#8C2D40] font-extrabold"
                  : "text-[#2A2522] group-hover:text-[#8C2D40]"
                  }`}
              >
                WAJAH
              </span>
            </button>
          </div>
        </section>

        {/* NEWSLETTER BANNER */}
        <section className="relative overflow-hidden rounded-3xl bg-[#FFF5F5] border border-dashed border-[#8C2D40]/30 py-10 px-6 sm:px-12 text-center max-w-4xl mx-auto shadow-sm">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <span className="text-xs font-bold tracking-widest text-[#8C2D40] uppercase">
              PENAWARAN EKSKLUSIF
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold tracking-wide text-[#2A2522]">
              Diskon 15% Untuk Pesanan Pertama Anda
            </h2>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              Daftar langganan member kami untuk mendapatkan penawaran eksklusif, info produk baru yang sedang tren, serta akses awal ke promo mingguan sebelum yang lain!
            </p>

            {newsletterSubscribed ? (
              <div className="flex items-center justify-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 py-3 text-sm font-semibold text-emerald-800 animate-fade-in-up">
                <Check className="h-5 w-5 text-emerald-600" />
                <span>Terima kasih! Kode kupon 15% telah dikirim ke email Anda.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="email"
                  required
                  placeholder="Alamat Email Anda"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 rounded-full border border-[#F3EAE3] bg-white px-5 py-3 text-sm outline-none transition focus:border-[#8C2D40] placeholder-[#A89FB8]"
                />
                <button
                  type="submit"
                  className="rounded-full bg-[#8C2D40] hover:bg-[#732231] text-white px-8 py-3 text-xs font-semibold tracking-widest transition uppercase whitespace-nowrap shadow-md shadow-[#8C2D40]/10 cursor-pointer"
                >
                  Daftar Sekarang
                </button>
              </form>
            )}
          </div>
        </section>

        {/* MAIN PRODUCT CATALOG SECTION */}
        <section id="catalog-section" className="space-y-8 scroll-mt-24">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#F3EAE3] pb-4">
            <div className="space-y-1">
              <span className="text-xs font-bold tracking-widest text-[#8C2D40] uppercase">
                PALING DICARI
              </span>
              <h2 className="font-serif text-3xl font-medium tracking-wide text-[#2A2522]">
                {selectedCategory !== "all" ? `Koleksi ${selectedCategory}` : "Produk Terlaris"}
              </h2>
            </div>

            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Category Clear Badge */}
              {selectedCategory !== "all" && (
                <button
                  onClick={() => setSelectedCategory("all")}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF5F5] border border-[#8C2D40]/20 px-3 py-1.5 text-xs text-[#8C2D40] hover:bg-[#8C2D40]/10 transition self-start cursor-pointer"
                >
                  Kategori: {selectedCategory} <X className="h-3.5 w-3.5" />
                </button>
              )}

              {/* Stock Selector */}
              <div className="flex rounded-full border border-[#F3EAE3] bg-white p-1">
                <button
                  onClick={() => setStockFilter("all")}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all cursor-pointer ${stockFilter === "all"
                    ? "bg-[#8C2D40] text-white"
                    : "text-[#6B6B6B] hover:text-[#2A2522]"
                    }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setStockFilter("available")}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all cursor-pointer ${stockFilter === "available"
                    ? "bg-[#8C2D40] text-white"
                    : "text-[#6B6B6B] hover:text-[#2A2522]"
                    }`}
                >
                  Tersedia
                </button>
                <button
                  onClick={() => setStockFilter("out-of-stock")}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium tracking-wide transition-all cursor-pointer ${stockFilter === "out-of-stock"
                    ? "bg-[#8C2D40] text-white"
                    : "text-[#6B6B6B] hover:text-[#2A2522]"
                    }`}
                >
                  Habis
                </button>
              </div>

              {/* Reset All Filters Button */}
              {(selectedCategory !== "all" || searchTerm || stockFilter !== "all") && (
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchTerm("");
                    setStockFilter("all");
                  }}
                  className="text-xs font-semibold text-[#8C2D40] uppercase tracking-widest hover:underline text-left cursor-pointer"
                >
                  Lihat Semua Produk
                </button>
              )}
            </div>
          </div>

          {/* Search result label */}
          {searchTerm && (
            <p className="text-sm text-[#6B6B6B]">
              Hasil pencarian untuk "<span className="font-semibold text-[#2A2522]">{searchTerm}</span>" ({filteredProducts.length} produk)
            </p>
          )}

          {/* Grid Layout */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-[#6B6B6B] gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-[#8C2D40]" />
                <p className="text-sm">Memuat produk katalog...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-full py-16 rounded-3xl border border-dashed border-[#F3EAE3] bg-white text-center p-8 text-[#6B6B6B] space-y-3">
                <p className="font-serif text-lg">Tidak ada produk yang ditemukan</p>
                <p className="text-xs max-w-sm mx-auto">
                  Silakan ubah filter atau bersihkan pencarian untuk melihat koleksi produk terbaik kami.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setStockFilter("all");
                  }}
                  className="rounded-full bg-[#8C2D40] hover:bg-[#732231] text-white text-xs px-6"
                >
                  Bersihkan Filter
                </Button>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <article
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#F3EAE3] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer animate-fade-in-up"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FDFBF9] border-b border-[#F3EAE3]">
                    {product.tag && (
                      <span className="absolute top-4 left-4 z-10 rounded bg-[#8C2D40] px-2.5 py-1 text-[10px] font-bold tracking-widest text-[#FFF5F5] uppercase">
                        {product.tag}
                      </span>
                    )}
                    <img
                      src={product.image_url || DEFAULT_PRODUCT_IMAGE}
                      alt={product.name}
                      className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between p-6 space-y-4">
                    <div className="space-y-2">
                      {/* Star Rating */}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-[#EAA135] text-[#EAA135]" />
                        ))}
                        <span className="text-[11px] text-[#A89FB8] font-semibold ml-1">
                          ({product.reviews || 120})
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-medium tracking-wide text-[#2A2522] group-hover:text-[#8C2D40] transition line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#6B6B6B] leading-relaxed line-clamp-2">
                        {product.description || "Formula kecantikan premium yang teruji secara dermatologis."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#FDFBF9]">
                      <span className="text-base font-semibold text-[#8C2D40]">
                        Rp {Number(product.price).toLocaleString("id-ID")}
                      </span>
                      <StockBadge stock={product.stock} />
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        {/* FILOSOFI KAMI SECTION */}
        <section id="philosophy" className="grid gap-0 md:grid-cols-2 rounded-3xl overflow-hidden shadow-sm border border-[#F3EAE3]">
          {/* Left text column */}
          <div className="bg-[#FFF5F5] p-8 sm:p-12 md:p-16 flex flex-col justify-center space-y-6">
            <span className="text-xs font-bold tracking-widest text-[#8C2D40] uppercase">
              TENTANG KAMI
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-wide leading-tight text-[#2A2522]">
              Pancaran Cantik dari Ketulusan Diri
            </h2>
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[#6B6B6B] font-light">
              <p>
                Lumina Beauté hadir untuk mendefinisikan ulang arti kecantikan. Lebih dari sekadar kosmetik, kami menawarkan nutrisi terbaik dari alam organik demi menjaga kesehatan kulit Anda, sekaligus memberikan sentuhan akhir yang mewah dan percaya diri setiap hari.
              </p>
              <blockquote className="border-l-2 border-[#8C2D40] pl-4 italic text-[#2A2522] font-serif py-1 font-light">
                "Cantik itu sederhana: jadilah versi terbaik dari dirimu."
              </blockquote>
            </div>
            <div className="pt-2">

            </div>
          </div>

          {/* Right image column */}
          <div className="relative min-h-[300px] md:min-h-full overflow-hidden bg-[#FDFBF9]">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz07eRw8SWJ8wt-QU8w3aipf-YQA3EqrYoqMKJ81mkySVEJ48EX7nK2UAr&s=10"
              alt="Seseorang sedang merias wajah"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>
        </section>

        {/* CUSTOMER REVIEWS (ULASAN) SECTION */}
        <section id="reviews-section" className="space-y-8 scroll-mt-24">
          <div className="space-y-2 text-center">
            <span className="text-xs font-bold tracking-widest text-[#8C2D40] uppercase">
              TESTIMONI PELANGGAN
            </span>
            <h2 className="font-serif text-3xl font-medium tracking-wide text-[#2A2522]">
              Ulasan Jujur Mereka
            </h2>
            <div className="mx-auto h-[1px] w-24 bg-[#8C2D40]/30" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Review 1 */}
            <div className="rounded-2xl border border-[#F3EAE3] bg-white p-8 space-y-4 shadow-sm animate-fade-in-up">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#EAA135] text-[#EAA135]" />
                ))}
              </div>
              <p className="text-sm text-[#6B6B6B] italic leading-relaxed">
                "Velvet Rose Lipstick ini punya tekstur yang sangat lembut dan lembap di bibir. Warnanya pas banget untuk look natural sehari-hari maupun acara formal!"
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="h-10 w-10 rounded-full bg-[#FFF5F5] flex items-center justify-center font-bold text-[#8C2D40] text-xs border border-[#F3EAE3]">
                  SW
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-semibold text-[#2A2522]">Sarah Widjaja</h4>
                  <span className="text-[10px] text-[#A89FB8]">Pembeli Terverifikasi</span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="rounded-2xl border border-[#F3EAE3] bg-white p-8 space-y-4 shadow-sm animate-fade-in-up">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#EAA135] text-[#EAA135]" />
                ))}
              </div>
              <p className="text-sm text-[#6B6B6B] italic leading-relaxed">
                "Luminous Foundation bener-bener kasih efek dewy finish yang mewah. Kulit keliatan sehat, glowing alami, dan tahan lama seharian tanpa pecah."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="h-10 w-10 rounded-full bg-[#FFF5F5] flex items-center justify-center font-bold text-[#8C2D40] text-xs border border-[#F3EAE3]">
                  RK
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-semibold text-[#2A2522]">Rani Kirana</h4>
                  <span className="text-[10px] text-[#A89FB8]">Pembeli Terverifikasi</span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="rounded-2xl border border-[#F3EAE3] bg-white p-8 space-y-4 shadow-sm animate-fade-in-up">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#EAA135] text-[#EAA135]" />
                ))}
              </div>
              <p className="text-sm text-[#6B6B6B] italic leading-relaxed">
                "Divine Glow Palette adalah eyeshadow palet paling pigmented yang pernah saya punya. Pilihan warnanya cantik-cantik banget untuk make-up natural sampai bold."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="h-10 w-10 rounded-full bg-[#FFF5F5] flex items-center justify-center font-bold text-[#8C2D40] text-xs border border-[#F3EAE3]">
                  AP
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-semibold text-[#2A2522]">Amanda Putri</h4>
                  <span className="text-[10px] text-[#A89FB8]">Pembeli Terverifikasi</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#FFF5F5] border-t border-[#F3EAE3] text-[#2A2522] pt-16 pb-8 px-6 mt-16">
        <div className="mx-auto max-w-7xl space-y-12">
          {/* Main columns */}
          <div className="grid gap-10 md:grid-cols-4">
            {/* Brand and social info */}
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-bold tracking-widest text-[#8C2D40] uppercase">
                LUMINA BEAUTÉ
              </h3>
              <p className="text-xs leading-relaxed text-[#6B6B6B] font-light">
                Menghadirkan keharmonisan kecantikan melalui formulasi bahan alami dan teknologi mutakhir.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="#"
                  className="rounded-full bg-white p-2 text-[#2A2522] border border-[#F3EAE3] hover:text-[#8C2D40] hover:border-[#8C2D40] transition"
                  aria-label="Website"
                >
                  <Globe className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-white p-2 text-[#2A2522] border border-[#F3EAE3] hover:text-[#8C2D40] hover:border-[#8C2D40] transition"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-white p-2 text-[#2A2522] border border-[#F3EAE3] hover:text-[#8C2D40] hover:border-[#8C2D40] transition"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  className="rounded-full bg-white p-2 text-[#2A2522] border border-[#F3EAE3] hover:text-[#8C2D40] hover:border-[#8C2D40] transition"
                  aria-label="Twitter"
                >
                  <TwitterIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Shopping link categories */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold tracking-widest text-[#2A2522] uppercase">
                Belanja
              </h4>
              <ul className="space-y-2 text-xs text-[#6B6B6B] font-light">
                <li>
                  <button onClick={() => handleCategoryClick("BIBIR")} className="hover:text-[#8C2D40] transition hover:underline cursor-pointer">
                    Koleksi Bibir
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick("MATA")} className="hover:text-[#8C2D40] transition hover:underline cursor-pointer">
                    Riasan Mata
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick("WAJAH")} className="hover:text-[#8C2D40] transition hover:underline cursor-pointer">
                    Riasan Wajah
                  </button>
                </li>

              </ul>
            </div>

            {/* Service & support links */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold tracking-widest text-[#2A2522] uppercase">
                Layanan
              </h4>
              <ul className="space-y-2 text-xs text-[#6B6B6B] font-light">
                <li>
                  <a href="#" className="hover:text-[#8C2D40] transition hover:underline">
                    Hubungi Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#8C2D40] transition hover:underline">
                    Status Pengiriman
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#8C2D40] transition hover:underline">
                    Kebijakan Pengembalian
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#8C2D40] transition hover:underline">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Footer newsletter form */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold tracking-widest text-[#2A2522] uppercase">
                Berlangganan
              </h4>
              <p className="text-xs text-[#6B6B6B] leading-relaxed font-light">
                Dapatkan kabar terbaru tentang peluncuran eksklusif kami.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="relative flex items-center border-b border-[#2A2522] py-2">
                <input
                  type="email"
                  required
                  placeholder="Alamat Email Anda"
                  className="w-full bg-transparent text-xs outline-none pr-8 py-1 placeholder-[#A89FB8] text-[#2A2522]"
                />
                <button
                  type="submit"
                  className="absolute right-0 text-[#2A2522] hover:text-[#8C2D40] transition cursor-pointer"
                  aria-label="Submit email"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Copyright block */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-[#F3EAE3] pt-6 gap-4 text-[10px] font-bold tracking-widest text-[#A89FB8] uppercase">
            <span>© 2026 LUMINA BEAUTÉ. ALL RIGHTS RESERVED.</span>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-[#8C2D40] transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#8C2D40] transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-[#8C2D40] transition">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* DYNAMIC PRODUCT DETAIL DIALOG */}
      <Dialog
        open={Boolean(selectedProduct)}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
      >
        {selectedProduct && (
          <DialogContent className="sm:max-w-3xl rounded-2xl bg-[#FDFBF9] text-[#2A2522] border border-[#F3EAE3] p-6">
            <DialogHeader className="pb-4 border-b border-[#F3EAE3]">
              <DialogTitle className="font-serif text-2xl font-semibold text-[#8C2D40]">
                {selectedProduct.name}
              </DialogTitle>
              <DialogDescription className="text-xs text-[#6B6B6B] mt-1">
                Koleksi Riasan Premium Lumina Beauté
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 md:grid-cols-12 pt-4">
              {/* Product Image Column */}
              <div className="md:col-span-7 rounded-xl bg-white border border-[#F3EAE3] overflow-hidden p-2 flex items-center justify-center max-h-[350px]">
                {selectedProduct.image_url ? (
                  <img
                    src={selectedProduct.image_url}
                    alt={selectedProduct.name}
                    className="h-full max-h-[330px] rounded-lg object-cover w-full"
                    onError={(e) => {
                      e.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
                    }}
                  />
                ) : (
                  <div className="flex h-64 items-center justify-center text-[#A89FB8] text-xs">
                    Gambar tidak tersedia
                  </div>
                )}
              </div>

              {/* Purchase and Info Column */}
              <div className="md:col-span-5 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-[#8C2D40]">
                      Rp {Number(selectedProduct.price).toLocaleString("id-ID")}
                    </span>
                    <StockBadge stock={selectedProduct.stock} />
                  </div>

                  <p className="text-xs leading-relaxed text-[#6B6B6B]">
                    {selectedProduct.description || "Formula kecantikan premium yang teruji secara klinis untuk menyehatkan kulit sekaligus memancarkan keindahan alami Anda."}
                  </p>

                  <div className="rounded-xl border border-[#F3EAE3] bg-white p-4 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[#6B6B6B]">Ketersediaan</span>
                      <span className="font-semibold">
                        {selectedProduct.stock > 0
                          ? `${selectedProduct.stock} barang`
                          : "Stok Habis"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B6B6B]">Bintang Ulasan</span>
                      <span className="font-semibold flex items-center gap-1">
                        5.0 <Star className="h-3 w-3 fill-[#EAA135] text-[#EAA135]" /> ({selectedProduct.reviews || 120} ulasan)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={handlePurchaseClick}
                    className="w-full rounded-full bg-[#8C2D40] hover:bg-[#732231] text-white py-6 text-sm font-semibold tracking-wider transition uppercase cursor-pointer"
                  >
                    Beli Sekarang
                  </Button>
                  <Link to="/register" className="block w-full">
                    <Button
                      variant="outline"
                      className="w-full rounded-full border-[#8C2D40]/30 hover:border-[#8C2D40] hover:bg-[#FFF5F5] text-[#8C2D40] py-6 text-sm font-semibold tracking-wider transition uppercase cursor-pointer"
                    >
                      Daftar untuk Beli
                    </Button>
                  </Link>
                  <DialogClose asChild>
                    <Button variant="ghost" className="w-full text-xs text-[#A89FB8] hover:text-[#6B6B6B] hover:bg-transparent cursor-pointer">
                      Tutup
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
