import { useState } from "react";

const SearchFilter = ({ onSearch, onFilterKategori, onFilterKota, kategoriList, kotaList }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedKategori, setSelectedKategori] = useState("");
  const [selectedKota, setSelectedKota] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleKategoriChange = (e) => {
    const value = e.target.value;
    setSelectedKategori(value);
    onFilterKategori(value);
  };

  const handleKotaChange = (e) => {
    const value = e.target.value;
    setSelectedKota(value);
    onFilterKota(value);
  };

  const clearAll = () => {
    setSearchTerm("");
    setSelectedKategori("");
    setSelectedKota("");
    onSearch("");
    onFilterKategori("");
    onFilterKota("");
  };

  return (
    <div className="mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* Search */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            🔍 Cari Tas
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Cari nama atau brand..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-3 pl-11 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-300 bg-white text-gray-700 placeholder-gray-400"
            />
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Filter Kategori */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            🏷️ Kategori
          </label>
          <select
            value={selectedKategori}
            onChange={handleKategoriChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-300 bg-white text-gray-700 cursor-pointer appearance-none"
          >
            <option value="">Semua Kategori</option>
            {kategoriList.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </div>

        {/* Filter Kota */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            📍 Kota Penjual
          </label>
          <select
            value={selectedKota}
            onChange={handleKotaChange}
            className="w-full px-4 py-3 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-300 bg-white text-gray-700 cursor-pointer appearance-none"
          >
            <option value="">Semua Kota</option>
            {kotaList.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </div>

        {/* Clear Button */}
        <div>
          <button
            onClick={clearAll}
            className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-semibold hover:from-pink-500 hover:to-rose-500 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
          >
            ✨ Reset Filter
          </button>
        </div>
      </div>

      {/* Active Filters */}
      {(searchTerm || selectedKategori || selectedKota) && (
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500 font-medium">Filter aktif:</span>
          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">
              🔍 &ldquo;{searchTerm}&rdquo;
              <button onClick={() => { setSearchTerm(""); onSearch(""); }} className="ml-1 hover:text-pink-900 cursor-pointer">&times;</button>
            </span>
          )}
          {selectedKategori && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              🏷️ {selectedKategori}
              <button onClick={() => { setSelectedKategori(""); onFilterKategori(""); }} className="ml-1 hover:text-purple-900 cursor-pointer">&times;</button>
            </span>
          )}
          {selectedKota && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              📍 {selectedKota}
              <button onClick={() => { setSelectedKota(""); onFilterKota(""); }} className="ml-1 hover:text-blue-900 cursor-pointer">&times;</button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
