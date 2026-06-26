# 🚀 EMPRIO Marketing Platform

> High-performance startup marketing platform built with React.js, Vite, and Tailwind CSS.

**🌐 Live:** [emprio.in](https://emprio.in)

---

## ⚡ Performance

| Metric | Score |
|---|---|
| Performance | 95+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 95+ |

Achieved through code splitting, WebP images, deferred JavaScript, Tailwind CSS purging, and font preloading.

---

## ✨ Features

- ⚛️ **React.js + Vite** — fast builds and instant HMR
- 💨 **Tailwind CSS** — utility-first, production-optimised styling
- 🎭 **Framer Motion** — smooth page transitions and scroll animations
- 🤖 **n8n + OpenAI API** — AI-powered lead management automation
- 📱 **Fully Responsive** — mobile, tablet, and desktop
- ♿ **Accessible** — WCAG compliant markup
- 🔀 **React Router v6** — code-split route-based navigation
- ⚡ **95+ Lighthouse Score** — production-grade performance

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React.js 18 |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Routing** | React Router v6 |
| **Language** | JavaScript / TypeScript |
| **Automation** | n8n + OpenAI API |
| **Deployment** | Vercel |

---

## 🤖 AI Automation

Built alongside the marketing platform, the automation layer uses **n8n** workflows connected to the **OpenAI API** to:

- Qualify inbound leads automatically using GPT prompts
- Generate personalised responses for lead enquiries
- Route qualified leads to the right team member via email/Slack
- Automate internal business process pipelines

The n8n instance is self-hosted on a VPS using Docker, keeping API keys and workflow logic on private infrastructure.

---

## 📂 Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/             # Route-level page components
├── hooks/             # Custom React hooks
├── utils/             # Helper functions
├── assets/            # Images, fonts, icons
└── config/            # Environment config
```

---

## 🚀 Running Locally

```bash
# Clone the repo
git clone https://github.com/ShubhamKumarGautam98/emprio-marketing-platform.git
cd emprio-marketing-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

Opens at [http://localhost:5173](http://localhost:5173)

---

## 📦 Build for Production

```bash
npm run build
```

Output goes to `dist/`. Deploy the `dist/` folder to any static host (Vercel, Netlify, etc.).

---

## 🔑 Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=your_api_url
VITE_N8N_WEBHOOK=your_n8n_webhook_url
```

---

## 📬 Contact

**Shubham Kumar** — AI Automation Developer

- 🌐 [Portfolio](https://shubham-kumar.vercel.app)
- 💼 [LinkedIn](https://linkedin.com/in/shubham-kumar-395b89386)
- 📧 shubhamkmmmr@gmail.com

---

<p align="center">Built with ❤️ using React.js + Vite + Tailwind CSS + n8n + OpenAI API</p>