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

## Environment Variables
| Variable | Description |
| --- | --- |
| `RESEND_API_KEY` | API key for sending transactional emails via Resend. |
| `RESEND_FROM_EMAIL` | Sender address (e.g., `contact@tnpghomes.com`). |
| `RESEND_TO_EMAIL` | Recipient inbox for contact form submissions. |

## Content Editing
1. **Open the page file** you want to change inside `edit_content/pages/`.
2. **Modify the relevant keys** (e.g., `hero.title`, `services.buyers.description`, `testimonials[0].quote`). Keep the structure and array lengths consistent unless you also update the components that render them.
3. **Validate JSON** syntax—matching braces/quotes and trailing commas are common pitfalls. Most editors provide JSON validation or prettier formatting.
4. **Commit your changes** once satisfied. Since Netlify deploys from Git, pushing the updated JSON will redeploy the new copy automatically.
