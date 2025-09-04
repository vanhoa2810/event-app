# Events UI (React + Vite)

A reference implementation of the Events timeline screen based on provided design guidance.

## Getting Started

```bash
pnpm install # or npm install / yarn
pnpm dev     # runs at http://localhost:5173
```

## Scripts
- `dev` – start development server
- `build` – type check & build
- `preview` – preview production build

## Architecture
- `design/` – tokens and global styles
- `components/` – composable UI blocks
- `data/` – sample event data
- `types/` – TypeScript interfaces
- `utils/` – date/time utilities

## Accessibility
- Semantic regions: header, main, section, article
- Keyboard focus visible on interactive elements
- Color contrast: adjust accent highlight if ratio < 4.5:1 for body size

## Extending
- Add filters above Timeline
- Introduce context/state manager for real API loading
- Convert CSS tokens to CSS-in-JS or style-dictionary pipeline if needed