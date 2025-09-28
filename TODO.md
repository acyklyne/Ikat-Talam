# TODO: Fix TypeError in ProductCard.tsx and Enhance Frontend-Backend Integration

## Tasks
- [x] Update IProduct interface in frontend/src/lib/data.ts to allow price as number | string
- [x] Modify ProductCard.tsx to convert price to number before toFixed
- [x] Test the application to ensure the error is resolved
- [x] Create useProducts hook for seamless API/static data switching
- [x] Update home page to use hook for featured products
- [x] Update products page to use hook
- [x] Ensure static data appears by default, with API data overriding if available
