# SquaresTech Team Directory & Task Board

A full-stack web application built for the SquaresTech technical challenge. It acts as an internal tool to manage team members and track tasks in a Kanban-style board.

## 🚀 Tech Stack & Reasoning

**Frontend:**
- **React (Vite) + TypeScript:** Chosen for fast development, robust type safety, and excellent developer experience.
- **Tailwind CSS:** Allows for rapid, completely custom, and responsive UI development without context-switching to CSS files.
- **React Query (@tanstack/react-query):** The best solution for server-state management. It handles caching, loading states, error handling, and automatically keeps the UI in sync with the backend without needing complex Redux/Context setups.
- **Lucide React:** Beautiful, lightweight icons.

**Backend:**
- **Node.js + Express:** The industry standard for building fast, reliable REST APIs in JavaScript.
- **SQLite (better-sqlite3):** A lightweight, file-based database. It requires zero configuration or external hosting, making it perfect for rapid prototyping and easy local evaluation.
- **Zod:** Used for strict schema validation on the backend. It ensures data integrity before anything reaches the database level.
- **CORS & body-parser:** Standard middleware for cross-origin requests and JSON payload parsing.

## ⚙️ Architecture

The project is structured as a **Monorepo** containing two distinct applications:

1. **Frontend (`/frontend`)**: Component-based architecture. Heavy use of modular modals for CRUD operations to ensure the user never has to leave the context of the page (no full reloads).
2. **Backend (`/backend`)**: Follows a layered architecture pattern:
   - **Routes**: Define the API endpoints.
   - **Controllers**: Handle HTTP request/response logic.
   - **Services**: Contain the core business logic and database interactions.
   - **Schemas**: Define strict Zod validation rules for incoming payloads.

## 📦 Installation & Setup

You will need two terminal windows to run both servers simultaneously. **Node.js v18+ is recommended.**

### 1. Start the Backend API
```bash
cd backend
npm install
npm run dev
```
*The backend will start on `http://localhost:5000` and will automatically generate a Local SQLite database at `backend/src/db/database.db`.*

### 2. Start the Frontend App
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
*The frontend will start on `http://localhost:5173`. Open this URL in your browser.*

If PowerShell blocks running npm scripts, use:
```bash
powershell -ExecutionPolicy Bypass -Command "npm run dev"
```

## 🎯 Features Implemented (Meeting all Requirements)
- ✅ **Full CRUD on Members:** GET, POST, PUT, DELETE on `/api/members`.
- ✅ **Full CRUD on Tasks:** A complete Kanban board to manage tasks (/api/tasks).
- ✅ **Bonus Achieved:** Delete confirmation modals for both Members and Tasks to prevent accidental data loss.
- ✅ **Live State Sync:** The UI dynamically syncs with the database without full page reloads using React Query invalidations.
- ✅ **Error Handling & Loading States:** Graceful spinners and error messages integrated into the UI.
- ✅ **Validation:** Strict backend validation ensures bad data cannot be saved.

## ⏱️ Trade-offs & Considerations (24-Hour Strict Deadline)
Given the strict 24-hour time limit, the following trade-offs were made:
1. **Authentication:** No login or user authentication is implemented. The dashboard is fully accessible. In a real-world scenario, I would implement JWT or session-based auth.
2. **Database:** SQLite was chosen over PostgreSQL or MongoDB to ensure zero-friction setup for the reviewer.
3. **Responsive Design Limits:** The Kanban board is optimized for desktop and tablet. While responsive, mobile drag-and-drop or touch-heavy interfaces for Kanban boards require significant bespoke logic that fell outside the time scope. Quick-move buttons were added to mitigate this.
