import { MediaTypeEnum, TMedia } from "@/lib/validationSchemas";

export interface AuthUser {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
}

export interface AuthCustomError {
  errorType: string;
  message: string;
}

export interface Genre {
  id: number;
  name: string;
}

export type ActionResponse =
  | { data: unknown }
  | {
      /**
       * For now as of NextJS 14.1.0, error response from `server actions` cannot be an instance of some class like `Error` class, hence only try to pass string values here.
       *
       * It may work that way in development, but will give error in production build.
       */
      error: unknown;
    };

export type MediaType = MediaTypeEnum;

export type Media = TMedia;

export interface MediaTrailerElement {
  type:
    | "Bloopers"
    | "Featurette"
    | "Behind the Scenes"
    | "Clip"
    | "Trailer"
    | "Teaser";
}

export interface MediaDetails {
  mediaId: number;
  mediaType: "movie" | "tv";
  trailer: string | null;
  genres: Genre[] | null;
}
