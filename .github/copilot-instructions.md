Always use tabs for indentation.
Do not add comments.
Non-React filenames are kebab-case.
React component filenames and their names are PascalCase.
Primary CSS class names for React components are PascalCase and match the component name.
Variables and functions are camelCase.
Type and interface names are PascalCase.
Module-level constants are UPPER_SNAKE_CASE.
Server-side JavaScript imports include the .js extension.
JSON imports use `assert { type: 'json' }`.
Server-side route modules use a default export for the router instance.
Use `react-router` for routing, not `react-router-dom`.
Types do not need to be exported as they are imported globally by Vite.
Each route should be self contained in a file in the `./server/src/routes` directory which imports and uses `createRouter()` to create the router instance.
Each route should be self contained in the `./server/src/routes` directory and use `createRouter()`.
All new server-side routes must use `createRouter()` from `server/src/utilities/create-router.ts`.
`createRouter()` only supports POST requests with a JSON request body.
All routes should return a JSON object with the requested data as properties.
Route paths come from file location within `server/src/routes`.
Adapt GET or URL parameters to POST with parameters in the JSON body.
Specify the POST method and JSON body structure.
Do not modify `createRouter()` or use `express.Router()`.
Propose necessary updates to client-side code if a route is added or changed.
Follow stylistic preferences shown in examples or explicit instructions.
