var Barang = require('../models/Barang');
const knex = require('../../db/knex');
const express = require('express');
const moment = require('moment');
const { validationResult } = require('express-validator');
//const Date = require('date');
//------------------------------------------------------------------------------Get All Data
exports.get = async function(req, res) {
/* #swagger.tags = ['Barang']
#swagger.description = 'Endpoint untuk mengambil semua data barang' */
/* #swagger.security = [{
"apiKeyAuth": []
}] */
    try {
        let barang = await Barang.query()
        if(barang.length > 0 ){
            res.status(200).json({
                success: true,
                data: barang,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Data tidak detmukan!",
            });
        }
    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

//------------------------------------------------------------------------------Get Data By ID
exports.getById = async function(req, res) {
/* #swagger.tags = ['Barang']
#swagger.description = 'Endpoint untuk mengambil data by ID' */
/* #swagger.security = [{
"apiKeyAuth": []
}] */
    try {
        const id = req.params.id;
        let barang = await Barang.query().where('id', id);
        if(barang.length > 0 ){
            res.status(200).json({
                success: true,
                data: barang,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Data tidak detmukan!",
            });
        }
    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

//------------------------------------------------------------------------------Insert Data
exports.create = async function(req, res) {
/* #swagger.tags = ['Barang']
#swagger.description = 'Endpoint untuk memasukkan data penitipan barang' */
/* #swagger.parameters['body'] = {
name: 'user',
in: 'body',
description: 'User information.',
required: true,
schema: { $ref: '#/definitions/UserRequestFormat' }
} */
/* #swagger.security = [{
"apiKeyAuth": []
}] */
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({
        success: false,
        errors: errors.array()
    });
    try {
        const data = req.body;
        console.log(data);
        Barang.query().insert({
                pemilik_barang: data.pemilik_barang,
                nama_barang: data.nama_barang,
                jenis: data.jenis,
                merk: data.merk,
                kondisi: data.kondisi,
            })
        .returning(["id", "pemilik_barang", "nama_barang", "jenis", "merk", "kondisi"])
        .then(async barang => {
            res.status(200).json({
                success: true,
                message: "Data barang anda sudah masuk di list penitipan barang !!! ",
                data: {
                    pemilik_barang: barang.pemilik_barang,
                    nama_barang: barang.nama_barang,
                    jenis: barang.jenis,
                    merk: barang.merk,
                    kondisi: barang.kondisi,
                }
            })
        })
        .catch(error => {
            console.log('ERR:',error);
            res.json({
                success: false,
                message: `Penitipan Gagal, ${error.nativeError.detail} `,
            });
        })
    }
    catch(error) {
        console.log(error);
        res.json({
            success: false,
            message: "Registrasi Gagal, Internal server error !",
        });
    }
}

//------------------------------------------------------------------------------Update Data
exports.update = async function(req, res) {
/* #swagger.tags = ['Barang']
#swagger.description = 'Endpoint untuk mengupdate data penitipan barang' */
/* #swagger.parameters['body'] = {
name: 'user',
in: 'body',
description: 'User information.',
required: true,
schema: { $ref: '#/definitions/UserRequestFormat' }
} */
/* #swagger.security = [{
"apiKeyAuth": []
}] */
const data = req.body
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({
    success: false,
    errors: errors.array()
});
    const { id } = req.params
    try {
        const cek_user = await Barang.query().where(builder => {
                builder.where('nama_barang', data.nama_barang);
            }).where('id', '<>', id)
            .then(onCheck => {
                console.log('Check, is Exist in other row :', onCheck)
                return onCheck
            })
            .catch(err => {
                console.log('err', err)
                return err
            });
            console.log('CEK USER:', cek_user)
            // Cek Jika data ada, maka beri return Data Email dna Username sudah terdaftar
            if(cek_user.length > 0 ){
            return res.status(400).json({
                success : false,
                message : 'Barang sudah ada !',
            })
            } else {
            const dataUpdate = await Barang
            .query()
            .patch({
                pemilik_barang: data.pemilik_barang,
                nama_barang: data.nama_barang,
                jenis: data.jenis,
                merk: data.merk,
                kondisi: data.kondisi,
                updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            })
            .where('id', id)
            .returning('pemilik_barang', 'nama_barang', 'jenis', 'merk', 'kondisi')
            .first()
            .then(resp => {
                console.log('RESP:', resp)
                res.status(200).json({
                    success: true,
                    message: 'Data barang berhasil di Update',
                    data: resp
                })
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    message: 'Data barang gagal di Update !'
            })
            });
        }
        }catch(err) {
            console.log(err)
            res.status(500).json({
                success: false,
                message: 'Data barang gagal di Update !'
            })
        }
   }

//------------------------------------------------------------------------------Delete Data
exports.delete = async function(req, res) {
/* #swagger.tags = ['Barang']
#swagger.description = 'Endpoint untuk menghapus data barang' */
/* #swagger.security = [{
"apiKeyAuth": []
}] */
    try {
        const id = req.params.id;
        let barang = await Barang.query().where('id', id);
        if(barang.length > 0 ){
            Barang.query()
            .where('id', id)
            .del()
            .then(resp => {
                res.status(200).json({
                    success: true,
                    message: "Data barang berhasil di hapus",
                })
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Data tidak detmukan!",
            });
        }
    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

//------------------------------------------------------------------------------Upload foto barang
exports.updateFotoProfil = async function(req, res) {
/* #swagger.tags = ['Barang']
#swagger.description = 'Endpoint untuk mengupdate foto barang' */
/* #swagger.consumes = ['multipart/form-data']
#swagger.parameters['file'] = {
type: 'file',
in: 'formData',
description: 'Foto profil user.',
required: true
} */
    const file = req.file;
    const { id } = req.params
    try {
        const dataUpdate = await Barang
        .query()
        .patch({
            foto:'uploads/'+ file.filename,
            updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        })
        .where('id', id)
        .returning('id','pemilik_barang', 'foto')
        .first()
        .then(resp => {
            res.status(200).json({
                success: true,
                message: 'Data user berhasil di Update',
                data: resp
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'Data user gagal di Update !'
            })
        });
    } catch(err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: 'Data user gagal di Update !'
        })
    }
}
