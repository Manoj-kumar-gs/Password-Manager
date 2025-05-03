import express from "express";
import 'dotenv/config';
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const client = new MongoClient("mongodb://localhost:27017/");
const dbName = 'Password_Manager';
let db;
let passwordsCollection;

// Connect to MongoDB once at startup
async function connectDB() {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');
        db = client.db(dbName);
        passwordsCollection = db.collection('passwords');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1); // Exit if DB connection fails
    }
}
connectDB();

// Get all passwords
app.get('/', async (req, res) => {
    try {
        const passwords = await passwordsCollection.find({}).toArray();
        res.json(passwords);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching passwords");
    }
});

// Save a new password
app.post('/', async (req, res) => {
    try {
        const password = req.body;

        // Check if it's a single object or array
        if (Array.isArray(password)) {
            if (password.length === 0) return res.status(400).send("Empty array");
            await passwordsCollection.deleteMany({});
            const inserted = await passwordsCollection.insertMany(password);
            return res.json({ success: true, result: inserted });
        } else {
            const inserted = await passwordsCollection.insertOne(password);
            return res.json({ success: true, result: inserted });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error saving password");
    }
});

// Delete a password
app.delete('/', async (req, res) => {
    try {
        const { id } = req.body;
        const deleted = await passwordsCollection.deleteOne({ id: id });
        res.json({ success: true, result: deleted.deletedCount });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting password");
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
