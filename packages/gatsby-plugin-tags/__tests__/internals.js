"use strict";

var _internals = require("../internals");

describe("pathify", () => {
  it("starts with a slash", () => {
    expect((0, _internals.pathify)("abc")).toEqual("/abc/");
  });
  it("accepts a prefix", () => {
    expect((0, _internals.pathify)("/foo", "abc")).toEqual("/foo/abc/");
  });
  it("accepts a prefix as slash", () => {
    expect((0, _internals.pathify)("/", "abc")).toEqual("/abc/");
  });
  it("accepts many inputs", () => {
    expect((0, _internals.pathify)("abc", "foobar")).toEqual("/abc/foobar/");
  });
});