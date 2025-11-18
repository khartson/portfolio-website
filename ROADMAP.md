# Detailed Implementation Roadmap: Interactive Portfolio

This document provides a deep dive into the remaining tasks, detailing the implementation strategy for both the Go backend and the React frontend integration, along with a list of planned future enhancements (Stretch Goals).

## I. Core Implementation: Go Backend API Development

The primary goal is to replace the current static, in-memory TypeScript mocks with live data served from a **Go API**. This decouples the file content from the presentation layer.

### A. Go Data and Server Setup

|Task|Implementation Strategy|Dependencies|
|---|---|---|
|**1. Define Go Data Structures**|Create Go structs (using `struct` tags like `json:"name"`) that precisely mirror the TypeScript interfaces (`FileTreeEntry`, `FileContentType`, etc.) defined in `frontend/types/portfolio.ts`.|None|
|**2. Initialize Go Server & CORS**|Use the standard **`net/http`** package for the server. Implement basic **CORS headers** (`Access-Control-Allow-Origin: *`) to ensure the React frontend (running on a different port/origin) can successfully request data.|None|

### B. API Endpoint Implementation

We need two critical endpoints to drive the entire application's data flow:

|Endpoint|Purpose|Implementation Strategy|
|---|---|---|
|**`GET /api/files`**|Serves the entire nested file tree structure.|The Go server will read a single **JSON file** (e.g., `data/file_tree.json`) on startup, unmarshal it into the Go data structures, and return the structure as JSON in the HTTP response.|
|**`GET /api/files/{path}`**|Serves the content of a specific file.|The Go server will accept the file's relative path (e.g., `projects/website/index.html`) as a URL parameter. It will then use the **`os` package** to read the content of the corresponding file from the local disk (e.g., `content/projects/website/index.html`) and return the raw text/code as the response body.|

## II. Frontend Data Integration (React/TypeScript)

The frontend's implementation focuses on replacing the `import` statements with dynamic data fetching.

### A. File Tree Initialization

- **Component:** `frontend/components/editor/EditorLayout.tsx`
    
- **Action:** Modify the component's primary `useEffect` hook to perform an asynchronous `fetch` call to the **`/api/files`** endpoint.
    
- **Approach:** Implement a loading state (`isLoading: boolean`) to display a "Loading File Tree..." message in the sidebar until the data is successfully received.
    

### B. Dynamic Content Loading

- **Component:** `frontend/components/content/FileRenderer.tsx`
    
- **Action:** When the user clicks a file tab (changing the `activeFile` state), trigger a new `fetch` call to **`/api/files/{path}`** using the clicked file's path.
    
- **Approach:** Display a per-tab loading indicator (`fetchingContent: boolean`) while waiting for the content to arrive, preventing Cumulative Layout Shift (CLS) in the editor pane.
    

## III. Content Finalization

This stage is about populating the content served by the Go backend with actual portfolio details.

|Task|Detail|Status|
|---|---|---|
|**Populate Static Content**|Write the content for the core files: `README.md`, `ABOUT.md`, and the generic profile description.|To Do|
|**Project Integration**|Create dedicated markdown and code files for each major portfolio project, ensuring the content is formatted correctly for rendering (e.g., using Markdown code blocks).|To Do|

## IV. Stretch Goals (Future Enhancements)

Once the core data architecture is robust, we can add advanced, developer-centric features:

### 1. Interactive Global Search (`Ctrl+P` or `Cmd+P`)

- **Concept:** Implement a modal search bar that allows users to quickly jump to any file by typing its name.
    
- **Implementation:** Utilize a client-side library like **Fuse.js** for fuzzy searching across the file tree data already loaded by the frontend.
    

### 2. Live Terminal Placeholder

- **Concept:** The footer (status bar) could include a section for a simple terminal output or console panel.
    
- **Implementation:** Create a simple JavaScript module that can simulate executing commands like `ls` or `cd` and returns witty or informative hardcoded responses, enhancing the editor immersion.
    

### 3. User Feedback & "Star" Functionality

- **Concept:** Allow users to "star" or "like" a project directly within the portfolio.
    
- **Implementation:** Introduce **Firebase Firestore** to allow anonymous or authenticated users to record small interactions (e.g., upvotes) on project documents, providing rudimentary analytics or social proof.
    