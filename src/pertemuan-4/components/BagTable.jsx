const formatRupiah = (num) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);
};

const BagTable = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-6xl mb-4">📭</p>
        <p className="text-gray-400 text-lg font-medium">Tidak ada data yang ditemukan</p>
        <p className="text-gray-300 text-sm mt-1">Coba ubah filter atau kata kunci pencarian</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden">
      {/* Table header info */}
      <div className="px-6 py-4 bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100">
        <p className="text-sm text-gray-600">
          Menampilkan <span className="font-bold text-pink-600">{data.length}</span> data tas wanita
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
              <th className="px-4 py-4 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap">No</th>
              <th className="px-4 py-4 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Gambar</th>
              <th className="px-4 py-4 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Nama Tas</th>
              <th className="px-4 py-4 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Brand</th>
              <th className="px-4 py-4 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Kategori</th>
              <th className="px-4 py-4 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Harga</th>
              <th className="px-4 py-4 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Warna</th>
              <th className="px-4 py-4 text-center font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Stok</th>
              <th className="px-4 py-4 text-center font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Rating</th>
              <th className="px-4 py-4 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Dimensi (P×L×T)</th>
              <th className="px-4 py-4 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Material</th>
              <th className="px-4 py-4 text-left font-semibold text-xs uppercase tracking-wider whitespace-nowrap">Penjual</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-pink-50">
            {data.map((bag, index) => (
              <tr
                key={bag.id}
                className={`hover:bg-pink-50/50 transition-colors duration-200 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }`}
              >
                {/* No */}
                <td className="px-4 py-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 bg-pink-100 text-pink-600 rounded-full text-xs font-bold">
                    {index + 1}
                  </span>
                </td>

                {/* Gambar */}
                <td className="px-4 py-3">
                  <img
                    src={bag.gambar}
                    alt={bag.nama}
                    className="w-14 h-14 object-cover rounded-xl shadow-sm border border-pink-100"
                    loading="lazy"
                  />
                </td>

                {/* Nama */}
                <td className="px-4 py-3">
                  <p className="font-semibold text-gray-800 whitespace-nowrap">{bag.nama}</p>
                  <p className="text-xs text-gray-400 mt-0.5 max-w-48 truncate">{bag.deskripsi}</p>
                </td>

                {/* Brand */}
                <td className="px-4 py-3">
                  <span className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-lg whitespace-nowrap">
                    {bag.brand}
                  </span>
                </td>

                {/* Kategori */}
                <td className="px-4 py-3">
                  <span className="px-2.5 py-1 bg-pink-100 text-pink-700 text-xs font-semibold rounded-lg whitespace-nowrap">
                    {bag.kategori}
                  </span>
                </td>

                {/* Harga */}
                <td className="px-4 py-3">
                  <p className="font-bold text-gray-800 whitespace-nowrap">{formatRupiah(bag.harga)}</p>
                </td>

                {/* Warna */}
                <td className="px-4 py-3">
                  <span className="text-gray-600 text-xs whitespace-nowrap">{bag.warna}</span>
                </td>

                {/* Stok */}
                <td className="px-4 py-3 text-center">
                  <span className={`inline-flex items-center justify-center min-w-8 px-2 py-1 text-xs font-bold rounded-full ${
                    bag.stok <= 5
                      ? "bg-red-100 text-red-600"
                      : bag.stok <= 15
                      ? "bg-amber-100 text-amber-600"
                      : "bg-emerald-100 text-emerald-600"
                  }`}>
                    {bag.stok}
                  </span>
                </td>

                {/* Rating */}
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-amber-400 text-sm">★</span>
                    <span className="font-semibold text-gray-700 text-xs">{bag.rating}</span>
                  </div>
                </td>

                {/* Dimensi (nested) */}
                <td className="px-4 py-3">
                  <p className="text-xs text-gray-600 whitespace-nowrap">
                    {bag.dimensi.panjang} × {bag.dimensi.lebar} × {bag.dimensi.tinggi} {bag.dimensi.satuan}
                  </p>
                </td>

                {/* Material (nested) */}
                <td className="px-4 py-3">
                  <p className="text-xs text-gray-700 font-medium whitespace-nowrap">{bag.material.bahan_utama}</p>
                  <p className="text-xs text-gray-400 whitespace-nowrap">Dalam: {bag.material.bahan_dalam}</p>
                  <p className="text-xs text-gray-400 whitespace-nowrap">Aks: {bag.material.aksesoris}</p>
                </td>

                {/* Penjual (nested) */}
                <td className="px-4 py-3">
                  <p className="text-xs text-gray-700 font-medium whitespace-nowrap">{bag.penjual.nama_toko}</p>
                  <p className="text-xs text-gray-400 whitespace-nowrap">📍 {bag.penjual.kota}</p>
                  <p className="text-xs text-gray-400 whitespace-nowrap">⭐ {bag.penjual.rating_toko}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BagTable;
