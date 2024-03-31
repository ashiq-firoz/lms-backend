const express = require('express');
const mongoose = require('mongoose');
const app = express();
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/admin');
const transactionRoutes = require('./routes/transaction');


const cors = require('cors');
require('dotenv').config();


//added this code for the api to work properly
app.use(cors({
    credentials: true,
}));
//

app.use(express.json());


app.use('/api/books', booksRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/transactions', transactionRoutes);

mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connected to MongoDB');
            app.listen(process.env.PORT, () => {
                console.log(`Server is runniwng on port ${process.env.PORT}`);
            });
        })
        .catch((error) => {
            console.log('Error connecting to MongoDB', error.message);
        })