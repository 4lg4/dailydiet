/**
 * Created by alga on 1/25/16.
 */

require.config({

    //baseUrl: 'scripts/',

    paths: {
        //main libraries
        promisebluebird: 'node_modules/bluebird/js/browser/bluebird.min',
        jquery: 'node_modules/jquery/dist/jquery.min',
        underscore: 'node_modules/underscore/underscore-min',
        backbone: 'node_modules/backbone/backbone-min',
        backboneLocalStorage: 'node_modules/backbone.localstorage/backbone.localStorage-min',
        bootstrap: 'node_modules/bootstrap/dist/js/bootstrap.min',
        moment: 'node_modules/moment/min/moment-with-locales.min',
        datetimepicker: 'node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
        typeahead: 'node_modules/typeahead.js/dist/typeahead.jquery',
        bloodhound: 'node_modules/typeahead.js/dist/bloodhound.min',
        //charts: 'scripts/core/charts/protovis.min',

        //shortcut paths
        //templates: '../templates',
        //data: '../data',

        //require plugins
        text: 'node_modules/requirejs-text/text',
        //tpl: '../vendor/require/tpl',
        json: 'node_modules/requirejs-json/json',
        //hbs: '../vendor/require-handlebars-plugin/hbs'
    },

    shim: {
        json : {
            deps : ["text"],
            exports : "json"
        },
        jquery: {
            exports: '$'
        },
        backbone: {
            //deps : ["jquery","underscore"],
            exports: 'Backbone'
        },
        backboneLocalStorage: {
            deps : ["backbone"],
            exports: 'backboneLocalStorage'
        },
        bootstrap : {
            deps : ["jquery"],
            exports : "Bootstrap"
        },
        typeahead : {
            deps : ["jquery", "bloodhound"]
        }
    }
});


require([
      'promisebluebird'
    , 'jquery'
    , 'underscore'
    , 'moment'
    , 'backbone'
    , 'backboneLocalStorage'
    , 'bootstrap'
    , 'datetimepicker'
    , 'scripts/app'
    , 'scripts/core/db'
    , 'scripts/core/router'
    , 'scripts/core/navbar'
    , 'scripts/core/modal'
    , 'typeahead'
    //, 'charts'
],function(
      promisebluebird
    , $
    , _
    , moment
    , Backbone
    , BackboneLocalStorage
    , Bootstrap
    , datetimepicker
    , app
    , DB
    , Router
    , Navbar
    , Modal
    , typeahead
    //, charts
){

    window.Promise = promisebluebird; // dont remove this

    $app = app;  // external access on app (development purposes)
    app.moment = moment;


    // order is everything
    console.log('app-config:dbInitialize');
    app.db = DB;
    app.user = app.db.user;
    _.each(app.db, function(db){
        console.log('app-config:dbInitialize');
        if(db.localStorage) {
            db.fetch();
        }
    });


    app.router = new Router();
    if(!Backbone.history.options) {
        Backbone.history.start();
    }

    $(window).resize(function(){
        app.resize();
    });



    app.ui.navbar = new Navbar();
    app.menuActive = function(menu){
        console.log('app:menuActive');

        app.ui.navbar.menuActive(menu);
    };

    app.ui.modal = Modal;

});
