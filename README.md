# Fintrak — Finance Dashboard

A clean, responsive personal finance dashboard built with React, Tailwind CSS, Recharts, and React Router.

## Features
- Dashboard with live summary cards, area chart, donut chart, recent transactions
- Transactions page with search, filter, sort, and admin-only add modal
- Insights page with category bars, income vs expense visual, savings rate
- Role switcher (Viewer / Admin)
- Fully mobile responsive with slide-in sidebar drawer
- Smooth animations throughout

## Project Structure

```
fintrak/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    └── components/
        ├── layouts/
        │   ├── MainLayout.jsx
        │   ├── Sidebar.jsx
        │   └── Topbar.jsx
        ├── pages/
        │   ├── Dashboard.jsx
        │   └── Transactions.jsx
        ├── dashboard/
        │   ├── SummaryCard.jsx
        │   ├── BalanceChart.jsx
        │   └── CategoryChart.jsx
        ├── transactions/
        │   ├── SearchBar.jsx
        │   ├── FilterBar.jsx
        │   ├── TransactionRow.jsx
        │   └── TransactionTable.jsx
        └── insights/
            └── Insights.jsx
```

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
http://localhost:5173
```

## Build for Production

```bash
npm run build
npm run preview
```

## Tech Stack
- React 18
- Vite 5
- Tailwind CSS 3
- React Router v6
- Recharts
- Lucide React
- Google Fonts: Syne + DM Sans
