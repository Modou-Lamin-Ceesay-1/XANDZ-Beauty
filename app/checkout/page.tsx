"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { OWNER_WHATSAPP, BRAND_NAME } from "@/data/config";
import { User } from "lucide-react";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "", notes: "" });

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const buildWhatsAppMessage = () => {
    const lines = [
      `*New Order from ${BRAND_NAME}*`,
      ``,
      `*Order Details:*`,
      ...items.map(i => `• ${i.name} × ${i.quantity} — $${(i.price * i.quantity).toFixed(2)}`),
      ``,
      `*Order Total: $${totalPrice.toFixed(2)}*`,
      ``,
      `*Customer Information:*`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Address: ${form.address}`,
      form.notes ? `Notes: ${form.notes}` : "",
    ].filter(Boolean);
    return encodeURIComponent(lines.join("\n"));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setLoading(true);
    await new Promise(r => setTimeout(r, 800));

    const msg = buildWhatsAppMessage();
    const waUrl = `https://wa.me/${OWNER_WHATSAPP}?text=${msg}`;

    // Store order summary for success page
    const orderData = { items: [...items], total: totalPrice, customer: form, date: new Date().toISOString() };
    sessionStorage.setItem("lumiere_last_order", JSON.stringify(orderData));

    clearCart();
    setLoading(false);

    // Open WhatsApp and redirect to success
    window.open(waUrl, "_blank");
    router.push("/order-success");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4">
        <div className="text-6xl mb-4 animate-float">🛍️</div>
        <h2 className="font-serif text-3xl font-light text-mink-700 mb-2">Your bag is empty</h2>
        <p className="text-mink-400 text-sm mb-6">Add some beautiful things to your bag first.</p>
        <a href="/shop" className="btn-primary px-8 py-3 rounded-full text-sm">Shop Now →</a>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.35em] uppercase text-mink-400 font-medium mb-2">Almost There</p>
          <h1 className="font-serif text-5xl font-light text-mink-700">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card">
              <h3 className="font-serif text-xl text-mink-700 mb-6 font-medium">Delivery Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs tracking-wider text-mink-500 uppercase mb-2">Full Name *</label>
                  <input
                    name="name" value={form.name} onChange={handle} required
                    placeholder="Your beautiful name"
                    className="form-field w-full px-4 py-3 rounded-2xl"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider text-mink-500 uppercase mb-2">Phone Number *</label>
                  <input
                    name="phone" value={form.phone} onChange={handle} required type="tel"
                    placeholder="+1 555 000 0000"
                    className="form-field w-full px-4 py-3 rounded-2xl"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider text-mink-500 uppercase mb-2">Delivery Address *</label>
                  <input
                    name="address" value={form.address} onChange={handle} required
                    placeholder="Street address, city, postal code"
                    className="form-field w-full px-4 py-3 rounded-2xl"
                  />
                </div>
                <div>
                  <label className="block text-xs tracking-wider text-mink-500 uppercase mb-2">Special Notes</label>
                  <textarea
                    name="notes" value={form.notes} onChange={handle}
                    placeholder="Any special requests or delivery instructions..."
                    rows={3}
                    className="form-field w-full px-4 py-3 rounded-2xl resize-none"
                  />
                </div>
              </div>
            </div>

            {/* WhatsApp note */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex gap-3">
              <span className="text-2xl flex-shrink-0">💬</span>
              <div>
                <p className="text-green-800 text-sm font-medium mb-1">Order via WhatsApp</p>
                <p className="text-green-600 text-xs leading-relaxed">
                  Clicking "Confirm Order" will open WhatsApp with your full order details pre-filled. Simply hit send to place your order!
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 rounded-2xl text-sm font-medium disabled:opacity-70"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25"/>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Preparing your order...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Confirm Order via WhatsApp
                </span>
              )}
            </button>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-6 shadow-card sticky top-24">
              <h3 className="font-serif text-xl text-mink-700 mb-5 font-medium">Order Summary</h3>
              <div className="space-y-3 mb-5">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-blush-50 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-sm text-mink-700 font-medium leading-tight truncate">{item.name}</p>
                      <p className="text-xs text-mink-400 mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-mink-700 flex-shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-rose-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-mink-500">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-mink-500">
                  <span>Shipping</span>
                  <span className="text-green-600">Calculated on WhatsApp</span>
                </div>
                <div className="flex justify-between font-serif text-xl text-mink-700 pt-2 border-t border-rose-100">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
