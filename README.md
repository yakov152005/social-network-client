# 🌐 Social Network - Client Side
🔹 **Production Version**  
[Click here to access the live production version](https://social-network-client-k8fp.onrender.com/login)

🔹 **Server Side**  
[Click here to go server side](https://github.com/yakov152005/social-network-server)

## 🎯 Overview
🔹Social Network is a modern social networking platform built with React, focusing on **performance, security, and an interactive user experience**. The application supports **user registration with validation, password reset via unique email token, real-time chat, and notifications via SSE**.


## 🎥 Live Demo

🔹 **Login & Signup**

| **PC Login & Signup** | **Mobile Login & Signup** |
|----------------------|----------------------|
| ![PC Login](https://i.imgur.com/izwFZsx.png) | ![Mobile Login](https://i.imgur.com/TFqUIWU.png)|


🔹 **Dashboard & Chat**

| **PC Dashboard** | **Mobile Dashboard** |
|------------------|------------------|


---

## 🚀 Features
✅ **Dashboard** – View the stories of people you follow, their posts, comments and likes, comment and like, see online friends, suggest friends.

✅ **Profile** - Change profile picture, view posts you've uploaded, likes and comments, list of followers and followers, bio, full name, username.

✅ **Settings** - You can change personal details such as gender, relationship status, bio, full-name, change password & two-factor sms, delete user.

✅ **Dynamic NavBar** - Changes for each screen - home, notifications, messages, search, profile, settings, profile picture. When you hover over it,
a popup opens with a list of followers and followed people and an option to disconnect, navigate to profile, navigate to settings.

✅ **Profile Search** -  profile you were looking for - option to follow him/her and/or send him/her a message, see followers and followers,
see posts and number of likes and comments, bio, profile picture, full name, and navigate from him/her to other people.

✅ **Message** - Real-time messages, a modern message box that includes the option to send emojis, see a list of friends and chat history, access the profile through messages, see when messages were sent, 
and in the list you can see what the last message was sent and when, and search for users in the message box.

✅ **Notification** - Real-time notifications about likes, comments and followers

✅ **Search** - Quick search for users, access profiles through search, see users I recently searched for, and an option to clear history.

✅ **PopUp Profile** - A quick menu when hovering over it shows the number of followers and followers, profile picture, username, full name, bio,
and an option to enter the profile, settings, or log out.

✅ **Authentication & Authorization** – Registration, login, validation, and password reset via email token.  
✅ **Hard Authentication** - Every transition between pages is secured by authentication, verified and managed by the course administrator.

✅ **State Management & Hooks** – Utilizing `useState`, `useEffect`, `useCallback`, `useRef`, `useContext`,`useDropZon`,`custom hooks`.  
✅ **API Communication** – Managed via `Axios` and `Fetch`.  
✅ **Real-Time Updates** – Notifications/Messaging/Online friends/Stories/Comments using **SSE (Server-Sent Events)**.  
✅ **Advanced UI** – Styled with **Tailwind (custom config), MUI, Bootstrap, SweetAlert, Custom Components UI Style shadcn**.  
✅ **Image Upload** – Implemented with **Dropzone** & Custom upload.  
✅ **Popups & Notifications** – Handled using SweetAlert & Custom toast.  
✅ **Custom CSS per page** – Unique styling for each screen.  
✅ **Lazy Loading for Images** – Optimized performance with image lazy loading.  
✅ **Scrolling Support** – Smooth scrolling experience.  
✅ **Emoji Support** – Users can send emojis in messages.  
✅ **User Navigation** – Navigate to user profiles from comments, likes, followers, search, notification, message.  
✅ **User Search by Name** – Find users quickly With a Search Query.  
✅ **Social Interactions** – Like, comment, follow, share stories, posts, notification and send messages.  
✅ **Easy Password Reset & Account Deletion** – Users can change their password and two factor password Or delete their account directly from settings.  
✅ **Activity Notifications** – Users receive real-time updates on likes, follows, and comments on their posts.



---

## 🏗 Tech Stack
🛠 **Frontend:** React, JavaScript, typeScript
🎨 **Styling:** Tailwind CSS (with custom config) & motion,Custom Components UI Style shadcn, Material UI, Bootstrap, 
🔁 **State Management:** Hooks (`useState`, `useEffect`, `useCallback`, `useRef`, `useContext`,`useDropZon`,`custom hooks`)  
🌍 **Networking:** `Axios` and `Fetch`.
🔑 **Authentication:** JWT token, Email Token Reset, hash&salt
📡 **Real-Time Updates:** SSE  
🚀 **CI/CD:** GitHub Actions (Deploy to GitHub Pages)
🔁 **Radix UI + Shadcn/ui**

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
│   ├── socialNetworkLogo.png
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
    │   │   ├──LoadingOverlay.jsx
    │   │   ├──LoadingScreen.jsx
    │   │   ├──PostSkeleton.jsx
    │   │   └──ProfileSkeleton.jsx
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

## 🎨 UI & Animations & Components
🎭 **Framer Motion** and `react-icons`, `lucide-react` are used for smooth animations.  
🔄 **Page transitions** are handled with **React Router**.  
🌙 **UI Styling via Tailwind CSS, Bootstrap, MUI, Custom Ui Components and more..**

🔹 **Advanced Custom UI** – The project uses a mix of:

🔹 **Radix UI Primitives**, styled via [**Shadcn/ui**](https://ui.shadcn.com/) ensuring accessibility and consistent behavior across browsers.

🔹 **Custom-built UI Components** – Some components like buttons, dialogs, popups, inputs, and settings forms were **handcrafted** for full control and a clean design.

🔹 **Responsive design (mobile + desktop)**

🔹 **Tailwind CSS Custom Configuration** – Tailwind is extended with:

- Custom colors & font sizes
- Custom breakpoints for mobile-first design
- Animation keyframes and utilities for smooth transitions
- Global utility classes for layout consistency

> Config file: `tailwind.config.js`

---

## 🧩 Customizations & Additional Highlights

- 📄 **Reusable UI Component Library** – Built with a mix of Radix primitives and custom logic.
- 🖼️ **Post Upload Dialog** – With image preview, zoom/pan, and emoji picker.
- 🔄 **Responsive Tabs & Sidebar** – Scrollable tabs with motion transitions.
- 🎯 **Accessibility** – All components support keyboard navigation and screen readers.
- 🎨 **Page-level styling** – Every screen has unique, tailored CSS.

---

## ⚙️ Settings System

The **Settings page** provides a fully interactive user management system:
- ✏️ **Update profile details** – Change bio, gender, relationship status
- 🔐 **Change password** – Secure password update via validation
- ❌ **Delete account** – Complete account removal with confirmation prompt
- 🔗 **Manage social media links** – Add/update links to Facebook, Github, LinkedIn, Twitter
- 🔕 **Notifications & Privacy (coming soon)** – Toggle real-time alerts and privacy preferences

All actions include validation, confirmation dialogs (via SweetAlert), and smooth transitions.

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
📌 [ ] **And more!** 📢
---

## 📩 Contact & Contribute
💡 Contributions are welcome via **Pull Requests**. Feel free to reach out via email: 📧 yakovbenhemo5@gmail.com

🚀 **Enjoy the Social Network Experience!** 🌍



