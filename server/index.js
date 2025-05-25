import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userroutes from "./routes/user.js"
import questionroutes from "./routes/question.js"
import answerroutes from "./routes/answer.js"
import languageRoutes from "./routes/language.js"
const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

// Health check endpoint
app.get('/health', (req, res) => {
    const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({ 
        status: 'ok',
        mongodb: mongoStatus
    });
});

app.use("/user", userroutes);
app.use('/questions', questionroutes)
app.use('/answer', answerroutes)
app.use('/language', languageRoutes)
app.get('/', (req, res) => {
    res.send("Codequest is running perfect")
})

const PORT = process.env.PORT || 5000
const database_url = process.env.MONGODB_URL

mongoose.connect(database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB successfully');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    });