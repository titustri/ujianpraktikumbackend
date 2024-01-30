var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
    return res.send({
        project:'API Web Service UAS'
    });
});
var mahasiswaApi = require('../api/controller/MahasiswaController');

router.get('/mahasiswa', mahasiswaApi.get);
router.get('/mahasiswa/:id', mahasiswaApi.getById);
router.post('/mahasiswa', mahasiswaApi.create);
router.put('/mahasiswa/:id', mahasiswaApi.update);


module.exports = router;
