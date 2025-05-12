# Lospec Pixel School



## Ports

- `3064`: the server (API) port
- `3364`: the client (web) port

## Environment Variables

### Client

- `VITE_API_URL`: the servers url (eg `http://localhost:3064`)
- `VITE_STRIPE_PUBLIC_KEY`: the public key for Stripe (in dev environment, this should be a test key (eg `pk_test_...`))

### Server

- `JWT_SECRET`: the JWT secret used to sign the tokens (a long random string)
- `STRIPE_SECRET_KEY`: the secret key for Stripe (in dev environment, this should be a test key (eg `sk_test_...`))

## Coding Style

- always use tabs for indentation
- filenames should be in `kebab-case` (eg `my-file-name.ts`)

### Routes

- Each route should be defined in a separate file in `/server/src/routes`, under a subfolder for the collection
- routes should import `createRouter` from `/server/src/utils/create-router.ts`
- data should only be passed to routes as `req.body` (and not as `req.params` or `req.query`)
- if data.body as used, a schema should be passed to `createRouter` as the first argument which uses `zod` to validate the data
- all routes should be exported as a default export

### Database
- new collections should be defined in `/server/src/database.ts` and exported
- indexes should be defined in `/server/src/database.ts` underneath the collection definition
- all database queries should be placed in `/server/queries`, under a subfolder for the collection
- all database queries should be named after what they do, the file name should not include the collection name