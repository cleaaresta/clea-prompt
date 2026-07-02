import { useEffect, useState } from "react";
import { Button } from "../components/1-basic";
import { Table } from "../components/3-data-display";
import { PageHeaderSection, PanelSection } from "../components/6-section";
import { FadeIn } from "../components/15-animation";
import { supabase } from "../lib/supabaseClient";
import { Alert } from "../components/5-feedback";

const emptyForm = { full_name: "", phone: "", role: "member", tier: "bronze" };

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const loadCustomers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) {
      setCustomers(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name,
        phone: formData.phone,
        role: formData.role,
        tier: formData.tier,
      })
      .eq("id", editingId);

    if (!error) {
      setMessage("Profil pelanggan berhasil diperbarui.");
      setEditingId(null);
      setFormData(emptyForm);
      await loadCustomers();
    }
  };

  const handleEdit = (customer) => {
    setEditingId(customer.id);
    setFormData({
      full_name: customer.full_name || "",
      phone: customer.phone || "",
      role: customer.role || "member",
      tier: customer.tier || "bronze",
    });
  };

  const columns = [
    { key: "full_name", label: "Name", cellClassName: "font-weight-600" },
    { key: "phone", label: "Phone" },
    { key: "role", label: "Role" },
    { key: "tier", label: "Tier" },
    { key: "total_points", label: "Points" },
  ];

  return (
    <section>
      <FadeIn>
        <PageHeaderSection
          title="Customers"
          subtitle="View customer profiles, loyalty status, and purchase history."
        />
      </FadeIn>
      {message ? (
        <Alert variant="success" className="mb-4">
          {message}
        </Alert>
      ) : null}
      <PanelSection title="Customer List">
        <form
          onSubmit={handleSubmit}
          className="mb-4 space-y-3 rounded-xl border border-stone-200 bg-stone-50 p-4"
        >
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-sm font-medium text-stone-700">
              Nama Lengkap
              <input
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              />
            </label>
            <label className="text-sm font-medium text-stone-700">
              Telepon
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              />
            </label>
            <label className="text-sm font-medium text-stone-700">
              Role
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <label className="text-sm font-medium text-stone-700">
              Tier
              <select
                name="tier"
                value={formData.tier}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2"
              >
                <option value="bronze">Bronze</option>
                <option value="silver">Silver</option>
                <option value="gold">Gold</option>
              </select>
            </label>
          </div>
          <Button
            variant="primary"
            size="sm"
            type="submit"
            disabled={!editingId}
          >
            Update Profil
          </Button>
        </form>
        {loading ? (
          <p className="text-sm text-stone-500">Memuat pelanggan...</p>
        ) : (
          <Table
            columns={columns}
            data={customers}
            renderActions={(row) => (
              <button
                className="btn-small view"
                onClick={() => handleEdit(row)}
              >
                Edit
              </button>
            )}
          />
        )}
      </PanelSection>
    </section>
  );
}
