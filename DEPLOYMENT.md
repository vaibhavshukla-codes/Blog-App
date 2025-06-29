# Deployment Guide

This guide will help you deploy your Blog App to various platforms.

## 🚀 Deploy to Vercel (Recommended)

Vercel is the easiest platform to deploy Next.js applications.

### Step 1: Prepare Your Repository

1. Push your code to GitHub:

```bash
git remote add origin https://github.com/yourusername/blog-app.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - Framework Preset: Next.js
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

### Step 3: Environment Variables

Add these environment variables in Vercel dashboard:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog-app
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
NEXT_PUBLIC_API_URL=https://your-app.vercel.app
```

### Step 4: Deploy

Click "Deploy" and wait for the build to complete.

## 🌐 Deploy to Heroku

### Step 1: Install Heroku CLI

```bash
# macOS
brew install heroku/brew/heroku

# Windows
# Download from https://devcenter.heroku.com/articles/heroku-cli
```

### Step 2: Login to Heroku

```bash
heroku login
```

### Step 3: Create Heroku App

```bash
heroku create your-blog-app-name
```

### Step 4: Add MongoDB Add-on

```bash
heroku addons:create mongolab:sandbox
```

### Step 5: Set Environment Variables

```bash
heroku config:set NODE_ENV=production
heroku config:set NEXT_PUBLIC_SITE_URL=https://your-app.herokuapp.com
heroku config:set NEXT_PUBLIC_API_URL=https://your-app.herokuapp.com
```

### Step 6: Deploy

```bash
git push heroku main
```

## 🐳 Deploy with Docker

### Step 1: Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Step 2: Build and Run

```bash
docker build -t blog-app .
docker run -p 3000:3000 -e MONGODB_URI=your-mongodb-uri blog-app
```

## 📊 MongoDB Atlas Setup

### Step 1: Create MongoDB Atlas Account

1. Go to [mongodb.com/atlas](https://mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (M0 Free tier is sufficient)

### Step 2: Configure Database

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Add your database name at the end: `?retryWrites=true&w=majority`

### Step 3: Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. For development: Add your current IP
4. For production: Add `0.0.0.0/0` (allows all IPs)

### Step 4: Database User

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password
4. Set privileges to "Read and write to any database"

## 🔧 Environment Variables Reference

| Variable               | Description               | Example                                                |
| ---------------------- | ------------------------- | ------------------------------------------------------ |
| `MONGODB_URI`          | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/blog-app` |
| `NEXT_PUBLIC_SITE_URL` | Your site's public URL    | `https://your-app.vercel.app`                          |
| `NEXT_PUBLIC_API_URL`  | Your API's public URL     | `https://your-app.vercel.app`                          |

## 🚨 Common Issues & Solutions

### Build Errors

**Error**: `Module not found: Can't resolve 'react-quill'`
**Solution**: Make sure all dependencies are installed:

```bash
npm install
```

**Error**: `MongoDB connection failed`
**Solution**: Check your MongoDB URI and network access settings.

### Runtime Errors

**Error**: `500 Internal Server Error`
**Solution**: Check your environment variables and MongoDB connection.

**Error**: `404 Not Found`
**Solution**: Ensure your API routes are properly configured.

## 📱 Post-Deployment Checklist

- [ ] Test the homepage loads correctly
- [ ] Test creating a new blog post
- [ ] Test editing an existing post
- [ ] Test deleting a post
- [ ] Test viewing individual posts
- [ ] Check SEO meta tags are working
- [ ] Test social media sharing
- [ ] Verify responsive design on mobile

## 🔒 Security Considerations

1. **Environment Variables**: Never commit `.env.local` to version control
2. **MongoDB Security**: Use strong passwords and restrict network access
3. **HTTPS**: Always use HTTPS in production
4. **Input Validation**: The app includes XSS protection, but always validate inputs

## 📈 Performance Optimization

1. **Image Optimization**: Use Next.js Image component for better performance
2. **Caching**: Implement caching strategies for better load times
3. **CDN**: Use a CDN for static assets
4. **Database Indexing**: Ensure proper indexes on frequently queried fields

## 🆘 Getting Help

If you encounter issues:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Check the [MongoDB Atlas documentation](https://docs.atlas.mongodb.com)
3. Check the [Vercel documentation](https://vercel.com/docs)
4. Create an issue in the GitHub repository

---

**Happy Deploying! 🎉**
