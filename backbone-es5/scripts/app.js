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
    var App = function(){
        this.resize = function(){
            console.log('core:app:resize');
        };


        this.m = {};  // initialize module container
        this.ui = {}; // initialize ui container

        // http://www.globalrph.com/protein-calculator.htm
        // http://exercise.about.com/cs/nutrition/a/protein_2.htm
        this.calcs = {
            male: {
                BMR: function(weight,height,birthyear) {
                    //The Basal Metabolic Rate (BMR)
                    //BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) + 5   (man)
                    return 10 * weight + 6.25 * height - 5 * (moment().get('year') - birthyear) + 5;
                },
                proteinIntake: function(){
                    // 0.8grams of protein per kilogram
                }
            },
            female: {
                BMR: function(weight,height,birthyear) {
                    //The Basal Metabolic Rate (BMR)
                    //BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) - 161     (woman)
                    return 10 * weight + 6.25 * height - 5 * (moment().get('year') - birthyear) -161;
                },
                //proteinIntake
            }
        };

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