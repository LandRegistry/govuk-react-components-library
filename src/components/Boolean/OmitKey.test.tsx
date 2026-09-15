import { expect, describe, test } from "@jest/globals";
import omit from "./OmitKey";

describe("omit", () => {
  test("returns an empty object when the input object is undefined", () => {
    expect(omit(undefined, "anyKey")).toEqual({});
  });

  test("removes the given key and keeps the remaining keys", () => {
    const result = omit({ a: 1, b: 2, c: 3 }, "b");
    expect(result).toEqual({ a: 1, c: 3 });
  });

  test("returns an equivalent object when the key does not exist", () => {
    const result = omit({ a: 1, b: 2 }, "notThere");
    expect(result).toEqual({ a: 1, b: 2 });
  });

  test("returns an empty object when given an empty object", () => {
    expect(omit({}, "anyKey")).toEqual({});
  });
});
