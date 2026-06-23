# Agent Settings
- Model: gemini-3.5-flash
- Thinking Level: medium

# Workspace Metadata
- Environment: Web Development (Frontend-focused)
- Frameworks Allowed: React, Next.js, Tailwind CSS, TypeScript
- Primary Goal: Production-ready, pixel-perfect, highly maintainable web pages.

# Operating Rules for Medium Thinking Level
1. Plan Before Action: Use your internal thinking tokens to explicitly map out file interactions, dependencies, and state changes before generating code blocks.
2. Monolithic & DRY: Keep custom styles consolidated in dedicated CSS files/blocks. Do not repeat modular components unless explicitly instructed.
3. Code Modification Policy: When updating existing code, provide exact, modified code blocks rather than rewriting the entire file from scratch. This saves prompt context.
4. Browser Verification Policy: Do NOT automatically start a browser session or launch a browser sub-agent to verify the design in a browser after every change. The user will verify the design manually.
5. No Automated Verification: There is no need to automate verification of any changes. All verifications will be performed manually every time.

# Anti-Slop Safeguards (Credit-Saving Rules)
- NEVER rewrite comments, documentation, or unchanged layout portions unless specifically asked to refactor them.
- Do not add placeholder functions or temporary components (e.g., `// TODO: implement later`). Every element written must be complete.
- Do not execute unnecessary automated Git commands or terminal logs inside the Antigravity sandbox without explicit developer consent.

# Styling & UX Philosophy
- Prioritize semantic HTML elements over generic `<div>` tags for superior SEO and accessibility.
- Ensure layouts are fully responsive across mobile, tablet, and desktop breakpoints.
- Enforce clean, readable typography hierarchies and use standardized variable names for CSS colors or tailwind themes.
