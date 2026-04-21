const formatRupiah = (num) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);
};

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-amber-400 text-sm">★</span>
      ))}
      {hasHalf && <span className="text-amber-400 text-sm">★</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300 text-sm">★</span>
      ))}
      <span className="ml-1 text-xs text-gray-500 font-medium">({rating})</span>
    </div>
  );
};

const BagCard = ({ bag }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-pink-50 hover:border-pink-200 hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative overflow-hidden h-56 sm:h-64">
        <img
          src={bag.gambar}
          alt={bag.nama}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-pink-600 text-xs font-bold rounded-full shadow-sm">
          {bag.kategori}
        </span>

        {/* Stock Badge */}
        <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full shadow-sm ${
          bag.stok <= 5 
            ? "bg-red-500/90 text-white" 
            : bag.stok <= 15 
            ? "bg-amber-400/90 text-white" 
            : "bg-emerald-500/90 text-white"
        }`}>
          Stok: {bag.stok}
        </span>

        {/* Price overlay on hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <p className="text-white text-lg font-bold drop-shadow-lg">
            {formatRupiah(bag.harga)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Brand & Name */}
        <p className="text-xs font-bold text-pink-500 uppercase tracking-wider mb-1">
          {bag.brand}
        </p>
        <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight line-clamp-1">
          {bag.nama}
        </h3>

        {/* Rating */}
        <StarRating rating={bag.rating} />

        {/* Price (visible on mobile, hidden on hover for desktop) */}
        <p className="mt-3 text-xl font-extrabold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          {formatRupiah(bag.harga)}
        </p>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-500 line-clamp-2 leading-relaxed">
          {bag.deskripsi}
        </p>

        {/* Divider */}
        <hr className="my-4 border-pink-100" />

        {/* Nested Info */}
        <div className="space-y-3">
          {/* Dimensi */}
          <div className="flex items-start gap-2">
            <span className="text-base shrink-0">📐</span>
            <div>
              <p className="text-xs font-semibold text-gray-600">Dimensi</p>
              <p className="text-xs text-gray-400">
                {bag.dimensi.panjang} × {bag.dimensi.lebar} × {bag.dimensi.tinggi} {bag.dimensi.satuan}
              </p>
            </div>
          </div>

          {/* Material */}
          <div className="flex items-start gap-2">
            <span className="text-base shrink-0">🧵</span>
            <div>
              <p className="text-xs font-semibold text-gray-600">Material</p>
              <p className="text-xs text-gray-400">{bag.material.bahan_utama}</p>
            </div>
          </div>

          {/* Penjual */}
          <div className="flex items-start gap-2">
            <span className="text-base shrink-0">🏪</span>
            <div>
              <p className="text-xs font-semibold text-gray-600">Penjual</p>
              <p className="text-xs text-gray-400">
                {bag.penjual.nama_toko} · {bag.penjual.kota}
              </p>
            </div>
          </div>
        </div>

        {/* Warna Badge */}
        <div className="mt-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-pink-50 to-rose-50 text-pink-600 text-xs font-semibold rounded-full border border-pink-100">
            🎨 {bag.warna}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BagCard;
