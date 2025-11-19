// A collection of content for our mock files.
// In a production environment, this content would be fetched from the Go backend API.
// We use backticks (`) for multi-line string content.

const README_CONTENT = `# Kyle's Portfolio (WIP)

This site is currently a **work in progress** and is being built to showcase my projects in an interactive code editor format.

---

## Status

More content is coming soon! Please check back later for my complete project details and technical write-ups.

In the meantime, feel free to check out my resume in the \`/docs\` folder.
`;

const PDF_PLACEHOLDER_CONTENT = `// This is a binary file and cannot be displayed in the editor.
// Path: /docs/resume.pdf
// Please use a PDF viewer to open this file.`;

const EXAMPLE_GO_CODE = `package main

import "fmt"

// main is the entry point of the Go application
func main() {
	// This is a simulated code snippet.
	message := "Hello from the Go backend!"
	fmt.Println(message)
	
	// TODO: Implement file serving logic
	if len(message) > 0 {
		// Logging a successful initialization
		fmt.Println("Server initialized successfully.")
	}
}
`;

// Map of file paths to their content strings.
// This will be replaced by API calls to the Go backend in production.
const contentMap: Record<string, string> = {
	'/README.md': README_CONTENT,
	'/docs/resume.pdf': PDF_PLACEHOLDER_CONTENT,
	// Add a new code file to demonstrate highlighting
	'/projects/go-server/main.go': EXAMPLE_GO_CODE,
};

/**
 * Retrieves mock file content by path.
 * In production, this would be replaced with an API call to the Go backend.
 * 
 * @param path - The file path (e.g., '/README.md', '/projects/go-server/main.go')
 * @returns The file content as a string, or an error message if not found
 */
export const getMockFileContent = (path: string): string => {
	return contentMap[path] || '// Error: File not found.';
};

