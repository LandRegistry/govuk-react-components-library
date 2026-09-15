import { expect, describe, test } from "@jest/globals";
import { titleCase, titleCaseNoSpace } from "./TitleCase";

describe("titleCase", () => {
  test("capitalises the first letter of each word", () => {
    expect(titleCase("hello world")).toEqual("Hello World");
  });

  test("lower-cases the rest of each word regardless of input casing", () => {
    expect(titleCase("HELLO WORLD")).toEqual("Hello World");
  });

  test("handles a single word", () => {
    expect(titleCase("test")).toEqual("Test");
  });
});

describe("titleCaseNoSpace", () => {
  test("removes spaces and capitalises each word", () => {
    expect(titleCaseNoSpace("hello world")).toEqual("HelloWorld");
  });

  test("strips special characters and treats them as separators", () => {
    expect(titleCaseNoSpace("hello&world,foo+bar")).toEqual("HelloWorldFooBar");
  });

  test("handles a range of special characters", () => {
    expect(
      titleCaseNoSpace(`a#b\\c,d+e(f)g$h~i%j.k'l"m:n*o?p<q>r{s}t-u`),
    ).toEqual("ABCDEFGHIJKLMNOPQRSTU");
  });

  test("returns an empty string for empty input", () => {
    expect(titleCaseNoSpace("")).toEqual("");
  });

  test("collapses consecutive separators without producing extra characters", () => {
    expect(titleCaseNoSpace("hello  world")).toEqual("HelloWorld");
  });
});
