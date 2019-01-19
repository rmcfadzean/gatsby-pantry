import { pathify } from "../internals";

describe("pathify", () => {
  it("starts with a slash", () => {
    expect(pathify("abc")).toEqual("/abc/");
  });
  it("accepts a prefix", () => {
    expect(pathify("/foo", "abc")).toEqual("/foo/abc/");
  });
  it("accepts a prefix as slash", () => {
    expect(pathify("/", "abc")).toEqual("/abc/");
  });
  it("accepts many inputs", () => {
    expect(pathify("abc", "foobar")).toEqual("/abc/foobar/");
  });
});
