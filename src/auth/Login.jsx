import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button } from '../components/1-basic'
import { Alert } from '../components/5-feedback'
import { LoginForm, AuthBranding, PasswordField, AuthFooter } from '../components/8-auth'
import { FadeIn } from '../components/15-animation'

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

  return (
    <FadeIn>
      <div className="login-page">
        <AuthBranding
          icon="💄"
          title="Glamour Studio"
          subtitle="Beauty POS admin login"
        />
        <LoginForm onSubmit={handleSubmit}>
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
          <PasswordField
            label="Password"
            name="password"
            placeholder="Enter password"
            value={dataForm.password}
            onChange={handleChange}
            required
          />
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Sign In'}
          </Button>
        </LoginForm>
        {loading && <Alert variant="info">Sedang memproses login...</Alert>}
        {error && <Alert variant="error">{error}</Alert>}
        <AuthFooter
          text="Not ready?"
          linkText="Go back to dashboard"
          linkTo="/admin"
        />
      </div>
    </FadeIn>
  )
}
