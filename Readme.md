# University of TeaLand Management System

Welcome to the **University of TeaLand Management System**, a comprehensive web-based application designed to streamline the academic and administrative processes of a modern university. This system is built with scalability and security in mind, ensuring efficient management of students, faculty, and administrative operations.

---

## 🌟 Features

### 1. **Authentication**

- Secure login/logout for all users (Students, Faculty, Admin).
- Password management with the ability to update and reset securely.

### 2. **Profile Management**

- **Students**:
  - Manage and update personal profiles.
  - Modify specific fields.
- **Faculty**:
  - Manage and update personal profiles.
  - Modify specific fields.
- **Admin**:
  - Manage and update personal profiles.
  - Modify specific fields.

### 3. **Academic Process Management**

- **Students**:
  - Enroll in courses for specific semesters.
  - View class schedules, grades, notice boards, and events.
- **Faculty**:
  - Manage student grades.
  - Access student academic and personal information.
- **Admin**:
  - Manage semesters, courses, offered courses, sections, rooms, and buildings.

### 4. **User Management (Admin Exclusive)**

- Manage accounts for all users (Students, Faculty, Admin).
- Block/unblock users.
- Change passwords for any user.

---

## 📂 Data Models

### 1. **User**

```json
{
  "_id": "string",
  "id": "string",
  "password": "string",
  "needsPasswordChange": "boolean",
  "role": "string",
  "status": "string",
  "isDeleted": "boolean",
  "createdAt": "date",
  "updatedAt": "date"
}
```
