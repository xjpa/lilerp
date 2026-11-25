import Link from "next/link";
import { Shell } from "@/components/shell";
import { StatusBadge } from "@/components/status-badge";
import { listProjects } from "@/features/projects/service";

export const dynamic = "force-dynamic";

export default async function Home() {
  const projects = await listProjects();
  const counts = { all: projects.length, active: projects.filter(p => p.status === "ACTIVE").length, planned: projects.filter(p => p.status === "PLANNED").length, completed: projects.filter(p => p.status === "COMPLETED").length };
  return <Shell><main className="page-content">
    <div className="page-heading"><div><p className="eyebrow">YOUR OPERATIONS, CONNECTED</p><h1>Projects</h1><p>Every job starts here. Keep your projects and their details in one place.</p></div><Link href="/projects/new" className="button button-primary"><span aria-hidden="true">＋</span> New project</Link></div>
    <div className="stats-grid">{[["Total projects", counts.all, "All company jobs"], ["Active", counts.active, "Work in progress"], ["Planned", counts.planned, "Preparing to start"], ["Completed", counts.completed, "Finished projects"]].map(([label, count, help], i) => <div className="stat-card" key={label}><div><span className={`stat-dot dot-${i}`} />{label}</div><strong>{String(count).padStart(2, "0")}</strong><p>{help}</p></div>)}</div>
    <section className="project-panel"><div className="panel-heading"><div><h2>Project register <span className="number-chip">{counts.all}</span></h2><p>A shared record for every construction job.</p></div><span className="subtle">Newest first</span></div>
      {projects.length === 0 ? <div className="empty-state"><span className="empty-icon" aria-hidden="true">▦</span><h3>Your first project starts here</h3><p>Create a job to give future purchases, materials, and costs a home.</p><Link href="/projects/new" className="button button-primary">Create your first project</Link></div> : <div className="table-scroll"><table><caption className="sr-only">Construction projects, newest first</caption><thead><tr><th>PROJECT</th><th>CUSTOMER</th><th>SITE</th><th>STATUS</th><th><span className="sr-only">Details</span></th></tr></thead><tbody>{projects.map(project => <tr key={project.id}><td><Link href={`/projects/${project.id}`} className="project-title">{project.name}</Link><span className="project-code">{project.code}</span></td><td>{project.customerName}</td><td><span className="site-cell">{project.siteName}</span><span className="site-address">{project.siteAddress}</span></td><td><StatusBadge status={project.status}/></td><td><Link className="row-link" href={`/projects/${project.id}`} aria-label={`View ${project.name}`}>↗</Link></td></tr>)}</tbody></table></div>}
      <div className="panel-footer">{counts.all} {counts.all === 1 ? "project" : "projects"}<span>Company-wide register</span></div>
    </section>
    <aside className="learning-card"><span className="learning-icon" aria-hidden="true">✳</span><div><p className="eyebrow">THE ERP CONNECTION</p><h3>A project is more than a name.</h3><p>It’s the common thread between a material request, a supplier’s bill, and the cost of a job. We’ll connect those records in the next milestones.</p></div><span className="learning-step">01 / 08</span></aside>
  </main></Shell>;
}
