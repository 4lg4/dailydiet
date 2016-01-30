/**
 * Sample.js
 *
 * @description :: responsavel pela ligacao com a tabela "Sample".
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPK: false,

    tableName: 'sample',

    attributes: {
        id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true
        },
        desc: 'string',
        state: {
            type: 'boolean',
            defaultsTo: true
        },

        //tkt_creator: {
        //    model: 'tkt_creator',
        //    via: 'tkt_id',
        //    columnName: 'tkt_creator_id'
        //},
        //
        //tkt_hardwares: {
        //    collection: 'tkt_hardware',
        //    via: 'tkt_id'
        //}
    },



    // Nao sobre escrever os methodos padroes
    // create, update, find, findOne
    // usar os exemplos abaixo
    // trocando Sample pelo nome do Model

    findSample: function(){
        return Promise
            .resolve()
            .then(function(){

            })
    },

    findOneSample: function(){

    },

    createSample: function(){

    },

    updateSample: function(){

    },

    destroySample: function(){

    }
}