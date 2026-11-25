import "dotenv/config";
import { getDb } from "../src/lib/db";
import { projectSchema } from "../src/features/projects/schema";

const projects = [
  {
    code: "PRJ-001", name: "Santos family residence", customerName: "Santos family",
    description: "Construction of a two-storey residence. This fictional job will be used for the purchasing and cement-delivery exercises.",
    status: "ACTIVE", siteName: "Santos job site", siteAddress: "Marikina City, Metro Manila",
  },
  {
    code: "PRJ-002", name: "Riverside office fit-out", customerName: "Riverside Trading",
    description: "Interior fit-out of a small commercial office, including partitions, finishes, and electrical work.",
    status: "PLANNED", siteName: "Riverside office", siteAddress: "Pasig City, Metro Manila",
  },
];

async function main() {
  for (const input of projects) {
    const data = projectSchema.parse(input);
    await getDb().project.upsert({ where: { code: data.code }, create: data, update: {} });
  }
  console.log("Demo projects are ready. Existing projects were preserved.");
}

main().catch(error => {
  console.error("Could not seed the database:", error);
  process.exitCode = 1;
}).finally(async () => { await getDb().$disconnect(); });
