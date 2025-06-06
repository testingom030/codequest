import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const database_url = process.env.MONGODB_URL;

mongoose.connect(database_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
    process.exit(0);
})
.catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error.message);
    process.exit(1);
});
