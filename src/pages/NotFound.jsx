import { Link } from 'react-router-dom'
import { Button } from '../components/1-basic'
import { Eyebrow, Heading, Subtitle } from '../components/14-typography'
import { FadeIn } from '../components/15-animation'

export default function NotFound() {
  return (
    <div className="notfound-shell">
      <FadeIn>
        <div className="notfound-card">
          <Eyebrow>404</Eyebrow>
          <Heading level={1}>Page Not Found</Heading>
          <Subtitle>The page you are looking for does not exist.</Subtitle>
          <div style={{ marginTop: '24px' }}>
            <Link to="/admin" className="button button-primary">Go to dashboard</Link>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
