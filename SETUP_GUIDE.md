# FintechConnect - Quick Setup Guide

## 📋 Prerequisites

Make sure you have these installed:
- **Node.js** v16+ ([Download](https://nodejs.org))
- **PostgreSQL** v13+ ([Download](https://www.postgresql.org/download/))
- **npm** or **yarn** (comes with Node.js)

## 🚀 Quick Start (5 minutes)

### Step 1: Install Dependencies

```bash
# Install all dependencies (backend + frontend)
npm run install:all
```

### Step 2: Database Setup

```bash
# Create the database
createdb fintech_marketplace

# Or using psql:
psql -U postgres
CREATE DATABASE fintech_marketplace;
\q

# Run the schema
psql fintech_marketplace < server/database/schema.sql

# (Optional) Load sample data
psql fintech_marketplace < server/database/seed.sql
```

### Step 3: Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your settings
nano .env  # or use your favorite editor
```

**Minimum required settings in `.env`:**
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fintech_marketplace
DB_USER=postgres
DB_PASSWORD=your_postgres_password
JWT_SECRET=your_random_secret_key_here
```

### Step 4: Start the Application

```bash
# Start both backend and frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## ✅ Verify Installation

1. Open http://localhost:5173
2. Click "Get Started" to register
3. Create a test account (buyer or provider)
4. Explore the marketplace!

## 🔑 Sample Credentials (if you loaded seed data)

**Buyer Account:**
- Email: `john@acmecorp.com`
- Password: `password123`

**Provider Account:**
- Email: `mike@paytech.com`
- Password: `password123`

## 🛠️ Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
pg_isready

# Check connection manually
psql -U postgres -d fintech_marketplace

# If connection refused, start PostgreSQL:
# macOS: brew services start postgresql
# Linux: sudo systemctl start postgresql
# Windows: Start PostgreSQL service from Services
```

### Port Already in Use

If ports 5000 or 5173 are taken:

**Change backend port** in `.env`:
```env
PORT=3000
```

**Change frontend port** in `client/vite.config.js`:
```js
server: {
  port: 3000,
  ...
}
```

### Module Not Found Errors

```bash
# Clean install
rm -rf node_modules client/node_modules
npm run install:all
```

## 🎯 Next Steps

### For Development

1. **Browse Services**: Visit http://localhost:5173/services
2. **Create an RFQ**: Log in as a buyer and create a request
3. **Submit a Quote**: Log in as a provider and respond to RFQs
4. **Test Messaging**: Try the real-time chat feature

### For Production Deployment

1. Update `.env` with production credentials
2. Build the frontend: `npm run build`
3. Set `NODE_ENV=production`
4. Use a process manager like PM2: `pm2 start server/index.js`
5. Set up a reverse proxy (Nginx/Apache)
6. Configure SSL certificates

## 📚 Key Features to Test

- ✅ User registration (buyer & provider accounts)
- ✅ Browse service catalog
- ✅ Create RFQ with requirements
- ✅ Submit quotes with proposals
- ✅ Real-time messaging
- ✅ Order tracking
- ✅ Provider profiles with certifications

## 🔒 Security Notes

- Change `JWT_SECRET` to a strong random string in production
- Use environment variables for all sensitive data
- Enable HTTPS in production
- Set up proper CORS origins
- Implement rate limiting (recommended)

## 📞 Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Review API endpoints in the README
- Check database schema in `server/database/schema.sql`

## 🎉 You're All Set!

Your B2B Financial Services Marketplace is ready to use. Start connecting buyers with service providers!
