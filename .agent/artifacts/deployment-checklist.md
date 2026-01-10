# 🚀 Deployment Checklist - Methsara Publications Bookstore

## Pre-Deployment Setup

### 1. MongoDB Atlas Setup
- [ ] Create MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
- [ ] Create a new cluster (Free tier is fine for development)
- [ ] Create a database user with username and password
- [ ] Whitelist IP addresses (0.0.0.0/0 for all IPs, or specific IPs)
- [ ] Get connection string from "Connect" → "Connect your application"
- [ ] Replace `<password>` in connection string with your password
- [ ] Test connection locally

**Connection String Format**:
```
mongodb+srv://username:password@cluster.mongodb.net/methsara-bookstore?retryWrites=true&w=majority
```

### 2. Vercel Account Setup
- [ ] Create Vercel account at https://vercel.com
- [ ] Install Vercel CLI: `npm install -g vercel`
- [ ] Login to Vercel: `vercel login`

### 3. Vercel Blob Storage Setup
- [ ] Go to Vercel Dashboard → Storage
- [ ] Click "Create Database" → "Blob"
- [ ] Name it "methsara-receipts" or similar
- [ ] Copy the `BLOB_READ_WRITE_TOKEN`
- [ ] Save token for environment variables

---

## Environment Variables

### Production Environment Variables (Vercel)

Add these in Vercel Dashboard → Settings → Environment Variables:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/methsara-bookstore

# JWT Secret (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long

# Vercel Blob Token (from Blob storage setup)
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxxxxxxxxxx

# Node Environment
NODE_ENV=production

# Client URL (will be your Vercel domain)
CLIENT_URL=https://your-app-name.vercel.app
```

### Frontend Environment Variables

Update `client/.env` for production:
```env
VITE_API_URL=https://your-app-name.vercel.app/api
```

---

## Code Preparation

### 1. Update Package.json Scripts

**Client package.json** - Add build script:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

**Root package.json** - Add vercel-build script:
```json
{
  "scripts": {
    "vercel-build": "cd client && npm install && npm run build"
  }
}
```

### 2. Verify vercel.json

Make sure `vercel.json` is configured correctly:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/client/$1"
    }
  ]
}
```

### 3. Update CORS Settings

In `server/server.js`, update CORS for production:
```javascript
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
```

---

## Deployment Steps

### Option 1: Deploy via Vercel CLI

```bash
# From project root
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? methsara-publications-bookstore
# - Directory? ./
# - Override settings? No

# Deploy to production
vercel --prod
```

### Option 2: Deploy via GitHub

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/methsara-bookstore.git
git push -u origin main
```

2. **Connect to Vercel**:
- Go to Vercel Dashboard
- Click "New Project"
- Import your GitHub repository
- Configure environment variables
- Deploy

---

## Post-Deployment Tasks

### 1. Verify Deployment
- [ ] Visit your deployed URL
- [ ] Check if home page loads
- [ ] Check if about page loads
- [ ] Open browser console for errors
- [ ] Check Vercel deployment logs

### 2. Test API Endpoints
- [ ] Test health endpoint: `https://your-app.vercel.app/api/health`
- [ ] Test book endpoints: `https://your-app.vercel.app/api/books`
- [ ] Check API responses in browser DevTools

### 3. Create Admin User

**Option A: Via MongoDB Atlas**
1. Go to MongoDB Atlas → Browse Collections
2. Find `users` collection
3. Find your user document
4. Edit and change `role` from `"customer"` to `"admin"`

**Option B: Via API**
1. Register a new user via the app
2. Manually update role in MongoDB Atlas

### 4. Add Sample Books

Use Postman or Thunder Client to add books:

```javascript
POST https://your-app.vercel.app/api/books
Headers:
  Authorization: Bearer YOUR_ADMIN_JWT_TOKEN
  Content-Type: application/json

Body:
{
  "title": "Mathematics Grade 10",
  "author": "Prof. Sarath Silva",
  "category": "Grade 6-11",
  "grade": "10",
  "subject": "Mathematics",
  "price": 750,
  "description": "Comprehensive mathematics guide for Grade 10 students",
  "synopsis": "This book covers all topics in the Grade 10 mathematics syllabus...",
  "stock": 100,
  "isbn": "978-955-XXXX-XX-X"
}
```

