"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface OrderData {
  items: { id: string; name: string; price: number; image: string; quantity: number }[];
  total: number;
  customer: { name: string; phone: string; address: string; notes: string };
  date: string;
}

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("lumiere_last_order");
      if (saved) setOrder(JSON.parse(saved));
    } catch {}
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Success animation */}
        <div className="relative inline-flex items-center justify-center w-28 h-28 mb-6">
          <div className="absolute inset-0 rounded-full bg-green-100 animate-ping opacity-30"/>
          <div className="w-24 h-24 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center">
            <span className="text-4xl">🌸</span>
          </div>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-light text-mink-700 mb-3">
          Order Sent!
        </h1>
        <p className="text-mink-500 text-sm leading-relaxed mb-2">
          Your order has been sent via WhatsApp. We'll confirm your order and get back to you shortly.
        </p>

        {order && (
          <div className="bg-white rounded-3xl p-6 shadow-card my-7 text-left">
            <h3 className="font-serif text-lg text-mink-700 mb-4 font-medium">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {order.items.map(item => (
                <div key={item.id} className="flex gap-3 items-center">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-blush-50 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-mink-700 truncate">{item.name}</p>
                    <p className="text-xs text-mink-400">×{item.quantity}</p>
                  </div>
                  <span className="text-sm text-mink-700 font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-rose-100 pt-3 flex justify-between font-serif text-lg text-mink-700">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-rose-100 space-y-1.5">
              <p className="text-xs text-mink-500"><span className="font-medium">Name:</span> {order.customer.name}</p>
              <p className="text-xs text-mink-500"><span className="font-medium">Phone:</span> {order.customer.phone}</p>
              <p className="text-xs text-mink-500"><span className="font-medium">Address:</span> {order.customer.address}</p>
            </div>
          </div>
        )}

        <div className="bg-green-50 rounded-2xl p-4 mb-7 flex gap-3 text-left">
          <span className="text-xl flex-shrink-0">💬</span>
          <p className="text-green-700 text-xs leading-relaxed">
            A WhatsApp message with your order details has been opened. Please <strong>press Send</strong> to complete your order. We'll confirm within 1-2 hours.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary px-8 py-3 rounded-full text-sm">
            Back to Home
          </Link>
          <Link href="/shop" className="btn-outline px-8 py-3 rounded-full text-sm">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
