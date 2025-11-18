# Interactive Portfolio: VS Code Theme

This project is an interactive, developer-focused portfolio website designed to mimic the appearance and functionality of a modern code editor (like VS Code). The user can navigate a file tree structure to view content, projects, and documents, all rendered within a familiar interface.

## Project Structure Overview

The application is split into a **Go API backend** responsible for serving file content and a **React/TypeScript frontend** responsible for the user interface and rendering.

### 1. Root Directory (`/`)

|File/Directory|Description|Status|
|---|---|---|
|`frontend/`|The React/TypeScript application.|**In Progress**|
|`backend/`|The Go web server and API logic.|**To Do**|
|`data/`|Stores mock data structures (will be phased out after full backend integration).|**Ready**|

### 2. Frontend (`frontend/`)

This directory contains the single-page application (SPA) built with React and TypeScript, styled entirely with Tailwind CSS.

|Directory/Component|Description|Key Features|
|---|---|---|
|`components/editor/EditorLayout.tsx`|**Main component.** Renders the entire editor UI (Activity Bar, Sidebar, Tab Bar, Content Pane). Currently fetches all data from local mocks.|Handles file tree rendering, tab switching, and state management for active file/menu.|
|`components/editor/EditorIcon.tsx`|Stateless component for the Activity Bar icons.|Handles the visual state (`isActive`) and click handlers for menu switching.|
|`components/content/FileRenderer.tsx`|Responsible for taking `FileTreeEntry` data and rendering its content appropriately (e.g., code block, markdown, PDF viewer placeholder).|Needs logic to `fetch` file content from the Go API.|
|`types/portfolio.ts`|TypeScript definitions for the application's data structures (`FileTreeEntry`, `ActiveMenuType`, etc.).|Defines the contract for data exchanged between the frontend and backend.|
|`data/mock-file-tree.ts`|**Temporary** hardcoded data structure representing the entire project file tree.|Used for initial UI development; will be replaced by the `/api/files` endpoint.|

### 3. Backend (`backend/`) - Planned

This directory will house the Go server. It will run independently and serve data to the React application via REST endpoints.

|File|Framework|Purpose|
|---|---|---|
|`main.go`|Go (`net/http`)|Initializes the server, defines API routes, and serves data from static sources (or mock content files).|

## High-Level Implementation Outline

These are the immediate next steps required to make the application functional and data-driven:

### 1. Build and Test the Go Backend API

- Define the Go data structs to match the `FileTreeEntry` TypeScript types.
    
- Implement the **`/api/files`** endpoint to return the full file tree structure (using the mock data as the source initially).
    
- Implement the **`/api/files/{path}`** endpoint to return the actual content of a specific file (e.g., markdown or code text).
    

### 2. Frontend Data Integration

- Modify `EditorLayout.tsx` and `FileRenderer.tsx` to use the `fetch` API to retrieve data from the new Go endpoints instead of importing from local mock files.
    
- Add loading states and basic error handling to the React components.
    

### 3. Content Finalization

- Populate the static file content (e.g., actual README markdown, project code snippets) that the Go server will serve.