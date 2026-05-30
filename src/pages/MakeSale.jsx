import { PageHeaderSection, CartSection } from '../components/6-section'
import { AddToCartButton } from '../components/13-action'
import { ScaleHover, FadeIn } from '../components/15-animation'

export default function MakeSale() {
  const products = [
    { name: 'Lipstick Red', price: '$12.99' },
    { name: 'Foundation Light', price: '$24.99' },
    { name: 'Eyeshadow Palette', price: '$18.99' },
    { name: 'Blush Rose', price: '$15.99' },
  ]

  return (
    <section>
      <FadeIn>
        <PageHeaderSection
          title="Make Sale"
          subtitle="Create new transactions and process customer purchases."
        />
      </FadeIn>
      <div className="sale-container">
        <div className="sale-left">
          <div className="panel">
            <h3 className="panel-title">Add Items to Cart</h3>
            <div className="sale-products">
              {products.map((product, i) => (
                <ScaleHover key={i}>
                  <div className="product-card-sale">
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">{product.price}</p>
                    <AddToCartButton />
                  </div>
                </ScaleHover>
              ))}
            </div>
          </div>
        </div>
        <div className="sale-right">
          <CartSection />
        </div>
      </div>
    </section>
  )
}
