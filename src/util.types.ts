export type Success<T extends object> = { type: "success" } & T;

export function Success<T extends object>(t: T): Success<T> {
  return { ...t, type: "success" };
}

export function isSuccess<T extends object>(
  response: object
): response is Success<T> {
  return "type" in response && response.type === "success";
}

type Dog = {
  age: number;
  weight: number;
  breed: {
    name: string;
    sub_breed: { name: string; sub_breed: string };
    origin: { country: string };
  };
};

type SimpleT = string | boolean | number;

export type Nest<
  T extends Record<keyof T, SimpleT | Record<keyof T[K], any>>,
  K extends keyof T = keyof T
> = K extends SimpleT
  ? T[K] extends SimpleT
    ? `${keyof T & string}`
    : K extends Record<keyof K, any>
    ? `${K & SimpleT}.${Nest<T[K], keyof T[K]>}` | `${keyof T & string}`
    : never
  : never;

const result: Nest<Dog> = "age"; //"breed.name"//"age"; //"breed"; //"breed.sub_breed"; //"breed.origin"; //"breed.origin.country
