<h1 align="center">
# DevAcademy - Full-Stack E-Learning Platform
</h1>

<!-- Badges -->
<p align="center">
  <a href="https://dev-academy-frontend.vercel.app/"><img src="https://img.shields.io/badge/Live_Demo-▲-blue?style=for-the-badge&logo=vercel" alt="Live Demo" /></a>
  <a href="https://github.com/Awesomedude666/DevAcademy/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Project_Status-Completed-green?style=for-the-badge" alt="Project Status" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk" />
  <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />
</p>

![DevAcademy Demo](https://i.imgur.com/your-project-demo-image-or-gif.gif) <!-- Replace with a link to a screenshot or a GIF of your project -->

## 📝 Overview

In the rapidly evolving tech landscape, aspiring developers often struggle to find structured, high-quality courses, while skilled educators lack the tools to easily create and monetize their own content. DevAcademy addresses this gap by providing a comprehensive, full-stack e-learning platform that serves as a two-sided marketplace.

The platform empowers educators with a dedicated dashboard to design rich curricula, upload course materials, set pricing, and track their earnings. For students, DevAcademy offers a seamless learning experience, from discovering new courses and processing secure payments with Stripe to tracking their progress through an interactive course player. By handling the complexities of user authentication, payment processing, and media management, DevAcademy delivers a professional and intuitive experience for both sides of the educational marketplace.

**Live Demo:** [https://dev-academy-frontend.vercel.app/](https://dev-academy-frontend.vercel.app/)

---

## ✨ Features

### For Students:
- **User Authentication:** Secure sign-up and login functionality powered by Clerk, including social logins.
- **Course Catalog:** Browse a list of all available and published courses with a real-time search and filtering system.
- **Course Details:** View detailed information for each course, including a rich description, curriculum and student ratings.
- **Secure Payments:** Purchase courses securely using a Stripe integration with a seamless checkout experience.
- **My Enrollments:** A personal dashboard to view and access all enrolled courses and visualize completion progress with progress bars.
- **Interactive Course Player:** An intuitive player to watch lectures, with a collapsible sidebar for easy navigation through the course structure.
- **Progress Tracking:** Mark lectures as complete and track progress throughout a course.
- **Course Ratings:** Rate enrolled courses on a 5-star scale to provide feedback to the community.

### For Educators:
- **Become an Educator:** A simple, one-click process to upgrade a user's role to "educator" and unlock teaching features.
- **Educator Dashboard:** A comprehensive dashboard showing key metrics like total earnings, total courses, and a list of the latest student enrollments.
- **Course Management:** Dedicated sections to create, view, and manage all created courses.
- **Add New Course:** An intuitive, multi-step form to add new courses, including a rich-text editor (Quill.js) for the description, thumbnail uploads via Cloudinary, and a dynamic curriculum builder for chapters and lectures.
- **Content Management:** Easily add, edit, and reorder chapters and lectures within a course.
- **Student Analytics:** View a list of all students enrolled in your courses.

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** Clerk
- **Payments:** Stripe
- **Media Storage:** Cloudinary
- **UI Notifications:** React Toastify

---

## 📷 Screenshots

<img width="2834" height="1512" alt="image" src="https://github.com/user-attachments/assets/e77103bb-ad11-49e6-bc1f-cab81a4e0189" />
<img width="2839" height="1504" alt="image" src="https://github.com/user-attachments/assets/0c2a16b4-b3d5-4905-a7a7-df8e303dee80" />
<img width="2844" height="1522" alt="image" src="https://github.com/user-attachments/assets/a1692b63-b7ba-4f0f-b7aa-cbefc8549e3f" />
<img width="2875" height="1520" alt="image" src="https://github.com/user-attachments/assets/03ff29e9-c2a2-497d-a9df-20d2840d8860" />
<img width="2845" height="1518" alt="image" src="https://github.com/user-attachments/assets/a5643bd9-9a99-4179-88d1-67cc97dd9f54" />
<img width="2802" height="1505" alt="image" src="https://github.com/user-attachments/assets/52a4bf1a-0a8f-4e5b-8f11-b34fcab7bbaf" />
<img width="2823" height="1517" alt="image" src="https://github.com/user-attachments/assets/a453606e-b155-437b-b27c-157b95e7b60e" />
<img width="2831" height="1457" alt="image" src="https://github.com/user-attachments/assets/52ed49c7-37fa-4d57-b981-c641a575b335" />

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### ✅ Prerequisites

- Node.js and npm (or yarn) installed on your machine.
- A MongoDB account and a connection string.
- API keys for Clerk, Cloudinary, and Stripe.

### ⚙️ Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Awesomedude666/DevAcademy.git
    cd DevAcademy
    ```

2.  **Install Backend Dependencies:**
    ```bash
    cd Backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    ```bash
    cd ../Frontend
    npm install
    ```

### 🔑 Environment Variables

You will need to create a `.env` file in the `Backend` directory.

### Backend/.env
### MongoDB
**MONGO_URI**=your_mongodb_connection_string

### Clerk
**CLERK_SECRET_KEY**=your_clerk_secret_key<br>
**CLERK_PUBLISHABLE_KEY**=your_clerk_publishable_key<br>
**CLERK_WEBHOOK_SECRET**=your_clerk_webhook_secret

### Cloudinary
**CLOUDINARY_NAME**=your_cloudinary_cloud_name<br>
**CLOUDINARY_API_KEY**=your_cloudinary_api_key<br>
**CLOUDINARY_SECRET_KEY**=your_cloudinary_secret_key

### Stripe
**STRIPE_SECRET_KEY**=your_stripe_secret_key<br>
**STRIPE_WEBHOOK_SECRET**=your_stripe_webhook_secret<br>
**STRIPE_PUBLISHABLE_KEY**=your_stripe_publishable_key

### Currency (e.g., $, INR)
**CURRENCY**=$


You will also need to create a `.env` file in the `Frontend` directory.


### Frontend/.env
### Clerk Publishable Key
**VITE_CLERK_PUBLISHABLE_KEY**=your_clerk_publishable_key

### Backend URL
**VITE_BACKEND_URL**=http://localhost:5000
### Currency
**VITE_CURRENCY**=$


---

## 👨‍💻 Usage

1.  **Run the Backend Server:**
    From the `Backend` directory:
    ```bash
    npm run start
    ```
    The server should now be running on `http://localhost:5000`.

2.  **Run the Frontend Development Server:**
    From the `Frontend` directory:
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) (or your specified port) in your browser to see the application.

---

## 🤝 Contributing
If you have suggestions for improvements, new features, or bug fixes, please feel free to open an issue. Pull requests are warmly welcome.

---

## 📫 Contact

Devendar Reddy - [Email](devendar.reddy.engineer@gmail.com) - [LinkedIn](https://www.linkedin.com/in/d4devendar/)

Project Link: [https://github.com/Awesomedude666/DevAcademy](https://github.com/Awesomedude666/DevAcademy)
