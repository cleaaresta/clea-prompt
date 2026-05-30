export default function EditButton({ onClick, label = 'Edit' }) {
  return (
    <button className="btn-small edit" onClick={onClick}>
      {label}
    </button>
  )
}
