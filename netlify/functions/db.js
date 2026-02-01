const mongoose = require('mongoose');
require('dotenv').config();

let isConnected = false;

const connectToDatabase = async () => {
    //cek connect
    if (isConnected) {
        console.log('=> Menggunakan koneksi lama');
        return;
    }

    console.log('=> Sedang menghubungkan ke MongoDB...');
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI);
        isConnected = db.connections[0].readyState;
        console.log('=> SUKSES! Terhubung ke Database.');
    } catch (error) {
        console.error('=> GAGAL Connect:', error);
        throw error; //lempar eror
    }
};

module.exports = connectToDatabase;