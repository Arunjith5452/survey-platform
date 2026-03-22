# MERN Stack Survey Form Application

A full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to submit survey forms and provides an admin dashboard to view and manage submissions.

## 🌟 Features

### User Features
- **Survey Form Submission**: Users can fill out a comprehensive survey form with the following fields:
  - Full Name
  - Gender (Male, Female, Other, Prefer not to say)
  - Nationality
  - Email Address
  - Phone Number
  - Address
  - Message
  
- **Form Validation**: Client-side and server-side validation for all fields
- **User Feedback**: Toast notifications for success/error states
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS and shadcn/ui components

### Admin Features
- **Authentication**: Secure JWT-based admin login system
- **Dashboard**: View all survey submissions in an organized format
- **Pagination**: Navigate through submissions with pagination
- **Delete Submissions**: Remove unwanted or spam submissions
- **Protected Routes**: Admin-only access to submission data

### Security & Anti-Spam
- **JWT Authentication**: Stateless authentication for admin routes
- **Password Hashing**: Bcrypt for secure password storage
- **Input Validation**: Comprehensive server-side validation
- **CORS Protection**: Configured cross-origin resource sharing

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt.js** - Password hashing
- **Express Validator** - Input validation

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Radix UI** - Accessible components
- **Axios** - HTTP client
- **Lucide Icons** - Icon library

## 📁 Project Structure

```
survey-form-app/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Route controllers
│   │   │   ├── authController.ts
│   │   │   └── surveyController.ts
│   │   ├── middleware/        # Custom middleware
│   │   │   ├── authMiddleware.ts
│   │   │   └── validationMiddleware.ts
│   │   ├── models/            # Mongoose models
│   │   │   ├── Admin.ts
│   │   │   └── SurveySubmission.ts
│   │   ├── routes/            # API routes
│   │   │   ├── authRoutes.ts
│   │   │   └── surveyRoutes.ts
│   │   └── index.ts           # Entry point
│   ├── .env.example           # Environment variables template
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ui/            # Reusable UI components
    │   │   │   ├── button.tsx
    │   │   │   ├── card.tsx
    │   │   │   ├── input.tsx
    │   │   │   ├── label.tsx
    │   │   │   ├── toast.tsx
    │   │   │   └── toaster.tsx
    │   │   ├── AdminLogin.tsx
    │   │   ├── SurveyForm.tsx
    │   │   └── SurveyList.tsx
    │   ├── hooks/
    │   │   └── use-toast.ts
    │   ├── lib/
    │   │   └── utils.ts
    │   ├── services/
    │   │   └── api.ts
    │   ├── types/
    │   │   └── index.ts
    │   ├── App.tsx
    │   ├── index.css
    │   └── main.tsx
    ├── .env.example
    ├── tailwind.config.js
    ├── vite.config.ts
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

#### 1. Clone the repository
```bash
git clone <your-repo-url>
cd survey-form-app
```

#### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/survey-form
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
PORT=5000
CORS_ORIGIN=http://localhost:5173
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

Start the backend server:
```bash
npm run dev
```

#### 3. Frontend Setup

Open a new terminal:
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📡 API Endpoints

### Survey Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/survey` | Submit survey form | No |
| GET | `/api/survey` | Get all submissions | Yes |
| GET | `/api/survey/:id` | Get single submission | Yes |
| DELETE | `/api/survey/:id` | Delete submission | Yes |

### Auth Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new admin | No |
| POST | `/api/auth/login` | Admin login | No |
| GET | `/api/auth/me` | Get current admin | Yes |


## 🌐 Deployment

### Deploy Backend to Render/Railway

1. **Create MongoDB Atlas Cluster**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection string

2. **Deploy to Render**:
   - Create a new Web Service on [Render](https://render.com)
   - Connect your GitHub repository
   - Set environment variables:
     ```
     NODE_ENV=production
     MONGODB_URI=<your-mongodb-atlas-uri>
     JWT_SECRET=<strong-random-secret>
     JWT_EXPIRES_IN=24h
    PORT=5000
     CORS_ORIGIN=<your-frontend-url>
     ```
   - Build command: `npm run build`
   - Start command: `npm start`

### Deploy Frontend to Vercel

1. **Deploy to Vercel**:
   - Push your code to GitHub
   - Import project in [Vercel](https://vercel.com)
   - Set environment variable:
     ```
     VITE_API_BASE_URL=<your-backend-url>
     ```
   - Deploy

2. **Deploy to Netlify**:
   - Connect your GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Set environment variable:
     ```
     VITE_API_BASE_URL=<your-backend-url>
     ```

## 🧪 Testing

### Test the Application

1. **Submit a Survey**:
   - Navigate to the homepage
   - Fill out all required fields
   - Click "Submit Survey"
   - You should see a success notification

2. **Admin Access**:
   - Navigate to `/admin/login`
   - Login with default credentials
   - View all submissions in the dashboard
   - Test delete functionality

## 🎨 UI Components

This application uses [shadcn/ui](https://ui.shadcn.com) components built with Radix UI primitives and styled with Tailwind CSS:

- Button
- Card
- Input
- Label
- Toast notifications

## 🔒 Security Considerations

- Passwords are hashed with bcrypt (salt rounds: 10)
- JWT tokens expire after 24 hours (configurable)
- CORS is configured to only allow specific origins
- Input validation on both client and server
- Honeypot field for basic bot protection
- Protected admin routes

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
- Ensure MongoDB is running
- Check `.env` file exists with correct values
- Verify port 5000 is not in use

**Frontend can't connect to backend:**
- Check `VITE_API_BASE_URL` in `.env`
- Ensure backend is running
- Check CORS configuration in backend

**Database connection errors:**
- Verify MongoDB URI is correct
- Check network access in MongoDB Atlas
- Ensure IP address is whitelisted

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

Created as part of a MERN stack development project.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For support, email arunjith.5452@gmail.com or open an issue in the repository.

---

**Happy Coding! 🎉**
