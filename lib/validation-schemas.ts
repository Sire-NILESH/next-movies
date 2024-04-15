import { z } from "zod";

const AuthBaseFields = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({ message: "Enter a valid email address" }),

  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, "Password must be atleast 6 characters long")
    .max(16, "Password can be atmost 16 characters long"),
});

// -------------------------------------------

export const SignInSchema = AuthBaseFields.extend({});

export type TSignInSchema = z.infer<typeof SignInSchema>;

// -------------------------------------------

export const SignUpSchema = AuthBaseFields.extend({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, "Name must be atleast 3 characters long")
    .max(16, "Password can be atmost 16 characters long"),

  confirmPassword: AuthBaseFields.shape.password,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type TSignUpSchema = z.infer<typeof SignUpSchema>;

// -------------------------------------------

// const MediaTypeEnum = z.nativeEnum(MediaType);

const MediaTypeEnum = z.enum(["movie", "tv"]);

export type MediaTypeEnum = z.infer<typeof MediaTypeEnum>;

// -------------------------------------------

export const MediaSchema = z.object({
  // db_id: z.string(),
  id: z.number(),
  title: z.string().optional(),
  backdrop_path: z.string().optional(),
  media_type: MediaTypeEnum.optional(),
  release_date: z.string().optional(),
  first_air_date: z.string().optional(),
  genre_ids: z.array(z.number()).optional(),
  name: z.string().optional(),
  origin_country: z.array(z.string()).optional(),
  original_language: z.string().optional(),
  original_name: z.string().optional(),
  original_title: z.string().optional(),
  overview: z.string().optional(),
  popularity: z.number().optional(),
  poster_path: z.string().optional(),
  vote_average: z.number().optional(),
  vote_count: z.number().optional(),
  type: MediaTypeEnum,
});

export type TMedia = z.infer<typeof MediaSchema>;

// -------------------------------------------

export const AddMediaToListActionSchema = z.object({
  media: MediaSchema,
});

export type TAddMediaToListAction = z.infer<typeof AddMediaToListActionSchema>;

// -------------------------------------------

export const DeleteMediaFromListActionSchema = z.object({
  mediaId: z.number(),
  mediaType: MediaTypeEnum,
});

export type TDeleteMediaFromListAction = z.infer<
  typeof DeleteMediaFromListActionSchema
>;

// -------------------------------------------

export const GetMediaDetailsActionSchema = z.object({
  mediaId: z.number(),
  mediaType: MediaTypeEnum,
});

export type TGetMediaDetailsActionSchema = z.infer<
  typeof GetMediaDetailsActionSchema
>;

// -------------------------------------------

export const GET_MediaDetailRouteSchema = z.object({
  id: z.string(),
  type: MediaTypeEnum,
});

export type TGET_MediaDetailRouteSchema = z.infer<
  typeof GET_MediaDetailRouteSchema
>;

// -------------------------------------------
