import { expect, describe, test } from "@jest/globals";
import { ObjectToQueryString } from "./ObjectToQueryString";

describe("ObjectToQueryString", () => {
  test("returns an empty string when given an empty object", () => {
    expect(ObjectToQueryString({})).toEqual("");
  });

  test("returns an empty string when given a falsy value", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(ObjectToQueryString(undefined as any)).toEqual("");
  });

  test("builds a query string starting with ? for a single parameter", () => {
    expect(ObjectToQueryString({ page: 1 })).toEqual("?page=1");
  });

  test("joins multiple parameters with &", () => {
    expect(ObjectToQueryString({ page: 1, toolbar: "minimal" })).toEqual(
      "?page=1&toolbar=minimal",
    );
  });

  test("omits keys whose value is falsy", () => {
    expect(
      ObjectToQueryString({
        page: 1,
        empty: "",
        zero: 0,
        disabled: false,
        missing: null,
        notSet: undefined,
      }),
    ).toEqual("?page=1");
  });

  test("includes boolean true values", () => {
    expect(ObjectToQueryString({ enabled: true })).toEqual("?enabled=true");
  });
});
