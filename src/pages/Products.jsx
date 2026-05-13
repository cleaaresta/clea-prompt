export default function Products() {
  const products = [
    { id: 1, name: 'Lipstick Red', category: 'Lips', price: '$12.99', stock: 45 },
    { id: 2, name: 'Foundation Light', category: 'Base', price: '$24.99', stock: 32 },
    { id: 3, name: 'Eyeshadow Palette', category: 'Eyes', price: '$18.99', stock: 28 },
    { id: 4, name: 'Blush Rose', category: 'Face', price: '$15.99', stock: 52 },
  ]

  return (
    <section>
      <div className="page-header-section">
        <h2 className="page-section-title">Products</h2>
        <p className="page-section-text">Manage makeup products, variants, and pricing.</p>
      </div>
      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">All Products</h3>
          <button className="button button-primary button-sm">+ Add Product</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td><span className="badge">{product.category}</span></td>
                <td>{product.price}</td>
                <td>
                  <span className={product.stock > 40 ? 'stock-high' : 'stock-med'}>
                    {product.stock} pcs
                  </span>
                </td>
                <td className="actions">
                  <button className="btn-small edit">Edit</button>
                  <button className="btn-small delete">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
