import { Link } from "react-router-dom";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-[#FDFBF9] flex flex-col items-center justify-center p-6 text-[#2A2522]">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-[#F3EAE3] text-center space-y-6 animate-fade-in-up">
        <div className="mx-auto w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center border-4 border-emerald-100">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        
        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-bold text-[#2A2522]">
            Pesanan Berhasil!
          </h1>
          <p className="text-[#6B6B6B] text-sm leading-relaxed">
            Terima kasih telah berbelanja di Lumina Beauté. Pesanan Anda telah kami terima dan saat ini sedang menunggu konfirmasi dari Admin.
          </p>
        </div>

        <div className="bg-[#FFF5F5] p-4 rounded-xl text-left border border-[#F3EAE3]">
          <h3 className="font-semibold text-sm text-[#8C2D40] mb-1">Langkah Selanjutnya</h3>
          <p className="text-xs text-[#6B6B6B]">
            Admin kami akan segera memproses pesanan Anda. Anda dapat melihat status pesanan melalui halaman Dashboard Member.
          </p>
        </div>

        <div className="pt-4 space-y-3">
          <Link to="/member" className="block w-full">
            <Button className="w-full rounded-full bg-[#8C2D40] hover:bg-[#732231] text-white py-6 text-sm font-semibold tracking-wider transition uppercase cursor-pointer">
              Lihat Dashboard Member
            </Button>
          </Link>
          <Link to="/" className="block w-full">
            <Button variant="outline" className="w-full rounded-full border-[#8C2D40]/30 hover:border-[#8C2D40] hover:bg-[#FFF5F5] text-[#8C2D40] py-6 text-sm font-semibold tracking-wider transition uppercase flex items-center justify-center gap-2 cursor-pointer">
              <ShoppingBag className="w-4 h-4" /> Lanjut Belanja
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
