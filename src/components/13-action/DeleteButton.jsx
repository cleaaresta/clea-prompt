export default function DeleteButton({ onClick, label = 'Delete' }) {
  return (
    <button className="btn-small delete" onClick={onClick}>
      {label}
    </button>
  )
}
