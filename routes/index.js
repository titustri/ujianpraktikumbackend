var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
    return res.send({
        project:'API Web Service UAS'
    });
});
var barangApi = require('../api/controller/BarangController');
const{createUserValidation}=require('../middleware/input-validation');
const {upload} = require("../middleware/file");

router.get('/barang', barangApi.get);
router.get('/barang/:id', barangApi.getById);
router.post('/barang',createUserValidation, barangApi.create);
router.put('/barang/:id',createUserValidation, barangApi.update);
router.delete('/barang/:id', barangApi.delete);
router.put('/barang/foto/:id', upload('uploads').single("file"), barangApi.updateFotoProfil);

module.exports = router;
