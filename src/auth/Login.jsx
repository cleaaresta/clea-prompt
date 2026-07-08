import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff, Loader2, ArrowRight, Check } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [dataForm, setDataForm]   = useState({ email: "", password: "" });
  const [searchParams]            = useSearchParams();

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccess("Pendaftaran berhasil! Silakan login dengan akun baru Anda.");
      return;
    }
    const message = searchParams.get("message");
    if (message) setSuccess(decodeURIComponent(message));
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const { profile } = await signIn(dataForm.email, dataForm.password);
      if (!profile) { setError("Email atau password salah."); return; }
      navigate(profile.role === "admin" ? "/admin" : "/member", { replace: true });
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat login. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Heading */}
      <div className="space-y-2">
        <span className="font-sans text-[10px] font-bold tracking-widest text-[#8C2D40] uppercase">
          Portal Akun
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#2A2522] leading-tight">
          Selamat Datang Kembali
        </h1>
        <p className="font-sans text-sm text-[#6B6B6B] font-normal">
          Masuk sebagai member atau admin untuk mengakses akun Anda.
        </p>
      </div>

      {/* Success Alert */}
      {success && (
        <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <Check className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
          <p className="font-sans text-xs text-emerald-700">{success}</p>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3">
          <p className="font-sans text-xs text-rose-700">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div className="space-y-1.5">
          <label className="block font-sans text-[10px] font-bold tracking-widest text-[#6B6B6B] uppercase">
            Email
          </label>
          <input
            id="login-email"
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
              id="login-password"
              name="password"
              type={showPass ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Masukkan password"
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
        </div>

        {/* Submit Button */}
        <button
          id="login-submit"
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-[#8C2D40] hover:bg-[#732231] text-white font-serif text-sm font-medium tracking-wider py-3.5 transition shadow-md shadow-[#8C2D40]/20 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
        >
          {loading ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Memproses...</>
          ) : (
            <><ArrowRight className="h-4 w-4" /> Masuk ke Akun</>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-[#F3EAE3]" />
        <span className="font-sans text-[10px] text-[#A89FB8] tracking-widest uppercase">atau</span>
        <div className="flex-1 h-px bg-[#F3EAE3]" />
      </div>

      {/* Register Link */}
      <p className="text-center font-sans text-sm text-[#6B6B6B]">
        Belum punya akun?{" "}
        <Link
          to="/register"
          className="font-semibold text-[#8C2D40] hover:underline underline-offset-2 transition"
        >
          Daftar di sini
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
