export default function MakeSale() {
  return (
    <section>
      <div className="page-header-section">
        <h2 className="page-section-title">Make Sale</h2>
        <p className="page-section-text">Create new transactions and process customer purchases.</p>
      </div>
      <div className="sale-container">
        <div className="sale-left">
          <div className="panel">
            <h3 className="panel-title">Add Items to Cart</h3>
            <div className="sale-products">
              <div className="product-card-sale">
                <p className="product-name">Lipstick Red</p>
                <p className="product-price">$12.99</p>
                <button className="button button-primary button-sm">Add</button>
              </div>
              <div className="product-card-sale">
                <p className="product-name">Foundation Light</p>
                <p className="product-price">$24.99</p>
                <button className="button button-primary button-sm">Add</button>
              </div>
              <div className="product-card-sale">
                <p className="product-name">Eyeshadow Palette</p>
                <p className="product-price">$18.99</p>
                <button className="button button-primary button-sm">Add</button>
              </div>
              <div className="product-card-sale">
                <p className="product-name">Blush Rose</p>
                <p className="product-price">$15.99</p>
                <button className="button button-primary button-sm">Add</button>
              </div>
            </div>
          </div>
        </div>
        <div className="sale-right">
          <div className="panel">
            <h3 className="panel-title">Shopping Cart</h3>
            <div className="cart-empty">
              <p>Cart is empty</p>
              <p className="text-muted">Add items from the left panel</p>
            </div>
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>$0.00</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>$0.00</span>
              </div>
              <button className="button button-primary" disabled>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
