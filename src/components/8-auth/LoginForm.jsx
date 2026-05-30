export default function LoginForm({ children, onSubmit }) {
  return (
    <form className="login-form" onSubmit={onSubmit}>
      {children}
    </form>
  )
}
