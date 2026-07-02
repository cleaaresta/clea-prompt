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
import { PageHeaderSection } from "../components/6-section";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";

const DEFAULT_PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80";

const sampleProducts = [
  {
    id: "p1",
    name: "Lipstik Velvet Matte",
    description:
      "Warna tahan lama dengan tekstur lembut dan hasil akhir matte yang elegan.",
    price: 120000,
    stock: 18,
    image_url:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p2",
    name: "Foundation Liquid Glow",
    description: "Coverage medium dengan efek glowing alami sepanjang hari.",
    price: 185000,
    stock: 12,
    image_url:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p3",
    name: "Eyeshadow Palette",
    description:
      "12 pilihan warna pigmented untuk tampilan natural sampai glamor.",
    price: 220000,
    stock: 0,
    image_url:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p4",
    name: "Blush On Powder",
    description: "Warna segar yang mudah dibaurkan untuk pipi natural.",
    price: 95000,
    stock: 9,
    image_url:
      "https://images.unsplash.com/photo-1556228724-4b08e69034db?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p5",
    name: "Mascara Volume Boost",
    description: "Bulu mata terlihat lebih tebal dan lentik tanpa gumpalan.",
    price: 99000,
    stock: 20,
    image_url:
      "https://images.unsplash.com/photo-1533520462624-7ac87d53b780?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p6",
    name: "Eyeliner Intense Black",
    description: "Garisan presisi dengan hasil warna hitam pekat tahan lama.",
    price: 65000,
    stock: 25,
    image_url:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p7",
    name: "Setting Spray Dewy Finish",
    description: "Menjaga makeup tetap segar dan glowing hingga berjam-jam.",
    price: 85000,
    stock: 14,
    image_url:
      "https://images.unsplash.com/photo-1598133894003-60dfb7e9907b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p8",
    name: "Highlighter Glow Star",
    description: "Cahaya mewah untuk tulang pipi dan sudut mata.",
    price: 105000,
    stock: 7,
    image_url:
      "https://images.unsplash.com/photo-1562941301-3db7b73316cd?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p9",
    name: "Brow Styling Kit",
    description: "Rangkaian alat alis lengkap untuk bentuk natural dan rapi.",
    price: 78000,
    stock: 11,
    image_url:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p10",
    name: "Lip Gloss Shine",
    description: "Kilap lembut dengan nutrisi untuk bibir tampak penuh.",
    price: 69000,
    stock: 16,
    image_url:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80",
  },
];

function StockBadge({ stock }) {
  const status = stock > 5 ? "in-stock" : stock > 0 ? "low" : "critical";
  return (
    <span className={`stock-status ${status}`}>
      {stock > 0 ? "Tersedia" : "Habis"}
    </span>
  );
}

