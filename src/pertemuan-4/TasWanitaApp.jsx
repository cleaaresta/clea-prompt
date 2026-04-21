import { useState, useMemo } from "react";
import tasWanitaData from "./data/tasWanitaData.json";
import SearchFilter from "./components/SearchFilter";
import BagCard from "./components/BagCard";
import BagTable from "./components/BagTable";

const TasWanitaApp = () => {
  const [viewMode, setViewMode] = useState("guest"); // "guest" | "admin"
  const [searchTerm, setSearchTerm] = useState("");
  const [filterKategori, setFilterKategori] = useState("");
  const [filterKota, setFilterKota] = useState("");

  // Extract unique kategori and kota lists
  const kategoriList = useMemo(() => {
    return [...new Set(tasWanitaData.map((b) => b.kategori))].sort();
  }, []);

  const kotaList = useMemo(() => {
    return [...new Set(tasWanitaData.map((b) => b.penjual.kota))].sort();
  }, []);

  // Filter data
  const filteredData = useMemo(() => {
    return tasWanitaData.filter((bag) => {
      const matchSearch =
        searchTerm === "" ||
        bag.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bag.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bag.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());

      const matchKategori =
        filterKategori === "" || bag.kategori === filterKategori;

      const matchKota =
        filterKota === "" || bag.penjual.kota === filterKota;

      return matchSearch && matchKategori && matchKota;
    });
  }, [searchTerm, filterKategori, filterKota]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Hero Header */}
      <header className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 text-white">
        {/* Decorative Blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            <span>👜</span>
            <span>Koleksi Premium 2026</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Koleksi Tas Wanita
          </h1>
          <p className="text-lg sm:text-xl text-pink-100 max-w-2xl mx-auto leading-relaxed">
            Temukan tas impian Anda dari koleksi brand ternama dunia. 
            Elegan, stylish, dan berkualitas premium.
          </p>

          {/* View Mode Toggle */}
          <div className="mt-8 inline-flex items-center bg-white/15 backdrop-blur-sm rounded-2xl p-1.5 shadow-lg">
            <button
              onClick={() => setViewMode("guest")}
              className={`px-6 sm:px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                viewMode === "guest"
                  ? "bg-white text-pink-600 shadow-md scale-105"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="hidden sm:inline">🛍️ </span>Guest View
            </button>
            <button
              onClick={() => setViewMode("admin")}
              className={`px-6 sm:px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                viewMode === "admin"
                  ? "bg-white text-pink-600 shadow-md scale-105"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="hidden sm:inline">⚙️ </span>Admin View
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Search & Filter */}
        <SearchFilter
          onSearch={setSearchTerm}
          onFilterKategori={setFilterKategori}
          onFilterKota={setFilterKota}
          kategoriList={kategoriList}
          kotaList={kotaList}
        />

        {/* Results Count */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-gray-500 text-sm">
            Ditemukan <span className="font-bold text-pink-600">{filteredData.length}</span> dari{" "}
            <span className="font-bold">{tasWanitaData.length}</span> tas
          </p>
          <p className="text-gray-400 text-xs">
            Mode: <span className="font-semibold text-gray-600">{viewMode === "guest" ? "🛍️ Guest (Card)" : "⚙️ Admin (Tabel)"}</span>
          </p>
        </div>

        {/* Content View */}
        {viewMode === "guest" ? (
          /* Guest View - Card Grid */
          filteredData.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-7xl mb-6">👜</p>
              <p className="text-gray-400 text-xl font-medium">Tidak ada tas yang ditemukan</p>
              <p className="text-gray-300 text-sm mt-2">Coba ubah filter atau kata kunci pencarian Anda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredData.map((bag) => (
                <BagCard key={bag.id} bag={bag} />
              ))}
            </div>
          )
        ) : (
          /* Admin View - Table */
          <BagTable data={filteredData} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-400 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            👜 <span className="text-pink-400 font-semibold">Tas Wanita Collection</span> — Pertemuan 4 React
          </p>
          <p className="text-xs mt-2 text-gray-500">
            © 2026 | Built with React + Tailwind CSS v4
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TasWanitaApp;
