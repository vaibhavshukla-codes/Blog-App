# Blog App - Modern Blogging Platform

A full-featured blog application built with Next.js 14, MongoDB, and React Quill editor. This application provides a complete blogging solution with rich text editing, SEO-friendly URLs, and a modern admin dashboard.

## 🚀 Live Demo

Check out the deployed app here: [https://blog-app-nine-pi-69.vercel.app/](https://blog-app-nine-pi-69.vercel.app/)

## 🚀 Features

### Core Features

- **Rich Text Editor**: WYSIWYG editor using React Quill for creating beautiful blog posts
- **SEO-Friendly URLs**: Automatic slug generation from post titles
- **MongoDB Integration**: Robust database storage with Mongoose ODM
- **Admin Dashboard**: Complete CRUD operations for managing blog posts
- **Dynamic Post Viewing**: Individual post pages with SEO meta tags
- **Responsive Design**: Modern, mobile-friendly UI built with Tailwind CSS

### Admin Features

- Create new blog posts with rich text editor
- Edit existing posts with real-time slug updates
- Delete posts with confirmation
- View all posts in a clean dashboard
- Preview posts before publishing

### Public Features

- Browse all published posts
- Read individual posts with beautiful typography
- Social media sharing integration
- SEO-optimized meta tags and Open Graph data

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, @tailwindcss/typography
- **Rich Text Editor**: React Quill
- **Database**: MongoDB with Mongoose
- **Security**: DOMPurify for XSS protection
- **Date Handling**: date-fns
- **URL Generation**: slugify

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js 18+ installed
- MongoDB database (local or MongoDB Atlas)
- npm or yarn package manager

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd blog-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file and configure your variables:

```bash
cp env.example .env.local
```

Edit `.env.local` and add your MongoDB connection string:

```env
MONGODB_URI=mongodb://localhost:27017/blog-app
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000
```

> For production, use your MongoDB Atlas connection string and your deployed Vercel URL:
>
> ```env
> MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-app
> NEXT_PUBLIC_SITE_URL=https://blog-app-nine-pi-69.vercel.app
> NEXT_PUBLIC_API_URL=https://blog-app-nine-pi-69.vercel.app
> ```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
blog-app/
├── app/                    # Next.js 14 app directory
│   ├── admin/             # Admin pages
│   │   ├── create/        # Create post page
│   │   ├── edit/[slug]/   # Edit post page
│   │   └── page.tsx       # Admin dashboard
│   ├── api/               # API routes
│   │   └── posts/         # Post-related APIs
│   ├── post/[slug]/       # Individual post pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── lib/                   # Utility functions
│   └── mongodb.ts         # MongoDB connection
├── models/                # Database models
│   └── Post.ts            # Post schema
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## 🗄️ Database Schema

The application uses a simple but effective Post schema:

```typescript
{
  title: String,        // Post title (required)
  content: String,      // HTML content (required)
  slug: String,         // SEO-friendly URL (unique, auto-generated)
  createdAt: Date,      // Creation timestamp
  updatedAt: Date       // Last update timestamp
}
```

## 🔧 API Endpoints

### Posts API

- `GET /api/posts` - Get all posts (for admin dashboard)
- `POST /api/posts/create` - Create a new post
- `GET /api/posts/[slug]` - Get a specific post by slug
- `PUT /api/posts/[slug]` - Update a post
- `DELETE /api/posts/[slug]` - Delete a post

## 🎨 Customization

### Styling

The application uses Tailwind CSS for styling. You can customize the design by:

1. Modifying `app/globals.css` for global styles
2. Updating Tailwind classes in components
3. Customizing the Tailwind config in `tailwind.config.js`

### Rich Text Editor

The Quill editor configuration can be modified in the create and edit pages:

```typescript
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    // Add or remove toolbar options
  ],
};
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
   - `NEXT_PUBLIC_SITE_URL`: `https://blog-app-nine-pi-69.vercel.app`
   - `NEXT_PUBLIC_API_URL`: `https://blog-app-nine-pi-69.vercel.app`
4. Deploy and your app will be live at [https://blog-app-nine-pi-69.vercel.app/](https://blog-app-nine-pi-69.vercel.app/)

### Deploy to Heroku

1. Create a Heroku app
2. Add MongoDB add-on (MongoDB Atlas)
3. Set environment variables
4. Deploy using Heroku CLI or GitHub integration

### Environment Variables for Production

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-app
NEXT_PUBLIC_SITE_URL=https://blog-app-nine-pi-69.vercel.app
NEXT_PUBLIC_API_URL=https://blog-app-nine-pi-69.vercel.app
```

## 🔒 Security Features

- **XSS Protection**: All HTML content is sanitized using DOMPurify
- **Input Validation**: Server-side validation for all inputs
- **SQL Injection Protection**: Using Mongoose ODM with parameterized queries
- **CSRF Protection**: Built-in Next.js CSRF protection

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile phones
- All modern browsers
