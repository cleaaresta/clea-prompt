export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex font-sans bg-[#FDFBF9]">
      {/* Left Panel — Brand Visual */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
        aria-hidden="true"
      >
        <img
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80"
          alt="LUMINA BEAUTÉ"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8C2D40]/80 via-[#2A2522]/60 to-black/70" />

        {/* Brand content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div>
            <span className="font-serif text-3xl font-bold tracking-widest text-white">
              LUMINA BEAUTÉ
            </span>
          </div>
          <div className="space-y-4 max-w-sm">
            <span className="inline-block text-[10px] font-sans font-bold tracking-widest uppercase bg-white/20 border border-white/30 px-3 py-1 rounded-full text-white/90">
              Portal Akun
            </span>
            <h2 className="font-serif text-4xl font-medium leading-tight">
              Masuk ke Dunia LUMINA BEAUTÉ
            </h2>
            <p className="font-sans text-sm text-white/75 leading-relaxed font-light">
              Akses dashboard Anda — baik sebagai member eksklusif maupun tim admin pengelola toko LUMINA BEAUTÉ.
            </p>
            <div className="flex items-center gap-4 pt-4">
              {["✓ Area Member", "✓ Dashboard Admin", "✓ Akses Penuh"].map((t) => (
                <span key={t} className="font-sans text-[10px] font-semibold tracking-wider text-white/80 uppercase">{t}</span>
              ))}
            </div>
          </div>
          <p className="font-sans text-[10px] text-white/40 tracking-widest uppercase">
            © 2026 LUMINA BEAUTÉ. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex flex-1 flex-col justify-center items-center px-6 py-12 lg:px-16 bg-[#FDFBF9]">
        {/* Mobile-only logo */}
        <div className="lg:hidden mb-8 text-center">
          <span className="font-serif text-2xl font-bold tracking-widest text-[#8C2D40]">
            LUMINA BEAUTÉ
          </span>
        </div>

        <div className="w-full max-w-md">
          {children}
        </div>

        {/* Top promotional banner */}
        <p className="mt-8 font-sans text-[10px] text-[#A89FB8] tracking-widest uppercase text-center">
          Pengiriman gratis untuk pesanan di atas Rp 500.000
        </p>
      </div>
    </div>
  );
}
