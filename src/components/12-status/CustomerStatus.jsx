export default function CustomerStatus({ status }) {
  return (
    <span className={`status ${status.toLowerCase()}`}>
      {status}
    </span>
  )
}
