/**
 * Created by alga on 1/26/16.
 */


define([
      'scripts/core/body'
    , 'scripts/core/module'
    //, 'scripts/core/navbar'
    //, 'scripts/core/modal'
    , 'moment'
],function(
      Body
    , Module
    //, Navbar
    //, Modal
    , moment
){

    var consoleOriginal = window.console;
    var log = function(){
        //var specificLog = window.location.search.match(/\?log:(.*)/);
        //if(specificLog && specificLog[1]) {
        //    return specificLog[1];
        //}

        return window.location.search.match(/\?log/);

        //return false;
    };

    window.console = {
        log: function () {
            if (log()) {
                consoleOriginal.log.apply(consoleOriginal, arguments);
            }
        }
        , warn: function () {
            if (log()) {
                consoleOriginal.warn.apply(consoleOriginal, arguments);
            }
        }
        , error: function () {
            if (log()) {
                consoleOriginal.error.apply(consoleOriginal, arguments);
            }
        }
    };


    var App = function(){
        this.resize = function(){
            console.log('core:app:resize');
        };


        this.m = {};  // initialize module container
        this.ui = {}; // initialize ui container

    };

    console.log('app:initialize');
    var app = new App();

    // ui initialization
    app.ui.body = new Body();             // don't remove this order
    //app.$el.append(app.ui.body.el); // don't remove this order
    app.ui.module = new Module();


    //app.ui.modal = Modal;


    return app;

});