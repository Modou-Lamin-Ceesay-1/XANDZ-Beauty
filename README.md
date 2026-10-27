# 🌸 XANDZ Beauty — Next.js E-Commerce
XANDZ Beaty store with WhatsApp order integration.

## 🚀 Quick Start

```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

Edit `data/config.ts` to set your details:
```ts
export const OWNER_WHATSAPP = "1234567890"; // Your WhatsApp number (no +)
export const BRAND_NAME = "XANDZ Beauty";
// ... other settings
```

## 📦 How WhatsApp Orders Work

1. Customer fills out checkout form
2. Clicks "Confirm Order via WhatsApp"
3. App generates a pre-filled WhatsApp message with full order details
4. Redirects to `https://wa.me/YOUR_NUMBER?text=ENCODED_MESSAGE`
5. Customer hits Send in WhatsApp
6. Customer is redirected to success page, cart is cleared

## 📁 Project Structure

```
lumiere/
├── app/
│   ├── globals.css
│   ├── layout.tsx          # Root layout + CartProvider
│   ├── page.tsx            # Home page
│   ├── shop/page.tsx       # Product listing + filters
│   ├── checkout/page.tsx   # Checkout form + WhatsApp integration
│   └── order-success/page.tsx
├── components/
│   ├── Navbar.tsx          # Sticky navbar with cart badge
│   ├── CartDrawer.tsx      # Slide-in cart drawer
│   ├── ProductCard.tsx     # Product card + quick view modal
│   ├── Footer.tsx
│   └── WhatsAppFloat.tsx   # Floating WhatsApp button
├── context/
│   └── CartContext.tsx     # Cart state + localStorage persistence
└── data/
    ├── config.ts           # Owner settings (WhatsApp #, brand info)
    └── products.json       # 12 sample products
```

## 🎨 Design

- **Palette**: Ivory, blush, mink, champagne, rose-gold
- **Fonts**: Cormorant Garamond (serif display) + Jost (sans body)
- **Responsive**: 375px → 768px → 1024px+

## ✨ Features

- Cart with localStorage persistence
- Add/remove/update quantities
- Cart badge in navbar
- Slide-in cart drawer
- Product quick-view modal
- Category filters + search + sort
- Full checkout form
- WhatsApp order generation with URL encoding
- Order success page
- Floating WhatsApp contact button
