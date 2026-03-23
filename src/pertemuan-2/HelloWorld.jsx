export default function HelloWorld(){
    return (
        <div>
            <BiodataDiri />
        </div>
    )
}

// Komponen Utama
function BiodataDiri() {
    return (
        <div>
            <NamaPengguna />
            <NomorInduk />
            <Kampus />
            <Jurusan />
            <Status />
            <UmurPengguna />
        </div>
    )
}

// 1. Child Nama
function NamaPengguna() {
    return <h3>Clearesta Rahimah Thee</h3>
}

// 2. Child NIM
function NomorInduk() {
    return <p>NIM: 2457301029</p>
}

// 3. Child Kampus
function Kampus() {
    return <p>Politeknik Caltex Riau</p>
}

// 4. Child Jurusan
function Jurusan() {
    const prodi = "Sistem Informasi";
    return (
        <div>
            <hr/>
            <p>Program Studi: <strong>{prodi}</strong></p>
        </div>
    )
}

// 5. Child Status
function Status() {
    return <small>MAHASISWA AKTIF</small>
}

// 6. Child Umur
function UmurPengguna() {
    const tahunSekarang = 2026;
    const tahunLahir = 2006; 
    return (
        <div>
            <hr/>
            <p>Umur: {tahunSekarang - tahunLahir} Tahun</p>
        </div>
    )
}