export default function AddToCartButton({ onClick, label = 'Add' }) {
  return (
    <button className="button button-primary button-sm" onClick={onClick}>
      {label}
    </button>
  )
}
