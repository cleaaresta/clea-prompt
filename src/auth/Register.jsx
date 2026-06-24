import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { Button } from '../components/1-basic'
import { Alert } from '../components/5-feedback'
import { LoginForm, AuthBranding, PasswordField, AuthFooter } from '../components/8-auth'
import { FadeIn } from '../components/15-animation'

export default function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dataForm, setDataForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setDataForm((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    // Validasi password match
    if (dataForm.password !== dataForm.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok.')
      return
    }

    // Validasi panjang password
    if (dataForm.password.length < 6) {
      setError('Password minimal 6 karakter.')
      return
    }

    setLoading(true)

    try {
      // Cek apakah email sudah terdaftar
      const { data: existing } = await supabase
        .from('users')
        .select('id')
        .eq('email', dataForm.email)
        .single()

      if (existing) {
        setError('Email sudah terdaftar. Silakan gunakan email lain.')
        setLoading(false)
        return
      }

      // Insert user baru langsung ke tabel users
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          name: dataForm.name,
          email: dataForm.email,
          password: dataForm.password,
          role: 'user'
        })

      if (insertError) {
        setError('Gagal mendaftar: ' + insertError.message)
        return
      }

      // Redirect ke login dengan pesan sukses
      navigate('/login?registered=true', { replace: true })
    } catch (err) {
      setError('Terjadi kesalahan saat mendaftar. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <FadeIn>
      <div className="login-page">
        <AuthBranding
          icon="✨"
          title="Buat Akun Baru"
          subtitle="Daftar untuk mengakses Glamour Studio"
        />
        <LoginForm onSubmit={handleSubmit}>
          <label>
            Nama Lengkap
            <input
              name="name"
              type="text"
              placeholder="Masukkan nama lengkap"
              value={dataForm.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={dataForm.email}
              onChange={handleChange}
              required
            />
          </label>
          <PasswordField
            label="Password"
            name="password"
            placeholder="Minimal 6 karakter"
            value={dataForm.password}
            onChange={handleChange}
            required
          />
          <PasswordField
            label="Konfirmasi Password"
            name="confirmPassword"
            placeholder="Ulangi password"
            value={dataForm.confirmPassword}
            onChange={handleChange}
            required
          />
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
          </Button>
        </LoginForm>
        {loading && <Alert variant="info">Sedang memproses pendaftaran...</Alert>}
        {error && <Alert variant="error">{error}</Alert>}
        <AuthFooter
          text="Sudah punya akun?"
          linkText="Login di sini"
          linkTo="/login"
        />
      </div>
    </FadeIn>
  )
}
