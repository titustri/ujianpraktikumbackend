const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js']; // root file dimana router dijalankan.
const doc = {
info: {
    title: 'Ujian Praktikum BE API',
    description: 'Ini adalah Endpoint dari Praktikum BackEnd',
},
host: 'localhost:5000',
basePath: "/data/",
schemes: ['http'],
definitions: {
    UserRequestFormat: {
        $pemilik_barang: '',
        $nama_barang: '',
        $merk: '',
        $jenis: '',
        $kondisi: ''
}
}
};
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
require('./index.js'); // Your project's root file
})