# React Native Assignment: Mobile Application

This is a mobile application built with **React Native**, **Firebase Authentication**, and **API integration**. It includes features like **email/password authentication**, **infinite scrolling**, **pull-to-refresh**, and **persistent login**.

---

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Firebase Configuration Steps](#firebase-configuration-steps)
3. [How to Run the App](#how-to-run-the-app)
4. [App Structure](#app-structure)
5. [Standout Features](#standout-features)

---

## Setup Instructions

### Prerequisites

- **Node.js** (v18.x or higher)
- **npm** or **yarn**
- **Expo CLI** (if using Expo)
- **Firebase account** (for authentication)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

   ```

2. Install dependencies:

```bash
 npm install
 # or
 yarn install
```

3. Set up Firebase(see Firebase Configuration Steps).

4. Run the app:

```bash
 npm start
 # or
 yarn start
```

---

## Firebase Configuration Steps

1. Create a Firebase Project:

- Go to the Firebase Console.
- Click Add Project and follow the steps to create a new project.

2. Enable Email/Password Authentication:

- In the Firebase Console, go to Authentication > Sign-in method.
- Enable Email/Password authentication.

3. Get Firebase Configuration:

- In the Firebase Console, go to Project Settings > General.
- Scroll down to Your apps and click Add app to register your app.
- Copy the Firebase configuration object (API key, auth domain, etc.).

4. Add Firebase Config to the App:

- Create a firebase.ts file in your project:

```typescript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

---

## How to Run the App

1. Start the Development Server:

```bash
  npm start
  # or
  yarn start
```

2. Run on Android:

- Install the Expo Go app on your Android device.
  = Scan the QR code displayed in the terminal or browser.

3. Run on iOS:

- Install the Expo Go app on your iOS device.
- Scan the QR code displayed in the terminal or browser.

4. Run in a Web Browser:

- Press 'w' in the terminal to open the app in a web browser

---

## App Structure

The app is structured as follows:  
src/  
├── assets/&emsp;&emsp;# Static assets (fonts, images)  
├── components/&emsp;# Reusable components  
├── config/&emsp;&emsp;# Configuration files (e.g., Firebase)  
├── context/&emsp;# Context providers (e.g., AuthContext)  
├── stacks/&emsp;&emsp;# Navigation setup (e.g., MainStackNavigator)  
├── screens/&emsp;# App screens (e.g., Login, Listing, Details)  
├── services/&emsp;# API and Firebase services  
├── types/&emsp;&emsp;# TypeScript types  
└── App.tsx&emsp;&emsp;# Main app component  

---

## Standout Features

1. Firebase Authentication:

   - Email/password-based login and registration.
   - Persistent login using AsyncStorage.

2. API Integration:

   - Fetch and display a paginated list of items from an API.
   - Infinite scrolling with lazy loading.

3. Pull-to-Refresh:

   - Reload the list by pulling down on the screen.

4. Smooth Navigation:

   - Seamless navigation between screens using `@react-navigation/native`.

5. Clean Code:

   - Modular and reusable components.
   - TypeScript for type safety.

## Contact

For questions or feedback, please contact:

- Kasim - kasimsactive1@gmail.com

```


```
