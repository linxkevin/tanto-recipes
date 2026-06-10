# tanto-recipes

Recipe viewer for Tanto Gyoza & Ramen Bar kitchen staff.

## Stack
- Frontend: React (staff viewer + admin)
- Backend: Node.js / Express
- DB: PostgreSQL (Railway)
- Video: Google Drive embed

## Project structure
```
tanto-recipes/
├── backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── db.js
│   │   ├── middleware/auth.js
│   │   ├── routes/auth.js
│   │   ├── routes/categories.js
│   │   ├── routes/recipes.js
│   │   └── db/migrate.sql
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── App.js
    │   ├── lib/api.js
    │   └── pages/
    │       ├── StaffApp.js / .css
    │       ├── AdminLogin.js
    │       ├── AdminDashboard.js
    │       └── AdminRecipeEdit.js
    ├── public/index.html
    └── package.json
```

## Setup

### 1. Database
Run `backend/src/db/migrate.sql` on your Railway PostgreSQL instance.

### 2. Backend env vars (Railway)
```
DATABASE_URL=...
JWT_SECRET=your-random-secret
ADMIN_USERS=[{"username":"kevin","password":"..."},{"username":"staff2","password":"..."}]
NODE_ENV=production
```

### 3. Frontend env vars (Railway)
```
REACT_APP_API_URL=https://your-backend.railway.app/api
```

### 4. Deploy
Both `backend/` and `frontend/` deploy as separate Railway services from the same GitHub repo.

## URLs
- Staff app: `https://your-frontend.railway.app/`
- Admin: `https://your-frontend.railway.app/admin`

## Google Drive video setup
1. Upload video to Google Drive
2. Right-click → Share → "Anyone with the link" → Viewer
3. Copy the share link and paste into the video URL field in admin
4. The app auto-converts it to an embed URL

## Adding languages (future)
Add `title_ja`, `title_zh`, `ingredients_ja`, `steps_ja` etc. columns to the `recipes` table.
The language toggle buttons are already in the UI, currently locked to EN.
