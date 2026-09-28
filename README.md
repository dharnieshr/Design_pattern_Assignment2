# Bridge Design Pattern — Interactive Guide

A single-page React app for the Bridge design pattern, organized under the
classic Gang-of-Four catalog headings — Name, Intent, Also Known As,
Motivation, Applicability, Structure, Participants, Collaboration,
Consequences, Implementation, Sample Code, Known Uses, Related Patterns —
with a full Java code listing under Implementation and a live interactive
remote/device demo under Sample Code.

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for deployment

```bash
npm run build
```

This outputs a static site to `dist/`. Deploy `dist/` anywhere that serves
static files — Firebase Hosting, Netlify, Vercel, GitHub Pages, etc. For
Firebase (to match a `*.web.app` deployment):

```bash
npm install -g firebase-tools
firebase login
firebase init hosting     # choose "dist" as the public directory
firebase deploy
```

## Project structure

```
bridge-pattern-guide/
├── index.html                    Vite entry HTML, fonts, meta tags
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                   React root
    ├── App.jsx                    Assembles the 13 sections, in order
    ├── index.css                  All styles — design tokens at the top
    ├── data/
    │   ├── content.js             All copy, code, quiz-free reference data
    │   └── highlight.js           Small Java syntax tokenizer (no dependency)
    └── components/
        ├── Sidebar.jsx             Table-of-contents rail + mobile drawer
        ├── NameSection.jsx         01 Name — title, classification, bridge illustration
        ├── IntentSection.jsx       02 Intent
        ├── AlsoKnownAs.jsx         03 Also Known As
        ├── Motivation.jsx          04 Motivation — narrative + diagram
        ├── MotivationDiagram.jsx   Before/after SVG diagram for Motivation
        ├── Applicability.jsx       05 Applicability — bullet list
        ├── Structure.jsx           06 Structure — wraps the UML diagram
        ├── StructureDiagram.jsx    Hand-built SVG UML diagram
        ├── Participants.jsx        07 Participants — the four roles
        ├── Collaboration.jsx       08 Collaboration
        ├── Consequences.jsx        09 Consequences — gains and costs
        ├── Implementation.jsx      10 Implementation — notes + full source
        ├── CodeExample.jsx         Tabbed Java code viewer (widget only)
        ├── SampleCode.jsx          11 Sample Code — wraps the live demo
        ├── LiveDemo.jsx            Interactive remote/device simulation (widget only)
        ├── KnownUses.jsx           12 Known Uses
        ├── RelatedPatterns.jsx     13 Related Patterns
        └── Footer.jsx
```

## Editing the content

Everything text- and code-related lives in `src/data/content.js` — edit the
exported values there to change copy, add a code tab, or add a Known Uses
row. Styling lives entirely in `src/index.css`, driven by CSS custom
properties at the top of the file (`--bg-deep`, `--accent-cyan`,
`--accent-amber`, `--sidebar-w`, etc.).

## Reusing this for another pattern

Swap the contents of `content.js` (name, intent, motivation, structure
nodes, participants, code tabs, demo config, known uses) and the same
13-section layout renders a guide for a different pattern.
