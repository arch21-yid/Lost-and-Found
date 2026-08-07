# Lost and Found Web Application

A full-stack web application designed to connect people who have lost personal belongings with individuals who have found them. The platform simplifies reporting, searching, and managing lost items within a community or organization.

---

## 📌 Purpose
The main goal of this application is to reduce the stress and friction of searching for misplaced items. Instead of relying on physical bulletin boards or fragmented social media posts, users have a centralized platform to report lost items or log found belongings for quick matching.

---

## 👥 Target Audience & Target Users

* **General Users / Community Members:** Anyone who has lost or found an item and wants to quickly log a report or search existing listings.
* **Campus & Organization Administrators:** Staff or managers who oversee lost-and-found desks to manage incoming inventory, verify claims, and coordinate returns.

---

## 🏗 System Architecture

The project follows a standard **Client-Server Architecture** decoupled into a frontend single-page application (SPA) and a backend REST API.

+-------------------------------------------------------+
|                    React Frontend                     |
|            (React Hooks, Axios / Fetch)               |
+-------------------------------------------------------+
|
| HTTP / REST API Requests
v
+-------------------------------------------------------+
|                  Spring Boot Backend                  |
|  [ Controller Layer -> Service Layer -> Repository ]  |
+-------------------------------------------------------+
|
| JPA / Hibernate / JDBC
v
+-------------------------------------------------------+
|                    MySQL Database                     |
|                   (lostandfound_db)                   |
+-------------------------------------------------------+


---

## 🗄 Database Schema

The application utilizes MySQL (`lostandfound_db`) managed via phpMyAdmin. Below is the main entity schema used to track lost and found records:

### `items` Table

| Column Name   | Data Type     | Constraints                        | Description                                 |
| :------------ | :------------ | :--------------------------------- | :------------------------------------------ |
| `id`          | `BIGINT`      | `PRIMARY KEY`, `AUTO_INCREMENT`    | Unique identifier for each record          |
| `title`       | `VARCHAR(255)`| `NOT NULL`                         | Item name (e.g., ID Card, Keys, Phone)      |
| `description` | `TEXT`        | `NOT NULL`                         | Detailed description of the item            |
| `location`    | `VARCHAR(255)`| `NOT NULL`                         | Location where item was lost/found          |
| `contact_info`| `VARCHAR(255)`| `NOT NULL`                         | Contact details of the reporter             |
| `status`      | `VARCHAR(50)` | `NOT NULL`                         | Record status: `LOST`, `FOUND`, `RESOLVED`  |

---

## 📁 Repository Structure

lostfound/
├── frontend/               # React Frontend Application
│   ├── public/             # Static Assets & HTML Index
│   ├── src/
│   │   ├── App.js          # Main Component & UI Logic
│   │   ├── App.css         # Styling & CSS Themes
│   │   └── index.js        # React Entry Point
│   └── package.json        # Frontend Dependencies
│
└── lostfound/              # Spring Boot Backend Application
└── src/main/java/com/example/lostfound/
├── controller/     # REST Endpoints (ItemController.java)
├── model/          # JPA Entities (Item.java)
├── repository/     # Data Access Layer (ItemRepository.java)
└── LostfoundApplication.java # Spring Boot Entry Point


---

## ✨ Key Features

* **Item Management:** Create, view, update, and resolve reports for lost and found items.
* **Search & Filter:** Instantly filter listed items by keyword, location, or status.
* **Multi-Language Support:** Localized interface options (English & Amharic).
* **Responsive Dashboard UI:** Styled with CSS theme variables.

---

## 🛠 Tech Stack

* **Frontend:** React, CSS3, HTML5, JavaScript (ES6+)
* **Backend:** Java, Spring Boot, Spring Data JPA
* **Database:** MySQL (XAMPP / phpMyAdmin)
* **Version Control:** Git, GitHub

---

## 🚀 Quick Setup & Running Locally

### Prerequisites
* **JDK 17+**
* **Node.js & npm**
* **XAMPP / MySQL Server**

### 1. Database Setup
1. Start Apache & MySQL in XAMPP.
2. Open phpMyAdmin (`http://localhost/phpmyadmin/`).
3. Create a database named `lostandfound_db`.

### 2. Backend Setup
```bash
# Navigate to the backend directory
cd lostfound

# Run the Spring Boot application
./mvnw spring-boot:run
Backend runs on http://localhost:8081.

3. Frontend Setup
Bash
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the React app
npm start
Frontend runs on http://localhost:3000.