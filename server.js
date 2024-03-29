const express = require('express');
const mongoose = require('mongoose');
const app = express();
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const cors = require('cors');
require('dotenv').config();

app.use(express.json());

app.use(cors({origin: process.env.CORS_ORIGIN}));

app.use('/api/books', booksRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connected to MongoDB');
            app.listen(process.env.PORT, () => {
                console.log(`Server is running on port ${process.env.PORT}`);
            });
        })
        .catch((error) => {
            console.log('Error connecting to MongoDB', error.message);
        })