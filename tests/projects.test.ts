import { describe, expect, it } from "vitest";
import { projectSchema } from "../src/features/projects/schema";
import { createProject } from "../src/features/projects/service";

const input = {
  code: " prj-003 ", name: " Mabini residence ", customerName: "Mabini family",
  siteName: "Mabini site", siteAddress: "Quezon City", status: "PLANNED", description: "",
};

describe("project input boundary", () => {
  it("normalizes human codes before uniqueness checks", () => {
    expect(projectSchema.parse(input)).toMatchObject({ code: "PRJ-003", name: "Mabini residence" });
  });
  it.each(["PRJ 003", "PRJ--003", "-PRJ", "PRJ-", "A"])("rejects ambiguous code %s", code => {
    expect(projectSchema.safeParse({ ...input, code }).success).toBe(false);
  });
  it("rejects whitespace-only required fields before reaching the database", () => {
    expect(() => createProject({ ...input, siteAddress: "  " })).toThrow();
  });
  it("rejects invented statuses and oversized descriptions", () => {
    expect(projectSchema.safeParse({ ...input, status: "PAID" }).success).toBe(false);
    expect(projectSchema.safeParse({ ...input, description: "x".repeat(4001) }).success).toBe(false);
  });
});
