# FormFill Project

A secure, modern full-stack form prototype with AES-256 encryption, React frontend, and Node.js backend.

## Project Structure

- `backend/` — Node.js + Express API (TypeScript, AES-256, simulated IndexedDB)
- `frontend/` — React + TypeScript + Tailwind (via CDN)

## Setup

### 1. Install dependencies

- From the project root:
  ```sh
  npm install
  ```
- Or from backend and frontend:
  ```sh
  cd backend && npm install
  cd ../frontend && npm install
  ```

### 2. Set up environment variables:

- Copy `backend/.env.example` to `backend/.env` and set a 32-byte `AES_KEY` (production would use secure key management).

### 3. Run both frontend and backend concurrently:

- From the project root:

  ```sh
  npm run dev
  ```

- Or from backend and frontend:

  ```sh
  cd backend && npm run dev
  cd ../frontend && npm run dev
  ```

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:3001](http://localhost:3001)

## Security & Best Practices

- Form data is encrypted with AES-256-CBC using a key from `.env` (production would use secure key management) before being stored on disk.
- CORS, helmet, and rate limiting are enabled on the backend.
- Centralized, structured logging for all backend events.
- Never commit `.env` or secrets to version control.
- All backend data are validated using zod with clear, structured error reporting.
- API errors are handled gracefully and never leak sensitive information.
- Only generic error messages are sent to the frontend.
- TypeScript strict mode and up-to-date dependencies throughout the project.

### Code Quality

- Strict TypeScript everywhere (no `any` except for a known NodeJS + TypeScript issue, no non-null assertions, no `unknown` casts).
- Modular backend with routers, schemas, and utilities.
- Path aliases (`@src/*`) for clean imports.
- All code is commented and uses JSDoc for functions/utilities.

### Frontend

- React + TypeScript with strict mode.
- Tailwind CSS (CDN) for all styling, using only default classes for CDN compatibility.
- Responsive, accessible, keyboard-navigable, and ARIA-compliant UI.
- Notification system with auto-dismiss, focus management, and transitions.
- Modern, trending color palette for excellent UX.
- All API errors are handled gracefully with generic fallback messages.
- Logging for both errors and successes in the browser console.
- Modular, reusable components like FormInputWithInlineError, Notification, Spinner.

### Dev Experience

- NPM workspaces for monorepo management.
- Concurrently runs both frontend and backend for easy development.
- Hot reload for both frontend (Vite) and backend (Nodemon + ts-node).

See `backend/README.md` and `frontend/README.md` for more details.

### Some Screenshots

1. Form on load:
![image](https://github.com/user-attachments/assets/db0d3125-ee6a-4006-aaf4-020b72de7cfc)
2. Form on validations:
![image](https://github.com/user-attachments/assets/ae0424ac-d4ad-4f4f-a419-2a443f44a26f)
![image](https://github.com/user-attachments/assets/aeb12d3c-22ee-4ce8-97ea-724ec7a482de)
3. Form on saving successfully:
![image](https://github.com/user-attachments/assets/8e303e4e-6027-4e82-9047-74018c7a7598)
4. Form on loading successfully:
![image](https://github.com/user-attachments/assets/75a582e6-2049-41dd-93bd-7f8962ba6753)
5. Form on saving failed:
![image](https://github.com/user-attachments/assets/48cf67da-db4b-4c91-9a73-38c2e468201b)
6. Form on loading failed:
![image](https://github.com/user-attachments/assets/aa5136f4-858c-468f-8133-fd40097eac86)
![image](https://github.com/user-attachments/assets/d2e1d617-1298-4c55-80d4-3ee87c81affb)
8. Form responsiveness:
![image](https://github.com/user-attachments/assets/004a903a-4682-4239-86e4-36c340f2af13)
![image](https://github.com/user-attachments/assets/91771d47-be5f-4216-b780-bcf672b4ff66)
9. Save endpoint validations:
![image](https://github.com/user-attachments/assets/095007f1-8867-4a2c-be85-b7bc046986e6)
![image](https://github.com/user-attachments/assets/c31b3041-d613-4ff0-9e15-008ed00dbacc)
