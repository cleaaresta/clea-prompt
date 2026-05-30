export default function Grid({
  children,
  columns = 2,
  gap = '20px',
  className = '',
  ...props
}) {
  const gridTemplateColumns = typeof columns === 'number'
    ? `repeat(${columns}, minmax(0, 1fr))`
    : columns

  return (
    <div
      className={`glamour-grid ${className}`.trim()}
      style={{ display: 'grid', gridTemplateColumns, gap }}
      {...props}
    >
      {children}
    </div>
  )
}
