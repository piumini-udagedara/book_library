# Book Library Application

An interactive, responsive book library application built with React, TypeScript, Vite, Ant Design, and styled-components. This application allows you to manage your book collection with features like adding, editing, deleting books, searching, and toggling between grid and list views.

## Features

- **View Books**: Display books in grid or list view
- **Search**: Search books by title or author
- **Add Books**: Add new books to your library
- **Edit Books**: Update existing book details
- **Delete Books**: 12pxove books with confirmation dialog
- **Ratings**: Visual star ratings for each book
- **Responsive**: Works on mobile, tablet, and desktop
- **Modern UI**: Beautiful, intuitive interface powered by Ant Design

## Prerequisites

- Node.js (v16 or higher)
- npm

## Installation

1. Install dependencies:

```bash
npm install
```

2. Install JSON Server (if not already installed):

```bash
npm install --save-dev json-server
```

## Running the Application

You need to run both the JSON Server and the Webpack development server:

### Terminal 1 - Start JSON Server:

```bash
npm run server
```

This will start the JSON Server on `http://localhost:3001`

### Terminal 2 - Start the Development Server:

```bash
npm run dev
```

This will start the Vite development server on `http://localhost:5173`

Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`).

## Project Structure

```
book_library/
├── db.json                 # JSON Server database
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── src/
│   ├── components/         # React components
│   │   ├── Header.tsx      # Header with search and view toggle
│   │   ├── BookCard.tsx    # Book card component
│   │   ├── BookForm.tsx    # Add/edit form component
│   │   └── DeleteConfirmation.tsx  # Delete confirmation dialog
│   ├── services/           # API service layer
│   │   └── api.ts
│   ├── types/              # TypeScript types
│   │   └── book.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
└── package.json
```

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Next-generation frontend build tool
- **Ant Design 5** - Enterprise-class UI component library
- **styled-components** - CSS-in-JS styling solution
- **JSON Server** - Mock REST API

## API Endpoints

The application uses JSON Server with the following endpoints:

- `GET /books` - Fetch all books
- `GET /books/:id` - Fetch a single book
- `POST /books` - Create a new book
- `PUT /books/:id` - Update a book
- `DELETE /books/:id` - Delete a book

## Available Scripts

- `npm run dev` - Start Vite development server
- `npm run server` - Start JSON Server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

## Features in Detail

### Book Management

- Add new books with form validation
- Edit existing book details
- Delete books with confirmation dialog
- Form validation for required fields using Ant Design Form

### View Modes

- **Grid View**: Card-based layout for visual browsing
- **List View**: Compact horizontal layout for quick scanning

### Search & Filter

- Real-time search by title or author
- Dynamic filtering as you type using Ant Design Search component

### Responsive Design

- Mobile-friendly interface
- Tablet optimized layout
- Desktop enhanced experience
- All components styled with styled-components for better responsiveness

## Build for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Notes

- Make sure JSON Server is running before using the application
- The application expects JSON Server to be running on port 3001
- Book cover images should be valid URLs
- All form fields have validation to ensure data integrity
- The application uses Ant Design's ConfigProvider for theme customization
- All styling is done with styled-components for component-scoped styles
