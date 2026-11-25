"use client";

import Link from "next/link";
import { useActionState } from "react";
import { createProjectAction } from "./actions";
import { statusLabels, type ProjectInput } from "./schema";

export function ProjectForm() {
  const [state, action, pending] = useActionState(createProjectAction, {});
  function field(name: keyof ProjectInput, label: string, placeholder: string, maxLength: number) {
    const errors = state.errors?.[name];
    return <div className="field"><label htmlFor={name}>{label} <span aria-hidden="true">*</span></label>
      <input id={name} name={name} required maxLength={maxLength} placeholder={placeholder} defaultValue={state.values?.[name] ?? ""} aria-invalid={Boolean(errors)} aria-describedby={errors ? `${name}-error` : undefined} />
      {errors && <p className="field-error" id={`${name}-error`}>{errors.join(" ")}</p>}
    </div>;
  }
  return <form action={action} className="form-card">
    {state.message && <div className="alert alert-error" role="alert">{state.message}</div>}
    <section className="form-section"><h2>Project details</h2><p>Give the job a clear identity. Other records will refer back to it.</p>
      <div className="form-grid">{field("name", "Project name", "e.g. Mabini family residence", 120)}{field("code", "Project code", "e.g. PRJ-003", 24)}{field("customerName", "Customer", "Who are we building for?", 120)}
        <div className="field"><label htmlFor="status">Status <span aria-hidden="true">*</span></label><select id="status" name="status" defaultValue={state.values?.status ?? "PLANNED"} aria-invalid={Boolean(state.errors?.status)} aria-describedby={state.errors?.status ? "status-error" : undefined}>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>{state.errors?.status && <p id="status-error" className="field-error">{state.errors.status.join(" ")}</p>}</div>
      </div>
      <div className="field"><label htmlFor="description">Description <span className="optional">Optional</span></label><textarea id="description" name="description" rows={4} maxLength={4000} placeholder="A short description of the work involved…" defaultValue={state.values?.description ?? ""} aria-invalid={Boolean(state.errors?.description)} aria-describedby={state.errors?.description ? "description-error" : undefined}/>{state.errors?.description && <p id="description-error" className="field-error">{state.errors.description.join(" ")}</p>}</div>
    </section>
    <section className="form-section"><h2>Construction site</h2><p>Where the work takes place. Later, this site will hold materials.</p><div className="form-grid">{field("siteName", "Site name", "e.g. Mabini job site", 120)}{field("siteAddress", "Site address", "Street, city, province", 240)}</div></section>
    <div className="form-actions"><span>* Required fields</span><Link href="/" className="button button-secondary">Cancel</Link><button className="button button-primary" type="submit" disabled={pending}>{pending ? "Saving project…" : "Create project"}</button></div>
  </form>;
}
