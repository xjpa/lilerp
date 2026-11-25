import Link from "next/link";

export function Shell({ children }: { children: React.ReactNode }) {
  return <div className="app-shell">
    <aside className="sidebar">
      <Link href="/" className="brand"><span className="brand-mark">L</span> lil<span className="brand-light">erp</span><span className="brand-dot">.</span></Link>
      <div className="company"><span className="company-avatar">NC</span><div><strong>Narra Construction</strong><span>Learning company · PHP</span></div></div>
      <p className="nav-heading">WORKSPACE</p>
      <nav aria-label="Main navigation">
        <Link className="nav-item selected" href="/"><span aria-hidden="true">▦</span> Projects <span className="nav-count">01</span></Link>
        {["Purchasing", "Inventory", "Accounting", "Labor", "Customer billing"].map((name, i) => <div className="nav-item upcoming" key={name}><span aria-hidden="true">{["↗", "▤", "≡", "♧", "▧"][i]}</span>{name}<span className="soon">Later</span></div>)}
      </nav>
      <div className="sidebar-foot"><span className="live-dot"/> LOCAL LEARNING APP<p>One company. Connected records.</p></div>
    </aside>
    <div className="workspace"><header className="topbar"><span>Workspace <span className="breadcrumb-slash">/</span> <strong>Projects</strong></span><span className="milestone-badge">Milestone 01 <span>· Foundations</span></span></header>{children}<footer className="page-footer">LilERP <span>Built to understand how a business works.</span></footer></div>
  </div>;
}
