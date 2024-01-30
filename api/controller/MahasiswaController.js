var Mahasiswa = require('../models/Mahasiswa');
const knex = require('../../db/knex');
const express = require('express');
const moment = require('moment');

//------------------------------------------------------------------------------Get All Data
exports.get = async function(req, res) {
    try {
        let mahasiswa = await Mahasiswa.query()
        if(mahasiswa.length > 0 ){
            res.status(200).json({
                success: true,
                data: mahasiswa,
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
    try {
        const id = req.params.id;
        let mahasiswa = await Mahasiswa.query().where('id', id);
        if(mahasiswa.length > 0 ){
            res.status(200).json({
                success: true,
                data: mahasiswa,
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
    try {
        const data = req.body;
        console.log(data);
        Mahasiswa.query().insert({
                nama: data.nama,
                gender: data.gender,
                umur: data.umur,
                alamat: data.alamat,
            })
        .returning(["id", "nama", "gender", "umur", "alamat"])
        .then(async mahasiswa => {
            res.status(200).json({
                success: true,
                message: "Anda Berhasil Terdaftar di Sistem Praktikum! ",
                data: {
                    nama: mahasiswa.nama,
                    gender: mahasiswa.gender,
                    umur: mahasiswa.umur,
                    alamat: mahasiswa.alamat,
                }
            })
        })
        .catch(error => {
            console.log('ERR:',error);
            res.json({
                success: false,
                message: `Registrasi Gagal, ${error.nativeError.detail} `,
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
const data = req.body
    const { id } = req.params
    try {
        const cek_user = await Mahasiswa.query().where(builder => {
                builder.where('nama', data.nama);
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
                message : 'Nama Sudah Terdaftar !',
            })
            } else {
            const dataUpdate = await Mahasiswa
            .query()
            .patch({
                nama: data.nama,
                gender: data.gender,
                umur: data.umur,
                alamat: data.alamat,
                updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
            })
            .where('id', id)
            .returning('nama', 'gender', 'umur', 'alamat')
            .first()
            .then(resp => {
                console.log('RESP:', resp)
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
        }
        }catch(err) {
            console.log(err)
            res.status(500).json({
                success: false,
                message: 'Data user gagal di Update !'
            })
        }
   }


