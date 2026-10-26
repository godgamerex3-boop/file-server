import { expect, test } from "bun:test"
import { normalizePath } from "lib/utils/normalize-path"

test("normalizePath collapses multiple consecutive slashes globally", () => {
  expect(normalizePath("a///b///c.txt")).toBe("a/b/c.txt")
  expect(normalizePath("a//b//c//d")).toBe("a/b/c/d")
  expect(normalizePath("foo////bar//baz///qux")).toBe("foo/bar/baz/qux")
})

test("normalizePath is idempotent", () => {
  const p1 = "a///b///c.txt"
  const normalized1 = normalizePath(p1)
  expect(normalizePath(normalized1)).toBe(normalized1)

  const p2 = "/root//sub///file.json/"
  const normalized2 = normalizePath(p2)
  expect(normalizePath(normalized2)).toBe(normalized2)
})

test("normalizePath handles edge cases, root, and Windows backslashes", () => {
  expect(normalizePath("")).toBe("")
  expect(normalizePath("/")).toBe("")
  expect(normalizePath("///")).toBe("")
  expect(normalizePath("a\\b\\\\c")).toBe("a/b/c")
  expect(normalizePath("/foo/bar/")).toBe("foo/bar")
})
