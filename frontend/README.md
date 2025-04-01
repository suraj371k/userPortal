# User Portal

## 🚀 Overview
The **User Portal** is a full-stack web application built using the **MERN stack**. It provides users with authentication, profile management, and data storage capabilities. The frontend is built with **React + Vite** and styled using **Tailwind CSS**, while **Redux** is used for state management.

## 🛠️ Tech Stack
### Frontend:
- React.js (with Vite for fast development)
- Redux Toolkit (for state management)
- Tailwind CSS (for styling)

### Backend:
- Node.js & Express.js (server-side framework)
- MongoDB & Mongoose (database & ODM)
- JWT (JSON Web Token for authentication)

## ⚡ How to Start the Project
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/user-portal.git
cd user-portal
```

### 2️⃣ Install Dependencies
#### Install frontend dependencies:
```bash
cd client
npm install
```
#### Install backend dependencies:
```bash
cd ../server
npm install
```

### 3️⃣ Configure Environment Variables
Create a `.env` file inside the `server` folder and add:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 4️⃣ Run the Application
#### Start Backend:
```bash
cd server
npm run dev
```
#### Start Frontend:
```bash
cd client
npm run dev
```
Now, open [http://localhost:5173](http://localhost:5173) in your browser.

## ✨ Features
- **User Authentication** (Login, Signup, Logout)
- **Profile Management** (Update Name, Email, Avatar, etc.)
- **Role-Based Access Control** (Admin/User)
- **Secure API Endpoints** (JWT Authentication)
- **State Management with Redux**
- **Responsive UI with Tailwind CSS**