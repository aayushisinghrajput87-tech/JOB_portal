🚀 MERN Stack Job Portal Application

A modern and responsive MERN Stack Job Portal application where companies can post and manage job opportunities, and users can search and apply for jobs seamlessly.

---

🌐 Live Demo

🔗 Live: job-portal-sigma-ruby.vercel.app

---

📌 Project Overview

This is a MERN-stack Job Portal application. The platform enables companies to create and manage job postings while allowing job seekers to browse available opportunities and submit applications efficiently.

The backend provides secure REST APIs for authentication, company management, job posting, and application handling, while the frontend delivers a responsive and user-friendly experience using React and Vite.

---

✨ Key Features

- 🔐 Secure User Authentication & Authorization using JWT
- 👤 User Registration and Login System
- 🏢 Company Registration and Management
- 💼 Job Creation, Posting, and Management
- 🔍 Search and Browse Job Opportunities
- 📝 Apply for Jobs with Ease
- ☁️ Cloudinary Integration for File/Image Uploads
- 📱 Fully Responsive User Interface
- ⚡ Efficient State Management using Redux Toolkit
- 🎨 Modern UI built with Tailwind CSS and Radix UI
- ✨ Smooth Animations with Framer Motion

---

🛠️ Tech Stack

Backend

- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB with Mongoose
- 🔐 JWT Authentication
- ☁️ Cloudinary
- 📂 Multer

Frontend

- ⚛️ React.js
- ⚡ Vite
- 🗂️ Redux Toolkit
- 🎨 Tailwind CSS
- 🧩 Radix UI
- ✨ Framer Motion

Development Tools

- 🔄 Nodemon
- 🌿 Git & GitHub
- 🔗 REST APIs

---

📁 Project Structure

Job-Portal/
├── Backened/
│   ├── index.js
│   ├── package.json
│   ├── seed.js
│   ├── controllers/
│   │   ├── application.controller.js
│   │   ├── company.controller.js
│   │   ├── job.controller.js
│   │   └── user.controller.js
│   ├── middleware/
│   │   ├── isAuthenticated.js
│   │   └── multer.js
│   ├── models/
│   │   ├── application.model.js
│   │   ├── company.model.js
│   │   ├── job.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── application.route.js
│   │   ├── company.route.js
│   │   ├── job.route.js
│   │   └── user.route.js
│   └── utils/
│       ├── cloudinary.js
│       ├── datauri.js
│       └── db.js
│
└── Frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── components/
        ├── redux/
        └── utils/

---

🔐 Environment Variables

Create a ".env" file inside the "Backened/" directory and add the following variables:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

---

🚀 Getting Started

Clone the Repository

git clone <repository-url>
cd Job-Portal

Backend Setup

cd Backened
npm install
npm run dev

Frontend Setup

cd Frontend
npm install
npm run dev

---

🏗️ Build for Production

Backend

cd Backened
npm install --production
npm start

Frontend

cd Frontend
npm run build
npm run preview

---

🌱 Seed Initial Data (Optional)

cd Backened
node seed.js

---

## 📸 Application Preview

The application includes several interactive modules and dashboards designed to provide a seamless experience for both job seekers and recruiters, including:

- 🏠 Home Page
- 🔐 Authentication (Login & Registration)
- 💼 Job Listings and Search
- 📝 Job Application System
- 🏢 Company Dashboard
- 📊 Recruiter Dashboard
- 👤 User Profile Management
- ➕ Job Creation and Management

> Visual previews and screenshots will be added in future updates.

⭐ If you found this project interesting, feel free to give it a star on GitHub!
