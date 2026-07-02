import { useEffect, useMemo, useState } from "react";
import { PageHeaderSection, CartSection } from "../components/6-section";
import { AddToCartButton } from "../components/13-action";
import { ScaleHover, FadeIn } from "../components/15-animation";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { Alert } from "../components/5-feedback";

export default function MakeSale() {
  const { profile } = useAuth();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error) {
        setProducts(data || []);
      }
      setLoading(false);
    };

    loadProducts();
  }, []);

  const addToCart = (product) => {
    setCart((current) => {
      const existingItem = current.find((item) => item.id === product.id);
      if (existingItem) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
    setMessage("Produk ditambahkan ke keranjang.");
  };

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
    [cart],
  );
  const total = subtotal;

  const handleCheckout = async () => {
    if (!profile?.id || cart.length === 0) return;

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: profile.id,
        total_amount: total,
        points_earned: Math.floor(total / 10000),
        status: "pending",
      })
      .select("id")
      .single();

    if (orderError) {
      setMessage("Checkout gagal. Silakan coba lagi.");
      return;
    }

    const orderItems = cart.map((item) => ({
      order_id: orderData.id,
      product_id: item.id,
      quantity: item.quantity,
      price_at_purchase: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);
    if (!itemsError) {
      setCart([]);
      setMessage("Pesanan berhasil dibuat.");
    } else {
      setMessage(
        "Pesanan dibuat, tetapi item tidak tersimpan. Silakan cek kembali.",
      );
    }
  };

  return (
    <section>
      <FadeIn>
        <PageHeaderSection
          title="Make Sale"
          subtitle="Buat transaksi baru dan proses pembelian pelanggan."
        />
      </FadeIn>
      {message ? (
        <Alert variant="success" className="mb-4">
          {message}
        </Alert>
      ) : null}
      <div className="sale-container">
        <div className="sale-left">
          <div className="panel">
            <h3 className="panel-title">Add Items to Cart</h3>
            {loading ? (
              <p className="text-sm text-stone-500">Memuat produk...</p>
            ) : (
              <div className="sale-products">
                {products.map((product) => (
                  <ScaleHover key={product.id}>
                    <div className="product-card-sale">
                      <p className="product-name">{product.name}</p>
                      <p className="product-price">
                        Rp {Number(product.price).toLocaleString("id-ID")}
                      </p>
                      <p className="text-sm text-stone-500">
                        Stok: {product.stock}
                      </p>
                      <AddToCartButton onClick={() => addToCart(product)} />
                    </div>
                  </ScaleHover>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="sale-right">
          <CartSection
            items={cart}
            subtotal={subtotal}
            tax={0}
            total={total}
            onCheckout={handleCheckout}
            disabled={cart.length === 0}
          />
        </div>
      </div>
    </section>
  );
}
