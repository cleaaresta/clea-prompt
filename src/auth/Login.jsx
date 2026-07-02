import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/1-basic";
import { Alert } from "../components/5-feedback";
import {
  LoginForm,
  AuthBranding,
  PasswordField,
  AuthFooter,
} from "../components/8-auth";
import { FadeIn } from "../components/15-animation";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dataForm, setDataForm] = useState({ email: "", password: "" });
  const [searchParams] = useSearchParams();

  // Tampilkan pesan sukses atau pesan redirect dari guest CTA
  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccess("Pendaftaran berhasil! Silakan login dengan akun baru Anda.");
      return;
    }

    const message = searchParams.get("message");
    if (message) {
      setSuccess(decodeURIComponent(message));
    }
  }, [searchParams]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { profile } = await signIn(dataForm.email, dataForm.password);

      if (!profile) {
        setError("Email atau password salah.");
        return;
      }

      navigate(profile.role === "admin" ? "/admin" : "/member", {
        replace: true,
      });
    } catch (err) {
      setError(
        err.message || "Terjadi kesalahan saat login. Silakan coba lagi.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <FadeIn>
      <div className="login-page">
        <AuthBranding
          icon="💄"
          title="Glamour Studio"
          subtitle="Beauty POS admin login"
        />
        {success && <Alert variant="success">{success}</Alert>}
        <LoginForm onSubmit={handleSubmit}>
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
            placeholder="Enter password"
            value={dataForm.password}
            onChange={handleChange}
            required
          />
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </Button>
        </LoginForm>
        {loading && <Alert variant="info">Sedang memproses login...</Alert>}
        {error && <Alert variant="error">{error}</Alert>}
        <AuthFooter
          text="Belum punya akun?"
          linkText="Daftar di sini"
          linkTo="/register"
        />
      </div>
    </FadeIn>
  );
}
