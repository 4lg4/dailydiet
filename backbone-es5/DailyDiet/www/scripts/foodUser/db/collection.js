/**
 * Created by alga on 1/30/16.
 */


define([
    'scripts/foodUser/db/model'
],function(
    Model
) {


    return Backbone.Collection.extend({
        model: Model,
        localStorage: new Backbone.LocalStorage('DailyDiet-foodUser')
    });

});
