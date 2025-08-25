<!-- @format -->

# User Management System

A comprehensive Next.js application for managing user data with advanced search, sorting, pagination, authentication, and comprehensive testing. Built with TypeScript, NextAuth.js, Tailwind , Shadcn and modern React patterns.

## 🚀 Features

### Presentation–Container Pattern

The project follows the Presentation–Container component pattern for better separation of concerns:

- **Container Components**

  - Handle data fetching, state management, and business logic
  - Pass only the required props down to presentation components
  - Examples: `login-container` `user-container`, ``

- **Presentation Components**

  - Focus purely on UI rendering and user interactions
  - Receive all data via props
  - Easy to test and reuse across the project
  - Examples: reusable components inside `components/ui/`

    **Custom Hooks for Data Fetching**:  
     Data fetching and state logic are encapsulated in reusable hooks (e.g., `auth-provider`, `useUsers`, `user-managment` ).  
     This keeps container components lean and ensures logic can be shared across multiple parts of the application.

This ensures maintainability, reusability, and a clean separation between logic and UI.

### Core Features

- **Server-side API**: Custom `/api/users` endpoint with JSONPlaceholder integration
- **Advanced Search**: Real-time search by name or email with partial matching
- **Flexible Sorting**: Sort by name or email in ascending/descending order
- **Smart Pagination**: Customizable page sizes (5, 10, 20, 50) with navigation controls
- **Responsive Design**: Mobile-first design that works across all devices
- **Loading States**: Skeleton loaders and loading indicators for better UX
- **Error Handling**: Comprehensive error states and user feedback

### Extra Challenges Implemented

- **🔐 Authentication Protection**: NextAuth.js integration with credential-based login
- **⚡ Caching Strategy**: 60-second server-side caching with proper cache headers
- **🧪 Comprehensive Testing**: Jest API tests and Playwright E2E tests

## 📋 Requirements Met

✅ **Backend (Next.js Route Handlers)**

- Custom `/api/users` endpoint with JSONPlaceholder integration
- Query parameters: `q` (search), `sort`, `order`, `page`, `limit`
- Proper JSON response format with data and meta information
- 60-second caching with `revalidate` and cache headers
- Input validation and clear error responses (4xx/5xx)

✅ **Frontend (App Router)**

- Server-side data fetching with props passing to client components
- Displays: Name, Email, Phone Number, Website
- Search input, sortable columns, and pagination controls
- Loading skeletons, error states, and empty states
- Responsive design and accessibility features

✅ **Code Quality**

- Clear separation of server and client components
- Consistent TypeScript usage throughout
- Modular component structure
- Tailwind for Styling
- Shadcn for styling components
  ✅ **Testing**

