export default function Customers() {
  const customers = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@email.com', purchases: 12, status: 'VIP' },
    { id: 2, name: 'Emily Davis', email: 'emily@email.com', purchases: 8, status: 'Regular' },
    { id: 3, name: 'Jessica Smith', email: 'jessica@email.com', purchases: 5, status: 'Regular' },
    { id: 4, name: 'Amanda Wilson', email: 'amanda@email.com', purchases: 24, status: 'VIP' },
  ]

  return (
    <section>
      <div className="page-header-section">
        <h2 className="page-section-title">Customers</h2>
        <p className="page-section-text">View customer profiles, loyalty status, and purchase history.</p>
      </div>
      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">Customer List</h3>
          <button className="button button-primary button-sm">+ Add Customer</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Purchases</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="font-weight-600">{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.purchases}</td>
                <td>
                  <span className={`status ${customer.status.toLowerCase()}`}>
                    {customer.status}
                  </span>
                </td>
                <td className="actions">
                  <button className="btn-small view">View</button>
                  <button className="btn-small delete">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
