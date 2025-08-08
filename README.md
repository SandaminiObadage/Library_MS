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
- **View Books**: Display all books in a responsive card layout
- **Add Book**: Create new book records with title, author, and description
- **Edit Book**: Update existing book information
- **Delete Book**: Remove books with confirmation dialog
- **User-specific Collections**: Each user can only see and manage their own books

### 🎨 Modern UI/UX
- Responsive design that works on desktop and mobile devices
- Professional styling with Bootstrap 5
- Smooth animations and transitions
- Loading states and error handling
- Input validation with helpful error messages

## Technology Stack

### Backend (.NET 6)
- **Framework**: ASP.NET Core 6
- **Database**: SQLite with Entity Framework Core
- **Authentication**: JWT tokens with Microsoft Identity
- **Password Security**: BCrypt hashing
- **API**: RESTful API design
- **Port**: HTTPS 7155 / HTTP 5090

### Frontend (React TypeScript)
- **Framework**: React 18 with TypeScript
- **UI Library**: Bootstrap 5 + React Bootstrap
- **HTTP Client**: Axios with interceptors
- **State Management**: React Context API
- **Icons**: Font Awesome
- **Port**: 3000

### Database Schema
- **Users Table**: Id, Username, Email, PasswordHash, CreatedAt
- **Books Table**: Id, Title, Author, Description, UserId (FK), CreatedAt
- **Relationships**: One-to-Many (User → Books)

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- npm or yarn
- Visual Studio 2022 or VS Code

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Library_MS
```

### 2. Backend Setup (.NET 6)
```bash
# Navigate to backend directory
cd backend/LibraryAPI/LibraryAPI

# Restore NuGet packages
dotnet restore

# Build the project
dotnet build

# Run database migrations (if needed)
dotnet ef database update

# Start the backend server
dotnet run
```
The backend will run at:
- HTTPS: https://localhost:7155
- HTTP: http://localhost:5090

### 3. Frontend Setup (React)
```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```
The frontend will run at: http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/Auth/register` - User registration
- `POST /api/Auth/login` - User login

### Books (Protected Routes)
- `GET /api/Books` - Get user's books
- `GET /api/Books/{id}` - Get specific book
- `POST /api/Books` - Create new book
- `PUT /api/Books/{id}` - Update book
- `DELETE /api/Books/{id}` - Delete book

## Project Structure

```
Library_MS/
├── backend/
│   └── LibraryAPI/
│       └── LibraryAPI/
│           ├── Controllers/        # API controllers
│           │   ├── AuthController.cs
│           │   └── BooksController.cs
│           ├── Models/            # Data models & DTOs
│           │   ├── User.cs
│           │   ├── Book.cs
│           │   ├── CreateBookDto.cs
│           │   └── UpdateBookDto.cs
│           ├── Data/              # Database context
│           ├── Services/          # Business logic
│           │   ├── JwtService.cs
│           │   └── PasswordService.cs
│           └── Program.cs         # Application startup
├── frontend/
│   └── src/
│       ├── components/           # React components
│       │   ├── Header.tsx
│       │   ├── HeroSection.tsx
│       │   ├── BookList.tsx
│       │   ├── BookForm.tsx
│       │   ├── LoginModal.tsx
│       │   └── RegisterModal.tsx
│       ├── contexts/            # React Context
│       │   └── AuthContext.tsx
│       ├── services/           # API services
│       │   ├── authService.ts
│       │   └── bookService.ts
│       ├── types/             # TypeScript definitions
│       │   ├── Auth.ts
│       │   └── Book.ts
│       ├── utils/            # Utility functions
│       │   └── jwtUtils.ts
│       └── App.tsx           # Main application
└── README.md                # This file
```

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
```json
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
```

### Frontend Configuration
Update the API URL in `src/services/authService.ts` and `src/services/bookService.ts` if your backend runs on a different port.

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: BCrypt with salt for password security
- **CORS Configuration**: Properly configured for development
- **Input Validation**: Both client-side and server-side validation
- **SQL Injection Protection**: Entity Framework parameterized queries
- **User Isolation**: Users can only access their own books

## Troubleshooting

### Common Issues
1. **CORS Errors**: Ensure backend allows requests from `http://localhost:3000`
2. **SSL Certificate**: Accept the self-signed certificate for HTTPS
3. **Database Issues**: Delete `library.db` and restart backend to recreate
4. **Port Conflicts**: Change ports in configuration if needed
5. **JWT Errors**: Check JWT key configuration in appsettings.json

### Development Tips
- Check browser console for detailed error messages
- Use browser developer tools to inspect network requests
- Ensure both backend and frontend are running simultaneously
- Clear localStorage if authentication issues persist

## Scripts

### Backend
```bash
dotnet run                 # Start the server
dotnet build              # Build the project
dotnet test               # Run tests
dotnet ef migrations add  # Add migration
dotnet ef database update # Apply migrations
```

### Frontend
```bash
npm start                # Start development server
npm run build           # Build for production
npm test                # Run tests
npm run eject           # Eject from Create React App
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions or support, please contact the development team.

---

**Built with ❤️ for efficient library management**
