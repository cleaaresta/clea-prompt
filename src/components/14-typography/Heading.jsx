export default function Heading({ children, level = 1, className = '', ...props }) {
  const Tag = `h${Math.min(Math.max(level, 1), 6)}`

  return (
    <Tag className={className || undefined} style={{ margin: 0 }} {...props}>
      {children}
    </Tag>
  )
}
