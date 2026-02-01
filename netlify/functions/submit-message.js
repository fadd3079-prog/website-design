const connectToDatabase = require('./db');
const Message = require('./MessageModel');

exports.handler = async (event, context) => {
  // 1. Izin Akses (CORS) - Biar browser tidak blokir
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // 2. Jika browser cuma "tanya-tanya" dulu (Preflight Check)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // 3. Pastikan metode pengiriman adalah POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }

  try {
    // 4. Koneksi ke Database
    await connectToDatabase();

    // 5. Baca data yang dikirim
    const data = JSON.parse(event.body);

    // 6. Validasi: Cek kelengkapan
    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Mohon lengkapi semua kolom!' })
      };
    }

    // 7. Siapkan data untuk disimpan
    const newMessage = new Message({
      name: data.name,
      email: data.email,
      message: data.message
    });

    // 8. SIMPAN!
    await newMessage.save();

    // 9. Beri kabar sukses
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Pesan berhasil disimpan ke Database!' })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'Gagal menyimpan pesan. Server Error.' })
    };
  }
};