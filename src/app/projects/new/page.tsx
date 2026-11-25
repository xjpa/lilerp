import Link from "next/link";
import { Shell } from "@/components/shell";
import { ProjectForm } from "@/features/projects/project-form";

export default function NewProject() {
  return <Shell><main className="page-content form-page"><Link href="/" className="back-link">← Back to projects</Link><div className="page-heading"><div><p className="eyebrow">BUILD YOUR COMPANY’S RECORDS</p><h1>New project</h1><p>Start with the job, the customer, and where the work happens.</p></div></div><ProjectForm/><p className="form-footnote">Customer and site details are simple fields for now. Shared records arrive in milestone 2.</p></main></Shell>;
}
