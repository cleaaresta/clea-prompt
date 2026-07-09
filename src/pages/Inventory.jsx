import { useState, useEffect } from 'react'
import { Table } from '../components/3-data-display'
import { PageHeaderSection, PanelSection } from '../components/6-section'
import { StockStatus } from '../components/12-status'
import { EditButton } from '../components/13-action'
import { FadeIn } from '../components/15-animation'
import { Modal } from '../components/5-feedback'
import { Button } from '../components/1-basic'
import { supabase } from '../lib/supabaseClient'

export default function Inventory() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [quantity, setQuantity] = useState(0)
  const [updating, setUpdating] = useState(false)

  const loadProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      
    if (!error) {
      const formatted = (data || []).map(p => {
        const reorder = 10
        let status = 'In Stock'
        if (p.stock === 0) status = 'Out of Stock'
        else if (p.stock <= reorder / 2) status = 'Critical'
        else if (p.stock <= reorder) status = 'Low'

        return { ...p, quantity: p.stock, reorder, status, sku: `PRD-${String(p.id).substring(0, 4).toUpperCase()}` }
      })
      setItems(formatted)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const handleEdit = (item) => {
    setEditingItem(item)
    setQuantity(item.quantity || 0)
    setModalOpen(true)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setUpdating(true)
    
    const newQuantity = Number(quantity)
    const { error } = await supabase
      .from('products')
      .update({ stock: newQuantity })
      .eq('id', editingItem.id)

    if (!error) {
      setItems((prev) =>
        prev.map((item) => {
          if (item.id === editingItem.id) {
            let newStatus = 'In Stock'
            if (newQuantity === 0) newStatus = 'Out of Stock'
            else if (newQuantity <= item.reorder / 2) newStatus = 'Critical'
            else if (newQuantity <= item.reorder) newStatus = 'Low'

            return { ...item, quantity: newQuantity, stock: newQuantity, status: newStatus }
          }
          return item
        })
      )
      setModalOpen(false)
    } else {
      console.error("Gagal update stok:", error)
    }
    setUpdating(false)
  }

  const columns = [
    { key: 'name', label: 'Product' },
    { key: 'sku', label: 'SKU' },
    { key: 'quantity', label: 'Quantity', cellClassName: 'text-center' },
    { key: 'reorder', label: 'Reorder Level', cellClassName: 'text-center' },
    {
      key: 'status',
      label: 'Status',
      render: (val) => <StockStatus status={val} />,
    },
  ]

  return (
    <section>
      <FadeIn>
        <PageHeaderSection
          title="Inventory"
          subtitle="Monitor stock levels and reorder status for all makeup items."
        />
      </FadeIn>
      <PanelSection title="Stock Status">
        {loading ? (
          <p className="text-sm text-stone-500">Memuat inventory...</p>
        ) : (
          <Table
            columns={columns}
            data={items}
            renderActions={(row) => <EditButton label="Update" onClick={() => handleEdit(row)} />}
          />
        )}
      </PanelSection>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Update Stock">
        {editingItem && (
          <form onSubmit={handleUpdate} className="space-y-4 pt-2">
            <div className="grid gap-3">
              <label className="text-sm font-medium text-stone-700">
                Nama Produk
                <input
                  type="text"
                  value={editingItem.name}
                  disabled
                  className="mt-1 w-full rounded-lg border border-stone-300 bg-stone-100 px-3 py-2 outline-none text-stone-500"
                />
              </label>
              <label className="text-sm font-medium text-stone-700">
                Update Quantity (Stock)
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  min="0"
                  className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500"
                />
              </label>
            </div>
            <div className="pt-4 border-t border-stone-200 mt-4 flex gap-2">
              <Button variant="primary" type="submit" disabled={updating}>
                {updating ? 'Menyimpan...' : 'Update Stok'}
              </Button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-sm text-stone-600 hover:text-stone-900 px-4 py-2"
                disabled={updating}
              >
                Batal
              </button>
            </div>
          </form>
        )}
      </Modal>
    </section>
  )
}
