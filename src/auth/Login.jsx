import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dataForm, setDataForm] = useState({ username: '', password: '' })

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
    setLoading(true)

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        username: dataForm.username,
        password: dataForm.password
      })

      if (response.status === 201) {
        navigate('/admin', { replace: true })
      } else {
        setError('Login gagal, coba lagi.')
      }
    } catch (err) {
      const message = err.response?.data?.error || 'Terjadi kesalahan saat login.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const loadingInfo = loading ? 'Sedang memproses login...' : null
  const errorInfo = error ? error : null

  return (
    <div className="login-page">
      <div className="login-branding">
        <div className="brand-logo-big">💄</div>
        <h1>Glamour Studio</h1>
        <p>Beauty POS admin login</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            name="username"
            type="text"
            placeholder="admin"
            value={dataForm.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            value={dataForm.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className="button button-primary" disabled={loading}>
          {loading ? 'Loading...' : 'Sign In'}
        </button>
      </form>
      {loadingInfo && <p className="login-info">{loadingInfo}</p>}
      {errorInfo && <p className="login-error">{errorInfo}</p>}
      <p className="login-note">
        Not ready? <Link to="/admin" className="link-secondary">Go back to dashboard</Link>
      </p>
    </div>
  )
}
