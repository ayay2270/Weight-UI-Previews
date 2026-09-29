import seed from './seed.json'
export const statuses = ['Draft', 'Pending Review', 'Verified', 'Need Recheck', 'Rejected'] as const
export const levels = ['Part', 'Node', 'Rack', 'Package'] as const
export const sources = ['Internal Measurement', 'Supplier', 'Specification', 'Estimated', 'Unknown'] as const
export type Status = typeof statuses[number]
export type RecordRow = { id: string; projectCode: string; description: string; level: string; status: Status; weight: number | null; buildPhase: string; source: string; measuredBy: string; reviewedBy: string; lenovoPn: string; measuredDate: string; configuration: string; reviewComment: string }
export type Project = { code: string; phase: string; status: string; notes: string }
export const initialProjects: Project[] = seed.projects.map(p => ({ code: p.code, phase: p.phase || '—', status: p.status, notes: p.notes || '' }))
export const initialRecords: RecordRow[] = seed.records.map((raw, i) => {
  const r = raw as unknown as Record<string, any>
  const legacyStatus = r.status === 'Measured' || r.status === 'Estimated' ? 'Pending Review' : r.status === 'Missing' ? 'Need Recheck' : r.status
  // Repository migration is respected first. Add explicit preview-only review outcomes
  // so all five states can be compared; these are illustrative, not actual approvals.
  const status: Status = i === 3 ? 'Need Recheck' : i === 9 ? 'Rejected' : i === 14 ? 'Draft' : r.status === 'Measured' && i % 5 !== 0 ? 'Verified' : legacyStatus
  return { id: r.id, projectCode: r.projectCode, description: r.description, level: r.level, status, weight: r.weight_kg ?? r.weightKg ?? (r.weightValue == null ? null : r.weightUnit === 'g' ? r.weightValue / 1000 : r.weightValue), buildPhase: r.buildPhase || r.note?.match(/^(\w+) phase$/)?.[1] || initialProjects.find(p => p.code === r.projectCode)?.phase || '—', source: r.source, measuredBy: r.measuredBy || ['A. Chen', 'J. Lin', 'M. Wang'][i % 3], reviewedBy: status === 'Verified' ? r.reviewedBy || 'S. Huang' : '—', lenovoPn: r.lenovoPn || '—', measuredDate: r.measuredDate || '2026-09-22', configuration: r.configuration || 'See measurement reference', reviewComment: status === 'Need Recheck' ? 'Confirm weighed configuration and repeat measurement.' : r.reviewComment || '' }
})
export const concepts = [
  { id: 1, name: 'Engineering overview', tag: 'Enterprise sidebar', description: 'A familiar full sidebar with a balanced dashboard. Attention records and project health sit beside one another; the data table uses progressive detail.', structure: 'Full sidebar · KPI cards · balanced dashboard', focus: 'Cross-project oversight', density: 'Standard' },
  { id: 2, name: 'Data workbench', tag: 'Compact command navigation', description: 'A data-first workbench with persistent filter facets, dense rows and a docked inspector. A compact top command bar keeps the database in focus.', structure: 'Command bar · filter rail · record inspector', focus: 'Frequent querying and inspection', density: 'High' },
  { id: 3, name: 'Technical console', tag: 'Light top navigation', description: 'An open, light workspace with horizontal navigation and a restrained summary strip. Project status is compared in a matrix, and measurement records retain clear technical hierarchy.', structure: 'Top navigation · summary strip · project matrix', focus: 'Readability and comparison', density: 'Standard' },
  { id: 4, name: 'Review station', tag: 'Compact dark sidebar', description: 'Review and recheck queues lead the dashboard, with clear task ownership and next actions. Weight Data becomes a master-detail review workspace alongside compact navigation.', structure: 'Compact sidebar · review queues · split review pane', focus: 'Tester / engineer handoff', density: 'Standard' },
  { id: 5, name: 'Measurement register', tag: 'Spreadsheet workspace', description: 'A horizontal application ribbon, inline counters and a wide engineering register maximize visible data. The dashboard leads with exceptions and a compact project ledger.', structure: 'Application ribbon · inline metrics · dense grid', focus: 'Bulk data inspection and export', density: 'High' },
  { id: 6, name: 'Project workspace', tag: 'Project explorer', description: 'A project explorer keeps context visible while workspace tabs switch tasks. Project-specific summaries, grouped records and a contextual detail panel reduce repeated filtering.', structure: 'Project explorer · workspace tabs · grouped records', focus: 'Work within a project', density: 'Standard' },
]
export const weightText = (r: RecordRow) => r.weight == null ? '—' : r.weight.toFixed(3)
export const statusClass = (s: string) => s.toLowerCase().replaceAll(' ', '-')
