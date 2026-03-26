# REST API & Database Documentation

Base URL: `http://localhost:5000/api`

## Architecture Overview
The backend follows a layered MVC-style architecture. I split the logic into `routes`, `controllers`, `services`, and `schemas` to maintain separation of concerns and ensure the codebase is scalable. Strict validation is enforced on all incoming payloads using Zod middleware.

---

## 🗄️ Database Strategy (SQLite)

For data storage, this project uses **SQLite3** via the `better-sqlite3` driver. This approach was chosen specifically to meet the technical challenge requirements of providing a robust, relational database without requiring the reviewer to set up external database hosting, Docker containers, or MongoDB Atlas strings.

**How data is stored:**
1. **File-Based Storage:** Upon starting the server for the first time, the `backend/src/db/index.js` script automatically generates a local binary database file located at `backend/src/db/database.db`.
2. **Relational Schema:** The initialization script creates two fully relational tables:
   * **`members`:** Stores `id` (UUID), `name`, `email`, `role`, and `createdAt`.
   * **`tasks`:** Stores `id` (UUID), `title`, `description`, `status` (todo/in_progress/done), and importantly, a `memberId` foreign key.
3. **Data Integrity:** The `tasks.memberId` field references `members.id`. When a member is deleted, any tasks assigned to them have their `memberId` gracefully set to `null` (Unassigned) to prevent data loss or broken foreign key constraints.

This approach guarantees that reviewers can pull the code, run `npm run dev`, and immediately interact with a fully functional, persistent SQL database without any configuration blockages.

---

## 👥 Members Endpoints

### 1. Get All Members
- **Method:** `GET`
- **Endpoint:** `/members`
- **Description:** Returns an array of all team members.
- **Success Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "e4b52c0d-85fa-4c4f-9e28-3e9a7c3b2111",
      "name": "Jane Doe",
      "email": "jane@squarestech.com",
      "role": "Full Stack Developer",
      "createdAt": "2024-03-26T10:00:00.000Z"
    }
  ]
}
```

### 2. Add New Member
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
```json
{
  "success": true,
  "data": {
    "id": "e4b52c0d-85fa-4c4f-9e28-3e9a7c3b2111",
    "name": "Jane Doe",
    "email": "jane@squarestech.com",
    "role": "Full Stack Developer",
    "createdAt": "2024-03-26T10:05:00.000Z"
  }
}
```

### 3. Update Existing Member
- **Method:** `PUT`
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
```json
{
  "success": true,
  "data": {
    "id": "e4b52c0d-85fa-4c4f-9e28-3e9a7c3b2111",
    "name": "Jane Doe",
    "email": "jane.doe@squarestech.com",
    "role": "Engineering Manager",
    "createdAt": "2024-03-26T10:05:00.000Z"
  }
}
```

### 4. Delete Member
- **Method:** `DELETE`
- **Endpoint:** `/members/:id`
- **Description:** Removes a member from the database. Any tasks assigned to this member will automatically have their `memberId` set to `null` (Unassigned).
- **Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Member successfully deleted."
}
```

---

## 📋 Tasks Endpoints

### 1. Get All Tasks
- **Method:** `GET`
- **Endpoint:** `/tasks`
- **Description:** Returns an array of all tasks on the board.
- **Success Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "7f8b9e1c-5d2a-4b9c-8e3d-2f1a6c5b4000",
      "title": "Design Homepage",
      "description": "Create Figma mockups",
      "status": "todo",
      "memberId": "e4b52c0d-85fa-4c4f-9e28-3e9a7c3b2111",
      "createdAt": "2024-03-26T11:00:00.000Z"
    }
  ]
}
```

### 2. Create New Task
- **Method:** `POST`
- **Endpoint:** `/tasks`
- **Description:** Adds a new task to the board.
- **Body Example:**
```json
{
  "title": "Design Homepage",
  "description": "Create Figma mockups",
  "status": "todo",
  "memberId": "e4b52c0d-85fa-4c4f-9e28-3e9a7c3b2111" 
}
```
- **Success Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "id": "7f8b9e1c-5d2a-4b9c-8e3d-2f1a6c5b4000",
    "title": "Design Homepage",
    "description": "Create Figma mockups",
    "status": "todo",
    "memberId": "e4b52c0d-85fa-4c4f-9e28-3e9a7c3b2111",
    "createdAt": "2024-03-26T11:00:00.000Z"
  }
}
```

### 3. Update Task Status / Details
- **Method:** `PUT`
- **Endpoint:** `/tasks/:id`
- **Description:** Modifies a task. Primarily used for moving tasks between statuses (todo, in_progress, done).
- **Body Example:**
```json
{
  "title": "Design Homepage",
  "description": "Create Figma mockups",
  "status": "in_progress",
  "memberId": "e4b52c0d-85fa-4c4f-9e28-3e9a7c3b2111"
}
```
- **Success Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "7f8b9e1c-5d2a-4b9c-8e3d-2f1a6c5b4000",
    "title": "Design Homepage",
    "description": "Create Figma mockups",
    "status": "in_progress",
    "memberId": "e4b52c0d-85fa-4c4f-9e28-3e9a7c3b2111",
    "createdAt": "2024-03-26T11:00:00.000Z"
  }
}
```

### 4. Delete Task
- **Method:** `DELETE`
- **Endpoint:** `/tasks/:id`
- **Description:** Permanently removes a task from the board.
- **Success Response:** `200 OK`
```json
{
  "success": true,
  "message": "Task successfully deleted"
}
```
