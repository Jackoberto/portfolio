# Jack Karlsson | Portfolio

A high-performance, responsive personal portfolio built with a focus on game development and software engineering. This project has been transitioned from a client-side rendered application to a **Static Site Generated (SSG)** architecture to optimize for SEO, performance, and maintainability.

---

## 🏗️ Architecture Overview

The portfolio uses **Eleventy (11ty)** to transform structured data and templates into optimized static HTML.

### Key Components:

- **Static Site Generation (SSG):** All pages are generated at build-time, ensuring zero "flash of empty content" and excellent search engine indexing.
- **Data-Driven Logic:** Project information is stored in `_data/projects.json`. Eleventy automatically iterates through this file to generate the homepage grid and individual project detail pages.
- **Templating:** Uses **Nunjucks** (`.njk`) for dynamic layouts, enabling powerful features like pagination and conditional content rendering.
- **Automated Deployment:** Integrated with **GitHub Actions** for a full CI/CD pipeline. Every push to the `main` branch triggers a build, a smoke test, and an automatic deployment to GitHub Pages.

---

## 📂 Project Structure

- **`_data/`**: Contains `projects.json`, the single source of truth for all portfolio content.
- **`css/`**: Global styles and theme definitions.
- **`js/`**: Minimal client-side JavaScript (e.g., `theme.js` for dark mode persistence).
- **`images/`**: Standardized asset folders (`icons/`, `logos/`, and project-specific screenshots).
- **`index.njk`**: The homepage template.
- **`project-pages.njk`**: The template used to generate unique pages for every project in the data file.
- **`.eleventy.js`**: Configuration file for passthrough assets and build rules.
- **`.github/workflows/`**: Automated build and deployment instructions.

---

## 🛠️ Local Development

To run this project locally, ensure you have **Node.js** installed.

### 1. Install Dependencies
```bash
npm install
```

### 2. Build the Site
```bash
npm run build
```
This generates the finished site in the `_site/` directory.

### 3. Run Tests
```bash
npm test
```
Runs a smoke test to verify the build process and ensure critical files are generated.

### 4. Continuous Development (Watch Mode)
```bash
npx @11ty/eleventy --serve
```
Launches a local development server with live-reloading.

---

## 🚀 Deployment

Deployment is fully automated via **GitHub Actions**.

1.  Push your changes to the `main` branch.
2.  GitHub will automatically install dependencies, build the site, run tests, and deploy the `_site` folder to **GitHub Pages**.
3.  The custom domain (`jackkarlsson.com`) is preserved during this process via the `CNAME` passthrough configuration.
