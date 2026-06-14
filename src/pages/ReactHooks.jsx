import { useState, useEffect, useRef } from 'react'
import { PageHeaderSection } from '../components/6-section'
import { FadeIn, SlideUp } from '../components/15-animation'

/* ============================================================
   DATA PRODUK MAKEUP — Glamour Studio
   ============================================================ */
const productCatalog = [
  { id: 1, name: 'Velvet Matte Lipstick', category: 'Lips', price: 12.99, rating: 4.8, stock: 45, color: '#e74c7a' },
  { id: 2, name: 'Silk Foundation SPF30', category: 'Face', price: 29.99, rating: 4.6, stock: 32, color: '#f4a460' },
  { id: 3, name: 'Shimmer Eyeshadow Palette', category: 'Eyes', price: 24.99, rating: 4.9, stock: 18, color: '#9b4bff' },
  { id: 4, name: 'Rose Blush Duo', category: 'Face', price: 18.99, rating: 4.7, stock: 52, color: '#ff7da0' },
  { id: 5, name: 'Waterproof Mascara', category: 'Eyes', price: 14.99, rating: 4.5, stock: 67, color: '#2d2d2d' },
  { id: 6, name: 'Lip Gloss Berry', category: 'Lips', price: 9.99, rating: 4.3, stock: 89, color: '#c44569' },
  { id: 7, name: 'Setting Spray Dewy', category: 'Face', price: 16.99, rating: 4.4, stock: 41, color: '#45c3f4' },
  { id: 8, name: 'Brow Pencil Natural', category: 'Eyes', price: 8.99, rating: 4.2, stock: 73, color: '#8b6914' },
  { id: 9, name: 'Contour Kit Pro', category: 'Face', price: 34.99, rating: 4.8, stock: 22, color: '#d4a574' },
  { id: 10, name: 'Liquid Liner Jet Black', category: 'Eyes', price: 11.99, rating: 4.6, stock: 55, color: '#1a1a2e' },
  { id: 11, name: 'Cream Lipstick Nude', category: 'Lips', price: 13.99, rating: 4.7, stock: 38, color: '#d4917b' },
  { id: 12, name: 'Highlighter Glow', category: 'Face', price: 19.99, rating: 4.9, stock: 29, color: '#ffd700' },
]

/* ============================================================
   KOMPONEN SKELETON LOADING
   Ditampilkan saat useEffect simulasi fetch data berjalan
   ============================================================ */
