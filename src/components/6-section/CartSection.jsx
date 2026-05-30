export default function CartSection({ items = [], subtotal = 0, tax = 0, total = 0, onCheckout, disabled = true }) {
  const formatPrice = (price) => `$${price.toFixed(2)}`

  return (
    <div className="panel">
      <h3 className="panel-title">Shopping Cart</h3>
      {items.length === 0 ? (
        <div className="cart-empty">
          <p>Cart is empty</p>
          <p className="text-muted">Add items from the left panel</p>
        </div>
      ) : (
        <div className="cart-items">
          {items.map((item, i) => (
            <div key={i} className="stat-item">
              <span>{item.name}</span>
              <span className="stat-value">{formatPrice(item.price)}</span>
            </div>
          ))}
        </div>
      )}
      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="summary-row">
          <span>Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
        <button
          className="button button-primary"
          disabled={disabled}
          onClick={onCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  )
}
