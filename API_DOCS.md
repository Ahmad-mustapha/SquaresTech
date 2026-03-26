# API Reference

Base URL: `http://localhost:5000/api`

## Architecture Overview
The backend follows a layered MVC-style architecture. I split the logic into `routes`, `controllers`, `services`, and `schemas` to maintain separation of concerns and ensure the codebase is scalable. Strict validation is enforced on all incoming payloads using Zod middleware.

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
        "id": "uuid-string",
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

### 4. Delete Member
- **Method:** `DELETE`
- **Endpoint:** `/members/:id`
- **Description:** Removes a member from the database. Any tasks assigned to this member will automatically have their `memberId` set to `null` (Unassigned) to preserve task history.
- **Success Response:** `200 OK`

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
        "id": "uuid-string",
        "title": "Design Homepage",
        "description": "Create Figma mockups",
        "status": "todo",
        "memberId": "uuid-string-of-member"
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
    "memberId": "uuid-string-of-member" 
  }
  ```
- **Success Response:** `201 Created`

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
    "memberId": "uuid-string-of-member"
  }
  ```
- **Success Response:** `200 OK`

### 4. Delete Task
- **Method:** `DELETE`
- **Endpoint:** `/tasks/:id`
- **Description:** Permanently removes a task from the board.
- **Success Response:** `200 OK`
