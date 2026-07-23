# Codebase Analysis & Documentation (brain.md)

This file details the current state and structure of the **QuickRevert** codebase, which is a React/Vite project implementing Instagram DM automation simulations.

## Project Structure
The application is structured as follows:

- **Root Directory**:
  - `package.json`: Project scripts, dependencies (React 19, Tailwind v4 via `@tailwindcss/vite`, Lucide React, Motion v12, Express).
  - `index.html`: Entry HTML structure where the app is mounted.
  - `vite.config.ts`: Configuration for Vite compiling.
  - `tsconfig.json`: TypeScript compiler options.
  - `tailwind.config.js` (none: uses Tailwind v4 `@import "tailwindcss"` in `src/index.css`).

- **`src` Directory**:
  - `main.tsx`: Direct mount of `<App />` using React 19 concurrent API.
  - `App.tsx`: Main routing and page view shell. Manages page/view state (`viewMode` among `'landing' | 'dashboard' | 'link-in-bio'`). Contains an active modal notification simulator for checkout flows.
  - `index.css`: Stylesheet specifying font families (Manrope, Bricolage Grotesque, JetBrains Mono) and custom Tailwind v4 theme definitions (such as `--color-brand-primary`).
  - `types.ts`: Domain models for UI states:
    - `ChatMessage`: Represents standard automated chat bubble events.
    - `AutomationRule`: Configures auto-response keywords and parameters.
    - `Contact`: Represents leads and target users inside the CRM flow.

- **`src/components` Directory**:
  - `Navbar.tsx`: Sticky navigation bar with interactive flyouts for Features, Resources, Pricing, FAQ, plus quick triggers for changing `viewMode`.
  - `Hero.tsx`: Dynamic foreground showcase with rotating steps highlighting automatic user interactions, backdrop photo, and CTAs.
  - `Playground.tsx`: Interactive block demonstrating comment-to-DM triggers, automatic message thread bubbles, and phone screens.
  - `Features.tsx`: Main landing section showing "Simple to start" cards and a multi-step "Smarter over time" interactive lead previewer.
  - `Pricing.tsx`: Pricing tier selector that handles simulation trials.
  - `FAQ.tsx`: Commonly asked questions accordion list.
  - `Footer.tsx`: Brand and social link listing.
  - `DashboardMock.tsx`: Complete simulated dashboard mockup for users to configure their triggers, test auto-responses, view active campaigns, and see charts.
  - `LinkInBio.tsx`: Simulated Link-in-Bio profile customization view with editable cards, icons, styles, and a mock preview phone screen.
  - `StayForRest.tsx`: Call to action or newsletter signup section.

## Next Steps for Features Implementation
To support the user's requirements:
1. Update navigation items inside `Navbar.tsx` to group under:
   - **Triggers**: AutoDM, Comment to DM, Story Interactions
   - **Features**: Ask to follow, Carousel cards, Menu flow, Lead manager
   - **Other Products**: Link-in-Bio - My Store, 1:1 Appointments - My Slots
2. Create a dedicated page for `/features` (under a new viewMode or route) containing:
   - Live interactive simulations for:
     - Ask to follow
     - Carousel cards
     - Menu flow
     - Lead manager
   - Actionable step-by-step explanations on how creators can build these workflows.
