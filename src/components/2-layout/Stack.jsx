export default function Stack({
  children,
  direction = 'vertical',
  gap = '16px',
  align = 'stretch',
  justify = 'flex-start',
  className = '',
  ...props
}) {
  return (
    <div
      className={`glamour-stack ${className}`.trim()}
      style={{
        display: 'flex',
        flexDirection: direction === 'vertical' ? 'column' : 'row',
        gap,
        alignItems: align,
        justifyContent: justify,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
