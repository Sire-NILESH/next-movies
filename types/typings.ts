import { User } from "firebase/auth";

/**
 * The shape of the AuthUser is extracted from `User` object present in the firebase `UserCredential` returned from the firebase `signInWithEmailAndPassword` method inside the `authorise` method of nextAUth's auth options file,
 */
export interface AuthUser {
  uid: User["uid"];
  email: User["email"];
  displayName: User["displayName"];
  photoURL: User["photoURL"];
}

export interface AuthCustomError {
  errorType: string;
  message: string;
  description: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Media {
  title: string;
  backdrop_path: string;
  media_type?: string | string[];
  release_date?: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  type: string | string[] | undefined;
}

export interface MediaTrailerElement {
  type:
    | "Bloopers"
    | "Featurette"
    | "Behind the Scenes"
    | "Clip"
    | "Trailer"
    | "Teaser";
}
