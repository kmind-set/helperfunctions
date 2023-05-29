import {
  ArrayToDictionary,
  groupElements,
  toUniqueArrayValues,
} from "./util.functions";

const pets = [
  { name: "dog", age: 1, owner: { name: "Phil" } },
  { name: "cat", age: 2, owner: { name: "Phil" } },
  { name: "dolphin", age: 2, owner: { name: "Ana" } },
  { name: "tiger", age: 1, owner: { name: "Phil" } },
  { name: "dog", age: 3, owner: { name: "Phil" } },
];

console.log(groupElements(pets, ["age"]));
console.log(groupElements(pets, ["owner.name"]));

console.log(toUniqueArrayValues(pets, "age"));
console.log(
  ArrayToDictionary(
    toUniqueArrayValues(pets, "age") as typeof pets,
    "age",
    "name"
  )
);
