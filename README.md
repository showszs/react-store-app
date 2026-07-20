# React Store App

A modern, full-featured e-commerce and content management application built with React, TypeScript, and Vite. This application provides a comprehensive platform for browsing products, managing user accounts, and viewing content with server integration.

## Features

- **Product Management**: Browse, filter, and manage a catalog of products with detailed information
- **Posts/Content Management**: View and manage blog posts and content articles
- **User Management**: Manage user profiles and user information
- **Authentication**: Secure login system with form validation
- **State Management**: Redux Toolkit for centralized state management
- **Form Validation**: Formik with Yup for robust form validation
- **HTTP Client**: Axios for API integration
- **Responsive UI**: Modern, responsive user interface with React Icons
- **Type Safety**: Full TypeScript support for enhanced code reliability
- **Fast Development**: Vite for rapid development and optimized builds

## Tech Stack

- **Frontend Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.3.1
- **State Management**: Redux Toolkit 2.11.2 & React-Redux 9.2.0
- **Routing**: React Router 7.14.2
- **HTTP Client**: Axios 1.15.2
- **Form Management**: Formik 2.4.9
- **Form Validation**: Yup 1.7.1
- **UI Icons**: React Icons 5.6.0
- **Linting**: ESLint 9.39.1
- **CSS**: PostCSS with Autoprefixer

## Project Structure

```
src/
├── components/
│   ├── forms/              # Form components (SignForm, etc.)
│   ├── modal/              # Modal dialog components
│   ├── products/           # Product-related components
│   ├── ui/                 # Reusable UI components (Navbar, Footer)
│   └── AddProductButton.tsx
├── pages/
│   ├── Products.tsx        # Products page
│   ├── Posts.tsx           # Posts/content page
│   ├── Users.tsx           # Users management page
│   ├── NotFound.tsx        # 404 page
│   └── *.module.css        # Page-specific styles
├── redux/
│   ├── slices/             # Redux slices for state management
│   └── store.ts            # Redux store configuration
├── types/                  # TypeScript type definitions
├── hooks/                  # Custom React hooks
├── utils/                  # Utility functions
├── data/                   # Static data or constants
├── modals/                 # Modal-related logic
├── App.tsx                 # Main application component
├── main.tsx                # Application entry point
└── index.css               # Global styles
```

## Installation

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn package manager

### Setup

Install dependencies:

```bash
npm install
```

## Getting Started

### Development Server

Start the development server:

```bash
npm run dev
```


### Production Build

Build the application for production:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Code Quality

Run ESLint to check code quality:

```bash
npm run lint
```

##  Key Components

### Pages

- **Products Page**: Displays product catalog with filtering and management capabilities
- **Posts Page**: Shows blog posts and content articles
- **Users Page**: Displays user information 
- **Login Page**: Authentication form with validation (Mock Authentication)
- **NotFound Page**: 404 error handling

### Components

- **Navbar**: Main navigation component with links to different sections
- **Footer**: Footer component for site-wide footer content
- **Forms**: Reusable form components with Formik integration
- **Modals**: Modal dialogs for user interactions
- **Products Components**: Specialized components for product display and management

## API Integration

The application uses Axios for API requests. Configure your API endpoints in the Redux slices and utility functions. The store is configured with Redux Toolkit for efficient state management.

### API Endpoints Structure

API integration is typically configured in:

- `src/redux/slices/` - API calls within Redux thunks
- `src/utils/` - API client and helper functions

## Form Validation

The application uses Formik for form management and Yup for schema validation. This combination provides:

- Client-side validation
- Error message display
- Form state management
- Submission handling

## Styling

The project uses CSS modules for component-scoped styling, ensuring no style conflicts. Global styles are defined in `src/index.css`.

## Redux Store Structure

The Redux store is organized using Redux Toolkit slices pattern:

- Centralized state management
- Async thunks for API calls
- Slice-based organization for scalability

Access the store in components using React-Redux hooks:

```tsx
import { useDispatch, useSelector } from 'react-redux';
```

## Routing

The application uses React Router v7 for client-side routing:

- Products: `/`
- Posts: `/posts`
- Users: `/users`
- Login: `/login`
- 404: `*` (catch-all route)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview production build

## Browser Support

The application supports all modern browsers with ES2020+ support.


