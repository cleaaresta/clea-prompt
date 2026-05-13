export default function Inventory() {
  const items = [
    { id: 1, name: 'Lipstick Red', sku: 'LIP-001', quantity: 45, reorder: 20, status: 'In Stock' },
    { id: 2, name: 'Foundation Light', sku: 'FND-002', quantity: 12, reorder: 15, status: 'Low' },
    { id: 3, name: 'Eyeshadow Palette', sku: 'EYE-003', quantity: 3, reorder: 10, status: 'Critical' },
    { id: 4, name: 'Blush Rose', sku: 'BLS-004', quantity: 52, reorder: 20, status: 'In Stock' },
  ]

  return (
    <section>
      <div className="page-header-section">
        <h2 className="page-section-title">Inventory</h2>
        <p className="page-section-text">Monitor stock levels and reorder status for all makeup items.</p>
      </div>
      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">Stock Status</h3>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Quantity</th>
              <th>Reorder Level</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td className="monospace">{item.sku}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-center">{item.reorder}</td>
                <td>
                  <span className={`stock-status ${item.status.toLowerCase().replace(' ', '-')}`}>
                    {item.status}
                  </span>
                </td>
                <td className="actions">
                  <button className="btn-small edit">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
