export default function Text({
  children,
  variant = 'body',
  muted = false,
  className = '',
  as: Tag = 'p',
  ...props
}) {
  const variantClasses = {
    body: '',
    muted: 'text-muted',
    small: 'text-small',
    mono: 'monospace',
    bold: 'font-weight-600',
  }

  const cls = [
    variantClasses[variant] || '',
    muted ? 'text-muted' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <Tag className={cls || undefined} {...props}>
      {children}
    </Tag>
  )
}