---

## Testing Checklist

### Frontend
- [ ] Home page loads correctly
- [ ] About page loads correctly
- [ ] Navigation works (Navbar links)
- [ ] Footer links work
- [ ] Responsive design works on mobile
- [ ] No console errors

### Backend API
- [ ] Health check endpoint works
- [ ] Can register new user
- [ ] Can login with credentials
- [ ] JWT token is generated
- [ ] Protected routes require authentication

### Database
- [ ] MongoDB connection successful
- [ ] Users can be created
- [ ] Data persists after page refresh

---

## Monitoring & Maintenance

### 1. Set Up Monitoring
- [ ] Enable Vercel Analytics
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Monitor MongoDB Atlas metrics

### 2. Regular Checks
- [ ] Check Vercel deployment logs weekly
- [ ] Monitor MongoDB storage usage
- [ ] Check Vercel Blob storage usage
- [ ] Review user feedback

### 3. Backups
- [ ] Enable MongoDB Atlas automated backups
- [ ] Export important data regularly
- [ ] Keep local development database synced

---

## Common Deployment Issues

### Issue: "Module not found" errors
**Solution**: Make sure all dependencies are in `package.json` and run `npm install`

### Issue: API returns 404
**Solution**: Check `vercel.json` routes configuration and API endpoint paths

### Issue: CORS errors
**Solution**: Update `CLIENT_URL` in environment variables and CORS settings

### Issue: MongoDB connection fails
**Solution**: 
- Check connection string format
- Verify IP whitelist in MongoDB Atlas
- Check if password has special characters (URL encode them)

### Issue: Environment variables not working
**Solution**: 
- Redeploy after adding environment variables
- Check variable names match exactly (case-sensitive)
- For Vite, variables must start with `VITE_`

### Issue: Build fails
**Solution**:
- Check build logs in Vercel dashboard
- Test build locally: `npm run build`
- Verify all imports are correct

---

## Security Checklist

- [ ] JWT_SECRET is strong and random (32+ characters)
- [ ] MongoDB user has limited permissions
- [ ] Environment variables are not committed to Git
- [ ] CORS is configured for specific domain
- [ ] Rate limiting is enabled (add if needed)
- [ ] Input validation is in place
- [ ] Passwords are hashed with bcrypt

---

## Performance Optimization

### Before Launch
- [ ] Optimize images (compress, use WebP)
- [ ] Enable Vercel Edge Network
- [ ] Add loading states to components
- [ ] Implement lazy loading for routes
- [ ] Minify and bundle assets

### After Launch
- [ ] Monitor page load times
- [ ] Check Lighthouse scores
- [ ] Optimize database queries
- [ ] Add caching where appropriate

---

## Custom Domain (Optional)

### 1. Purchase Domain
- Buy domain from Namecheap, GoDaddy, etc.
- Example: `methsarapublications.lk`

### 2. Configure DNS
- Go to Vercel Dashboard → Settings → Domains
- Add your custom domain
- Update DNS records at your domain registrar
- Wait for DNS propagation (up to 48 hours)

### 3. Update Environment Variables
- Update `CLIENT_URL` to your custom domain
- Redeploy application

---

## Launch Checklist

### Pre-Launch
- [ ] All pages completed and tested
- [ ] Sample data added to database
- [ ] Admin user created
- [ ] Payment instructions added
- [ ] Contact information updated
- [ ] Social media links added

### Launch Day
- [ ] Final deployment to production
- [ ] Test all user flows
- [ ] Monitor error logs
- [ ] Announce launch
- [ ] Collect user feedback

### Post-Launch
- [ ] Monitor user registrations
- [ ] Track orders
- [ ] Respond to user issues
- [ ] Plan feature updates

---

## Support & Resources

- **Vercel Documentation**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://www.mongodb.com/docs/atlas/
- **React Documentation**: https://react.dev/
- **Express.js Guide**: https://expressjs.com/

---

**Ready to deploy? Follow this checklist step by step!** 🚀

*Good luck with your launch!* 🎉
