# Swiggy Clone

A responsive food-ordering UI clone built with **React + Tailwind CSS + Redux Toolkit**, featuring live API integration for restaurant listings, menus, cart, Instamart-style products, and Dineout-style browsing.

## LINK- https://swiggy-clone-13.netlify.app/

## Features

- Home page with Swiggy-inspired sections and modern UI
- Restaurant listing with:
  - Search
  - Sorting (rating / delivery time)
  - Loading and error states
- Restaurant menu page with:
  - Veg / Non-veg filtering
  - Expand/collapse menu categories
  - Add-to-cart controls
- Dish search page for each restaurant
- Cart / Checkout with:
  - Quantity increment/decrement
  - Remove item
  - Clear cart
  - Grand total calculation
- Instamart section (internal page)
- Dineout section (internal page)
- Footer and improved app-wide styling

## Tech Stack

- React
- React Router
- Redux Toolkit
- React Redux
- Tailwind CSS
- Parcel

## Project Structure

```txt
src/
  Components/
  Stored/
  Utils/
```

## Routes

- `/` - Home
- `/restaurant` - Restaurant listing
- `/city/delhi/:id` - Restaurant menu
- `/city/delhi/:id/search` - Search dishes in a restaurant
- `/checkout` - Cart checkout
- `/instamart` - Instamart page
- `/dineout` - Dineout page

## Setup

```bash
npm install
```

### Run in development (Parcel)

```bash
npx parcel src/index.html
```

### Build for production

```bash
npx parcel build src/index.html
```

## API Notes

- Restaurant and menu APIs use the CORS proxy:
  - `https://cors-anywhere.herokuapp.com/`
- If API requests fail, open/enable proxy access first:
  - https://cors-anywhere.herokuapp.com/corsdemo
- Instamart section uses `https://dummyjson.com/products` for product data.

## GitHub

Repository: `https://github.com/srthk-13/Swiggy-Clone.git`

