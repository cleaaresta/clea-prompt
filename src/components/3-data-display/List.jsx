export default function List({ items = [], renderItem, className = '' }) {
  return (
    <div className={`stats-list ${className}`.trim()}>
      {items.map((item, index) =>
        renderItem ? (
          renderItem(item, index)
        ) : (
          <div className="stat-item" key={item.id || index}>
            <span>{item.label}</span>
            <span className="stat-value">{item.value}</span>
          </div>
        )
      )}
    </div>
  )
}
