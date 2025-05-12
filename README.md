
# Image listing app (Challenge Brief (v3.5)

[x] Set up a NextJS project using the App router with TypeScript
[x] Use the ChakraUI component library for UI elements and styling.
[x] Ensure your product is responsive for mobile and desktop.
[x] Add a footer to your site that displays the challenge version.
[x] Have a blocking element (page/modal / etc) that prevents access to all other pages and data:
[x] On this blocking element, get a username and job title from the user.
[x] Save the user’s username and job title information in a way you best see fit so the data persists between reloads.
[x] Once the username and job title information has been entered, a user must be able to view this information in full.
[x] A user must be able to change this information after submitting it.
[x] Use the Apollo client to query a public GraphQL API.
[x] Ensure that you pick a GraphQL API and data structure that provides images. (rick and morty, stretch goal do all of them)
[x] Ensure the data and images are displayed.
[x] Ensure this data is not retrieved until the user has entered their username and job title information.
[x] Display the GraphQL API data as a paginated list of items on an “Information Page”.
[x] A user must be able to directly link (via URL) to a specific page of the paginated data.
[ ] When an item is clicked on the “Information Page”, it must open a modal that displays the information about that item.
[ ] Deploy on Vercel free tier.

TODOs

[x] Menu location
[x] Fix dialog show/hide behaviour
[x] Proper pagination (next/prev page and page #)
[] Fix dialog styles
[] Better card styles
[] Better grid styles
[] let you close dialog when editing
[] disable dialog continue button until both fields have entries


NOTE: Prefer to have as few dependencies as possible. Please follow this guideline during your test.
