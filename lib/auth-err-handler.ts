import { AuthCustomError } from "../types/typings";

export function customiseAuthError(
  error: any,
  email?: string
): AuthCustomError {
  let customError: AuthCustomError = {
    errorType: "Unknow Error",
    message: "Oops, something went wrong.",
    description:
      "We're sorry, but it looks like there was an error. Please try again later or contact support if the issue persists.",
  };

  switch (error) {
    // signup related error
    case "auth/email-already-in-use":
      customError = {
        errorType: "Firebase auth Error",
        message: "This email is already in use.",
        description: `We're sorry, but it looks like this email${
          email ? ` '${email}'` : ""
        }' is already associated with an account. Please try logging in or use a different email address to create a new account.`,
      } as AuthCustomError;

      break;

    // signin related error. From next-auth with firebase
    case "CredentialsSignin":
      customError = {
        errorType: "Credentials Signin Error",
        message: "Invalid credentials",
        description:
          "We're sorry, but it looks like the credentials you entered is incorrect. Please double-check your credentials and try again.",
      } as AuthCustomError;

      break;
  }

  return customError;
}
