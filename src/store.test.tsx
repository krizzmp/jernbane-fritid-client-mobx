import { Store } from "./store";

it("should be able to validate", function() {
  let todo = new Store();
  todo.member.name.value = "";
  expect(todo.member.name.error).toBeNull();
  let isInvalid = todo.validate();
  expect(isInvalid).toBe(true);
  expect(todo.member.name.error).toBe("this field is required");
});

it("should be able to add spouse", function() {
  let todo = new Store();
  todo.addSpouse();
  expect(todo.spouses.length).toBe(1);
});

export {};
