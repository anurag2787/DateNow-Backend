# DateNow Backend 🚀

A robust Node.js backend server for the DateNow dating application, featuring real-time messaging, email services, and MongoDB integration.

> **Note**: This backend is hosted at `https://datenow-backend.onrender.com` and can be used directly by the frontend. Local setup is only required for development purposes.

> **Frontend Repository**: The frontend is hosted separately at [DateNow-Frontend](https://github.com/yourusername/DateNow-Frontend).

## 🌟 Features

- **Real-time Communication**: Socket.io integration for instant messaging
- **Email Services**: Nodemailer integration for sending emails
- **Database**: MongoDB with Mongoose ODM
- **CORS Support**: Cross-origin resource sharing configuration
- **Environment Configuration**: Secure environment variable management
- **RESTful API**: Clean API endpoints for frontend integration
- **Message Storage**: Persistent chat message storage

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Real-time**: Socket.io
- **Email**: Nodemailer
- **Development**: Nodemon for auto-restart
- **Environment**: dotenv for configuration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)
- Git

## 🚀 Getting Started

### Hosted Backend (Production)

The backend is already deployed and running at:
**`https://datenow-backend.onrender.com`**

> **⚠️ Cold Start Notice**: The hosted backend may take 1-2 minutes to respond if it hasn't been used recently. This is normal for free hosting services like Render.

You can verify it's working by visiting the URL in your browser.

### Local Development Setup

Only follow these steps if you want to contribute to the backend or run it locally for development:

#### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/DateNow-Backend.git
cd DateNow-Backend
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Environment Setup

Create a `.env` file in the root directory and add your environment variables:

```bash
cp .env.example .env
```

Fill in your environment variables (see Environment Variables section below).

#### 4. Start Development Server

```bash
npm start
```

The server will be available at `http://localhost:9000`

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/datenow
# For MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/datenow

# Server Configuration
PORT=9000
NODE_ENV=development

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com
EMAIL_BCC=your_admin_email@gmail.com
```

## 🗄️ Database Setup

### MongoDB Local Installation

1. **Install MongoDB**:
   - Windows: Download from [MongoDB Official Site](https://www.mongodb.com/try/download/community)
   - macOS: `brew tap mongodb/brew && brew install mongodb-community`
   - Linux: Follow [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB Service**:
   ```bash
   # Windows (as service)
   net start MongoDB
   
   # macOS/Linux
   brew services start mongodb/brew/mongodb-community
   # or
   sudo systemctl start mongod
   ```

3. **Verify Connection**:
   ```bash
   mongo
   # or for newer versions
   mongosh
   ```

### MongoDB Atlas (Cloud) Setup

1. **Create Account**: Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create Cluster**: Follow the setup wizard
3. **Create Database User**: Set username and password
4. **Configure Network Access**: Add your IP address
5. **Get Connection String**: Replace `<password>` with your database user password
6. **Update .env**: Use the connection string in `MONGO_URI`

## 📧 Email Configuration

### Gmail Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Update .env**:
   ```env
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_generated_app_password
   EMAIL_FROM=your_email@gmail.com
   EMAIL_BCC=your_admin_email@gmail.com
   ```

### Other Email Providers

**Outlook/Hotmail**:
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
```

**Yahoo**:
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
```

## 📜 Available Scripts

```bash
# Start development server with auto-restart
npm start

# Start server without auto-restart
node server.js
```

## 📁 Project Structure

```
DateNowBackend/
├── server.js           # Main server file
├── package.json        # Dependencies and scripts
├── .env               # Environment variables (create this)
├── .env.example       # Environment template
├── model/             # Database models
│   └── talkmodel.js   # Chat message model
└── routes/            # API routes
    ├── email.js       # Email sending routes
    └── talkroutes.js  # Chat message routes
```

## 🔌 API Endpoints

### Chat Messages

```bash
# Get all messages
GET /api/talkmsg

# Post new message
POST /api/talkmsg
Content-Type: application/json
{
  "user": "username",
  "message": "Hello world",
  "timestamp": "2025-01-01T12:00:00Z"
}
```

### Email Service

```bash
# Send email
POST /sendemail
Content-Type: application/json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I need help!"
}
```

### WebSocket Events

```javascript
// Client connects
socket.on('connection', (socket) => {
  // User sends message
  socket.on('user-message', (message) => {
    // Broadcast to all clients
    io.emit('m', message);
  });
});
```

## 🔗 Frontend Integration

Ensure your frontend is configured to connect to this backend:

1. **Set Backend URL** in frontend `.env`:
   ```env
   VITE_BACKEND_URL=http://localhost:9000
   ```

2. **CORS Configuration**: Update `FRONTEND_URL` in backend `.env`

3. **Socket.io Connection**: Frontend should connect to the same port

## 🚀 Deployment

### Heroku Deployment

1. **Create Heroku App**:
   ```bash
   heroku create your-app-name
   ```

2. **Set Environment Variables**:
   ```bash
   heroku config:set MONGO_URI=your_mongodb_atlas_uri
   heroku config:set FRONTEND_URL=https://your-frontend-domain.com
   # Add other environment variables
   ```

3. **Deploy**:
   ```bash
   git push heroku main
   ```

### Manual Deployment

1. **Build and Deploy** to your preferred hosting service
2. **Set Environment Variables** on the hosting platform
3. **Ensure MongoDB Access** from your hosting provider

## 🔒 Security Best Practices

- **Environment Variables**: All sensitive data (email credentials, database URLs) are stored in environment variables
- **Never commit .env files**: The .env file contains sensitive information and should never be committed to version control
- **CORS Configuration**: Restrict to specific domains in production
- **Input Validation**: Validate all incoming data
- **Rate Limiting**: Consider implementing rate limiting for APIs
- **HTTPS**: Use HTTPS in production
- **Database Security**: Use MongoDB Atlas or secure local installation
- **Email Security**: Use app passwords instead of regular passwords for email services

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow Node.js best practices
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation when necessary
- Ensure all environment variables are documented

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error**
```bash
# Check MongoDB status
# Windows
net start MongoDB

# macOS/Linux
brew services list | grep mongodb
sudo systemctl status mongod
```

**Port Already in Use**
```bash
# Find process using port 9000
# Windows
netstat -ano | findstr :9000

# macOS/Linux
lsof -i :9000

# Kill the process and restart
```

**Email Not Sending**
- Verify email credentials
- Check if 2FA is enabled (use app password)
- Ensure correct SMTP settings
- Check firewall/network restrictions

**CORS Errors**
- Verify `FRONTEND_URL` in `.env`
- Check frontend is running on correct port
- Ensure CORS middleware is properly configured

## 📊 Monitoring and Logs

### Development Logging

The server logs important events:
- Server startup
- Database connections
- Socket.io connections
- API requests
- Errors

### Production Monitoring

Consider implementing:
- Error tracking (e.g., Sentry)
- Performance monitoring
- Database monitoring
- Uptime monitoring

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Lead Developer**: [Your Name]
- **Contributors**: See [CONTRIBUTORS.md](CONTRIBUTORS.md)

## 🙏 Acknowledgments

- Express.js community
- Socket.io team
- MongoDB team
- Node.js community
- All contributors who help improve this project

## 📞 Support

If you have any questions or need help:

- Create an issue on GitHub
- Join our community discussions
- Check the documentation

---

Made with ❤️ by the DateNow team