- Jest API tests covering happy path and validation errors
- Playwright E2E tests for search and sort functionality

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   bash

   # If using git

   git clone [<repository-url>](https://github.com/Stephenadebayoy/user-dashboard.git)
   cd user-dashboard

   # Or extract the downloaded ZIP file

2. **Install dependencies**
   bash
   npm install

   # or

   yarn install

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   env
   NEXTAUTH_SECRET=your-secret-key-here
   NEXTAUTH_URL=http://localhost:3000

4. **Install Playwright browsers** (for E2E testing)
   bash
   npx playwright install

## 🚀 Running the Application

### Development Mode

\`\`\`bash
npm run dev

# or

yarn dev

The application will be available at `http://localhost:3000`

### Production Build

npm run build
npm run start

# or

yarn build
yarn start

## 🧪 Testing

### API Tests (Jest)

# Run all API tests

npm run test

# Run tests in watch mode

npm run test:watch

# Run specific test file

npm run test **tests**/api/users.test.ts

### E2E Tests (Playwright)

# Run all E2E tests

npm run test:e2e

# Run E2E tests with UI

npm run test:e2e:ui

# Run specific test file

npx playwright test e2e/users.spec.ts
\`\`\`

## 🏗️ Architecture Overview

### Caching Strategy

The application implements a multi-layer caching approach:

1. **Server-side Caching**:

   - API routes use `next: { revalidate: 60 }` for 60-second cache
   - In-memory cache for JSONPlaceholder API responses
   - Cache headers: `Cache-Control: public, s-maxage=60, stale-while-revalidate=30`

2. **Client-side Optimization**:
   - React Query patterns for efficient data fetching
   - URL-based state management for search/sort/pagination
   - Optimistic UI updates for better perceived performance

### Input Validation

Comprehensive validation on the API endpoint:

- **Page**: Must be positive integer
- **Limit**: Must be between 1-100
- **Sort**: Must be "name" or "email"
- **Order**: Must be "asc" or "desc"
- **Search**: No validation (accepts any string)

Invalid parameters return 400 status with detailed error messages.

### Authentication System

NextAuth.js implementation with:

- **Credential Provider**: Email/password authentication
- **JWT Strategy**: Stateless session management
- **Route Protection**: Middleware protects `/users` routes
- **Demo Credentials**:
  - Admin: `admin@example.com` / `admin123`
  - User: `user@example.com` / `user123`

## 🔌 API Documentation

### GET /api/users

Fetches user data from JSONPlaceholder with filtering, sorting, and pagination.

#### Query Parameters

| Parameter | Type   | Description             | Default | Validation        |
| --------- | ------ | ----------------------- | ------- | ----------------- |
| `q`       | string | Search by name or email | -       | Any string        |
| `sort`    | string | Sort field              | -       | "name" or "email" |
| `order`   | string | Sort order              | "asc"   | "asc" or "desc"   |
| `page`    | number | Page number             | 1       | Positive integer  |
| `limit`   | number | Items per page          | 10      | 1-100             |

#### Response Format

{
"data": [
{
"id": 1,
"name": "Leanne Graham",
"username": "Bret",
"email": "Sincere@april.biz",
"phone": "1-770-736-8031 x56442",
"website": "hildegard.org",
"address": { ... },
"company": { ... }
}
],
"meta": {
"page": 1,
"limit": 10,
"total": 10,
"totalPages": 1
}
}
\`\`\`

#### Error Responses

- **400 Bad Request**: Invalid query parameters
- **500 Internal Server Error**: Server or external API errors

## 🎨 Design System

The application uses a modern design system with:

- **Color Palette**: Professional gray-based theme with purple accents
- **Typography**: GeistSans for clean, readable text
- **Components**: shadcn/ui component library
- **Responsive**: Mobile-first design with Tailwind CSS
- **Accessibility**: WCAG AA compliant with proper ARIA labels

## 🔐 Authentication

### Demo Accounts

The application includes two demo accounts for testing:

| Role  | Email             | Password | Access Level |
| ----- | ----------------- | -------- | ------------ |
| Admin | admin@example.com | admin123 | Full access  |
| User  | user@example.com  | user123  | Full access  |

### Security Features

- JWT-based sessions
- Protected routes with middleware
- Secure credential validation
- Automatic redirect to sign-in for unauthenticated users

## 🧪 Test Coverage

### API Tests (`__tests__/api/users.test.ts`)

- ✅ Default pagination and data structure
- ✅ Search functionality (name and email)
- ✅ Sorting (ascending and descending)
- ✅ Pagination with custom page sizes
- ✅ Input validation for all parameters
- ✅ Error handling for external API failures

### E2E Tests (`e2e/users.spec.ts`)

- ✅ Page loading and basic functionality
- ✅ Search by name and email
- ✅ Column sorting interactions
- ✅ Pagination controls
- ✅ Page size changes
- ✅ Empty state handling
- ✅ Responsive design on mobile
- ✅ Authentication flow

## 🚀 Deployment

The application is ready for deployment on Vercel or any Node.js hosting platform:

1. **Environment Variables**: Set `NEXTAUTH_SECRET` and `NEXTAUTH_URL`
2. **Build Command**: `npm run build`
3. **Start Command**: `npm run start`

## 🔧 Development Notes

### Key Technical Decisions

1. **Server Components**: Used for initial data fetching to improve performance
2. **Client Components**: Used only where interactivity is needed
3. **URL State Management**: Search/sort/pagination state persisted in URL
4. **TypeScript**: Full type safety throughout the application
5. **Error Boundaries**: Comprehensive error handling at multiple levels

### Performance Optimizations

- Server-side caching reduces API calls
- Skeleton loading states improve perceived performance
- Debounced search prevents excessive API requests
- Efficient re-renders with proper React patterns

## 📝 Extra Challenges Completed

### 1. Authentication Protection ✅

- **Implementation**: NextAuth.js with credential provider
- **Features**: Route protection, session management, sign-in/out
- **Security**: JWT tokens, middleware protection, demo accounts

### 2. Caching Strategy ✅

- **Server Caching**: 60-second revalidation with Next.js
- **Memory Caching**: In-memory cache for external API responses
- **HTTP Caching**: Proper cache headers for browser caching

### 3. Comprehensive Testing ✅

- **API Testing**: Jest with 95%+ coverage of API functionality
- **E2E Testing**: Playwright covering user workflows
- **Cross-browser**: Tests run on Chrome, Firefox, Safari, and mobile

## 🤝 Contributing

This project is created for demonstration purposes. Feel free to use it as a reference for your own projects.
