//core module
const fs = require('fs');
const chalk = require('chalk');
const validator = require ('validator');
//modul readline
// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

if(!fs.existsSync('./data')){
    fs.mkdirSync('./data');
}

if(!fs.existsSync('./data/contacts.json')){
    fs.writeFileSync('./data/contacts.json', '[]', 'utf-8');
}

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf8');
    const contacts = JSON.parse(file);
    return contacts;
};
//using promise
// const tulisPertanyaan = (quest)=>{
//     return new Promise((resolve, reject)=>{
//         rl.question(quest,(nama)=>{
//             resolve(nama);
//         });
//     });
// };

const simpanContact = (nama, email, noHP) => {
    const contact= {
        nama: nama,
        email: email,
        noHP: noHP,
    };
    const contacts = loadContact();
    // const file = fs.readFileSync('data/contacts.json', 'utf8');
    // const contacts = JSON.parse(file);

    //cek duplikat
    const duplicate = contacts.find((contact)=> contact.nama === nama);
    if(duplicate){
        console.log(chalk.red.inverse.bold('contact sudah terdaftar, gunakan nama lain'));
        return false;
    }

    //cek email pke modul validator
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse.bold('email tidak valid'));
        return false;
        }
    }

    //cek nohP
    if(!validator.isMobilePhone(noHP, 'id-ID')){
        console.log(chalk.red.inverse.bold('nomor hp tidak valid'));
    return false;
    }

    contacts.push(contact);
    //simpan data kontak
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    console.log(chalk.green.inverse.bold('terimakasih')); 

    
};

const listContact = () => {
    const contacts = loadContact();
    console.log(chalk.cyan.inverse.bold('daftar kontak :')); 
    contacts.forEach((contact, i)=> {
        console.log(`${i+1}. ${contact.nama} - ${contact.noHP}`);
    });
};

const detailContact = (nama)=> {
    const contacts = loadContact();
    
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

    if(!contact){
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
        return false; 
    }

    console.log(chalk.cyan.inverse.bold(contact.nama));
    console.log(contact.noHP);
    if(contact.email){
        console.log(contact.email);
    }
};

const deleteContact = (nama) => {
    const contacts = loadContact();
    const newContacts = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());
    if(contacts.length === newContacts.length){
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
        return false; 
    }
    fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));

    console.log(chalk.green.inverse.bold(`data kontak ${nama} telah berhasil dihapus`)); 
};

module.exports = { simpanContact: simpanContact, listContact: listContact, detailContact: detailContact, deleteContact: deleteContact,};
