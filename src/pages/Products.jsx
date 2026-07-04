import { useEffect, useState } from "react";
import { Button } from "../components/1-basic";
import { Table } from "../components/3-data-display";
import { PageHeaderSection, PanelSection } from "../components/6-section";
import { FadeIn } from "../components/15-animation";
import { supabase } from "../lib/supabaseClient";
import { Alert } from "../components/5-feedback";

const DEFAULT_PRODUCT_IMAGE =
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80";

const emptyForm = { name: "", description: "", price: "", stock: "", image_url: "" };

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) {
      setProducts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setMessage("");

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `images/${fileName}`;

      // Try uploading to Supabase Storage bucket 'product-images'
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL if storage upload succeeded
      const { data: { publicUrl } } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      setFormData((current) => ({ ...current, image_url: publicUrl }));
      setMessage("Gambar berhasil diunggah ke storage.");
    } catch (error) {
      console.warn("Storage upload failed, falling back to base64 conversion:", error.message);

      // Fallback: convert file to Base64 so it can store directly in the database
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((current) => ({ ...current, image_url: reader.result }));
        setMessage("Gambar berhasil diunggah (tersimpan lokal di database).");
        setUploading(false);
      };
      reader.readAsDataURL(file);
      return; // Return early, setUploading(false) is handled in reader.onloadend
    }

    setUploading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      stock: Number(formData.stock),
      image_url: formData.image_url.trim() || null,
    };

    if (editingId) {
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", editingId);
      if (!error) {
        setMessage("Produk berhasil diperbarui.");
      } else {
        console.error("Gagal update produk:", error);
      }
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (!error) {
        setMessage("Produk berhasil ditambahkan.");
      } else {
        console.error("Gagal menambah produk:", error);
      }
    }

    setFormData(emptyForm);
    setEditingId(null);
    await loadProducts();
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price,
      stock: product.stock,
      image_url: product.image_url || "",
    });
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) {
      setMessage("Produk berhasil dihapus.");
      await loadProducts();
    }
  };

  const columns = [
    {
      key: "image_url",
      label: "Image",
      render: (val) => (
        <div className="h-10 w-10 overflow-hidden rounded-lg bg-stone-150 border border-stone-200 flex items-center justify-center">
          <img
            src={val || DEFAULT_PRODUCT_IMAGE}
            alt="Product"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = DEFAULT_PRODUCT_IMAGE;
            }}
          />
        </div>
      ),
    },
    { key: "name", label: "Product Name" },
    { key: "description", label: "Description" },
    {
      key: "price",
      label: "Price",
      render: (value) => `Rp ${Number(value).toLocaleString("id-ID")}`,
    },
    {
      key: "stock",
      label: "Stock",
      render: (val) => (
        <span className={val > 5 ? "stock-high" : "stock-med"}>{val} pcs</span>
      ),
    },
  ];

  return (
    <section>
      <FadeIn>
        <PageHeaderSection
          title="Products"
          subtitle="Manage makeup products, variants, and pricing."
        />
      </FadeIn>
      {message ? (
        <Alert variant="success" className="mb-4">
          {message}
        </Alert>
      ) : null}
      <PanelSection title="All Products">
        <form
          onSubmit={handleSubmit}
          className="mb-6 space-y-3 rounded-xl border border-stone-200 bg-stone-50 p-4 shadow-sm"
        >
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-sm font-medium text-stone-700">
              Nama Produk
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
              />
            </label>
            <label className="text-sm font-medium text-stone-700">
              Deskripsi
              <input
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
              />
            </label>
            <label className="text-sm font-medium text-stone-700">
              Harga
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
              />
            </label>
            <label className="text-sm font-medium text-stone-700">
              Stok
              <input
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
              />
            </label>

            {/* Image Upload Input */}
            <div className="text-sm font-medium text-stone-700 md:col-span-2 space-y-2">
              <span>Gambar Produk</span>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <label className="flex flex-col items-center justify-center border border-dashed border-stone-300 rounded-lg p-4 bg-white cursor-pointer hover:border-violet-400 transition w-full sm:max-w-xs text-center space-y-1">
                  <span className="text-xs text-stone-500">
                    {uploading ? "Mengunggah..." : "Pilih File Gambar (PNG, JPG)"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>

                <div className="flex-1 space-y-2">
                  <input
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    placeholder="Atau tempel link gambar di sini..."
                    className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
                  />
                  {formData.image_url && (
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Gambar Terpilih
                      </span>
                      <button
                        type="button"
                        onClick={() => setFormData((current) => ({ ...current, image_url: "" }))}
                        className="text-[10px] text-rose-600 hover:underline"
                      >
                        Hapus Gambar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="pt-2">
            <Button variant="primary" size="sm" type="submit">
              {editingId ? "Update Produk" : "+ Add Product"}
            </Button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setFormData(emptyForm);
                  setEditingId(null);
                }}
                className="ml-2 text-xs text-stone-500 hover:text-stone-700"
              >
                Batal
              </button>
            )}
          </div>
        </form>
        {loading ? (
          <p className="text-sm text-stone-500">Memuat produk...</p>
        ) : (
          <Table
            columns={columns}
            data={products}
            renderActions={(row) => (
              <>
                <button
                  className="btn-small view"
                  onClick={() => handleEdit(row)}
                >
                  Edit
                </button>
                <button
                  className="btn-small delete"
                  onClick={() => handleDelete(row.id)}
                >
                  Delete
                </button>
              </>
            )}
          />
        )}
      </PanelSection>
    </section>
  );
}
