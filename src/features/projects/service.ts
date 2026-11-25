import { getDb } from "../../lib/db";
import { projectSchema } from "./schema";

export function listProjects() {
  return getDb().project.findMany({ orderBy: [{ createdAt: "desc" }, { id: "desc" }] });
}
export function findProject(id: string) {
  return getDb().project.findUnique({ where: { id } });
}
export function createProject(input: unknown) {
  const data = projectSchema.parse(input);
  return getDb().project.create({ data });
}
