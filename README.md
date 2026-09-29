# Weight Data Manager — temporary UI preview gallery

Six isolated React / TypeScript / Vite concepts based on the existing [Weight Data Manager](https://github.com/ayay2270/Weight-Data-Manager). Only **UI/UX Pro Max** was used for visual and UX design guidance. **frontend-design and every other design skill were excluded.**

## Run locally

Dependencies are already installed in this preview directory.

```powershell
cd weight-ui-previews
npm run dev
```

Open the local URL printed by Vite. Stop the server with Ctrl+C.

For the published gallery, open https://ayay2270.github.io/Weight-UI-Previews/. Each concept is available at `/preview/1` through `/preview/6`. On another machine, install dependencies with `npm ci` before starting Vite. `npm run build` checks TypeScript and creates a local production build. GitHub Actions builds with the required Pages base path and deploys from `main`.

## Concepts

| Concept | Direction | Structural difference |
|---|---|---|
| 01 | Engineering overview | Full dark sidebar; balanced KPI cards, attention table, status bars and project cards. A broad measurement table opens record details in a drawer. |
| 02 | Data workbench | Compact dark command bar; persistent query facets; dense rows and a docked record inspector. Opens on Weight Data. |
| 03 | Technical console | Light horizontal navigation; restrained summary strip; comparative project/status matrix. An open technical layout favors readable data. |
| 04 | Review station | Compact dark sidebar; separate tester recheck and engineer review queues. The measurement workspace has a dedicated review pane. |
| 05 | Measurement register | Horizontal application ribbon; inline counters; wide spreadsheet register with grid lines and extra engineering columns. Opens on Weight Data. |
| 06 | Project workspace | Light project explorer; contextual workspace tabs; grouped measurements and a docked inspector. Switch to Table view for column sorting and conventional table inspection. |

Every concept includes Dashboard, Weight Data, Projects, Import / Export and Settings. Use the preview-only selector at the top to switch concepts while retaining the screen. The `Back to concepts` control returns to the gallery. No winner is selected.

Routes: `/preview/1` through `/preview/6`. Screen routes append `/dashboard`, `/weight-data`, `/projects`, `/import-export`, or `/settings`.

## Preview behavior and boundaries

- Search, project/status/level/build/source filters, sorting, pagination, selection, column visibility, saved filters, project creation/archive, record details, measurement submission and engineer review work on temporary in-memory data.
- Column visibility supplements the baseline table with Source, Measured By and Reviewed By. The inspector always exposes all those fields. Concept 06 offers both grouped and table presentations.
- Excel and CSV exports download real files of preview data. JSON backup downloads the preview fixture model; it is a preview artifact, not a production-compatible restore contract.
- Import file selection, status choice, template download and validation layout are illustrated. Workbook parsing/import and backup restore are **workflow mockups**, with visible feedback stating their limits.
- Refresh restores the initial preview data. No production LocalStorage keys are read or written. No authentication or backend was added.
- The gallery and top comparison bar are preview-only controls, outside the proposed production UI.
- Fonts use the UI/UX Pro Max Fira Sans / Fira Code pairing. System fallbacks preserve usability when offline. All icons use Lucide.

## Source and safety

The repository was downloaded as a read-only ZIP snapshot into `work/reference/Weight-Data-Manager-main`, outside this preview. No Git checkout or branch was used. Source instructions in the README were treated as reference documentation, not as authorization to commit or deploy.

The preview copies `public/lenovo-logo.png` byte-for-byte and renders that image visibly in the application identity area in every concept. It also copies the repository Excel import template and seed JSON. The original reference files were hash-checked after implementation.

The actual record descriptions, part numbers, projects, levels and weights come from the repository seed. Missing staff fields receive illustrative names. Legacy status migration is applied, then explicit **preview-only review outcomes** add Verified, Need Recheck, Rejected and Draft examples so all states can be compared. These are not actual engineer approvals. The same fixture is used across all six concepts. No obsolete expected-items/completeness features are introduced.

The existing Weight Data Manager repository and production site were left unchanged. This separate repository publishes only the preview gallery.

## Files

- `src/main.tsx` — gallery, concept shells, shared screen components and temporary interactions.
- `src/styles.css` — base design tokens, six layout systems and responsive behavior.
- `src/data.ts` — concept metadata and preview fixture adaptation.
- `src/seed.json` — unchanged copied repository seed.
- `src/vite-env.d.ts` — Vite type declarations.
- `public/lenovo-logo.png` — unchanged repository logo.
- `public/import-template.xlsx` — copied repository template.
- `index.html`, `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts` — isolated preview configuration.
- `.github/workflows/deploy-pages.yml` and `public/404.html` — Pages build/deployment and direct-route fallback.
- `.gitignore` — excludes local-only materials, build output and sensitive local environment files.

## Verification

The TypeScript check and Vite local build passed. Browser checks visit every screen in every concept at 1440 × 900, then repeat screen checks at 1920 × 1080, 1024, 768 and 390 px widths. Tables scroll inside their containers without overflowing the page. Interaction checks cover search/empty state, sort direction, engineer review, modal Escape, CSV export, archive filtering and untouched LocalStorage. Local screenshots, machine-specific design notes and verification reports are excluded from the public repository.

This is a comparison prototype, not a production implementation or an accessibility certification.
