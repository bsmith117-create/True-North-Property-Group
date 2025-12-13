<div align="center">
  <img width="1200" height="475" alt="True North Property Group" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# True North Property Group Website

Marketing website for True North Property Group, built with Vite + React and deployed on Netlify.  
It highlights the firm’s services across Virginia, Maryland, and Washington D.C., and provides a Netlify Function–backed contact form that emails inquiries via Resend.

## Table of Contents
1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Project Structure](#project-structure)  
4. [Getting Started](#getting-started)  
5. [Environment Variables](#environment-variables)  
6. [Available Scripts](#available-scripts)  
7. [Content Editing](#content-editing)  
8. [Deployment](#deployment)  
9. [Netlify Functions](#netlify-functions)

## Features
- ⚡️ **Fast static site** powered by Vite and React 19.  
- 🧭 **Content-driven pages** sourced from JSON under `edit_content/`.  
- 📮 **Serverless contact form** handled by a Netlify Function using the Resend API.  
- 📱 **Responsive layout** tailored for desktop and mobile visitors.  
- 🛠 **TypeScript typings** across components and functions for safer development.

## Tech Stack
- React 19 + TypeScript
- Vite 6
- Netlify (builds, hosting, and serverless functions)
- Resend (email delivery for inquiries)

## Project Structure
```
├── src/                  # Core React source (routes, layouts, components)
├── components/           # Shared UI building blocks
├── pages/                # Page-level React components
├── edit_content/         # JSON content editors modify (e.g., pages/home.json)
├── netlify/
│   └── functions/        # Serverless functions (contact-form.ts)
├── public/               # Static assets copied as-is
├── dist/                 # Production build output
├── netlify.toml          # Build & dev configuration
└── package.json
```

## Getting Started

### Prerequisites
- Node.js 18+ (Node 20 recommended)
- npm 9+

### Installation & Local Development
```bash
git clone <repo-url>
cd true-north-property-group
npm install
cp .env.example .env   # add your secrets
npm run dev            # launches the Vite dev server on http://localhost:5173
```

> ℹ️ Netlify Functions run once the site is deployed or in deploy previews.  
> Local Vite development focuses on the client UI.

## Environment Variables
| Variable | Description |
| --- | --- |
| `RESEND_API_KEY` | API key for sending transactional emails via Resend. |
| `RESEND_FROM_EMAIL` | Sender address (e.g., `contact@tnpghomes.com`). |
| `RESEND_TO_EMAIL` | Recipient inbox for contact form submissions. |

Use `.env.example` as the template.

## Available Scripts
| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite dev server for local UI work. |
| `npm run build` | Build production assets (`dist/`) and copy `index.html`. |
| `npm run preview` | Preview the production build locally. |

## Content Editing
Most copy is stored in `edit_content/pages/*.json`. Update those files to change hero text, service descriptions, and contact copy without touching React components.

## Deployment
The repository already includes `netlify.toml` for Netlify builds:
```toml
[build]
  command  = "npm run build"
  publish  = "dist"
  functions = "netlify/functions"

[dev]
  targetPort = 3000
```

Typical flows:
1. Push to the main branch (or open a PR) and let Netlify’s UI build the site automatically.  
2. Use Netlify’s Deploy Previews in the dashboard to test serverless functions and the contact form.  
3. Promote a preview to production (or merge to the production branch) from the Netlify UI when ready.

## Netlify Functions
`netlify/functions/contact-form.ts` validates contact form input, sends emails through Resend, and returns appropriate responses.  
During Netlify builds (preview or production), the function is automatically bundled with esbuild as configured in `netlify.toml`.

---

Need help or have questions? Open an issue or reach out to the project maintainers.
