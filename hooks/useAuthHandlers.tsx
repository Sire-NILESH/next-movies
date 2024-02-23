"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { signIn, signOut } from "next-auth/react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { customiseAuthError } from "@/lib/auth-err-handler";
import { FirebaseError } from "firebase/app";

export interface CustomError {
  errorType: "Firebase auth createUserWithEmailAndPassword Error" | string;
  message: string;
  description: string;
}

interface Auth {
  signinHandler: (email: string, password: string) => Promise<void>;
  signupHandler: (email: string, password: string) => Promise<void>;
  signoutHandler: () => Promise<void>;
  resetAuthHandlerStates: () => void;
  error: null | CustomError;
  clearError: () => void;
  actionSuccess: boolean;
  clearActionSuccess: () => void;
  loading: boolean;
}

const AuthContext = createContext<Auth>({
  signinHandler: async () => {},
  signupHandler: async () => {},
  signoutHandler: async () => {},
  resetAuthHandlerStates: async () => {},
  error: null,
  clearError: () => {},
  clearActionSuccess: () => {},
  actionSuccess: false,
  loading: false,
});

export const AuthHandlerProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [actionSuccess, setActionSuccess] = useState<boolean>(false);
  const [error, setError] = useState<null | any>(null);
  const router = useRouter();

  const signinHandler = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      setActionSuccess(false);

      if (email && password) {
        const signInResponse = await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl: "/",
        });

        if (signInResponse && signInResponse.ok) {
          setActionSuccess(true);
          router.push(signInResponse.url ? signInResponse.url : "/");
        } else if (signInResponse && signInResponse.error) {
          setActionSuccess(false);
          setError(customiseAuthError(signInResponse.error));
        }
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const signupHandler = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      setActionSuccess(false);

      if (email) {
        await createUserWithEmailAndPassword(auth, email, password);
        setActionSuccess(true);
        // router.push("/signin");
      }
    } catch (error) {
      setActionSuccess(false);
      const err = error as FirebaseError;
      setError(customiseAuthError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const signoutHandler = async () => {
    try {
      setLoading(true);
      setError(null);
      setActionSuccess(false);

      await signOut();
      setActionSuccess(true);
    } catch (error) {
      setActionSuccess(false);
      setError(customiseAuthError(error));
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const clearActionSuccess = () => {
    setActionSuccess(false);
  };

  const resetAuthHandlerStates = () => {
    setError(null);
    setActionSuccess(false);
    setLoading(false);
  };

  const memoedValue = useMemo<Auth>(
    () => ({
      signinHandler,
      signupHandler,
      signoutHandler,
      clearError,
      clearActionSuccess,
      resetAuthHandlerStates,
      error,
      actionSuccess,
      loading,
    }),
    // eslint-disable-next-line
    [error, actionSuccess, loading]
  );

  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};

const useAuthHandlers = () => {
  return useContext(AuthContext);
};

export default useAuthHandlers;
