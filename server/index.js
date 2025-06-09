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
    origin: ['https://code-quest-frontend-sigma.vercel.app', 'http://localhost:3000', 'https://code-quest-flame.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/health', async (req, res) => {
    try {
        await connectToDatabase();
        const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
        res.json({ 
            status: 'ok',
            mongodb: mongoStatus,
            env: process.env.NODE_ENV || 'not set',
            hasMongoUrl: !!process.env.MONGODB_URL
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error',
            mongodb: 'error',
            message: error.message
        });
    }
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

app.get('/', (req, res) => {
    res.send("Codequest is running perfect")
})

const PORT = process.env.PORT || 3001
const database_url = process.env.MONGODB_URL

// Enhanced MongoDB connection for serverless
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb };
    }
    
    try {
        // Create a MongoClient with a MongoClientOptions object to set the Stable API version
        const client = new MongoClient(database_url, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });

        // Connect the client to the server
        await client.connect();
        
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("✅ Pinged your deployment. Successfully connected to MongoDB!");
        
        const db = await mongoose.connect(database_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        cachedClient = client;
        cachedDb = db;
        
        return { client, db };
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        throw error;
    }
}

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

// Export the Express API for Vercel
export default app;