# FormFill Backend

This is the backend for the FormFill prototype. It provides endpoints to save and load encrypted form data, simulating IndexedDB using a local JSON file.

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Copy `.env.example` to `.env` and set your 32-byte AES key:
   ```sh
   cp .env.example .env
   # Edit .env to set AES_KEY
   ```
3. Start the server (with hot reload):

   ```sh
   npm run dev
   ```

   Or build and run:

   ```sh
   npm run build
   npm start
   ```

## Security & Best Practices

- All incoming data is strictly validated using [zod](https://github.com/colinhacks/zod). Validation errors are returned as structured arrays with field paths and clear messages for client-side handling.
- Form data is encrypted with AES-256-CBC using a key from `.env` (production would use secure key management) before being stored on disk (see `@src/utils/crypto`).
- CORS, helmet, and rate limiting are enabled.
- All API errors are handled gracefully, never exposing stack traces or sensitive details to clients.
- Logging is centralized and structured for info, warnings, and errors (see `@src/utils/logger`).
- TypeScript strict mode is enforced throughout the backend for type safety.

## Endpoints

- `POST /apis/forms/save` — Save form data (expects `{ firstName, email, expiryDays? }` in JSON body)
- `GET /apis/forms/load` — Load the latest form data if not expired
- `GET /apis/docs` — API documentation (OpenAPI/Redoc)

See the root README for project-wide best practices.
