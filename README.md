# Productr — Template Manager
### Full Stack Developer Assignment · Orufy Technologies Pvt. Ltd.

A fully functional product management web application built as per the Figma design provided by Orufy Technologies. The app enables authenticated users to create, read, update, and delete products with image uploads, status toggling, and a clean dashboard UI.

---

## 🔗 Live Demo

- **Frontend (Vercel):** [https://template-master-dun.vercel.app](https://template-master-dun.vercel.app)
- **Backend (Render):** [https://templatemaster.onrender.com](https://templatemaster.onrender.com)

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React.js (Vite), Tailwind CSS v4    |
| Backend    | Node.js + Express.js                |
| Database   | MongoDB (Mongoose ODM)              |
| Auth       | JWT + OTP via Email (Brevo API)     |
| File Upload| Multer (local) / Cloudinary (cloud) |
| Hosting    | Vercel (client) + Render (server)   |

---

## 📁 Project Structure

```
template-manager/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── api/             # Axios API call helpers
│   │   │   ├── axios.js     # Configured Axios instance
│   │   │   ├── authApi.js   # Login & OTP verify calls
│   │   │   └── productApi.js# CRUD + toggle + upload calls
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Header/
│   │   │   ├── Sidebar/
│   │   │   ├── ProductCard/
│   │   │   ├── ProductModal/
│   │   │   └── DeleteModal/
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Global auth state (JWT)
│   │   ├── layouts/
│   │   │   └── DashboardLayout/ # Shared layout with Sidebar + Header
│   │   ├── pages/
│   │   │   ├── Login/       # Email input page
│   │   │   ├── OTP/         # OTP verification page
│   │   │   ├── Home/        # Dashboard home
│   │   │   └── Products/    # Product listing + CRUD
│   │   └── routes/
│   │       └── AppRoutes.jsx # React Router with protected routes
│   └── .env                 # Frontend environment variables
│
└── server/                  # Express backend
    ├── src/
    │   ├── config/
    │   │   └── db.js        # MongoDB connection
    │   ├── controllers/
    │   │   ├── authController.js    # Login (OTP send) + verify
    │   │   ├── productController.js # Full CRUD + status toggle
    │   │   └── uploadController.js  # Image upload handler
    │   ├── middleware/
    │   │   └── authMiddleware.js    # JWT verification
    │   ├── models/
    │   │   ├── User.js      # User schema (email, OTP, expiry)
    │   │   └── Product.js   # Product schema (see below)
    │   ├── routes/
    │   │   ├── authRoutes.js
    │   │   ├── productRoutes.js
    │   │   └── uploadRoutes.js
    │   ├── utils/
    │   │   ├── generateOTP.js
    │   │   └── sendEmail.js  # Brevo transactional email
    │   ├── app.js
    │   └── server.js
    └── .env                  # Backend environment variables
```

---

## 🗄️ Database Schema

### User
```js
{
  email: String,       // required, unique
  otp: String,
  otpExpires: Date,
  timestamps: true
}
```

### Product
```js
{
  user: ObjectId,           // ref: User
  productName: String,      // required
  productType: String,      // enum: Food | Electronics | Clothes | Beauty Products | Others
  quantityStock: Number,    // required, min 0
  mrp: Number,              // required, min 0
  sellingPrice: Number,     // required, min 0
  brandName: String,        // required
  images: [String],         // array of image URLs
  exchangeEligible: String, // enum: Yes | No
  status: String,           // enum: published | unpublished
  timestamps: true
}
```

---

## ⚙️ API Endpoints

### Auth — `/api/auth`
| Method | Route     | Description            | Auth Required |
|--------|-----------|------------------------|---------------|
| POST   | /login    | Send OTP to email      | No            |
| POST   | /verify   | Verify OTP, get JWT    | No            |

### Products — `/api/products`
| Method | Route          | Description              | Auth Required |
|--------|----------------|--------------------------|---------------|
| GET    | /              | Get all user products    | ✅ JWT        |
| POST   | /              | Create new product       | ✅ JWT        |
| GET    | /:id           | Get single product       | ✅ JWT        |
| PUT    | /:id           | Update product           | ✅ JWT        |
| DELETE | /:id           | Delete product           | ✅ JWT        |
| PATCH  | /:id/status    | Toggle published status  | ✅ JWT        |

### Upload — `/api/upload`
| Method | Route | Description             | Auth Required |
|--------|-------|-------------------------|---------------|
| POST   | /     | Upload product images   | ✅ JWT        |

---

## ✅ Features Implemented

- **OTP-based Email Authentication** — passwordless login via 6-digit OTP sent to email
- **JWT Protected Routes** — all product and upload endpoints require a valid token
- **Full CRUD for Products** — create, view, edit, delete with proper validation
- **Status Toggle** — publish/unpublish products with a single click
- **Image Uploads** — multi-image upload support per product
- **Loading States** — skeleton loaders while fetching data
- **Error Handling** — input validation on both client and server
- **Responsive UI** — works on desktop and mobile
- **Protected Frontend Routes** — unauthenticated users redirected to login
- **Empty State Handling** — friendly UI when no products exist
- **CORS Configured** — supports localhost dev + Vercel preview URLs + production

---

## 🚀 Running Locally

### Prerequisites
- Node.js v18+
- npm
- MongoDB Atlas account (or local MongoDB)
- Brevo account (for OTP emails)

---

### 1. Clone the repository

```bash
git clone https://github.com/mayankupadhyay-1260/templateMaster.git
cd templateMaster
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
EMAIL_USER=your_verified_brevo_sender_email
BREVO_API_KEY=your_brevo_api_key
```

Start the backend dev server:

```bash
npm run dev
```

The server will start on `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file inside `client/`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend dev server:

```bash
npm run dev
```

The app will open on `http://localhost:5173`

---

## 🔑 Required Environment Variables

### Server (`server/.env`)

| Variable       | Description                                  |
|----------------|----------------------------------------------|
| `PORT`         | Port for Express server (default: 5000)      |
| `MONGO_URI`    | MongoDB Atlas connection string              |
| `JWT_SECRET`   | Secret key for signing JWT tokens            |
| `CLIENT_URL`   | Frontend URL for CORS (e.g. localhost:5173)  |
| `EMAIL_USER`   | Verified sender email on Brevo               |
| `BREVO_API_KEY`| API key from Brevo dashboard                 |

### Client (`client/.env`)

| Variable        | Description                          |
|-----------------|--------------------------------------|
| `VITE_API_URL`  | Backend API base URL                 |

---

## 📦 Dependencies

### Client
- `react` + `react-dom` — UI framework
- `react-router-dom` — client-side routing
- `axios` — HTTP requests
- `react-hot-toast` — toast notifications
- `tailwindcss` v4 — styling

### Server
- `express` — web framework
- `mongoose` — MongoDB ODM
- `jsonwebtoken` — JWT auth
- `multer` — file upload handling
- `cloudinary` — cloud image storage
- `cors` — cross-origin resource sharing
- `dotenv` — environment variable management
- `nodemailer` — email utility (Brevo SMTP)
- `nodemon` — dev auto-restart

---

## 📋 Assignment Checklist

| Requirement                                      | Status |
|--------------------------------------------------|--------|
| React.js frontend                                | ✅     |
| Node.js + Express backend                        | ✅     |
| MongoDB with Mongoose                            | ✅     |
| REST APIs (CRUD)                                 | ✅     |
| Input validation + error responses               | ✅     |
| API integration using Axios                      | ✅     |
| Loading and error handling on frontend           | ✅     |
| Proper component structure                       | ✅     |
| User & Product schemas                           | ✅     |
| Forms submit to backend and persist to MongoDB   | ✅     |
| Navigation across all pages                      | ✅     |
| Dynamic content from backend APIs                | ✅     |
| Clear `client/` and `server/` folder structure   | ✅     |
| Hosted frontend (Vercel)                         | ✅     |
| Hosted backend (Render)                          | ✅     |
| GitHub repository                                | ✅     |
| README with setup instructions                   | ✅     |

---

*Built for Orufy Technologies Pvt. Ltd. Full Stack Developer Assignment.*
