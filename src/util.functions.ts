import { Nest } from "./util.types";

export function getValuefromProperty<T extends Record<any, any>>(
  object: T,
  field: keyof T | string
) {
  const fields = (field as string).split(".");
  if (fields.length > 1) {
    return fields.reduce((prev, field) => {
      return prev[field];
    }, object);
  }
  return object[field as keyof T];
}

export function groupElements<T extends object, K extends keyof T = keyof T>(
  arr: T[],
  fields: (Nest<T> | FunctionOverProperty<Nest<T>>)[]
) {
  type a = (typeof fields)[number];

  const groupIndexes: {
    [key in string | K | keyof T]: any;
  }[] = [];

  const groupedElements: T[][] = [];

  let pointer: number;

  arr.map((obj) => {
    const index = groupIndexes.findIndex((groupIndex) =>
      fields.every(
        (property) =>
          groupIndex[property instanceof Object ? property.field : property] ===
          (property instanceof Object
            ? property.fn(getValuefromProperty(obj, property.field))
            : getValuefromProperty(obj, property))
      )
    );

    if (index === -1) {
      let IndexObject: Record<string | K | keyof T, any> = {} as Record<
        string | K | keyof T,
        any
      >;

      fields.forEach((property) => {
        let fieldValueCriteria =
          property instanceof Object
            ? property.fn(getValuefromProperty(obj, property.field), obj)
            : getValuefromProperty(obj, property);

        IndexObject[property instanceof Object ? property.field : property] =
          fieldValueCriteria;
      });

      groupIndexes.push(IndexObject);

      pointer = groupIndexes.length - 1;
    } else {
      pointer = index;
    }

    if (!Array.isArray(groupedElements[pointer])) {
      groupedElements[pointer] = [];
    }
    groupedElements[pointer].push(obj);
  });
  return groupedElements;
}

export function ArrayToDictionary<Type, Key extends keyof Type>(
  arr: Type[],
  key: Key,
  value: Key
) {
  return arr.reduce((prev, current: Type) => {
    if (current == null) return prev;
    return { ...prev, ...{ [current[key] as string]: current[value] } };
  }, {} as { [key in Type[Key] as string]: Type[Key] });
}

export function toUniqueArrayValues<
  T extends Record<K, PropertyKey>,
  K extends keyof T
>(list: T[], uniqueField: K) {
  let objectIndex: Record<T[K], any> = {} as Record<T[K], any>;

  list.forEach((obj) => {
    objectIndex[obj[uniqueField]] == null
      ? (objectIndex[obj[uniqueField]] = obj)
      : null;
  });

  return Object.values(objectIndex);
}

export type FunctionOverProperty<T> = {
  fn: Function;
  field: T;
};
