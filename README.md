# Library Management System

A full-stack web application for managing personal book collections, built with .NET 6 backend and React TypeScript frontend. This system allows users to register, authenticate, and manage their personal library with full CRUD operations.

## Features

### 🔐 User Authentication
- User registration with email and username
- Secure login with JWT token authentication
- Password hashing with BCrypt
- Persistent authentication sessions
- Secure logout functionality

### 📚 Book Management
- View Books: Display all books in a responsive card layout
- Add Book: Create new book records with title, author, and description
- Edit Book: Update existing book information
- Delete Book: Remove books with confirmation dialog
- User-specific Collections: Each user can only see and manage their own books

### 🎨 Modern UI/UX
- Responsive design that works on desktop and mobile devices
- Professional styling with Bootstrap 5
- Smooth animations and transitions
- Loading states and error handling
- Input validation with helpful error messages

## Technology Stack

### Backend (.NET 6)
- Framework: ASP.NET Core 6
- Database: SQLite with Entity Framework Core
- Authentication: JWT tokens with Microsoft Identity
- Password Security: BCrypt hashing
- API: RESTful API design
- Port: HTTPS 7155 / HTTP 5090

### Frontend (React TypeScript)
- Framework: React 18 with TypeScript
- UI Library: Bootstrap 5 + React Bootstrap
- HTTP Client: Axios with interceptors
- State Management: React Context API
- Icons: Font Awesome
- Port: 3000

### Database Schema
- Users Table: Id, Username, Email, PasswordHash, CreatedAt
- Books Table: Id, Title, Author, Description, UserId (FK), CreatedAt
- Relationships: One-to-Many (User → Books)

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- npm or yarn
- Visual Studio 2022 or VS Code

## Installation & Setup

### 1. Clone the Repository

git clone https://github.com/SandaminiObadage/Library_MS.git
cd Library_MS_New


### 2. Backend Setup (.NET 6)

####  Using Visual Studio
1. Open Visual Studio 2022
2. Click "Open a project or solution"
3. Navigate to `backend/LibraryAPI/LibraryAPI.sln` and open it
4. Right-click on the solution in Solution Explorer → "Restore NuGet Packages"
5. Build the project: `Build` → `Build Solution` (or press `Ctrl+Shift+B`)
6. Set LibraryAPI as startup project (right-click project → "Set as Startup Project")
7. Run the project: Press `F5` or click the green "Start" button
8. Visual Studio will automatically open the browser to the API URL
# Run database migrations (if needed)
dotnet ef database update

The backend will run at:
- HTTPS: https://localhost:7155
- HTTP: http://localhost:5090

### 3. Frontend Setup (React)

# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server
npm start

The frontend will run at: http://localhost:3000

## API Endpoints

### Authentication
- POST /api/Auth/register - User registration
- POST /api/Auth/login - User login

### Books (Protected Routes)
- GET /api/Books - Get user's books
- GET /api/Books/{id} - Get specific book
- POST /api/Books - Create new book
- PUT /api/Books/{id} - Update book
- DELETE /api/Books/{id} - Delete book

## Project Structure

