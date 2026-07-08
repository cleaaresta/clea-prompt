import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Loader2, UserPlus } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [dataForm, setDataForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (dataForm.password !== dataForm.confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      return;
    }
    if (dataForm.password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    setLoading(true);
    try {
      const { user } = await signUp(dataForm.email, dataForm.password, dataForm.name);
      if (user) navigate("/login?registered=true", { replace: true });
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat mendaftar. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-7 animate-fade-in-up">
      {/* Heading */}
      <div className="space-y-2">
        <span className="font-sans text-[10px] font-bold tracking-widest text-[#8C2D40] uppercase">
          Buat Akun Baru
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#2A2522] leading-tight">
          Bergabung dengan LUMINA
        </h1>
        <p className="font-sans text-sm text-[#6B6B6B] font-normal">
          Daftar dan nikmati keistimewaan member eksklusif Anda.
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3">
          <p className="font-sans text-xs text-rose-700">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nama Lengkap */}
        <div className="space-y-1.5">
          <label className="block font-sans text-[10px] font-bold tracking-widest text-[#6B6B6B] uppercase">
            Nama Lengkap
          </label>
          <input
            id="register-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Masukkan nama lengkap Anda"
            value={dataForm.name}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-[#F3EAE3] bg-white px-4 py-3 font-sans text-sm text-[#2A2522] placeholder-[#C4B5AE] outline-none transition focus:border-[#8C2D40] focus:ring-2 focus:ring-[#8C2D40]/10"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="block font-sans text-[10px] font-bold tracking-widest text-[#6B6B6B] uppercase">
            Email
          </label>
          <input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="nama@email.com"
            value={dataForm.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-[#F3EAE3] bg-white px-4 py-3 font-sans text-sm text-[#2A2522] placeholder-[#C4B5AE] outline-none transition focus:border-[#8C2D40] focus:ring-2 focus:ring-[#8C2D40]/10"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block font-sans text-[10px] font-bold tracking-widest text-[#6B6B6B] uppercase">
            Password
          </label>
          <div className="relative">
            <input
              id="register-password"
              name="password"
              type={showPass ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Minimal 6 karakter"
              value={dataForm.password}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-[#F3EAE3] bg-white px-4 py-3 pr-12 font-sans text-sm text-[#2A2522] placeholder-[#C4B5AE] outline-none transition focus:border-[#8C2D40] focus:ring-2 focus:ring-[#8C2D40]/10"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A89FB8] hover:text-[#8C2D40] transition p-1"
              aria-label={showPass ? "Sembunyikan password" : "Tampilkan password"}
            >
              {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {/* Password strength hint */}
          {dataForm.password.length > 0 && (
            <div className="flex items-center gap-2 pt-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    dataForm.password.length >= (i === 0 ? 1 : i === 1 ? 6 : 10)
                      ? i === 0 ? "bg-rose-400" : i === 1 ? "bg-amber-400" : "bg-emerald-400"
                      : "bg-[#F3EAE3]"
                  }`}
                />
              ))}
              <span className="font-sans text-[10px] text-[#A89FB8]">
                {dataForm.password.length < 6 ? "Lemah" : dataForm.password.length < 10 ? "Sedang" : "Kuat"}
              </span>
            </div>
          )}
        </div>

        {/* Konfirmasi Password */}
        <div className="space-y-1.5">
          <label className="block font-sans text-[10px] font-bold tracking-widest text-[#6B6B6B] uppercase">
            Konfirmasi Password
          </label>
          <div className="relative">
            <input
              id="register-confirm-password"
              name="confirmPassword"
              type={showConf ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Ulangi password Anda"
              value={dataForm.confirmPassword}
              onChange={handleChange}
              required
              className={`w-full rounded-xl border bg-white px-4 py-3 pr-12 font-sans text-sm text-[#2A2522] placeholder-[#C4B5AE] outline-none transition focus:ring-2 ${
                dataForm.confirmPassword && dataForm.confirmPassword !== dataForm.password
                  ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                  : dataForm.confirmPassword && dataForm.confirmPassword === dataForm.password
                  ? "border-emerald-300 focus:border-emerald-400 focus:ring-emerald-100"
                  : "border-[#F3EAE3] focus:border-[#8C2D40] focus:ring-[#8C2D40]/10"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConf(!showConf)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A89FB8] hover:text-[#8C2D40] transition p-1"
              aria-label={showConf ? "Sembunyikan" : "Tampilkan"}
            >
              {showConf ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {dataForm.confirmPassword && dataForm.confirmPassword !== dataForm.password && (
            <p className="font-sans text-[10px] text-rose-500">Password tidak cocok.</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          id="register-submit"
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-[#8C2D40] hover:bg-[#732231] text-white font-serif text-sm font-medium tracking-wider py-3.5 transition shadow-md shadow-[#8C2D40]/20 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
        >
          {loading ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Mendaftarkan...</>
          ) : (
            <><UserPlus className="h-4 w-4" /> Daftar Sekarang</>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-[#F3EAE3]" />
        <span className="font-sans text-[10px] text-[#A89FB8] tracking-widest uppercase">atau</span>
        <div className="flex-1 h-px bg-[#F3EAE3]" />
      </div>

      {/* Login Link */}
      <p className="text-center font-sans text-sm text-[#6B6B6B]">
        Sudah punya akun?{" "}
        <Link
          to="/login"
          className="font-semibold text-[#8C2D40] hover:underline underline-offset-2 transition"
        >
          Login di sini
        </Link>
      </p>

      {/* Back to shop */}
      <p className="text-center">
        <Link
          to="/"
          className="font-sans text-[10px] text-[#A89FB8] hover:text-[#8C2D40] tracking-widest uppercase transition"
        >
          ← Kembali ke Toko
        </Link>
      </p>
    </div>
  );
}
