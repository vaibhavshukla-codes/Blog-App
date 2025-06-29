# Blog App Setup Guide

## Environment Configuration

To fix the post creation issue, you need to set up your environment variables. Create a `.env.local` file in the root directory with the following content:

```env
# MongoDB Connection String
# For local development (if you have MongoDB installed locally):
MONGODB_URI=mongodb://localhost:27017/blog-app

# For MongoDB Atlas (cloud database):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-app

# Site URL for social sharing and meta tags
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# API URL (usually same as site URL for local development)
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## MongoDB Setup Options

### Option 1: MongoDB Atlas (Recommended for beginners)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Replace the MONGODB_URI in your .env.local file

### Option 2: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use the local connection string

## Running the App

1. Install dependencies: `npm install`
2. Create `.env.local` file with your MongoDB URI
3. Start the development server: `npm run dev`
4. Open http://localhost:3000

## Troubleshooting

If posts still don't create:

1. Check browser console for errors
2. Check terminal for server errors
3. Verify MongoDB connection string is correct
4. Make sure MongoDB is running (if using local setup)
