import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/shell";
import { StatusBadge } from "@/components/status-badge";
import { findProject } from "@/features/projects/service";

export const dynamic = "force-dynamic";

export default async function ProjectDetail({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ created?: string }> }) {
  const { id } = await params;
  const project = await findProject(id);
  if (!project) notFound();
  const { created } = await searchParams;
  return <Shell><main className="page-content form-page"><Link href="/" className="back-link">← Back to projects</Link>{created === "1" && <div className="alert alert-success" role="status">Project created. This job now has a shared record in your company.</div>}
    <div className="page-heading"><div><p className="eyebrow">{project.code}</p><h1>{project.name}</h1><p>Project overview</p></div><StatusBadge status={project.status}/></div>
    <section className="detail-card"><h2>Project details</h2><dl className="detail-grid"><div><dt>Customer</dt><dd>{project.customerName}</dd></div><div><dt>Project code</dt><dd>{project.code}</dd></div><div><dt>Site name</dt><dd>{project.siteName}</dd></div><div><dt>Site address</dt><dd>{project.siteAddress}</dd></div><div><dt>Created</dt><dd>{new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "Asia/Manila" }).format(project.createdAt)}</dd></div><div><dt>Currency</dt><dd>PHP · Philippine peso</dd></div><div className="detail-wide"><dt>Description</dt><dd className="description">{project.description || "No description added."}</dd></div></dl></section>
    <aside className="learning-card"><span className="learning-icon" aria-hidden="true">↗</span><div><p className="eyebrow">WHAT CONNECTS NEXT</p><h3>Give every transaction a home.</h3><p>In later milestones, this project will link to budgets, material orders, stock usage, labor costs, and customer invoices.</p></div></aside>
  </main></Shell>;
}
