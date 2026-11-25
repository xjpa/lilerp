"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { projectSchema, type ProjectFormState, type ProjectInput } from "./schema";
import { createProject } from "./service";

export async function createProjectAction(_previous: ProjectFormState, formData: FormData): Promise<ProjectFormState> {
  const values = Object.fromEntries(
    ["code", "name", "customerName", "description", "status", "siteName", "siteAddress"]
      .map((key) => [key, String(formData.get(key) ?? "")]),
  ) as ProjectInput;
  const parsed = projectSchema.safeParse(values);
  if (!parsed.success) return { message: "Check the highlighted fields.", errors: parsed.error.flatten().fieldErrors, values };
  let id: string;
  try {
    id = (await createProject(parsed.data)).id;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { message: "That project code is already in use.", errors: { code: ["Choose a unique project code."] }, values };
    }
    console.error("Project creation failed", error);
    return { message: "We couldn’t save the project. Check the database connection and try again.", values };
  }
  revalidatePath("/");
  redirect(`/projects/${id}?created=1`);
}
