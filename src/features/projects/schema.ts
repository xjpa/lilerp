import { z } from "zod";

export const statusLabels = { PLANNED: "Planned", ACTIVE: "Active", ON_HOLD: "On hold", COMPLETED: "Completed" } as const;

export const projectSchema = z.object({
  code: z.string().trim().toUpperCase().min(2, "Use at least 2 characters.").max(24)
    .regex(/^[A-Z0-9]+(?:-[A-Z0-9]+)*$/, "Use letters, numbers, and single hyphens between words."),
  name: z.string().trim().min(1, "Enter a project name.").max(120),
  customerName: z.string().trim().min(1, "Enter a customer name.").max(120),
  description: z.string().trim().max(4000).default(""),
  status: z.enum(["PLANNED", "ACTIVE", "ON_HOLD", "COMPLETED"]),
  siteName: z.string().trim().min(1, "Enter a site name.").max(120),
  siteAddress: z.string().trim().min(1, "Enter a site address.").max(240),
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type ProjectFormState = {
  message?: string;
  errors?: Partial<Record<keyof ProjectInput, string[]>>;
  values?: Partial<ProjectInput>;
};
