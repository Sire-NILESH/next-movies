import { AuthCustomError } from "../types/typings";

export function customiseAuthError(error: unknown): AuthCustomError {
  let customError: AuthCustomError = {
    errorType: "Unknow Error",
    message: "Oops, something went wrong.",
  };

  if (!(error instanceof Error) && typeof error === typeof "") {
    if (error === "CredentialsSignin") {
      customError = {
        errorType: "Known Error", //because error sent from server action will be of type String.
        message: "Invalid credentials",
      };
    } else {
      customError = {
        errorType: "Known Error", //because error sent from server action will be of type String.
        message: error as string,
      };
    }
  }

  return customError;
}
