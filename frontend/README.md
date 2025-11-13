# 🚀 Frontend Setup: React, TypeScript, and Tailwind CSS

This guide will walk you through initializing a new Next.js project with TypeScript and configuring Tailwind CSS, setting the stage for integrating your `VSCodePortfolio.tsx` component.

## 1. Initialize the Next.js Project

Next.js provides an excellent CLI tool that sets up the required boilerplate for React, TypeScript, and modern tooling, including Tailwind CSS configuration.

1. **Navigate to the Root Directory:** Make sure you are in the overall project root where the `frontend/` folder should reside.
    
    ```
    # Assuming you are in the project root
    npx create-next-app@latest frontend
    
    ```
    
2. **CLI Prompts:** When prompted, choose the following options to match the project structure:
    
    |Prompt|Recommended Answer|
    |---|---|
    |**Project Name?**|`frontend`|
    |**TypeScript?**|`Yes`|
    |**ESLint?**|`Yes`|
    |**Tailwind CSS?**|`Yes`|
    |**`src/` directory?**|`No`|
    |**Would you like to use React Compiler?**|`Yes` (Highly Recommended)|
    |**App Router?**|`Yes`|
    |**Import alias?**|`No`|
    
3. **Navigate into the New Directory:**
    
    ```
    cd frontend
    
    ```
    

## 2. Install Additional Dependencies

The component uses **Lucide React** for icons, which needs to be installed separately.

```
npm install lucide-react

```