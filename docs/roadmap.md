# Build agreement and roadmap

Build LilERP to learn company operations, shared records, workflows, and financial consequences. Work one milestone at a time, explain and verify it, then pause for discussion. Keep each commit runnable and include a learning note. Complete only the current milestone unless the user changes this agreement.

Business defaults: one fictional Philippine contractor, PHP, one warehouse plus project sites, fixed-price contracts, and no taxes, statutory payroll, retention, external APIs, or hosting. Role-based access arrives in milestone 2. Later posted records are immutable, with dependency-aware reversals; money uses decimal arithmetic. Server services own validation, permissions, and database transactions.

## 1. Application foundations

1. `chore: bootstrap application and local database`
2. `feat: add project creation and project list`
3. `docs: add first full-stack walkthrough`

Exit: create and reload a project using real PostgreSQL records; provide seed data and a walkthrough.

## 2. Identities and shared records

4. `feat: add seeded accounts and role permissions`
5. `feat: add customers suppliers materials and project budgets`
6. `feat: add document history and audit events`

Use Better Auth with no public registration. Roles: administrator, project manager, purchaser, warehouse clerk, accountant. Archive referenced master records. Create shared customer/site records from milestone 1 text without losing projects. Budget by cost code.

## 3. Purchase requests and commitments

7. `feat: add project material requests`
8. `feat: create purchase orders from material requests`
9. `feat: approve purchase orders and report commitments`

Purchasers create orders; project managers approve requests and orders, without self-approval. Track quantities already ordered. Budgets warn rather than block. Purchase orders create commitments, not ledger entries.

## 4. Receiving and inventory

10. `feat: record partial purchase order receipts`
11. `feat: add inventory movements and site transfers`
12. `feat: issue materials to projects with stock valuation`

Track partial receipts and immutable movements. No negative stock or excess receiving. Use moving weighted-average cost per material/location. Transfers carry source cost; consumption creates project material cost. One base unit per material.

## 5. Accounting and supplier payments

13. `feat: add balanced general ledger and opening cash`
14. `feat: post inventory accounting and receipt clearing`
15. `feat: add supplier bills with receipt matching`
16. `feat: record supplier payments and reversals`

Seed a small chart of accounts and opening cash/equity. Receipts debit inventory and credit receipt clearing. Consumption debits material expense and credits inventory. Bills match received/unbilled quantities at order prices, debit clearing, and credit payables. Payments debit payables and credit cash; allow partial payments. Post existing inventory history once in chronological order without duplication. Journals balance and post atomically with documents. Reject reversals while active dependent documents exist.

## 6. Labor costs

17. `feat: add workers and project timesheets`
18. `feat: approve timesheets and accrue labor costs`
19. `feat: record wage settlements`

Project managers approve timesheets and snapshot hourly rates. Debit labor expense and credit wages payable. Accountants fully settle selected unpaid approved timesheets; support reversals. No statutory payroll.

## 7. Customer billing

20. `feat: add project contracts and approved change orders`
21. `feat: create cumulative progress invoices`
22. `feat: record customer receipts and receivables`

Administrator approves contract changes. Incremental invoice equals cumulative completed value minus prior posted billings; cannot decrease progress or exceed approved contract. Invoices debit receivables and credit revenue. Partial receipts debit cash and credit receivables. Recognize revenue on invoicing as a documented teaching simplification.

## 8. Reports and complete demo

23. `feat: add project budget cost and billing dashboard`
24. `feat: add financial and reconciliation reports`
25. `test: add complete construction company demo`
26. `docs: add architecture decisions and interview walkthrough`

Separate budget, commitments, inventory, expenses, billings, margin, and cash. Add trial balance, profit and loss, balance sheet, aged payables/receivables, and reconciliation with source-record links. Test idempotency, concurrency, permissions, rollback, and reversals alongside each relevant feature.

Final acceptance example: order 100 bags at ₱250, receive 60 then 40, consume 70, bill ₱25,000, pay ₱10,000. Expect 30 bags worth ₱7,500, material expense ₱17,500, supplier debt ₱15,000, and receipt clearing zero.
