# Food Delivery Lite (Vite + React + Tailwind + Firebase)

A Swiggy/Zomato-style simulation with cart, checkout, and real-time order tracking powered by Firebase (Firestore + Auth). Admin panel included for manual status updates. Firebase config is stubbed so you can drop in your own keys.

## Prerequisites
- Node.js 18+ and npm

## Setup
```bash
npm install
npm run dev
```

## Firebase config
1) Create a Firebase project with Auth (Google enabled) and Firestore.
2) Copy your web app config and replace placeholders in `src/firebase.js`.
```js
const firebaseConfig = {
  apiKey: '...',
  authDomain: '...',
  projectId: '...',
  storageBucket: '...',
  messagingSenderId: '...',
  appId: '...',
};
```
3) (Optional) Use Firestore emulator instead of real keys by adjusting the config and calling `connectFirestoreEmulator`.

## Data model
- Collection `restaurants`: id, name, image, rating, cuisine, vegOnly, menu (array of items {id, name, price, veg, image}).
- Collection `orders`: id, items, total, user info, status, timeline, createdAt, updatedAt.

## Pages
- `Home`: search + filters; restaurant grid.
- `Restaurant`: menu with add-to-cart.
- `Cart`: quantity controls, remove, total.
- `Checkout`: form; creates order in Firestore; fallback to local simulation if Firestore unavailable.
- `TrackOrder`: live snapshot listener; auto status simulator every ~7s; timeline UI.
- `Admin`: list orders, advance status manually (Firestore only).

## Notes
- Real-time status progression is simulated client-side; for production move to Cloud Functions/cron.
- UI uses Tailwind; adjust in `src/index.css` and `tailwind.config.js`.

