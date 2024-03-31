const mongoose = require("mongoose");

const BookTransactionSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    borrowerId: {
        type: String,

        required: true
    },
    fromDate: {
        type: Date,
        required: true,
    },
    toDate: {
        type: Date,
        required: true,
    },
    returnDate: {
        type: Date
    },
    transactionStatus: {
        type: String,
        default: "Active"
    }
},
    {
        timestamps: true
    }
);

const transactionModel = mongoose.model("transaction", BookTransactionSchema);
module.exports = transactionModel;