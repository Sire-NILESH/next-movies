"use client";

import { signUpAction } from "@/lib/actions/authActions";
import { customiseAuthError } from "@/lib/client-auth-err-handler";
import { TSignUpSchema } from "@/lib/validation-schemas";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface CustomError {
  errorType: string;
  message: string;
}

interface Auth {
  signinHandler: (email: string, password: string) => Promise<void>;
  signupHandler: ({
    email,
    password,
    confirmPassword,
    name,
  }: TSignUpSchema) => Promise<void>;
  signoutHandler: () => Promise<void>;
  resetAuthHandlerStates: () => void;
  error: null | CustomError;
  clearError: () => void;
  actionSuccess: boolean;
  clearActionSuccess: () => void;
  loading: boolean;
}

const extractCallbackUrl = (baseUrl: string | null) => {
  if (!baseUrl) return null;

  const url = new URL(baseUrl);
  const params = new URLSearchParams(url.search);
  const callbackUrl = params.get("callbackUrl");

  return callbackUrl;
};

const extractPathname = (baseUrl: string | null) => {
  if (!baseUrl) return null;

  const callbackUrlObject = new URL(baseUrl);
  const pathname = callbackUrlObject.pathname;

  return pathname;
};

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

  const signinHandler = useCallback(
    async (email: string, password: string) => {
      try {
        setLoading(true);
        setError(null);
        setActionSuccess(false);

        if (email && password) {
          const signInResponse = await signIn("credentials", {
            email,
            password,
            redirect: false,
            // callbackUrl: "/",
          });

          if (signInResponse?.ok) {
            setActionSuccess(true);
            // router.push("/"); // routing to "/" on signInResponse?.ok doesn't work on production for some reason.

            const callbackUrl = extractCallbackUrl(signInResponse.url);
            const callbackPathName = extractPathname(callbackUrl);

            router.push(
              callbackPathName && callbackPathName !== "/"
                ? callbackPathName
                : "/home"
            );
          } else if (signInResponse?.error) {
            setActionSuccess(false);
            setError(customiseAuthError(signInResponse.error));
          }
        }
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const signupHandler = useCallback(
    async ({ email, password, confirmPassword, name }: TSignUpSchema) => {
      try {
        setLoading(true);
        setError(null);
        setActionSuccess(false);

        if (email) {
          const signupResponse = await signUpAction({
            email,
            password,
            name,
            confirmPassword,
          });

          if (signupResponse.error) {
            setActionSuccess(false);
            setError(customiseAuthError(signupResponse.error));
            return;
          }

          setActionSuccess(true);

          // router.push("/signin");
        }
      } catch (error) {
        console.error(error);
        setActionSuccess(false);
        setError(customiseAuthError(error));
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const signoutHandler = useCallback(async () => {
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
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearActionSuccess = useCallback(() => {
    setActionSuccess(false);
  }, []);

  const resetAuthHandlerStates = useCallback(() => {
    setError(null);
    setActionSuccess(false);
    setLoading(false);
  }, []);

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