function GuestNavbar({
  searchTerm,
  setSearchTerm,
  stockFilter,
  setStockFilter,
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-3xl bg-gradient-to-r from-fuchsia-500 to-violet-600 px-4 py-2 text-white shadow-lg shadow-fuchsia-500/20">
            Glamour Studio
          </div>
          <div className="hidden items-center gap-3 text-sm text-slate-500 sm:flex">
            <span>Katalog Produk</span>
            <span className="h-1 w-1 rounded-full bg-slate-400" />
            <span>Guest Landing</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 sm:max-w-xl sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <input
              type="search"
              placeholder="Cari produk makeup..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-full border border-slate-300 bg-slate-50 px-4 py-3 pr-12 text-sm outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-200"
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              🔍
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setStockFilter("all")}
              className={`rounded-full border px-4 py-2 text-sm transition ${stockFilter === "all" ? "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}
            >
              Semua
            </button>
            <button
              type="button"
              onClick={() => setStockFilter("available")}
              className={`rounded-full border px-4 py-2 text-sm transition ${stockFilter === "available" ? "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}
            >
              Tersedia
            </button>
            <button
              type="button"
              onClick={() => setStockFilter("out-of-stock")}
              className={`rounded-full border px-4 py-2 text-sm transition ${stockFilter === "out-of-stock" ? "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700" : "border-slate-300 bg-white text-slate-600 hover:border-slate-400"}`}
            >
              Habis
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="outline" size="sm">
              Masuk
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Daftar</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function ProductCatalog() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("id, name, description, price, stock, image_url")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Gagal memuat produk:", error);
        setProducts(sampleProducts);
      } else {
        setProducts(data && data.length > 0 ? data : sampleProducts);
      }
      setLoading(false);
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesStock =
        stockFilter === "all"
          ? true
          : stockFilter === "available"
            ? product.stock > 0
            : product.stock <= 0;

      return matchesSearch && matchesStock;
    });
  }, [products, searchTerm, stockFilter]);

  const handlePurchaseClick = () => {
    if (!session) {
      const message = encodeURIComponent(
        "Silakan login terlebih dahulu untuk melakukan pembelian.",
      );
      navigate(`/login?message=${message}`);
      return;
    }

    navigate("/member");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <GuestNavbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        stockFilter={stockFilter}
        setStockFilter={setStockFilter}
      />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <FadeIn>
          <PageHeaderSection
            title="Katalog Makeup"
            subtitle="Jelajahi koleksi produk terbaik kami. Klik produk untuk melihat detail atau login untuk mulai berbelanja."
          />
        </FadeIn>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              Memuat produk...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              Tidak ada produk yang cocok.
            </div>
          ) : (
            filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <button
                  type="button"
                  className="grid h-full w-full text-left"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                        onError={(event) => {
                          event.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-400">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="space-y-3 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {product.name}
                      </h3>
                      <StockBadge stock={product.stock} />
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-2">
                      {product.description || "Tidak ada deskripsi produk."}
                    </p>
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <p className="text-base font-semibold text-slate-900">
                        Rp {Number(product.price).toLocaleString("id-ID")}
                      </p>
                      <Badge>
                        {product.stock > 0 ? "Stok " + product.stock : "Habis"}
                      </Badge>
                    </div>
                  </div>
                </button>
              </article>
            ))
          )}
        </div>

        <Dialog
          open={Boolean(selectedProduct)}
          onOpenChange={(open) => !open && setSelectedProduct(null)}
        >
          {selectedProduct && (
            <DialogContent className="sm:max-w-3xl">
              <DialogHeader>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
                <DialogDescription>
                  {selectedProduct.description ||
                    "Deskripsi produk tidak tersedia."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 sm:grid-cols-[1.2fr_0.8fr]">
                <div className="rounded-3xl bg-slate-50 p-4">
                  {selectedProduct.image_url ? (
                    <img
                      src={selectedProduct.image_url}
                      alt={selectedProduct.name}
                      className="h-72 w-full rounded-3xl object-cover"
                      onError={(event) => {
                        event.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
                      }}
                    />
                  ) : (
                    <div className="flex h-72 items-center justify-center rounded-3xl bg-slate-200 text-slate-500">
                      Gambar tidak tersedia
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-sm">
                  <div className="space-y-3">
                    <p className="text-xl font-semibold text-slate-900">
                      Rp {Number(selectedProduct.price).toLocaleString("id-ID")}
                    </p>
                    <StockBadge stock={selectedProduct.stock} />
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Status Stok</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {selectedProduct.stock > 0
                        ? `${selectedProduct.stock} barang tersedia`
                        : "Stok habis"}
                    </p>
                  </div>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p>
                      Tambahkan produk ke keranjang atau beli sekarang untuk
                      melanjutkan.
                    </p>
                    <p className="text-slate-500">
                      Untuk checkout, Anda harus login terlebih dahulu.
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="default" onClick={handlePurchaseClick}>
                  Beli Sekarang
                </Button>
                <Link to="/login">
                  <Button variant="outline">Masuk untuk Beli</Button>
                </Link>
                <DialogClose asChild>
                  <Button variant="ghost">Tutup</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </main>
    </div>
  );
}
