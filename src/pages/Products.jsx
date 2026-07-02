import { useEffect, useState } from "react";
import { Button, Badge } from "../components/1-basic";
import { Table } from "../components/3-data-display";
import { PageHeaderSection, PanelSection } from "../components/6-section";
import { EditButton, DeleteButton } from "../components/13-action";
import { FadeIn } from "../components/15-animation";
import { supabase } from "../lib/supabaseClient";
import { Alert } from "../components/5-feedback";

const emptyForm = { name: "", description: "", price: "", stock: "" };

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const loadProducts = async () => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    if (editingId) {
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", editingId);
      if (!error) {
        setMessage("Produk berhasil diperbarui.");
      }
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (!error) {
        setMessage("Produk berhasil ditambahkan.");
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
        <span className={val > 40 ? "stock-high" : "stock-med"}>{val} pcs</span>
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
          className="mb-4 space-y-3 rounded-xl border border-stone-200 bg-stone-50 p-4"
        >
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-sm font-medium text-stone-700">
              Nama Produk
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              />
            </label>
            <label className="text-sm font-medium text-stone-700">
              Deskripsi
              <input
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
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
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
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
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              />
            </label>
          </div>
          <Button variant="primary" size="sm" type="submit">
            {editingId ? "Update Produk" : "+ Add Product"}
          </Button>
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