function CatalogSkeleton() {
  return (
    <div className="hooks-skeleton-section">
      {/* Skeleton stat cards */}
      <div className="hooks-stats-row">
        {[1, 2, 3].map((i) => (
          <div key={i} className="hooks-skeleton-stat">
            <div className="hooks-skel-line hooks-skel-short" />
            <div className="hooks-skel-line hooks-skel-large" />
          </div>
        ))}
      </div>
      {/* Skeleton product grid */}
      <div className="hooks-product-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="hooks-skeleton-card">
            <div className="hooks-skel-circle" />
            <div className="hooks-skel-line hooks-skel-medium" />
            <div className="hooks-skel-line hooks-skel-short" />
            <div className="hooks-skel-line hooks-skel-tiny" />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============================================================
   HALAMAN REACT HOOKS — PENERAPAN useState, useEffect, useRef

   Halaman ini mendemonstrasikan 3 React Hooks utama dalam konteks
   Beauty Product Catalog Browser di Glamour Studio POS.

   ★ useState  → searchQuery, selectedCategory, isLoading
   ★ useEffect → simulasi fetch data, auto-update document.title,
                  auto-focus search input
   ★ useRef    → referensi DOM input search (auto-focus),
                  keystroke counter tanpa re-render,
                  referensi DOM badge counter
   ============================================================ */
export default function ReactHooks() {

  // ════════════════════════════════════════════════════
  //  A. useState — Mengelola State Komponen
  // ════════════════════════════════════════════════════

  // useState #1: State pencarian produk
  // What  : Menyimpan query pencarian yang diketik user
  // Why   : Diperlukan agar katalog produk bisa difilter secara real-time
  //          tanpa reload halaman — setiap perubahan memicu re-render
  // Who   : Admin/staff toko yang mencari produk tertentu
  // When  : State berubah setiap kali user mengetik di search input
  // Where : Di search bar pada bagian atas katalog produk
  // How   : useState menyimpan string query, setter function memicu
  //          re-render sehingga daftar produk langsung terfilter
  const [searchQuery, setSearchQuery] = useState('')

  // useState #2: State kategori yang dipilih
  // What  : Menyimpan kategori filter aktif (All/Lips/Eyes/Face)
  // Why   : User perlu bisa memfilter produk berdasarkan kategori
  //          untuk mempercepat pencarian
  // Who   : Staff yang mengelola produk per kategori
  // When  : Berubah saat user mengklik tombol kategori
  // Where : Di baris filter kategori
  // How   : Nilai 'All', 'Lips', 'Eyes', atau 'Face' disimpan di state
  const [selectedCategory, setSelectedCategory] = useState('All')

  // useState #3: State loading data
  // What  : Menandai apakah data sedang "dimuat" dari server
  // Why   : Memberikan feedback visual (skeleton) agar user tahu
  //          aplikasi sedang bekerja, bukan hang
  // Who   : Semua pengguna yang membuka halaman ini
  // When  : true saat pertama mount, false setelah 1.5 detik
  // Where : Menggantikan seluruh konten dengan skeleton saat true
  // How   : Boolean state yang dikontrol oleh useEffect
  const [isLoading, setIsLoading] = useState(true)

  // ════════════════════════════════════════════════════
  //  C. useRef — Referensi DOM & Mutable Value
  // ════════════════════════════════════════════════════

  // useRef #1: Referensi ke elemen DOM input pencarian
  // What  : Menyimpan referensi langsung ke elemen <input> search
  // Why   : Tidak bisa menggunakan useState untuk akses DOM —
  //          kita perlu metode imperatif .focus() yang hanya ada di DOM
  // Who   : User yang terbantu dengan auto-focus langsung ke search
  // When  : Digunakan setelah loading selesai (isLoading → false)
  // Where : Di elemen <input> search via atribut ref={}
  // How   : useRef mengembalikan { current: null }, setelah render
  //          .current berisi referensi ke elemen DOM <input>
  const searchInputRef = useRef(null)

  // useRef #2: Counter keystroke tanpa re-render
  // What  : Menghitung total keystroke yang dilakukan user
  // Why   : Jika menggunakan useState, setiap keystroke akan memicu
  //          re-render TAMBAHAN yang tidak perlu. useRef menyimpan
  //          mutable value yang persist antar render TANPA re-render.
  //          Ini menunjukkan perbedaan kunci useState vs useRef.
  // Who   : Demonstrasi bahwa useRef tidak memicu re-render
  // When  : Diupdate setiap kali user mengetik di search input
  // Where : Di onChange handler, ditampilkan di badge counter
  // How   : keystrokeCountRef.current += 1 (direct mutation, no re-render)
  const keystrokeCountRef = useRef(0)

  // useRef #3: Referensi ke elemen DOM badge counter
  // What  : Menyimpan referensi ke elemen <span> badge
  // Why   : Agar bisa update tampilan badge tanpa setState (tanpa re-render)
  //          via DOM manipulation langsung: .textContent = '...'
  // When  : Diupdate bersamaan dengan keystrokeCountRef
  // Where : Di elemen <span> badge via atribut ref={}
  // How   : Manipulasi DOM langsung — .textContent diubah imperatif
  const badgeRef = useRef(null)

  // ════════════════════════════════════════════════════
  //  B. useEffect — Side Effects
  // ════════════════════════════════════════════════════

  // useEffect #1: Simulasi Fetch Data dari API
  // What  : Mensimulasikan proses pengambilan data produk dari server
  // Why   : Dalam aplikasi nyata, data diambil via fetch/axios ke API.
  //          useEffect DIPERLUKAN untuk side effect (setTimeout, fetch)
  //          yang harus berjalan SETELAH component selesai render
  // Who   : Semua user melihat loading skeleton yang smooth
  // When  : Dijalankan SEKALI saat component pertama kali di-mount
  //          karena dependency array kosong []
  // Where : Mengontrol transisi dari skeleton → konten asli
  // How   : setTimeout 1.5 detik mensimulasikan network delay.
  //          Cleanup function (return () => clearTimeout) mencegah
  //          setState pada component yang sudah unmount (memory leak)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    // Cleanup: bersihkan timer jika component unmount sebelum selesai
    return () => clearTimeout(timer)
  }, []) // [] = dependency kosong = jalankan sekali saat mount

  // useEffect #2: Auto-Update Document Title
  // What  : Mengubah judul tab browser sesuai kategori yang dipilih
  // Why   : Meningkatkan UX — user bisa melihat konteks dari tab browser.
  //          Ini adalah side effect ke luar React (document.title)
  // Who   : User yang membuka banyak tab sekaligus
  // When  : Dijalankan setiap kali selectedCategory berubah
  //          Dependency array [selectedCategory] mengontrol ini
  // Where : Di title bar browser
  // How   : document.title = '...' adalah side effect ke Browser DOM.
  //          Cleanup function mengembalikan title saat user navigasi
  //          keluar dari halaman ini
  useEffect(() => {
    document.title = `Hooks Demo - ${selectedCategory} | Glamour Studio`

    // Cleanup: kembalikan title saat component unmount
    return () => {
      document.title = 'Glamour Studio POS'
    }
  }, [selectedCategory])

  // useEffect #3: Auto-Focus Search Input Setelah Loading Selesai
  // What  : Memindahkan cursor/focus ke search input secara otomatis
  // Why   : Setelah data dimuat, user biasanya ingin mencari produk.
  //          Auto-focus menghemat satu klik. Menggunakan searchInputRef
  //          (useRef) untuk akses .focus() — metode DOM imperatif
  // Who   : User yang langsung ingin mencari produk
  // When  : Dijalankan saat isLoading berubah (true → false)
  // Where : Pada elemen <input> yang di-referensi searchInputRef
  // How   : searchInputRef.current.focus() memanggil metode DOM
  //          secara imperatif — HANYA bisa dilakukan dengan useRef
  useEffect(() => {
    if (!isLoading && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isLoading])

  // ════════════════════════════════════════════════════
  //  LOGIKA FILTER — Menggunakan searchQuery & selectedCategory
  // ════════════════════════════════════════════════════
  const filteredProducts = productCatalog.filter((product) => {
    const matchCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchSearch = !searchQuery.trim() ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCategory && matchSearch
  })

  // Statistik untuk summary cards
  const totalProducts = filteredProducts.length
  const avgPrice = filteredProducts.length > 0
    ? (filteredProducts.reduce((sum, p) => sum + p.price, 0) / filteredProducts.length).toFixed(2)
    : '0.00'
  const totalStock = filteredProducts.reduce((sum, p) => sum + p.stock, 0)

  // ════════════════════════════════════════════════════
  //  HANDLER — useState + useRef bekerja bersamaan
  // ════════════════════════════════════════════════════
  const handleSearchChange = (e) => {
    // useState: update query → trigger re-render → produk terfilter
    setSearchQuery(e.target.value)

    // useRef: increment counter TANPA trigger re-render
    // Perbedaan kunci: useState re-render, useRef TIDAK
    keystrokeCountRef.current += 1

    // Update badge via DOM manipulation langsung (bukan React state)
    if (badgeRef.current) {
      badgeRef.current.textContent = `⌨️ ${keystrokeCountRef.current} keystrokes (useRef)`
    }
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    // Gunakan useRef untuk focus kembali ke input
    searchInputRef.current?.focus()
  }

  // ════════════════════════════════════════════════════
  //  RENDER
  // ════════════════════════════════════════════════════

  // Tampilkan skeleton saat loading (dari useEffect #1)
  if (isLoading) {
    return (
      <section>
        <FadeIn>
          <PageHeaderSection
            title="React Hooks"
            subtitle="Demonstrasi penggunaan useState, useEffect, dan useRef pada Beauty Product Catalog."
          />
        </FadeIn>
        <CatalogSkeleton />
      </section>
    )
  }

  return (
    <section>
      <FadeIn>
        <PageHeaderSection
          title="React Hooks"
          subtitle="Demonstrasi penggunaan useState, useEffect, dan useRef pada Beauty Product Catalog."
        />
      </FadeIn>

      {/* ── Hook Badges ── */}
      <SlideUp delay="0s">
        <div className="hooks-badge-row">
          <span className="hooks-badge hooks-badge-state">⚡ useState</span>
          <span className="hooks-badge hooks-badge-effect">🔄 useEffect</span>
          <span className="hooks-badge hooks-badge-ref">📌 useRef</span>
        </div>
      </SlideUp>

      {/* ── Summary Stats (berubah berdasarkan filter — useState) ── */}
      <SlideUp delay="0.05s">
        <div className="hooks-stats-row">
          <div className="hooks-stat-card hooks-stat-purple">
            <p className="hooks-stat-label">Products Found</p>
            <h2 className="hooks-stat-value">{totalProducts}</h2>
            <p className="hooks-stat-note">{searchQuery ? 'Filtered' : 'All products'}</p>
          </div>
          <div className="hooks-stat-card hooks-stat-pink">
            <p className="hooks-stat-label">Avg. Price</p>
            <h2 className="hooks-stat-value">${avgPrice}</h2>
            <p className="hooks-stat-note">Current selection</p>
          </div>
          <div className="hooks-stat-card hooks-stat-blue">
            <p className="hooks-stat-label">Total Stock</p>
            <h2 className="hooks-stat-value">{totalStock}</h2>
            <p className="hooks-stat-note">Units available</p>
          </div>
        </div>
      </SlideUp>

      {/* ── Search & Filter Panel ── */}
      <SlideUp delay="0.1s">
        <div className="panel hooks-panel">
          <h3 className="panel-title">🔍 Product Catalog Browser</h3>

          {/* Search Bar — useState (searchQuery) + useRef (searchInputRef, keystrokeCountRef) */}
          <div className="hooks-search-area">
            <div className="hooks-search-wrapper">
              <span className="hooks-search-icon">🔍</span>
              <input
                ref={searchInputRef}
                type="text"
                className="hooks-search-input"
                placeholder="Cari nama produk atau kategori..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <button className="hooks-clear-btn" onClick={handleClearSearch}>
                  ✕
                </button>
              )}
            </div>
            {/* Badge — diupdate via useRef (tanpa re-render) */}
            <span ref={badgeRef} className="hooks-keystroke-badge">
              ⌨️ 0 keystrokes (useRef)
            </span>
          </div>

          {/* Category Filter — useState (selectedCategory) */}
          <div className="hooks-category-filter">
            {['All', 'Lips', 'Eyes', 'Face'].map((cat) => (
              <button
                key={cat}
                className={`hooks-cat-btn ${selectedCategory === cat ? 'hooks-cat-active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'All' && '🎨 '}
                {cat === 'Lips' && '💋 '}
                {cat === 'Eyes' && '👁️ '}
                {cat === 'Face' && '✨ '}
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="hooks-product-grid">
            {filteredProducts.length === 0 ? (
              <div className="hooks-empty">
                <p className="hooks-empty-icon">🔍</p>
                <p className="hooks-empty-text">Tidak ada produk ditemukan</p>
                <p className="hooks-empty-sub">Coba kata kunci atau kategori lain</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div key={product.id} className="hooks-product-card">
                  <div
                    className="hooks-product-swatch"
                    style={{ background: product.color }}
                  />
                  <div className="hooks-product-info">
                    <h4 className="hooks-product-name">{product.name}</h4>
                    <span className="hooks-product-cat">{product.category}</span>
                    <div className="hooks-product-meta">
                      <span className="hooks-product-price">${product.price.toFixed(2)}</span>
                      <span className="hooks-product-rating">⭐ {product.rating}</span>
                    </div>
                    <div className="hooks-product-stock">
                      <div
                        className="hooks-stock-bar"
                        style={{ width: `${Math.min(product.stock, 100)}%` }}
                      />
                    </div>
                    <span className="hooks-stock-label">{product.stock} in stock</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </SlideUp>

      {/* ── Penjelasan Hooks ── */}
      <SlideUp delay="0.15s">
        <div className="hooks-explanation-grid">
          <div className="panel hooks-explain-card">
            <div className="hooks-explain-icon">⚡</div>
            <h3 className="hooks-explain-title">useState</h3>
            <ul className="hooks-explain-list">
              <li><strong>What:</strong> State searchQuery, selectedCategory, isLoading</li>
              <li><strong>Why:</strong> Diperlukan agar UI reaktif — setiap perubahan data langsung terlihat di tampilan</li>
              <li><strong>Who:</strong> Admin yang mencari & memfilter produk</li>
              <li><strong>When:</strong> Saat user mengetik, klik kategori, atau halaman pertama dibuka</li>
              <li><strong>Where:</strong> Search bar, category filter, loading state</li>
              <li><strong>How:</strong> setState memicu re-render → UI otomatis update</li>
            </ul>
          </div>
          <div className="panel hooks-explain-card">
            <div className="hooks-explain-icon">🔄</div>
            <h3 className="hooks-explain-title">useEffect</h3>
            <ul className="hooks-explain-list">
              <li><strong>What:</strong> Fetch data, update document.title, auto-focus input</li>
              <li><strong>Why:</strong> Side effects (setTimeout, DOM luar React) harus dijalankan SETELAH render</li>
              <li><strong>Who:</strong> User yang melihat loading → konten, dan title browser yang kontekstual</li>
              <li><strong>When:</strong> Saat mount [], saat category berubah [selectedCategory], saat loading selesai [isLoading]</li>
              <li><strong>Where:</strong> Loading skeleton, title browser, search input focus</li>
              <li><strong>How:</strong> Dependency array mengontrol kapan effect berjalan. Cleanup function mencegah memory leak</li>
            </ul>
          </div>
          <div className="panel hooks-explain-card">
            <div className="hooks-explain-icon">📌</div>
            <h3 className="hooks-explain-title">useRef</h3>
            <ul className="hooks-explain-list">
              <li><strong>What:</strong> Referensi DOM input, keystroke counter, referensi DOM badge</li>
              <li><strong>Why:</strong> Akses DOM imperatif (.focus) & menyimpan value tanpa re-render — useState TIDAK bisa</li>
              <li><strong>Who:</strong> User yang terbantu auto-focus, developer yang butuh mutable value</li>
              <li><strong>When:</strong> Setelah loading selesai (focus), setiap keystroke (counter)</li>
              <li><strong>Where:</strong> Search input (ref), keystroke badge (ref), counter (ref.current)</li>
              <li><strong>How:</strong> useRef.current bisa dimutasi kapan saja TANPA memicu re-render</li>
            </ul>
          </div>
        </div>
      </SlideUp>
    </section>
  )
}
