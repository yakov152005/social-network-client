# 🌐 Social Network - Client Side

🎯 **Production Version**  
[Click here to access the live production version](https://social-network-client-k8fp.onrender.com/login)

🖥️ **Server Repository**  
[Click here to go Server Repository](https://github.com/yakov152005/social-network-server)

---

## 🎯 Overview
🔹**Social Network** is a cutting-edge platform built with **React, Java, Spring Boot,JavaScript, TypeScript, and SQL**, 
offering a fully interactive, real-time social experience.  
From secure authentication to dynamic dashboards, stories, chat, and notifications — everything is crafted with a strong focus on **performance, security, and user experience**.

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Spring Boot](https://img.shields.io/badge/Backend-SpringBoot-green?logo=springboot)
![Tailwind](https://img.shields.io/badge/Style-TailwindCSS-06b6d4?logo=tailwindcss)
![SSE](https://img.shields.io/badge/Realtime-SSE-orange)
![JWT](https://img.shields.io/badge/Auth-JWT-yellow?logo=jsonwebtokens)

---

## 🎥 Live Demo

### 🔐 Login

| **PC Login** | **Mobile Login** |
|----------------------|----------------------|
| ![PC Login](https://i.imgur.com/izwFZsx.png) | ![Mobile Login](https://i.imgur.com/TFqUIWU.png)|


### 📝 Signup Demo (GIF Previews)

| **PC Signup**                                             | **Mobile Signup**                                        |
|-----------------------------------------------------------|----------------------------------------------------------|
| <img src="src/assets/gif/signUpDesktop.gif" width="625"/> | <img src="src/assets/gif/signUpMobile.gif" width="150"/> |

> ⚠️ *Note: The GIF previews may appear with reduced resolution due to GIF compression.*


### 🖥️ Dashboard & Chat Demo

| **PC Dashboard** | **Mobile Dashboard** |
|------------------|----------------------|
| [![PC Demo](https://i.imgur.com/F6QGv3x.png)](https://youtu.be/cJJtyqjgJQk) | [![Mobile Demo](https://i.imgur.com/x1cGPuK.png)](https://youtu.be/Y-Hf3_CKtlw) |

> ▶️ Click the image to play the demo on YouTube.


---

## ⚙️ Features
- 🏠 **Dashboard** – Upload posts/stories, View on dashboard of people you follow on them: stories, posts, likes/comments, online friends, and friend suggestions
- 👤 **Profile** – Full user details, bio, posts, likes/comments, profile pic updates, followers/following
- ⚙️ **Settings** – Manage personal info, change password, enable 2FA, delete account and more.
- 📬 **Messages** – Real-time chat with emojis, last message preview, profile links, mobile support via **SSE**
- 🔔 **Notifications** – Instant updates on likes, comments, and follows via **SSE**
- 🔍 **Search** – Quick user lookup with recent history and follow/message options
- 🧑‍🤝‍🧑 **Pop-up Profile Preview** – Hover view with quick actions (profile/settings/logout)
- 🛡 **Authentication & Security** – JWT, hashed passwords, email reset tokens, 2FA
- 🧠 **Dynamic NavBar** – Adapts to screen with hover popups and profile actions
- 📸 **Post & Stories & Profile Pic Upload Dialog** – Includes image preview, emoji picker, zoom/pan
- 📱 **Responsive UI** – Optimized across all screen sizes with smooth scroll & page transitions
- ⚡ **Real-Time with SSE** – Chat, notifications, online users, stories, comments
- ✅ **Social Interactions** – Like, comment, follow, share stories, posts, notification and send messages.

---


## 🏗 Tech Stack
- 🛠 **Frontend:** React, JavaScript, typeScript.
- 👤**Backend:** Java, Spring Boot.
- 🧩 **Tools** SSE | SQL | DOCKER | JPA | CACHING | CronJob | scheduled | hibernate | and more.
- 🎨 **Styling:** Tailwind CSS (with custom config), Framer Motion, Custom Components UI Style shadcn, MUI, Bootstrap,
- 🔁 **State Management:** Hooks (`useState`, `useEffect`, `useCallback`, `useRef`, `useContext`,`useDropZon`,`custom hooks`)  
- 🌍 **Networking:** `Axios` and `Fetch`.
- 🔑 **Authentication:** JWT token, Email Token Reset, hash&salt, 2FA
- 📡 **Real-Time Updates:** SSE  
- 🚀 **CI/CD:** GitHub Actions (Deploy to GitHub Pages)
- 🔁 **SEO & Meta:** Full SEO optimization with OG, Twitter tags, robots, canonical, and more

---

## 🔍 SEO Optimization

The project is fully optimized for search engines and social media sharing:

- **Meta Tags:**
    - Descriptive `<meta>` tags including:
        - `description`, `keywords`, `author`, `publisher`
        - Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale`, `og:site_name`
        - Twitter Card tags: `twitter:title`, `twitter:description`, `twitter:image`, `twitter:site`, `twitter:creator`
        - Robots directive: `index, follow`
    - Example:
      ```html
      <meta name="description" content="A new and innovative social network for connecting people, sharing content, and building a global community!" />
      <meta property="og:title" content="Join Our Social Network Today!" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="robots" content="index, follow" />
      ```

- **Canonical URL:**  
  Defined to avoid duplicate content issues and improve SEO ranking.

- **Localization & Accessibility:**
    - `<html lang="he">` is set for proper language detection (Hebrew).
    - Supports screen readers and accessibility guidelines.

- **Favicon & Icons:**  
  Configured via:
  ```html
  <link rel="icon" href="%PUBLIC_URL%socialNetworkIcon.png" />
  <link rel="apple-touch-icon" href="%PUBLIC_URL%socialNetworkIcon.png" />

- SEO is carefully implemented to ensure the app is search-engine friendly, 
shareable across social media, and accessible worldwide.
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
 
social-network-client/
├──📂.github
│   └── 📂 workflows  
│        └── deploy-react.yml  # CI/CD pipeline using GitHub Actions (deploy-react.yml)       
├──📂 public/
│   ├── images/
│   ├── socialNetworkIcon.png
│   ├── skeleton-register-preview.png
│   ├── index.html  # SEO Optimization, Meta Tags, Canonical URL and more.
│   ├── static.json
│   ├── preview-image.png
│   └── robots.txt
└──📂src/
    ├──📂api/ # Axios API calls and token validation
    │   ├── FollowersAPI.jsx
    │   ├── FollowsNumberAPI.jsx
    │   ├── usernameAPI.jsx
    │   └── ValidateToken.js
    ├──📂assets/ # Static files, images, icons
    │   ├──📂form
    │   │    └── .png #utils png
    │   ├──📂gif
    │   │   └── .gif #utils gif
    │   ├──📂image
    │   │   └── .png #icons&logo png
    │   └──📂navbar
    │       └── .png #img_null and more png
    ├──📂components/ # Global components (NavBar, Footer, UI, Forms, Popups)
    │   ├──📂dashboard
    │   │   ├──Comment.jsx
    │   │   ├──FollowListComponent.jsx
    │   │   ├──LikeListComponent.jsx
    │   │   ├──NotificationPanel.jsx
    │   │   ├──OnlineFriens.jsx
    │   │   ├──PostDialog.jsx
    │   │   ├──PostUploader.jsx
    │   │   ├──SearchPanel.jsx
    │   │   ├──Stories.jsx
    │   │   └──SuggestedFriends.jsx
    │   ├──📂home
    │   │   ├──TermsAgreement.jsx
    │   │   └──WelcomeScreen.jsx
    │   ├──📂loaders
    │   │   ├──LoadingHome.jsx
    │   │   ├──LoadingOverlay.jsx
    │   │   ├──LoadingScreen.jsx
    │   │   ├──PostSkeleton.jsx
    │   │   ├──ProfileSkeleton.jsx
    │   │   └──SettingsSkeleton.jsx
    │   ├──📂navbar
    │   │   ├──Footer.jsx
    │   │   ├──HomeSpeedDial.jsx
    │   │   ├──ManagerAccount.jsx #Manager of all routs & auth
    │   │   ├──MobileNavBar.jsx
    │   │   ├──SideBarDesktop.jsx
    │   │   └──NavBar.jsx #Manager of all navbar
    │   ├──📂settings
    │   │   ├──ChangePassword.jsx
    │   │   ├──DeleteUser.jsx
    │   │   └──GeneralSettings.jsx
    │   ├──📂ui # Reusable UI Components Custom By Me (Buttons, Selects, Cards, etc.)
    │   │   ├──AlertDialog.jsx
    │   │   ├──Avatar.jsx
    │   │   ├──Badge.jsx
    │   │   ├──Button.jsx
    │   │   ├──Card.jsx
    │   │   ├──Dialog.jsx
    │   │   ├──Input.jsx
    │   │   ├──ScrollArea.jsx
    │   │   ├──Select.jsx
    │   │   ├──Tabs.jsx
    │   │   └──Textarea.jsx
    │   └──📂websiteRegulations
    │   │   ├──AccessibilityStatement.jsx
    │   │   └──TermsAndPrivacy.jsx
    ├──📂hooks/
    │   └──useIsMobile.tsx
    ├──📂pages/  # Application pages (Home, Dashboard, Profile, Settings)
    │   ├──📂dashboard
    │   │   ├──Dashboard.jsx
    │   │   ├──Message.jsx
    │   │   ├──Profile.jsx
    │   │   └──ProfileSearch.jsx
    │   ├──📂home
    │   │   ├──ConfirmResetPasswordPage.jsx
    │   │   ├──CreateAccount.jsx
    │   │   ├──Creator.jsx
    │   │   ├──ForgetPassword.jsx
    │   │   └──Login.jsx
    │   ├──📂settings
    │   │   └──Settings.jsx
    │   └── NotFoundPage.jsx
    ├──📂styles/
    │   ├──📂components
    │   │   ├──CommentStyle.css
    │   │   └──PostGridStyle.css
    │   ├──📂dashboard
    │   │   └──LikeStyle.css
    │   ├──📂home
    │   │
    │   ├──📂loaders
    │   │   ├──LoadingGeneral.css
    │   │   └──LoadingScreenStyle.css
    │   ├──📂settings
    │   │
    │   ├──📂websiteRegulations
    │   │   └──FooterStyle.css
    │   └──PopupStyle.css
    ├──📂utils  Utility functions and constants
    │   │   ├──cn.js
    │   │   ├──Constants.js
    │   │   ├──FormatDate.js
    │   │   └──FormatDateNotification.js
    ├──App.css
    ├──App.js # Main application entry point
    ├──App.test.js
    ├──index.css
    ├──index.js
    ├──reportWebVitals.js
    └──setupTests.js
├──.gitignote
├──package.json
├──package-lock.json
├──📜 postcss.config.js       # PostCSS configuration
├──📜 tailwind.config.js      # Custom Tailwind configuration
└──📜 README.md 



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

## 🎨 UI, Animations & Accessibility
- **Framer Motion** and `react-icons`, `lucide-react` are used for smooth animations.  
- **Page transitions** are handled with **React Router**.  
- **UI Styling via Tailwind CSS, Bootstrap, MUI, Custom Ui Components and more..**
- **Advanced Custom UI** – The project uses a mix of:
- **Radix UI Primitives**, styled via [**Shadcn/ui**](https://ui.shadcn.com/) ensuring accessibility and consistent behavior across browsers.
- **Custom Components:** Avatar, Dialog, AlertDialog, Tabs, Buttons, Inputs, ScrollArea, etc.
- **Responsive design (mobile + desktop)**
- 🔹 **Tailwind CSS Custom Configuration** – Tailwind is extended with:

- Custom colors & font sizes
- Custom breakpoints for mobile-first design
- Animation keyframes and utilities for smooth transitions
- Global utility classes for layout consistency

> Config file: `tailwind.config.js`

---

## 🛡️ Security Highlights
- JWT with expiration & refresh handling
- Email token for password reset
- Passwords hashed + salted
- 2FA via SMS (optional)
- CORS, Helmet, Rate limiting on backend

---

## 🧠 SEO & Optimization
- Meta tags for description, Open Graph, Twitter Cards
- Canonical URLs, favicon support, robots.txt
- Localization with `<html lang="he">`
- Lazy loading for images
- Smooth scroll and route transitions

---

## 🔄 CI/CD Pipeline - GitHub Actions
- GitHub Actions Workflow (`deploy-react.yml`)
- Auto deployment + test runs
- GitHub Pages compatible

---


## 🔮 Future Enhancements
📌 [ ] **Video Upload Support in Chat** 🎥  
📌 [ ] **Option to delete posts/comments and Like/replay comments** ✅  
📌 [ ] **Enhanced Notification Settings** ⚙️  
📌 [ ] **And more!** 📢

---

## 🤝 Contribute
**Pull Requests welcome!**
- 📧 Contact: yakovbenhemo5@gmail.com

> Built with ❤️ by a passionate full-stack dev – from backend logic to UI animations, everything is handcrafted for performance and beauty.

---

## 🔗 Explore
- 🖥️ [Backend GitHub Repo](https://github.com/yakov152005/social-network-server)
- 🌐 [Live Demo](https://social-network-client-k8fp.onrender.com/login)


🚀 **Enjoy the Social Network Experience!** 🌍




