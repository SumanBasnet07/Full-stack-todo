# 📝 Full-Stack Todo App

A professional full-stack Todo application built using the **MERN Stack** (MongoDB, Express, React, Node.js). This app provides user authentication and full CRUD operations, offering an efficient way to manage tasks.

![MERN stack badge](https://img.shields.io/badge/stack-MERN-green)
![License badge](https://img.shields.io/github/license/SumanBasnet07/Full-stack-todo)
![Issues badge](https://img.shields.io/github/issues/SumanBasnet07/Full-stack-todo)

---

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

---

## ✅ Features

- 🔐 **Authentication** — Secure login and registration using JWT
- ✏️ **CRUD Operations** — Create, read, update, and delete todos
- 📱 **Responsive UI** — Mobile-first design with React
- ⚡ **RESTful API** — Express backend connected to MongoDB

---

## 🛠 Tech Stack

| Tech           | Role          |
|----------------|---------------|
| React.js       | Frontend UI   |
| Node.js        | Server        |
| Express.js     | API & Routing |
| MongoDB + Mongoose | Database    |
| JWT + Bcrypt   | Authentication |
| Axios          | HTTP Requests |

---

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org)
- [MongoDB](https://mongodb.com)

### Installation

Clone the repository:

```bash
git clone https://github.com/SumanBasnet07/Full-stack-todo.git
cd Full-stack-todo
```

#### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in `backend`:
```javascript
-PORT=5000

-MONGO_URI=your_mongodb_connection

-JWT_SECRET=your_secret
```
Start server:
```bash
npm start
```
#### Frontend Setup
```bash
cd ../frontend
npm install
npm start
```
Visit the app at [http://localhost:3000](http://localhost:3000)

---


## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (\`git checkout -b feature/feature-name\`)
3. Commit your changes (\`git commit -m 'feat: add new feature'\`)
4. Push to the branch (\`git push origin feature/feature-name\`)
5. Open a pull request

---

## 📄 License

Licensed under the [MIT License](LICENSE).
