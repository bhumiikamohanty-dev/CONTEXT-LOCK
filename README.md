# ContextLock — Instagram Story Privacy Demo

Frontend-only interactive prototype showing ContextLock as a privacy review inside an Instagram-inspired Story creation flow.

## Features
- Instagram-style feed and Story editor
- Upload a photo for the Story preview
- Simulated detection of email, phone number, and location
- Blur or Keep controls (Redact option removed)
- Risk score reflects remaining visible sensitive information
- Risk score reaches **0** when all findings are blurred/hidden
- Reset and apply changes
- Demo-only sharing controls; nothing is published

## Run on macOS

Open this folder in VS Code, then run in its integrated Terminal:

```bash
npm install
npm run dev
```

Open the localhost URL printed by Vite.

## Build for production

```bash
npm run build
```

## GitHub

The `.gitignore` excludes `node_modules`, build output, secrets, and OS/editor files. Commit the source files and `package-lock.json`; do not commit `node_modules`.

**Prototype limitation:** privacy detection and risk scoring are simulated for demonstration. This is not connected to Instagram and does not publish content.
