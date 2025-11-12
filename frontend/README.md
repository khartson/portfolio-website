# 🚀 Portfolio Website Frontend

## Overview

This directory contains the Next.js application that serves as the main user interface for the portfolio website. It is a highly responsive, fast, and modern static/server-rendered application designed for performance (Lighthouse scores are paramount).

It operates as a hybrid application:

1. **Static/SSG:** Reads Markdown files from the local `content/blog` submodule for blog posts and article content.
    
2. **Server-Side:** Interacts with the Go Backend API for dynamic data like contact form submissions, project metadata, and authentication.
    

## Tech Stack

|Technology|Purpose|
|---|---|
|**Next.js**|React Framework for SSG/SSR|
|**TypeScript**|Language for strong typing and maintainability|
|**Tailwind CSS**|Utility-first CSS framework for rapid, responsive styling|
|**React**|Component-based UI library|

## Local Development

### 1. Prerequisites

Ensure you have Node.js (v18+) and npm installed.

### 2. Install Dependencies

```
npm install
```

### 3. Run Development Server

This starts the Next.js environment with hot reloading. The application will be accessible at `http://localhost:3000`.

```
npm run dev
```

### 4. Build for Production

To create an optimized production build (including static asset generation):

```
npm run build
npm run start
```

## Data Sources

- **Local Files:** Content in `../content/blog/*.md` is processed at build time for blog routes.
    
- **Go API:** Consumes data from the `../backend` service (e.g., `/api/projects`, `/api/contact`).