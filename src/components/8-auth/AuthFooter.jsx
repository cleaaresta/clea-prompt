import { Link } from 'react-router-dom'

export default function AuthFooter({ text, linkText, linkTo }) {
  return (
    <p className="login-note">
      {text}{' '}
      <Link to={linkTo} className="link-secondary">{linkText}</Link>
    </p>
  )
}
