"use client";
import Link from "next/link";
export default function ErrorPage({ retry }: { retry: () => void }) {
  return <main className="standalone-message"><p className="eyebrow">LILERP · CONNECTION CHECK</p><h1>We couldn’t load your records.</h1><p>Check that PostgreSQL is running and the database migrations have been applied, then try again.</p><button onClick={retry} className="button button-primary">Try again</button><Link className="back-link" href="/">Return to projects</Link></main>;
}
