import { useState } from "react";

export default function HitungGajiForm() {
    // Gunakan state default angka 0 atau string kosong
    const [gaji, setGaji] = useState("");
    const pajak = 0.11;
    
    // Pastikan gaji dikonversi ke Number untuk perhitungan yang aman
    const gajiPokok = Number(gaji);
    const totalGaji = gajiPokok - (gajiPokok * pajak);

    return (
        <div className="flex flex-col items-center justify-center m-5 p-5 bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">Hitung Gaji Bersih</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                        Gaji Pokok
                    </label>
                    <input
                        type="number"
                        placeholder="Masukkan jumlah gaji"
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        // Nilai disimpan sesuai inputan user
                        onChange={(e) => setGaji(e.target.value)}
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                        {/* Diubah dari class menjadi className */}
                        Pajak: <b className="text-red-500">11%</b>
                    </label>
                </div>

                {!gaji || gajiPokok <= 0 ? (
                    <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
                        <p className="font-semibold">Silahkan masukkan gaji yang valid (tidak boleh kosong/nol)</p> 
                    {/* Tag div ini sudah diperbaiki dari <div/> menjadi </div> */}
                    </div>
                ) : (
                    <div className="mt-4 p-3 bg-blue-100 border-l-4 border-blue-500 text-blue-700">
                        <p className="font-semibold">
                            Total Take Home Pay (THP): Rp {totalGaji.toLocaleString("id-ID")}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}