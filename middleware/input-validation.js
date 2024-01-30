const { check } = require('express-validator');

exports.createUserValidation = [
    check('pemilik_barang', 'Pemilik barang tidak boleh kosong').not().isEmpty(),
    check('nama_barang', 'Nama barang tidak boleh kosong').not().isEmpty(),
    check('jenis', 'Jenis barang tidak boleh kosong').not().isEmpty(),
    check('merk', 'Merk barang tidak boleh kosong').not().isEmpty(),
    check('kondisi', 'Kondisi barang tidak boleh kosong').not().isEmpty(),
]