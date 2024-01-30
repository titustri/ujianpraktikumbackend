const { Model } = require('objection');
const knex = require('../../db/knex')
Model.knex(knex)
class Barang extends Model {
static get tableName() {
return 'barang';
}
static get idColumn() {
return ['id'];
}
}
module.exports = Barang;
