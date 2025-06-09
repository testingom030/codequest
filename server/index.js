import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from 'url'
import { MongoClient, ServerApiVersion } from 'mongodb'
import userroutes from "./routes/user.js"
import questionroutes from "./routes/question.js"
import answerroutes from "./routes/answer.js"
import avatarRoutes from "./routes/avatar.js"
import postRoutes from "./routes/post.js"
import languageRoutes from "./routes/language.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
// Configure CORS
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://client-beta-amber.vercel.app',
        'https://backend-sigma-ashen-62.vercel.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    exposedHeaders: ['Content-Range', 'X-Content-Range'],
    maxAge: 86400
}));

// Handle preflight requests
app.options('*', cors());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to CodeQuest API' });
});

app.post('/debug/echo', (req, res) => {
    console.log('Debug - Headers:', req.headers);
    console.log('Debug - Body:', req.body);
    res.json({
        received: {
            body: req.body,
            contentType: req.headers['content-type']
        }
    });
});

app.use("/user", userroutes);
app.use('/questions', questionroutes);
app.use('/answer', answerroutes);
app.use('/avatar', avatarRoutes);
app.use('/posts', postRoutes);
app.use('/language', languageRoutes);

const PORT = process.env.PORT || 3001
const database_url = process.env.MONGODB_URL

// MongoDB Connection with improved settings
const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 30000, // Increased from 5000
    socketTimeoutMS: 75000, // Increased from 45000
    family: 4,  // Force IPv4
    keepAlive: true,
    keepAliveInitialDelay: 300000
};

// Connect to MongoDB before starting the server
mongoose.connect(process.env.MONGODB_URL, mongoOptions)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Connection error handling
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
    } catch (err) {
        console.error('Error closing MongoDB connection:', err);
        process.exit(1);
    }
});

// Connect to MongoDB
connectToDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error in initial connection:', err);
    });

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        }
    });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);
    
    // Return error response
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// MongoDB connection test endpoint
app.get('/mongodb-test', async (req, res) => {
    try {
        // Test the MongoDB connection
        const dbStatus = mongoose.connection.readyState;
        const status = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting'
        };
        res.json({
            mongoDBConnection: status[dbStatus],
            database: mongoose.connection.name,
            host: mongoose.connection.host
        });
    } catch (error) {
        res.status(500).json({
            error: 'MongoDB connection test failed',
            details: error.message
        });
    }
});

// Export the Express API for Vercel
export default app;