```
Library_MS_New/
├── backend/
│   ├── LibraryAPI.sln              # Visual Studio solution file
│   ├── .vs/                       
│   └── LibraryAPI/
│       ├── Program.cs              # Application startup
│       ├── LibraryAPI.csproj       # Project configuration file
│       ├── library.db              # SQLite database file
│       ├── Controllers/            # API controllers
│       │   ├── AuthController.cs   # Authentication endpoints
│       │   ├── BooksController.cs  # Book CRUD operations
│       │  
│       ├── Models/                 # Data models & DTOs
│       │   ├── User.cs            # User entity model
│       │   ├── Book.cs            # Book entity model
│       │   ├── CreateBookDto.cs   # Book creation DTO
│       │   ├── UpdateBookDto.cs   # Book update DTO
│       │   ├── LoginDto.cs        # Login request DTO
│       │   ├── RegisterDto.cs     # Registration request DTO
│       │   ├── AuthResponseDto.cs # Authentication response DTO
│       │   └── ErrorViewModel.cs  # Error handling model
│       ├── Data/                   # Database context
│       │   └── AppDbContext.cs    # Entity Framework context
│       ├── Services/               # Business logic services
│       │   ├── JwtService.cs      # JWT token management
│       │   └── PasswordService.cs # Password hashing service
│       ├── Migrations/             # Entity Framework migrations
│       │   ├── 20250807154814_InitialCreateWithAuthentication.cs
│       │   ├── 20250807154814_InitialCreateWithAuthentication.Designer.cs
│       │   └── AppDbContextModelSnapshot.cs
│       ├── Properties/             # Project properties
│         └── launchSettings.json # Development server settings
│       
├── frontend/
│   ├── package.json               # npm dependencies and scripts
│   ├── tsconfig.json             # TypeScript configuration
│   ├── .gitignore                # Git ignore pattern        
│   └── src/                     # React source code
│       ├── App.tsx              # Main application component
│       ├── App.css              # Global application styles
│       ├── assets/              # Static assets
│       │   └── images/
│       │       └── library.png  # Hero section image
│       ├── components/          # React UI components
│       │   ├── About.tsx        # About page component
│       │   ├── Header.tsx       # Navigation header component
│       │   ├── HeroSection.tsx  # Landing page hero section
│       │   ├── BookList.tsx     # Books display component
│       │   ├── BookForm.tsx     # Add/Edit book form
│       │   ├── LoginModal.tsx   # Login modal dialog
│       │   ├── RegisterModal.tsx # Registration modal dialog
│       │   └── Footer.tsx       # Page footer component
│       ├── contexts/            # React Context providers
│       │   └── AuthContext.tsx  # Authentication state management
│       ├── services/            # API service layer
│       │   ├── authService.ts   # Authentication API calls
│       │   └── bookService.ts   # Book CRUD API operations
│       ├── types/               # TypeScript type definitions
│       │   ├── Auth.ts          # Authentication-related types
│       │   └── Book.ts          # Book entity types
│       └── utils/               # Utility functions
│           └── jwtUtils.ts      # JWT token utility functions
└── README.md                    # Project documentation



## Usage

### 1. User Registration & Login
1. Open http://localhost:3000
2. Click "Register" to create a new account
3. Fill in username, email, and password
4. After registration, click "Sign In" to log in
5. Enter your credentials to access the application

### 2. Managing Books
1. Once logged in, click "Add New Book" to create a book
2. Fill in the title, author, and description
3. Click "Save Book" to add it to your collection
4. Use "Edit" to modify existing books
5. Use "Delete" to remove books from your collection
6. Click "Logout" when finished

## Configuration

### Backend Configuration (appsettings.json)
json
{
  "Jwt": {
    "Key": "your-super-secret-jwt-key-minimum-256-bits",
    "Issuer": "LibraryAPI",
    "Audience": "LibraryAPI"
  },
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=library.db"
  }
}


### Frontend Configuration
Update the API URL in `src/services/authService.ts` and `src/services/bookService.ts` if your backend runs on a different port.

## Security Features

- JWT Authentication: Secure token-based authentication
- Password Hashing: BCrypt with salt for password security
- CORS Configuration: Properly configured for development
- Input Validation: Both client-side and server-side validation
- User Isolation: Users can only access their own books


### Development Tips
- Check browser console for detailed error messages
- Use browser developer tools to inspect network requests
- Ensure both backend and frontend are running simultaneously
- Clear localStorage if authentication issues persist

## Scripts

### Backend
dotnet run                 # Start the server
dotnet build              # Build the project
dotnet test               # Run tests
dotnet ef migrations add  # Add migration
dotnet ef database update # Apply migrations


### Frontend
npm start                # Start development server
npm run build           # Build for production
npm test                # Run tests
npm run eject           # Eject from Create React App


## License

This project is licensed under the MIT License - see the LICENSE file for details.