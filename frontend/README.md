# FormFill Frontend

This is the frontend for the FormFill prototype. It provides a simple React form to save and load encrypted form data using the backend API.

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the development server:

   ```sh
   npm run dev
   ```

   Or run both frontend and backend from the root with:

   ```sh
   cd ..
   npm run dev
   ```

## Approach & Best Practices

- Uses React (TypeScript) and Tailwind CSS (via CDN in index.html).
- Communicates with the backend via `/apis/forms/save` and `/apis/forms/load` endpoints.
- All API errors are handled gracefully with generic fallback messages (never exposes HTML or raw errors).
- Logs both errors and successes to the browser console for easier debugging.
- Responsive, accessible, keyboard-navigable, and ARIA-compliant UI.
- Strict TypeScript, error handling, and best practices are followed.
- Modular, reusable components like FormInputWithInlineError, Notification, Spinner.

See the root README for project-wide best practices.
