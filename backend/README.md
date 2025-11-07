# Tubonge Backend

Express.js + Socket.io backend for Tubonge chat application.

## Quick Start

```bash
npm install
npm run dev
```

## Environment Variables

Create `.env` file (see `.env.example`):
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

## API Endpoints

- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get profile (protected)
- `GET /api/messages` - Get messages (protected)
- `GET /health` - Health check

## Socket.io Events

**Emit:**
- `sendMessage` - Send message
- `typing` - Start typing
- `stopTyping` - Stop typing

**Listen:**
- `newMessage` - New message received
- `activeUsers` - Active users updated
- `userTyping` / `userStopTyping` - Typing status

---

For complete documentation, see the [main README](../README.md).
