import { test, expect } from "bun:test"
import { normalizePath } from "../lib/utils/normalize-path"

test("normalizePath collapses multiple repeated slash groups and is idempotent", () => {
  expect(normalizePath("a///b///c.txt")).toBe("a/b/c.txt")
  expect(normalizePath("a//b//c//d")).toBe("a/b/c/d")
  expect(normalizePath("///a//b///c///")).toBe("a/b/c")
  expect(normalizePath("foo/bar/baz.json")).toBe("foo/bar/baz.json")
  expect(normalizePath("///")).toBe("")
  expect(normalizePath("/")).toBe("")
  expect(normalizePath("")).toBe("")

  // Test idempotency
  const paths = [
    "a///b///c.txt",
    "a//b//c//d",
    "///foo///bar///baz///qux///",
    "nested//folder///file.ts"
  ]

  for (const p of paths) {
    const once = normalizePath(p)
    const twice = normalizePath(once)
    expect(twice).toBe(once)
  }
})
