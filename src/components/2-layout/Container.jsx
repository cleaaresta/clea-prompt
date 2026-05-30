export default function Container({ children, className = '', ...props }) {
  return (
    <div className={`glamour-container ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}
