# Penn Marriage Pact 💕

A fun questionnaire application for matching Penn students based on compatibility preferences. Users answer 22 questions about demographics, personality, and Penn-specific scenarios to find their ideal match.

## 📁 Project Structure

```
cis-1921-final-project/
├── index.html              # Main HTML entry point
├── pmp.js                  # Frontend React application (no build step)
├── style.css               # Styling for the questionnaire
├── assets/                 # Images and static assets
│   └── plaid banner.jpg
├── server/                 # Backend Node.js/Express server
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts           # MongoDB connection configuration
│   │   ├── models/
│   │   │   └── submissions.ts  # Mongoose schema for submissions
│   │   ├── routes/
│   │   │   └── submissions.ts  # API routes (GET, POST)
│   │   └── servers/
│   │       └── servers.ts      # Main Express server
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env                    # Environment variables (MONGO_URI)
│   ├── seed-matches.js         # Seed first 3 test users (CLEARS DB)
│   ├── seed-additional-matches.js  # Seed 4 more test users (PRESERVES DB)
│   ├── hannah-responses.md     # Manual entry guide for 5th user
│   └── clear-db.js             # Utility to wipe database
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account OR local MongoDB installation
- Python 3 (for serving frontend)

### Setup

1. **Clone the repository**
   ```bash
   cd cis-1921-final-project
   ```

2. **Set up environment variables**
   ```bash
   cd server
   cp .env.example .env  # If example exists
   # Edit .env to add your MONGO_URI
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Start the backend server**
   ```bash
   npm run dev  # Development mode with auto-reload
   # OR
   npm start    # Production mode
   ```
   Backend runs on: **http://localhost:3000**

5. **Start the frontend server (in a new terminal)**
   ```bash
   cd ..  # Back to project root
   python3 -m http.server 8000
   ```
   Frontend runs on: **http://localhost:8000**

6. **Open in browser**
   Navigate to: **http://localhost:8000**

## 🗄️ Database Management

### Seeding Test Data

The project includes scripts to populate the database with test users:

```bash
cd server

# Option 1: Start fresh (clears ALL data, adds 3 users)
node seed-matches.js

# Option 2: Add 4 more users (preserves existing data)
node seed-additional-matches.js

# Option 3: Completely wipe database
node clear-db.js
```

### Test Users Created

**Initial Seed (seed-matches.js):**
- Alex Johnson (F) - Junior, CAS, Asian
- Ben Carter (M) - Junior, CAS, Asian
- Chris Lee (M) - Junior, CAS, Asian

**Additional Seed (seed-additional-matches.js):**
- GROUP 1: Dana Smith (F) ↔ Ethan Brown (M) - Seniors in Engineering
- GROUP 2: Fiona Green (F) ↔ George White (M) - Sophomores in Wharton
  - *Hannah Davis (F) to be added manually via form*

## 📊 Data Schema

Each submission contains:
- **Demographics:** name, email, gender, school, year, race/ethnicity
- **Preferences:** preferred match gender, year, race/ethnicity
- **Personality:** Social events enjoyment, communication style, planning style, etc.
- **Penn-specific:** Locust Walk reactions, Penn love language, etc.
- **Communication:** Emotional availability, texting style
- **Optional:** Spotify Wrapped link

## 🔧 API Endpoints

### Backend (Port 3000)

- `GET /` - Health check
- `GET /api/submissions` - Retrieve all submissions
- `POST /api/submissions` - Create new submission

### Request Example
```json
POST /api/submissions
{
  "name": "John Doe",
  "penn_email": "johndoe@upenn.edu",
  "gender": 0,
  "preferred_gender": 1,
  "schools": "0",
  "year_at_penn": 2,
  "preferred_match_years": "2",
  "race_ethnicity": "0",
  "preferred_match_race_ethnicity": "0,7",
  "social_events_enjoyment": 5,
  ...
}
```

## 🧪 Testing

1. **Test API directly:**
   ```bash
   curl -X POST http://localhost:3000/api/submissions \
     -H "Content-Type: application/json" \
     -d '{ "name": "Test", "penn_email": "test@upenn.edu", ... }'
   ```

2. **Test frontend-backend connection:**
   Open **http://localhost:8000/test-api.html** and click "Test API Connection"

3. **Manual form testing:**
   - Fill out the questionnaire
   - Check browser console for detailed logs
   - Check backend terminal for submission logs

## 🛠️ Development

### Backend (TypeScript)
- Hot reload enabled with `npm run dev`
- Changes to `.ts` files auto-compile
- Uses ts-node for development

### Frontend (React)
- No build step required (uses Babel Standalone)
- Refresh browser to see changes
- Hard refresh (Cmd+Shift+R / Ctrl+Shift+R) to clear cache

### Adding New Questions
1. Add question to `questions` array in `pmp.js`
2. Update `submitToDatabase()` to include new field
3. Update schema in `server/src/models/submissions.ts`

## 📝 Notes

- **Unique Emails:** Each Penn email can only submit once (enforced by unique index)
- **CORS:** Backend only accepts requests from `http://localhost:8000`
- **Multi-select:** Stored as comma-separated strings (e.g., "0,1,2")
- **No Preference:** Race/ethnicity "NO PREFERENCE" (value 7) expands to all options

## 🐛 Common Issues

### "Failed to load resource: net::ERR_FAILED"
- Backend server not running → Start with `npm run dev`
- Wrong port → Ensure backend on 3000, frontend on 8000

### "This email has already been submitted"
- Email already in database → Use different email or clear database

### "MongoDB connection failed"
- Check MONGO_URI in `.env`
- Ensure MongoDB Atlas whitelist includes your IP
- For local: Ensure MongoDB is running

### Form submission error
- Check browser console for detailed logs
- Check backend terminal for API logs
- Verify both servers are running

## 👥 Contributors

Built for CIS 1921 Final Project

## 📄 License

This project is for educational purposes.
