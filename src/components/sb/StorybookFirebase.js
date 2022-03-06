import { initializeApp } from "firebase/app";
import React from "react";

const firebaseConfig = {
  apiKey: process.env.STORYBOOK_PUBLIC_API_KEY,
  authDomain: process.env.STORYBOOK_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.STORYBOOK_PUBLIC_DATABASE_URL,
  projectId: process.env.STORYBOOK_PUBLIC_PROJECT_ID,
  storageBucket: process.env.STORYBOOK_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.STORYBOOK_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.STORYBOOK_PUBLIC_APP_ID,
  measurementId: process.env.STORYBOOK_PUBLIC_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
console.log(app);

export default function StorybookFirebase({ children }) {
  return <> {children}</>;
}
