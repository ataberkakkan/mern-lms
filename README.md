<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=47A248" alt="mongodb" />
    <img src="https://img.shields.io/badge/-Express_JS-black?style=for-the-badge&logoColor=white&logo=express&color=000000" alt="expressjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/Stripe-black?style=for-the-badge&logo=stripe&logoColor=white&color=008CDD
    " alt="stripe">
  </div>

  <h3 align="center">📚 MERN LMS - Learning Management System</h3>
</div>

## 📋 <a name="table">Table of Contents</a>

1. 🎯 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🚀 [Quick Start](#quick-start)

## <a name="introduction">🎯 Introduction</a>

**MERN-LMS** is a full-stack Learning Management System built using the MERN stack. It allows admins to create and manage courses, upload video content, and track user progress. Students can enroll in courses, watch videos, and complete lessons at their own pace.

This project is perfect for developers who want to learn about video upload/streaming, authentication, secure APIs, and advanced CRUD operations in a production-ready app.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **Frontend**: React, TailwindCSS, Redux Toolkit, RTK Query, React Router, Shadcn
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **File Upload**: Multer, Cloudinary

## <a name="features">🔋 Features</a>

👉 **User Roles**: Admin and Student separation with protected routes.

👉 **Authentication**: Secure sign-up/login using JWT.

👉 **Course Management**: Admins can create, update, and delete courses.

👉 **Video Upload & Streaming**: Upload course videos and stream them efficiently using range requests.

👉 **Lesson System**: Each course contains multiple lessons (with video, title, and description).

👉 **Progress Tracking**: Keep track of completed lessons for each student.

👉 **Responsive UI**: Mobile-first responsive design using TailwindCSS.

👉 **Secure APIs**: Role-based access control and validation.

👉 **Dashboard**: Admin dashboard for creating, editing, removing courses and see the total revenue.

👉 **Search & Filters**: Easily find courses using keywords and categories.

👉 **Deployment-Ready**: Easily deployable on platforms like Vercel, Render, or Heroku.

## <a name="quick-start">🚀 Quick Start</a>

**Prerequisites**

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

---

### 📥 Clone the Repository

```bash
git clone https://github.com/ataberkakkan/mern-lms.git

cd mern-lms
```

### 📦 Install Dependencies

Install backend and frontend dependencies:

```bash
# For backend
cd server
npm install

# For frontend
cd ../client
npm install

```

**Set Up Environment Variables**

```bash
cd server
```

Create a new file named `.env` in the `server` folder and add the following content:

```env
PORT=5000
JWT_SECRET=your_jwt_secret
MONGO_URI=your_mongodb_connection_string

# Cloudinary
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_CLOUD_NAME=

# Stripe
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
WEBHOOK_ENDPOINT_SECRET=
```

### ▶️ Running the App

```bash
cd server
npm run dev

cd client
npm run dev
```

Visit http://localhost:5173 in your browser.
