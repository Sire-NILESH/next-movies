import { Prisma } from "@prisma/client";

type A<T extends string> = T extends `${infer U}ScalarFieldEnum` ? U : never;
type Entity = A<keyof typeof Prisma>;
type Keys<T extends Entity> = Extract<
  keyof (typeof Prisma)[keyof Pick<typeof Prisma, `${T}ScalarFieldEnum`>],
  string
>;

export function prismaExclude<T extends Entity, K extends Keys<T>>(
  type: T,
  omit: K[]
) {
  type Key = Exclude<Keys<T>, K>;
  type TMap = Record<Key, true>;
  const result: TMap = {} as TMap;
  for (const key in Prisma[`${type}ScalarFieldEnum`]) {
    if (!omit.includes(key as K)) {
      result[key as Key] = true;
    }
  }
  return result;
}

// // Exclude keys from user
// export function excludeFields<T, Key extends keyof T>(
//   obj: T,
//   keys: Key[]
// ): Omit<T, Key> {
//   return Object.fromEntries(
//     Object.entries(obj).filter(([key]) => !keys.includes(key))
//   ) as Omit<T, Key>;
// }

// function exclude<User, Key extends keyof User>(
//    user: User,
//    keys: Key[]
//  ): Omit<User, Key> {
//    const result: Partial<User> = {};
//    for (const [key, value] of Object.entries(user)) {
//      if (!keys.includes(key as Key)) {
//        result[key] = value;
//      }
//    }
//    return result as Omit<User, Key>;
//  }
