import Link from "next/link";
export default function NotFound() {
  return <main className="standalone-message"><p className="eyebrow">LILERP · RECORD NOT FOUND</p><h1>That page or project doesn’t exist.</h1><p>Return to the register to find an existing job.</p><Link href="/" className="button button-primary">Back to projects</Link></main>;
}
