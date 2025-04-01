import dotenv from 'dotenv';
import path from 'path';
import express from 'express';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';
import mongoose from 'mongoose';

import productRoutes from "./routes/products.routes.js";

dotenv.config();

const app = express();
const __dirname=path.resolve();

app.use(express.json()) //alows us to use json data in req.body

app.use("/api/products",productRoutes);
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
    app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});

    
}


app.listen(5000, () => {
    connectDB();
    console.log("Server running successfully at http://localhost:5000");
});
