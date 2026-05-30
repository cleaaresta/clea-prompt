export default function AuthBranding({ icon = '💄', title, subtitle }) {
  return (
    <div className="login-branding">
      <div className="brand-logo-big">{icon}</div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  )
}
