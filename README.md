# 🌟 My Portfolio & Digital Garden (Monorepo)

A showcase of modern web architecture, featuring a decoupled Next.js frontend and a Go-based Headless CMS, integrated with an Obsidian-driven static content pipeline.

---

## 🏛️ Architecture & Tech Stack

This project is structured as a monorepo with three distinct components, promoting separation of concerns and high performance.

### 1. Frontend (`/frontend`)

| Technology | Role |
| :--- | :--- |
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + SCSS |

### 2. Backend (`/backend`)

| Technology | Role |
| :--- | :--- |
| **Language** | Go (v1.21+) |
| **Framework** | Gin / Echo |
| **Database** | SQLite (embedded) |
| **Auth** | GitHub OAuth2 (Admin SSO) + JWTs |

### 3. Content Pipeline (`/content/blog`)

The blog is integrated via Static Site Generation (SSG).

* **Source:** Markdown files pushed from an **Obsidian** vault.
* **Integration:** Managed as a **Git Submodule** (see Local Setup).
* **Rendering:** Parsed at build-time using `gray-matter` and `remark-html` in Next.js.

---

## 🛠️ Local Development Setup

### Prerequisites

You must have the following tools installed globally:
* **Node.js** (v20+ recommended)
* **Go** (v1.21+ recommended)
* **Git**

### Initial Clone and Setup

Because this project uses a Git Submodule for the blog content, you must clone it using the `--recurse-submodules` flag.

```bash
# 1. Clone the repository
git clone --recurse-submodules [YOUR_REPO_URL] portfolio-website
cd portfolio-website

# 2. Setup Frontend dependencies
cd frontend
yarn install # or npm install
cd ..

# 3. Setup Backend dependencies
cd backend
go mod tidy
cd ..