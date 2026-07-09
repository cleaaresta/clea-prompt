import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Button } from '../components/1-basic'
import { Table } from '../components/3-data-display'
import { Alert, Modal } from '../components/5-feedback'
import { PageHeaderSection, PanelSection } from '../components/6-section'
import { DeleteButton } from '../components/13-action'
import { FadeIn } from '../components/15-animation'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' })
  const [formLoading, setFormLoading] = useState(false)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)

  // Fetch users dari Supabase
  const fetchUsers = async () => {
    setLoading(true)
    setError('')
    try {
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) {
        setError('Gagal memuat data user: ' + fetchError.message)
        return
      }
      setUsers(data || [])
    } catch (err) {
      setError('Terjadi kesalahan saat memuat data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Handle form change
  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Open modal untuk tambah user
  const handleAdd = () => {
    setEditingUser(null)
    setFormData({ name: '', email: '', password: '', role: 'user' })
    setModalOpen(true)
  }

  // Open modal untuk edit user
  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({ name: user.name, email: user.email, password: '', role: user.role })
    setModalOpen(true)
  }

  // Submit form (Tambah / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormLoading(true)
    setError('')
    setSuccess('')

    try {
      if (editingUser) {
        // Update user profile
        const updates = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
        }

        // Jika password diisi, update juga password
        if (formData.password.trim()) {
          if (formData.password.length < 6) {
            setError('Password minimal 6 karakter.')
            setFormLoading(false)
            return
          }
          updates.password = formData.password
        }

        const { error: updateError } = await supabase
          .from('users')
          .update(updates)
          .eq('id', editingUser.id)

        if (updateError) {
          setError('Gagal mengupdate user: ' + updateError.message)
          return
        }

        setSuccess(`User "${formData.name}" berhasil diupdate.`)
      } else {
        // Tambah user baru
        if (!formData.password || formData.password.length < 6) {
          setError('Password minimal 6 karakter.')
          setFormLoading(false)
          return
        }

        // Cek email duplikat
        const { data: existing } = await supabase
          .from('users')
          .select('id')
          .eq('email', formData.email)
          .single()

        if (existing) {
          setError('Email sudah terdaftar.')
          setFormLoading(false)
          return
        }

        const { error: insertError } = await supabase
          .from('users')
          .insert({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          })

        if (insertError) {
          setError('Gagal menambah user: ' + insertError.message)
          return
        }

        setSuccess(`User "${formData.name}" berhasil ditambahkan.`)
      }

      setModalOpen(false)
      fetchUsers()
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setFormLoading(false)
    }
  }

  // Delete user
  const handleDelete = async (userId) => {
    setError('')
    setSuccess('')

    try {
      const { error: deleteError } = await supabase
        .from('users')
        .delete()
        .eq('id', userId)

      if (deleteError) {
        setError('Gagal menghapus user: ' + deleteError.message)
        return
      }

      setSuccess('User berhasil dihapus.')
      setDeleteConfirmId(null)
      fetchUsers()
    } catch (err) {
      setError('Terjadi kesalahan saat menghapus user.')
    }
  }

  // Format tanggal
  const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  const columns = [
    { key: 'name', label: 'Nama', cellClassName: 'font-weight-600' },
    { key: 'email', label: 'Email' },
    {
      key: 'role',
      label: 'Role',
      render: (val) => (
        <span className={`user-role-badge role-${val}`}>
          {val === 'admin' ? '👑 Admin' : '👤 User'}
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'Tgl Dibuat',
      render: (val) => formatDate(val),
    },
  ]

  return (
    <section>
      <FadeIn>
        <PageHeaderSection
          title="Users"
          subtitle="Kelola data user yang terdaftar di sistem"
          action={
            <div style={{ display: 'flex', gap: '8px' }}>
              <Button variant="outline" onClick={fetchUsers} style={{ padding: '6px 12px', fontSize: '0.85rem', backgroundColor: 'transparent' }}>
                <span style={{ marginRight: '6px' }}>↻</span> Refresh
              </Button>
              <Button variant="primary" onClick={handleAdd} style={{ padding: '6px 12px', fontSize: '0.85rem' }}>
                + Tambah User
              </Button>
            </div>
          }
        />
      </FadeIn>

      {success && (
        <div style={{ marginBottom: '16px' }}>
          <Alert variant="success">{success}</Alert>
        </div>
      )}
      {error && (
        <div style={{ marginBottom: '16px' }}>
          <Alert variant="error">{error}</Alert>
        </div>
      )}

      <PanelSection title="Daftar User">
        {loading ? (
          <div className="users-loading">
            <div className="users-loading-spinner" />
            <p>Memuat data user...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="users-empty">
            <span className="users-empty-icon">👥</span>
            <p>Belum ada data user.</p>
            <Button variant="primary" size="sm" onClick={handleAdd}>
              Tambah User Pertama
            </Button>
          </div>
        ) : (
          <Table
            columns={columns}
            data={users}
            renderActions={(row) => (
              <>
                <button className="btn-small view" onClick={() => handleEdit(row)}>
                  Edit
                </button>
                {deleteConfirmId === row.id ? (
                  <span className="delete-confirm-group">
                    <button className="btn-small delete-yes" onClick={() => handleDelete(row.id)}>
                      Ya, Hapus
                    </button>
                    <button className="btn-small delete-no" onClick={() => setDeleteConfirmId(null)}>
                      Batal
                    </button>
                  </span>
                ) : (
                  <DeleteButton label="Hapus" onClick={() => setDeleteConfirmId(row.id)} />
                )}
              </>
            )}
          />
        )}
      </PanelSection>

      {/* Modal Tambah/Edit User */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingUser ? 'Edit User' : 'Tambah User Baru'}
      >
        <form onSubmit={handleSubmit} className="user-modal-form">
          <label>
            Nama Lengkap
            <input
              name="name"
              type="text"
              placeholder="Masukkan nama lengkap"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleFormChange}
              required
              disabled={!!editingUser}
            />
          </label>
          <label>
            Password {editingUser && <span style={{ fontWeight: 400, color: '#a89fb8', fontSize: '0.85rem' }}>(kosongkan jika tidak ingin mengubah)</span>}
            <input
              name="password"
              type="password"
              placeholder={editingUser ? 'Kosongkan jika tidak diubah' : 'Minimal 6 karakter'}
              value={formData.password}
              onChange={handleFormChange}
              required={!editingUser}
              minLength={!editingUser ? 6 : undefined}
            />
          </label>
          <label>
            Role
            <select
              name="role"
              value={formData.role}
              onChange={handleFormChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <div className="user-modal-actions">
            <Button
              variant="primary"
              type="submit"
              disabled={formLoading}
            >
              {formLoading
                ? 'Menyimpan...'
                : editingUser
                  ? 'Update User'
                  : 'Tambah User'
              }
            </Button>
            <button
              type="button"
              className="button button-cancel"
              onClick={() => setModalOpen(false)}
            >
              Batal
            </button>
          </div>
        </form>
      </Modal>
    </section>
  )
}
