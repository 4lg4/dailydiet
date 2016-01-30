/**
 * Created by alga on 1/25/16.
 */

require.config({

    baseUrl: 'scripts/',

    paths: {
        //main libraries
        jquery: 'node_modules/jquery/jquery.min',
        backbone: 'node_modules/backbone/backbone-min',

        //shortcut paths
        //templates: '../templates',
        //data: '../data',

        //require plugins
        //text: '../vendor/require/text',
        //tpl: '../vendor/require/tpl',
        //json: '../vendor/require/json',
        //hbs: '../vendor/require-handlebars-plugin/hbs'
    },

    shim: {
        jquery: {
            exports: '$'
        },
        backbone: {
            exports: 'Backbone'
        }
    }
});


require([
    'app'
],function(
    app
){

    console.log(app);


});
