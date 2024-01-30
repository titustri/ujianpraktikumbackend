const { Model } = require('objection');
const knex = require('../../db/knex')
Model.knex(knex)
class Mahasiswa extends Model {
static get tableName() {
return 'mahasiswa';
}
static get idColumn() {
return ['id'];
}
}
module.exports = Mahasiswa;
