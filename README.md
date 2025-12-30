# GREEN trust Grocery - Fresh Essentials Mobile App 🥬

A comprehensive, mobile-first e-commerce application built with React, Vite, and Tailwind CSS.
Designed for "GREEN trust Grocery" to sell fresh vegetables, fruits, and essentials with a premium user experience.

## ✨ Key Features
- **Modern Glassmorphism Design**: Beautiful, translucent UI elements.
- **Mobile-First Experience**: Optimized for touch, navigation, and mobile layouts.
- **Localization**: Support for Tamil product names.
- **Smart Features**:
    - 📍 **Smart Delivery**: Auto-detects location and checks pincode availability (Mock: 600xxx).
    - 🚚 **WhatsApp Integration**: Sends formatted orders directly to WhatsApp.
- **Loyalty System**: Earn "Green Points" on orders and redeem for cash discounts.
- **Admin Dashboard**: Hidden "Seller Mode" to manage prices and stock instantly.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation
1.  Clone this repository (or unzip the folder).
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:5173` (or the port shown in terminal) on your phone/browser.

---

## 📱 Mobile Installation (APK & PWA)

### Option 1: Instant PWA (Recommended for Speed)
This app is PWA-ready. You don't *need* an APK to use it like an app.
1.  Open the deployed URL on Chrome (Android) or Safari (iOS).
2.  Tap **Menu** (three dots) -> **Add to Home Screen**.
3.  It will appear as a native app on your phone!

### Option 2: Build Real Android APK
To turn this into a `green-trust.apk` file, use **Capacitor**.

1.  **Initialize Capacitor**:
    ```bash
    npm install @capacitor/core @capacitor/cli @capacitor/android
    npx cap init "Green Trust" com.greentrust.app --web-dir=dist
    ```

2.  **Build the Web Assets**:
    ```bash
    npm run build
    ```

3.  **Add Android Platform**:
    ```bash
    npx cap add android
    ```

4.  **Sync**:
    ```bash
    npx cap sync
    ```

5.  **Open in Android Studio**:
    ```bash
    npx cap open android
    ```
    *From Android Studio, you can build the signed APK via `Build > Build Bundle(s) / APK(s) > Build APK(s)`.*

---

## 🛠️ Admin "Seller Mode"
- Go to the **Profile** tab.
- Click the **Gear / Cog Icon** ⚙️ next to "My Profile".
- You will enter the Admin Dashboard to manage products and orders.

## 🏗️ Project Structure
- `/src/components/screens`: Main views (Home, Explore, Account, Login, etc.)
- `/src/components`: Reusable UI components (ProductCard, VoiceOverlay)
- `/src/App.tsx`: Main logic, Navigation, State Management.
- `/src/constants.tsx`: Initial Product Data.

---
## 🌐 Website Information
GREEN trust Grocery is designed to bridge the gap between organic farmers and urban households. With a focus on purity, trust, and speed, we ensure:
- **100% Organic Certified Produce**: Directly sourced from verified farms.
- **Zero-Plastic Packaging**: Committed to eco-friendly delivery solutions.
- **Community Trust**: Built on transparency and quality assurance.

---

## 📞 Contact & Credits
**Developed & Designed by:**
### S.Shaveesh Jeshurun
- **Portfolio**: [ssjportfolio-one.vercel.app](https://ssjportfolio-one.vercel.app/)
- **Role**: Full Stack Developer & UI/UX Designer

*For website development inquiries or collaborations, please visit the portfolio link above.*

---
*Created with ❤️ by S.Shaveesh Jeshurun*
