# Online Job Application Portal - Frontend

A modern React frontend for the Online Job Application Portal built with Vite, Tailwind CSS, and React Router.

## Features

- **Authentication**: JWT-based login/register with role-based access control
- **Job Listings**: Browse, search, and filter job opportunities
- **User Dashboard**: Track applications and manage saved jobs
- **Employer Dashboard**: Post jobs and manage applications
- **Admin Dashboard**: System overview and user management
- **Responsive Design**: Mobile-first design with Tailwind CSS

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Lucide React** - Icon library

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── common/         # Reusable components
│   ├── job/           # Job-related components
│   └── layout/        # Layout components (Navbar, Sidebar)
├── context/           # React context providers
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── services/          # API service layer
└── utils/             # Utility functions
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Setup**
   - Ensure your Spring Boot backend is running on `http://localhost:8080`
   - The Vite proxy is configured to forward `/api` requests to the backend

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

4. **Build for Production**
   ```bash
   npm run build
   ```

## API Integration

The frontend integrates with the Spring Boot backend through:

- **Authentication Service**: Login, register, and JWT token management
- **Job Service**: CRUD operations for jobs and applications
- **API Helper**: Axios instance with JWT interceptors

### Key API Endpoints Expected

```
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/me
GET  /api/jobs
GET  /api/jobs/{id}
POST /api/jobs/{id}/apply
GET  /api/jobs/saved
POST /api/jobs/{id}/save
DELETE /api/jobs/{id}/save
GET  /api/applications/my
```

## User Roles

- **USER**: Job seekers who can browse and apply for jobs
- **EMPLOYER**: Companies who can post jobs and manage applications
- **ADMIN**: System administrators with full access

## Features by Role

### Job Seekers (USER)
- Browse and search job listings
- View job details
- Apply for jobs with cover letter and resume
- Save jobs for later
- Track application status

### Employers (EMPLOYER)
- Post new job listings
- Manage job postings
- Review applications
- Update application status

### Administrators (ADMIN)
- System overview dashboard
- User management
- Job moderation
- System analytics

## Development Notes

- JWT tokens are stored in localStorage
- Protected routes check user authentication and roles
- API calls include automatic token refresh handling
- Responsive design works on mobile, tablet, and desktop
- Form validation and error handling throughout the app

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)