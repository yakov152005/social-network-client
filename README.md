# 🌐 Social Network - Client Side
🔹 **Production Version**  
[Click here to access the live production version](https://social-network-client-k8fp.onrender.com/login)

## 🎯 Overview
🔹Social Network is a modern social networking platform built with React, focusing on **performance, security, and an interactive user experience**. The application supports **user registration with validation, password reset via unique email token, real-time chat, and notifications via SSE**.


## 🎥 Live Demo

🔹 **Login & Signup**

| **PC Login & Signup** | **Mobile Login & Signup** |
|----------------------|----------------------|
| [![PC Login](https://img.youtube.com/vi/3JgXhuvRYj8/0.jpg)](https://youtu.be/3JgXhuvRYj8) | [![Mobile Login](https://img.youtube.com/vi/9s4zRLXEWP4/0.jpg)](https://youtu.be/9s4zRLXEWP4) |


🔹 **Dashboard & Chat**

| **PC Dashboard** | **Mobile Dashboard** |
|------------------|------------------|
| [![PC Dashboard](https://img.youtube.com/vi/vCbnFSG1GwE/0.jpg)](https://youtu.be/vCbnFSG1GwE) | [![Mobile Dashboard](https://img.youtube.com/vi/FUO4NiIGEtw/0.jpg)](https://youtu.be/FUO4NiIGEtw) |


---

## 🚀 Features
✅ **Authentication & Authorization** – Registration, login, validation, and password reset via email token.  
✅ **State Management & Hooks** – Utilizing `useState`, `useEffect`, `useRef`, `useCallback`.  
✅ **API Communication** – Managed via `Axios`.  
✅ **Real-Time Updates** – Notifications and messaging using **SSE (Server-Sent Events)**.  
✅ **Advanced UI** – Styled with **MUI, Bootstrap, Tailwind, SweetAlert**.  
✅ **Image Upload** – Implemented with **Dropzone**.  
✅ **Popups & Notifications** – Handled using SweetAlert.  
✅ **Custom CSS per page** – Unique styling for each screen.  
✅ **Lazy Loading for Images** – Optimized performance with image lazy loading.  
✅ **Scrolling Support** – Smooth scrolling experience.  
✅ **Emoji Support** – Users can send emojis in messages.  
✅ **User Navigation** – Navigate to user profiles from comments, likes, followers, and search.  
✅ **User Search by Name** – Find users quickly.  
✅ **Social Interactions** – Like, comment, follow, and send messages.  
✅ **Easy Password Reset & Account Deletion** – Users can change their password or delete their account directly from settings.  
✅ **Activity Notifications** – Users receive real-time updates on likes, follows, and comments on their posts.

---

## 🏗 Tech Stack
🛠 **Frontend:** React, JavaScript  
🎨 **Styling:** Tailwind CSS, Material UI, Bootstrap  
🔁 **State Management:** Hooks (`useState`, `useEffect`, `useCallback`, `useRef`)  
🌍 **Networking:** Axios  
🔑 **Authentication:** JWT, Email Token Reset  
📡 **Real-Time Updates:** SSE  
🚀 **CI/CD:** GitHub Actions (Deploy to GitHub Pages)

---

## 🔄 Installation & Setup
```bash
# Enter Utils
change URL_SERVER_PRODUCTION to URL_SERVER_LOCAL

# Clone repository
git clone https://github.com/yakov152005/social-network-client.git
cd social-network-client

# Install dependencies
npm install

# Run development server
npm start
```

---

## 📁 Project Structure
```plaintext
📂 .github
 └── 📂 workflows        # CI/CD pipeline using GitHub Actions (deploy-react.yml)

📂 src
 ├── 📂 components      # Global components (ManagerRoute, NavBar, Footer, Forms, Popups, and more..)
 ├── 📂 pages          # Application pages (Home, Dashboard, Profile, Settings, and more..)
 ├── 📂 api            # API calls with Axios and validate token
 ├── 📂 css            # Custom styles for each page
 ├── 📂 utils          # Common utility functions and final variables
 ├── 📂 assets         # Images, icons, static files
 └── 📜 App.js         # Main application entry point
```

---

## 🔄 API Communication
The application uses `Axios` for API communication and manages user authentication using **JWT Tokens**.
### 📡 Example API Call:
```js
import axios from 'axios';

const API_URL = 'https://your-api-url.com/api';

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};
```

---

## 🎨 UI & Animations
🎭 **Framer Motion** and `react-icons` are used for smooth animations.  
🔄 **Page transitions** are handled with **React Router**.  
🌙 **UI Styling via Tailwind CSS, Bootstrap, MUI, and more..**

---

## 🛠 CI/CD Pipeline - GitHub Actions
The project includes a **complete CI/CD pipeline** with GitHub Actions, enabling:  
🚀 **Automatic deployment** to GitHub Pages (`deploy-react.yml`).  
✅ **Automated tests before merging pull requests**.

---

## 🔐 Security Measures
🔑 **JWT with Expiration**  
🚦 **Rate Limiting on API Calls**  
🔒 **Hash & Salt for Passwords**  
🛡 **CORS & Helmet for Server Protection**

---

## 🎯 Roadmap - Future Enhancements
📌 [ ] **Video Upload Support in Chat** 🎥  
📌 [ ] **AI-Based Content Moderation** 🤖  
📌 [ ] **Advanced User Notification System** 📢

---

## 📩 Contact & Contribute
💡 Contributions are welcome via **Pull Requests**. Feel free to reach out via email: 📧 yakovbenhemo5@gmail.com

🚀 **Enjoy the Social Network Experience!** 🌍



