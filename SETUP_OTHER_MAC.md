# Setup on Other Mac

## Option A (Recommended): GitHub sync

### 1) On this Mac (already done)
- Git initialized in this folder
- Initial commit created on branch `main`

### 2) Create an empty GitHub repo
Create a repo named `mohit-portfolio` (no README/license/gitignore).

### 3) Connect and push from this Mac
```bash
cd /Users/apple/Documents/Mohit_Portfolio
git remote add origin https://github.com/<your-username>/mohit-portfolio.git
git push -u origin main
```

### 4) On your other Mac
```bash
git clone https://github.com/<your-username>/mohit-portfolio.git
cd mohit-portfolio
npm ci
npm run dev
```

### 5) Daily workflow (both Macs)
```bash
git add .
git commit -m "your update"
git push
```

## Option B (No GitHub yet): Bundle transfer
A git bundle has already been generated at:
`/Users/apple/Documents/mohit-portfolio.bundle`

On other Mac:
```bash
git clone /path/to/mohit-portfolio.bundle mohit-portfolio
cd mohit-portfolio
npm ci
npm run dev
```

## Notes
- Node version: use current LTS Node.js (v20+ preferred).
- `node_modules` and `dist` are ignored in git and should not be copied manually.
- Resume and images are in `public/` and are versioned.
