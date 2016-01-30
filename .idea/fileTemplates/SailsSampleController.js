/**
 * SampleController
 *
 * @description :: Server-side logic for managing people
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var wit = require("../services/core.js");

module.exports = {

    /**
     *  CFG method
     *      configuracoes do modulo
     *      usado em alguns casos
     **/
    cfg: function (req, res) {
        "use strict";
        sails.log.debug("\n * Controller Sample - cfg ");

        // codigo aqui !

        // exemplo retorno sucesso
        return wit.success(res, { objDeRetorno: 'exemplo' });

        // exemplo retorno erro
        //return wit.error(res, { objDeRetorno: 'exemplo' });
    },

    /**
     *  Find method
     *      Lista todas entradas do banco de dados da tabela sample
     **/
    find: function (req, res) {
        "use strict";
        sails.log.debug("\n * Controller Sample - find ");

        // Sample.find (padrao para uso)
        // se precisar modificacoes nao sobre escrever o find usar findSample
        // ver models/Sample.js

        //Sample
        //    .find({ wcustomer_id: req.session.User.wcustomer_id })
        //    .findSample({ wcustomer_id: req.session.User.wcustomer_id })
        //    .then(function(sample){
        //        wit.success(res,sample)
        //    })
        //    .catch(function(err){
        //        wit.error(res,err)
        //    });
    },

    /**
     *  FindOne method
     *      Lista somemente uma entrada do banco de dados da tabela sample
     **/
    findOne: function (req, res) {
        "use strict";
        sails.log.debug("\n * Controller Sample - findOne ");

        // Sample.findOne (padrao para uso)
        // se precisar modificacoes nao sobre escrever o findOne usar findOneSample
        // ver models/Sample.js

        //Sample
        //    .findOne({ wcustomer_id: req.session.User.wcustomer_id })
        //    .findOneSample({ wcustomer_id: req.session.User.wcustomer_id })
        //    .then(function(sample){
        //        wit.success(res,sample)
        //    })
        //    .catch(function(err){
        //        wit.error(res,err)
        //    });
    },

    /**
     *  Create method
     *      cria registro
     **/
    create: function (req, res) {
        "use strict";
        sails.log.debug("\n * Controller Sample - create ");

        // Sample.create (padrao para uso)
        // se precisar modificacoes nao sobre escrever o create usar createSample
        // ver models/Sample.js

        //Sample
        //    .create({ wcustomer_id: req.session.User.wcustomer_id })
        //    .createSample({ wcustomer_id: req.session.User.wcustomer_id })
        //    .then(function(sample){
        //        wit.success(res,sample)
        //    })
        //    .catch(function(err){
        //        wit.error(res,err)
        //    });
    },

    /**
     *  Update method
     *      atualiza registro
     **/
    update: function (req, res) {
        "use strict";
        sails.log.debug("\n * Controller Sample - update ");

        // Sample.update (padrao para uso)
        // se precisar modificacoes nao sobre escrever o update usar updateSample
        // ver models/Sample.js

        //Sample
        //    .update({search:'paramenters', wcustomer_id: req.session.User.wcustomer_id }, { update:'data' })
        //    .updateSample({search:'paramenters', wcustomer_id: req.session.User.wcustomer_id }, { update:'data' })
        //    .then(function(sample){
        //        wit.success(res,sample)
        //    })
        //    .catch(function(err){
        //        wit.error(res,err)
        //    });
    },

    /**
     *  Destroy method
     *      remove registro
     **/
    destroy: function (req, res) {
        "use strict";
        sails.log.debug("\n * Controller Sample - destroy ");

        // Sample.destroy (padrao para uso)
        // se precisar modificacoes nao sobre escrever o destroy usar destroySample
        // ver models/Sample.js

        //Sample
        //    .destroy({search:'paramenters', wcustomer_id: req.session.User.wcustomer_id })
        //    .destroySample({search:'paramenters', wcustomer_id: req.session.User.wcustomer_id })
        //    .then(function(sample){
        //        wit.success(res,sample)
        //    })
        //    .catch(function(err){
        //        wit.error(res,err)
        //    });
    }
};

