# Mohit Mane Portfolio (React + Framer Motion)

Modern, bold, high-performance personal portfolio for Mohit Mane.

## Tech Stack

- React + Vite
- React Router (`/` and `/projects`)
- Framer Motion
- CSS custom theming (dark/light)

## Run Locally

```bash
cd /Users/apple/Documents/Mohit_Portfolio
npm install
npm run dev
```

Open: `http://127.0.0.1:5173`

## Production Build

```bash
npm run build
npm run preview
```

## Structure

- `/Users/apple/Documents/Mohit_Portfolio/src/main.jsx` - app bootstrap
- `/Users/apple/Documents/Mohit_Portfolio/src/App.jsx` - routed app shell + transitions
- `/Users/apple/Documents/Mohit_Portfolio/src/pages/HomePage.jsx` - main portfolio experience
- `/Users/apple/Documents/Mohit_Portfolio/src/pages/ProjectsPage.jsx` - all-project case-study library
- `/Users/apple/Documents/Mohit_Portfolio/src/components` - reusable UI modules (timeline, cards, cursor, theme, etc.)
- `/Users/apple/Documents/Mohit_Portfolio/src/data/portfolioData.js` - profile, experience, projects, skills data
- `/Users/apple/Documents/Mohit_Portfolio/src/styles/global.css` - visual system, themes, interactions

## Quick Content Updates

- Update profile/contact/content: `/Users/apple/Documents/Mohit_Portfolio/src/data/portfolioData.js`
- Update layout/components: `/Users/apple/Documents/Mohit_Portfolio/src/pages` and `/Users/apple/Documents/Mohit_Portfolio/src/components`
- Update visuals/theme variables: `/Users/apple/Documents/Mohit_Portfolio/src/styles/global.css`

## Deploy to Vercel

```bash
cd /Users/apple/Documents/Mohit_Portfolio
npx vercel deploy --prod --yes
```

Custom domain fallback rewrite for SPA routes is configured in:

- `/Users/apple/Documents/Mohit_Portfolio/vercel.json`
