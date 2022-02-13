
const yargs = require('yargs');
const contacts = require('./contacts');

//menambahkan kontak
yargs.command({
    command: 'add',
    describe: 'menambahkan kontak baru',
    builder: {
        nama: {
            describe: 'nama lengkap',
            demandOption: true,
            type: 'string',
        },
        email:{
            describe: 'email',
            demandOption: false,
            type: 'string',
        },
        noHP:{
            describe:'nomor hp',
            demandOption: true,
            type:'string',
        },
    },
    handler(argv){
        contacts.simpanContact(argv.nama, argv.email, argv.noHP);
        // const contact = {
        //     nama : argv.nama,
        //     email: argv.email,
        //     noHP: argv.noHP,
        // };
        // console.log(contact);
    }
}).demandCommand();

//tampilin daftar kontak
yargs.command({
    command: 'list',
    describe: 'menampilkan daftar kontak',
    handler(){
        contacts.listContact();
    },
});

//tampilin detail data kontak
yargs.command({
    command: 'detail',
    describe: 'menampilkan detail sebuah kontak berdasarkan nama',
    builder:{
        nama: {
            describe: 'nama lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.detailContact(argv.nama);
    },
});

//hapus data berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'menghapus data sebuah kontak berdasarkan nama',
    builder:{
        nama: {
            describe: 'nama lengkap',
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.deleteContact(argv.nama);
    },
});

yargs.parse();



