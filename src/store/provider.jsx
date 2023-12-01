"use client";
import { useEffect } from 'react'
import { store } from "./store";
import { Provider } from "react-redux";
import { getAuth } from "firebase/auth";
import firebase_app from "@/firebase/config";
import { useDispatch } from 'react-redux';
import { Authuser } from './features/counterSlice';



	
  export const MyComponent = () => {
  const dispatch = useDispatch();
  const auth = getAuth(firebase_app);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(Authuser(user?.emailVerified))
        console.log('User is logged in');
        // Диспатч Redux Action тут
      } else {
        console.log('User is not logged in');
      }
    });

    return () => unsubscribe();
  }, [auth, dispatch])}
 
 
  export function Providers({ children }) {
		return <Provider store={store}><MyComponent/>{children}</Provider>
	}
  