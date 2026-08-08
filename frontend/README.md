# Lost and Found Web Application

A full-stack web application built to connect individuals who have lost personal belongings with those who have found them. The system streamlines reporting, searching, and managing lost items within a community or institution.

---

## 📌 Purpose
The application reduces the friction and stress of locating lost items. Instead of relying on manual notices or scattered social posts, users have a single centralized portal to log missing items, post found items, and coordinate returns efficiently.

---

## 👥 Target Users & Audience

* **General Community Members:** Anyone looking to report a misplaced item or publish details of a found object.
* **Administrative Personnel:** Staff or campus desk managers who handle physical lost-and-found collections, verify item ownership, and update recovery statuses.

---

## 🏗 System Architecture

The application uses a **Client-Server Architecture** decoupling the frontend user interface from the backend REST API:

+-------------------------------------------------------+
|                    React Frontend                     |
|            (JavaScript, JSX, CSS3, HTML5)             |
+-------------------------------------------------------+
|
| HTTP / REST API
v
+-------------------------------------------------------+
|                  Spring Boot Backend                  |
|          (Java, Spring Web, Spring Data JPA)          |
+-------------------------------------------------------+
|
| JDBC / Hibernate ORM
v
+-------------------------------------------------------+
|                     MySQL Database                    |
|                   (lostandfound_db)                   |
+-------------------------------------------------------+


---

## 💻 Languages & Tech Stack

| Layer | Languages & Technologies |
| :--- | :--- |
| **Frontend** | JavaScript (ES6+), HTML5, CSS3, React.js |
| **Backend** | Java 17+, Spring Boot, Spring Data JPA |
| **Database** | MySQL (managed via XAMPP / phpMyAdmin) |
| **Tooling** | Maven, npm, Git, GitHub |

---

## 🗄 Database Schema

The system stores item information in the `items` table inside `lostandfound_db`:

| Column Name | Data Type | Key / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | Primary Key, Auto Increment | Unique record ID |
| `title` | `VARCHAR(255)` | Not Null | Name of the lost or found item |
| `description` | `TEXT` | Not Null | Detailed description |
| `location` | `VARCHAR(255)` | Not Null | Place where item was lost or found |
| `contact_info` | `VARCHAR(255)` | Not Null | Phone or email of reporter |
| `status` | `VARCHAR(50)` | Not Null | `LOST`, `FOUND`, or `RESOLVED` |

---

## 📁 Repository Structure

Lost-and-Found/
├── frontend/               # React Frontend
│   ├── public/             # Static Assets
│   └── src/                # Components & UI Logic (App.js, App.css)
├── lostfound/              # Spring Boot Backend
│   └── src/main/java/      # Controller, Service & Entity Classes
└── README.md               # Main Project Documentation


---

## 🚀 Quick Setup & Installation

### Prerequisites
* **Java Development Kit (JDK 17+)**
* **Node.js & npm**
* **XAMPP (MySQL Server)**

### 1. Database Setup
1. Start **MySQL** in XAMPP Control Panel.
2. Open phpMyAdmin (`http://localhost/phpmyadmin/`).
3. Create a database named `lostandfound_db`.

### 2. Run Backend
```bash
cd lostfound
./mvnw spring-boot:run
Backend API starts on http://localhost:8081.

3. Run Frontend
Bash
cd frontend
npm install
npm start
Frontend runs on http://localhost:3000.