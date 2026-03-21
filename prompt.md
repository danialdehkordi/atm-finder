# ATM Finder Mega Prompt

**Copy and paste the prompt below to generate exactly this application from scratch:**

***

You are an expert senior full-stack developer and architect. Your task is to design and build a lightweight web app called "ATM Finder" for a short technical demonstration.

**The Goal:**
Build a simple, sophisticated single-page web application that allows a user to enter a German zip code and see a dynamic Google Map displaying all the bank ATMs in that specific area.

**The Stack:**
1. **Backend:** TypeScript with Express.
2. **Frontend:** A single `index.html` file served by Express from a `/public` folder.
3. **Styling:** Vanilla Tailwind CSS via CDN. Do not use build tools for Tailwind.
4. **Mapping:** Google Maps Platform JavaScript API.

**Core Requirements:**

1. **Mock Data Source Generation:**
    * Generate a realistic `data.json` file at the project root containing an array of 5 to 8 ATM objects located in Munich, Germany (use the zip code `80331`). Each object must include properties for `name`, `address`, `zip_code`, `lat`, and `lng`.

2. **Backend Development (`server.ts`):**
    * Read the Google Maps API key via an environment variable named `GOOGLE_MAPS_API_KEY`.
    * Expose an endpoint `/api/config` that securely provides this API key to the frontend.
    * Expose an endpoint `/api/atms?zip_code=...` that reads `data.json`, filters the data by the provided zip code, and returns the matching ATM objects.
    * Serve the `public/` directory statically.

3. **Frontend Development (`public/index.html`):**
    * Fetch the API key from `/api/config` and inject the Google Maps JS SDK dynamically.
    * Create a form where a user can enter a German zip code.
    * When submitted, fetch data from `/api/atms` and dynamically populate the Google Map with markers.
    * Auto-adjust the map bounds/zoom so all returned markers are visible simultaneously.
    * Display the textual list of returned ATMs in a sleek sidebar. Clicking a list item should center the map on its respective marker.

4. **Design & Aesthetics (MANDATORY STRICT GUIDELINES):**
    * The overall UI aesthetic MUST be a beautiful, dark **Glassmorphism** theme. Utilize an ambient background gradient (e.g. `bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900`).
    * Use transparent/blur overlay panels (`backdrop-filter`) for forms and results lists. Add custom scrollbars. 
    * **Crucial Typography Fix:** Use `text-white` or `text-slate-100` for excellent contrast, but avoid super heavy weights (`font-extrabold`) or heavy text shadows (`drop-shadow-md`), as these make glowing text muddy and illegible on a dark blurred theme. Use `font-semibold` or `font-medium` instead for crisp text.
    * **Map Container:** Surround the map in a rounded glass container, but do NOT override the map colors dynamically. The map box itself MUST use the native, colorful default Google Maps style (no custom JSON styles array applied in the JS config).

5. **Deployment:**
    * Use the `node:23-slim` Docker base image.
    * The pipeline must NOT include a build step for the frontend.
    * Configure the `Dockerfile` to install dependencies and run the application directly using `npm start` (with a start script invoking `tsx server.ts`).
    * Expose port 3000.

Deploy this configuration reliably. If prompted for an implementation plan, provide a Mermaid architecture diagram showing the API config fetch and data polling sequence, followed sequentially by file generation.
