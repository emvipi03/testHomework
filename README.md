# Micro:bit Mission Lab

An English, browser-only homework site built with React, TypeScript, and Vite. It has no backend, account system, data API, or database. Each lesson gets a stable hash URL that works on GitHub Pages, for example `#/lesson/buttons-led-v1`.

## Project structure

- `src/data/course.ts`: mission-library cards and availability.
- `src/data/lesson.ts`: complete content, answers, explanations, and weights for the published sample lesson.
- `src/logic/grading.ts`: deterministic grading, separate from the UI.
- `src/logic/storage.ts`: per-lesson attempts in browser `localStorage`.
- `.github/workflows/deploy-pages.yml`: automatic GitHub Pages build and deployment.

To add another complete lesson, create its lesson data file, register it in `lessonsById` in `src/App.tsx`, and mark its catalog entry as `available` in `src/data/course.ts`.

## Run locally

```powershell
$nodeDir = (Resolve-Path '.tools\node-v24.21.0-win-x64').Path
$env:Path = "$nodeDir;$env:Path"
npm run dev
```

Open `http://127.0.0.1:5173`.

## Share on the same Wi-Fi

```powershell
$nodeDir = (Resolve-Path '.tools\node-v24.21.0-win-x64').Path
$env:Path = "$nodeDir;$env:Path"
npm run dev:lan
```

Other devices need only a browser. Open the Network URL printed by Vite. Alternatively, copy the complete folder (including `.tools` and `node_modules`) to another Windows computer and double-click `START_WEBSITE.cmd`.

## Test and build

```powershell
$nodeDir = (Resolve-Path '.tools\node-v24.21.0-win-x64').Path
$env:Path = "$nodeDir;$env:Path"
npm test
npm run build
npm run test:e2e
```

MakeCode uses Microsoft’s supported iframe controller and requires Internet. A new-tab fallback is always provided.

## Deploy automatically to GitHub Pages

1. Push the repository to the `main` branch on GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions** as the source.
4. Open **Actions** and run **Build and deploy GitHub Pages**, or push a new commit.
5. The course URL will be `https://YOUR-USER.github.io/YOUR-REPOSITORY/`.
6. A direct lesson link will be `https://YOUR-USER.github.io/YOUR-REPOSITORY/#/lesson/buttons-led-v1`.

Every push to `main` runs unit tests, builds the site, and deploys `dist`. Do not create the suggested Jekyll or Static HTML workflow; this repository already contains the correct Vite workflow.
