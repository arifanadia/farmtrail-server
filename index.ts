import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productsRouter from './routes/ProductsRoutes'
dotenv.config();  // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true
}));
app.use(express.json());

console.log(process.env.DB_USER);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.taokb31.mongodb.net/farmtrail?retryWrites=true&w=majority&appName=Cluster0`;

const clientOptions: mongoose.ConnectOptions = { 
    serverApi: { 
        version: '1', 
        strict: true, 
        deprecationErrors: true 
    } 
};

// Connect to MongoDB
async function run() {
    try {
        await mongoose.connect(uri, clientOptions);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}

run().catch(console.dir);

// Use the products router
app.use('/', productsRouter);




// Default route
app.get('/', (req, res) => {
    res.send('Farmtrail is providing organic food');
});

// Start the server
app.listen(port, () => {
    console.log(`Farmtrail is providing organic food on port: ${port}`);
});
