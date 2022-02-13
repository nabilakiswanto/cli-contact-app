const {tulisPertanyaan, simpanContact} = require('./contacts.js');
const main = async()=> {
    const nama = await tulisPertanyaan('masukkan nama anda : ');
    const email= await tulisPertanyaan('masukkan email anda :');
    const noHP = await tulisPertanyaan('masukkan nomor hp anda :');

 simpanContact(nama, email, noHP);
};
main();