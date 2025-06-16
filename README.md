# 🍵 The Tea Tip

A modern, creator-focused tipping platform — inspired by platforms like Patreon and BuyMeACoffee — where supporters can fund creators directly. Built with full-stack technologies, including secure Razorpay payment integration and dynamic dashboards.

🔗 Live Demo: [the-tea-tip.vercel.app](https://the-tea-tip.vercel.app)

---

## 🚀 Features

- 🔐 **Authentication** via GitHub using NextAuth
- 💳 **Razorpay Payment Integration** for secure tipping
- 👤 **User Dashboard** to manage creator profile (name, email, payment credentials)
- 🌐 Fully **deployed** on Vercel
- 🛠️ Admin stores Razorpay secret in MongoDB securely
- 🧾 Transaction form auto-fills receiver details
- ⚡ Simple and responsive UI using Tailwind CSS

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Next.js API routes, MongoDB, Mongoose
- **Authentication:** NextAuth.js (GitHub provider)
- **Payments:** Razorpay (JS SDK)
- **Deployment:** Vercel

---

## 📦 Getting Started (Local Dev)

```bash
git clone https://github.com/your-username/tea-tip.git
cd tea-tip
npm install
```

Create a `.env.local` file with:

```env
MONGO_URI=your_mongodb_uri
NEXTAUTH_SECRET=some_random_string
NEXTAUTH_URL=http://localhost:3000
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Then:

```bash
npm run dev
```

---

## ❗ Known Issues

- Currently supports **only GitHub login**
- Payment success/fail UI not fully styled yet

---

## ✨ Future Enhancements

- Add Google login support
- View transaction history
- Email notifications for tips
- QR code sharing for creators

---

## 🙋‍♂️ Author

**Priyansh Verma**  
🔗 [Portfolio](https://this-priyansh.vercel.app) • [GitHub](https://github.com/PriyanshV10) • [LinkedIn](https://linkedin.com/in/priyansh-v10)

---

## 📄 License

This project is open-source under the [MIT License](LICENSE)
