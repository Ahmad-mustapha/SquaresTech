# SquaresTech Team Directory & Task Board

A full-stack web application built for the SquaresTech technical challenge. It acts as an internal tool to manage team members and track tasks in a Kanban-style board.

## Tech Stack

**Frontend:**
- **React (Vite) + TypeScript**
- **Tailwind CSS**
- **React Query (@tanstack/react-query)**
- **Lucide React**

**Backend:**
- **Node.js + Express**
- **SQLite (better-sqlite3)**
- **Zod**
- **CORS & body-parser**

## Architecture

The project is structured as a **Monorepo** containing two distinct applications:

1. **Frontend (`/frontend`)**: Component-based architecture with modal-based CRUD flows.
2. **Backend (`/backend`)**: Layered architecture:
   - **Routes**: Define API endpoints.
   - **Controllers**: Handle HTTP request/response logic.
   - **Services**: Business logic and database interactions.
   - **Schemas**: Zod validation rules.

## Installation & Setup

You will need two terminal windows to run both servers simultaneously. **Node.js v18+ is recommended.**

### 1. Start the Backend API
```bash
cd backend
npm install
npm run dev
```
*The backend starts on `http://localhost:5000` and generates a local SQLite DB at `backend/src/db/database.db`.*

### 2. Start the Frontend App
```bash
cd frontend
npm install
npm run dev
```
*The frontend starts on `http://localhost:5173`.*

If PowerShell blocks running npm scripts, use:
```bash
powershell -ExecutionPolicy Bypass -Command "npm run dev"
```
