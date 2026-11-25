import { randomUUID } from "node:crypto";
import { afterAll, describe, expect, it } from "vitest";
import { getDb } from "../src/lib/db";
import { createProject, findProject, listProjects } from "../src/features/projects/service";

const enabled = process.env.RUN_DB_TESTS === "1";
const codes = [`TEST-${randomUUID().slice(0, 12)}`, `TEST-${randomUUID().slice(0, 12)}`].map(code => code.toUpperCase());
const data = { name: "Integration test job", customerName: "Test customer", siteName: "Test site", siteAddress: "Test address", status: "PLANNED", description: "Temporary test record" };

describe.skipIf(!enabled)("project persistence in PostgreSQL", () => {
  afterAll(async () => {
    await getDb().project.deleteMany({ where: { code: { in: codes } } });
    await getDb().$disconnect();
  });

  it("persists and reloads a project through its internal ID", async () => {
    const created = await createProject({ ...data, code: codes[0] });
    expect(await findProject(created.id)).toMatchObject({ id: created.id, code: codes[0], siteName: data.siteName });
    expect((await listProjects()).some(project => project.id === created.id)).toBe(true);
    expect(await findProject("not-an-existing-project")).toBeNull();
  });

  it("allows only one of two concurrent submissions of the same code", async () => {
    const results = await Promise.allSettled([
      createProject({ ...data, code: codes[1].toLowerCase() }),
      createProject({ ...data, code: codes[1] }),
    ]);
    expect(results.filter(result => result.status === "fulfilled")).toHaveLength(1);
    const failure = results.find(result => result.status === "rejected");
    expect(failure?.status === "rejected" && failure.reason.code).toBe("P2002");
    expect(await getDb().project.count({ where: { code: codes[1] } })).toBe(1);
  });
});
