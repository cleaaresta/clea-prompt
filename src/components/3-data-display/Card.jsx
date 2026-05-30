export default function Card({ children, className = '', ...props }) {
  return (
    <div className={`panel ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}
