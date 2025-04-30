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
