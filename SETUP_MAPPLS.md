# 🔑 QUICK SETUP - Update Your .env File

## Step 1: Open the `.env` file
Open: `d:\ECOMMMERCE\greentrust\.env`

## Step 2: Replace with these credentials:

```bash
# Mappls REST API Key
VITE_MAPPLS_REST_KEY=0d3a3a0f0d1ce83085b76c12f9cf5db3

# OAuth2 Credentials (for advanced features - optional for now)
VITE_MAPPLS_CLIENT_ID=96dHZVzsAuvbzNFenkSmEv3BnZzVwHCSM3dGXRTQUQbBZ-orBrOoNaiqcSWLe3ATLpdLyHJ18FWPWRVlOIvnEQ==
VITE_MAPPLS_CLIENT_SECRET=lrFxI-iSEg85ip0F3qmnuwgjMP9kQ1xyQVg1rsXDu-RXVW1RMerllS6JZTImbABEabtE-fj3epmZPTPJnNyy_GJPNdArK2R-
```

## Step 3: Save the file

## Step 4: Restart dev server
```bash
# Stop current server (Ctrl+C)
npm run dev
```

## Step 5: Test the location picker!
- Open http://localhost:5174/
- Click on the address in header
- The map should now load properly!

---

**✅ What I've updated in the code:**
- Changed all API calls to use `VITE_MAPPLS_REST_KEY`
- Updated the Map SDK script in `index.html`
- Fixed search and geocoding endpoints

**Ready to commit to GitHub after testing!**
