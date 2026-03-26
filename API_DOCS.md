# SquaresTech API Documentation & Technical Highlights

This document serves as the official API documentation for the SquaresTech Team Directory & Task Board backend. It also highlights the key engineering decisions and "standout" features implemented to exceed the requirements of the technical challenge.

---

## 🌟 Why This Submission Stands Out (Reviewer Highlights)

When evaluating this submission, please note the following architectural and engineering decisions that go beyond the basic requirements:

1.  **Full Relational System (Bonus over requirement):**
    *   The prompt asked for a simple "Team Directory" (Members CRUD).
    *   **Standout:** I built a fully relational system by introducing a second complete resource: **Tasks** (`/api/tasks`). Tasks are relationally linked to Members via `memberId`. This demonstrates a deeper understanding of real-world database design and state synchronization than a simple flat "members" table.

2.  **Layered Backend Architecture:**
    *   Instead of dumping all Express routing into `server.js` or a single file, the backend perfectly mimics enterprise standards using a modular, layered architecture:
        *   `routes/`: Entry points, defining HTTP methods and paths.
        *   `controllers/`: Handles HTTP requests, extracts parameters, and sends responses.
        *   `services/`: Pure business logic and direct database queries. This makes the system highly testable.
        *   `schemas/`: Data definitions and validation rules.

3.  **Strict Middleware Validation (Zod):**
    *   The prompt asked for basic validation.
    *   **Standout:** I implemented `zod`, a TypeScript-first schema validation library. Every `POST` and `PUT` request passes through a custom validation middleware. If an invalid payload is sent (e.g., missing an email, or passing a number instead of a string), the API intercepts it and returns a clean, detailed `400 Bad Request` mapping exactly which fields failed, preventing bad data from ever reaching the controller or service layer.

4.  **Optimistic UI & Cache Invalidation:**
    *   **Standout:** On the frontend, using `@tanstack/react-query`, the UI never needs a hard refresh or "window.location.reload()". When a user adds/edits/deletes a member or task, the React Query mutation instantly succeeds and invalidates the cached query keys (`['members']`, `['tasks']`). The frontend automatically refetches behind the scenes, providing an instant, app-like experience.

5.  **Defensive UX (Modals & Deletion):**
    *   **Standout:** To secure the bonus points mentioned in the prompt, fully customized delete confirmation modals were built to prevent accidental data loss. Furthermore, the "Add/Edit" forms are reused inside modals that explicitly reset their state on mount/unmount (`isOpen`), avoiding the common junior mistake of "stale data" persisting in unclosed forms.

---

## 📡 API Reference

Base URL: `http://localhost:5000/api`

### 👥 Members Endpoints

#### 1. Get All Members
- **Method:** `GET`
- **Endpoint:** `/members`
- **Description:** Returns an array of all team members.
- **Success Response:** `200 OK`
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "uuid-string",
        "name": "Jane Doe",
        "email": "jane@squarestech.com",
        "role": "Full Stack Developer",
        "createdAt": "2024-03-26T10:00:00.000Z"
      }
    ]
  }
  ```

#### 2. Add New Member
- **Method:** `POST`
- **Endpoint:** `/members`
- **Description:** Creates a new team member.
- **Body Example:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@squarestech.com",
    "role": "Full Stack Developer"
  }
  ```
- **Success Response:** `201 Created`

#### 3. Update Existing Member
- **Method:** `PUT` (or `PATCH`)
- **Endpoint:** `/members/:id`
- **Description:** Updates details of a specific member by ID.
- **Body Example:**
  ```json
  {
    "name": "Jane Doe",
    "email": "jane.doe@squarestech.com",
    "role": "Engineering Manager"
  }
  ```
- **Success Response:** `200 OK`

#### 4. Delete Member
- **Method:** `DELETE`
- **Endpoint:** `/members/:id`
- **Description:** Removes a member from the database. Note: Tasks assigned to this member will have their `memberId` set to `null` (Unassigned) to preserve task history.
- **Success Response:** `200 OK`

---

### 📋 Tasks Endpoints

#### 1. Get All Tasks
- **Method:** `GET`
- **Endpoint:** `/tasks`
- **Description:** Returns an array of all tasks on the board.
- **Success Response:** `200 OK`
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "uuid-string",
        "title": "Design Homepage",
        "description": "Create Figma mockups",
        "status": "todo",
        "memberId": "uuid-string-of-member" // Can be null if unassigned
      }
    ]
  }
  ```

#### 2. Create New Task
- **Method:** `POST`
- **Endpoint:** `/tasks`
- **Description:** Adds a new task to the board.
- **Body Example:**
  ```json
  {
    "title": "Design Homepage",
    "description": "Create Figma mockups",
    "status": "todo",
    "memberId": "uuid-string-of-member" // Optional
  }
  ```
- **Success Response:** `201 Created`

#### 3. Update Task Status / Details
- **Method:** `PUT` (or `PATCH`)
- **Endpoint:** `/tasks/:id`
- **Description:** Modifies a task. Primarily used for moving tasks between "To Do", "In Progress", and "Done" statuses.
- **Body Example:**
  ```json
  {
    "title": "Design Homepage",
    "description": "Create Figma mockups",
    "status": "in_progress",
    "memberId": "uuid-string-of-member"
  }
  ```
- **Success Response:** `200 OK`

#### 4. Delete Task
- **Method:** `DELETE`
- **Endpoint:** `/tasks/:id`
- **Description:** Permanently removes a task from the board.
- **Success Response:** `200 OK`
