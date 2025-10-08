# Ikat-Talam Feature Implementation Plan

## User Registration and Authentication
- [x] Install required packages: nodemailer, zod, bcryptjs, jsonwebtoken
- [x] Create user interface/type in frontend/src/lib/data.ts
- [x] Create registration page (frontend/src/app/register/page.tsx)
- [x] Update login page to use email/password instead of role selection
- [x] Add email verification system (send verification email on registration)
- [x] Create API routes for auth: /api/auth/register, /api/auth/login, /api/auth/verify-email
- [x] Create Django auth_app with JWT authentication endpoints
- [x] Add auth_app to Django settings and URLs
- [ ] Update AuthContext to use real backend auth instead of in-memory store
- [ ] Update frontend API calls to use new Django auth endpoints
- [ ] Test user registration and email verification
- [ ] Add user session management and protected routes

## Gallery Categorization
- [x] Add category field to IGalleryItem interface
- [x] Update gallery data with categories (e.g., "Nature", "Culture", "Artisans", "Festivals")
- [x] Update backend gallery model to include category field
- [x] Update gallery fixtures with categories
- [x] Add category filtering UI to gallery page
- [x] Implement category-based sorting and display

## Donation Transparency
- [ ] Add transparency section to donate page
- [ ] Include information about Cordillera charities and how donations are used
- [ ] Add donation impact metrics or stories
- [ ] Update donation form with better charity information

## Functional Contact Form
- [ ] Create API route for sending emails (/api/contact)
- [ ] Update InquiryForm to send emails via API instead of console.log
- [ ] Configure nodemailer with email service (Gmail, SendGrid, etc.)
- [ ] Add email templates for contact form responses

## Testing and Validation
- [ ] Test user registration and email verification
- [ ] Test gallery filtering functionality
- [ ] Test contact form email sending
- [ ] Update any affected components and ensure compatibility
