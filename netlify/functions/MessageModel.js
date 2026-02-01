const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

//cek model sudah ada, kalau belum baru buat
module.exports = mongoose.models.Message || mongoose.model('Message', MessageSchema);