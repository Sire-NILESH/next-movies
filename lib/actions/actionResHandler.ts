import { ActionResponse } from "@/types/typings";
import AppError from "../app-error";

/**
 * A function that that returns `@type ActionResponse` type object suitable to be used as `Server Action Error`  response.
 *
 * Note: This function does not send `@type ActionResponse` for your `Server Action Error`. That needs to be handled by you.
 *
 *
 * @param error Expecting `Error` or `AppError` object
 * @param nonOperErrMessage  Error message for non operational error.
 * @returns
 */
const handleActionErrResponse = (
  error: unknown,
  defaultErrMessage?: string
) => {
  if (error instanceof AppError && error.isOpertaional) {
    // known operational error, safe to send error message
    return {
      error: error.message,
      data: undefined,
    } satisfies ActionResponse;
  } else if (error instanceof Error) {
    // unknown non-operational error. log it
    console.error(error);
    return {
      error: defaultErrMessage ?? "Something went wrong",
      data: undefined,
    } satisfies ActionResponse;
  } else {
    // just a safety net
    return {
      error: defaultErrMessage ?? "Something went wrong",
      data: undefined,
    } satisfies ActionResponse;
  }
};

/**
 * A function that that returns `@type ActionResponse` type object suitable to be used as `Server Action` response.
 *
 *
 * Note: This function does not send `@type ActionResponse` for your `Server Action`. That needs to be handled by you.
 *
 * @param data The response data.
 * @returns
 */
const handleActionResponse = function <T>(data: T) {
  return {
    data: data,
    error: undefined,
  } satisfies ActionResponse;
};

export { handleActionErrResponse, handleActionResponse };
