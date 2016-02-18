/**
 * Created by alga on 1/29/16.
 */

define([
],function(
) {


    return Backbone.Model.extend({
        defaults: {
            name: null,
            unity: null,
            quantity: 0,
            calories: null,
            protein: null,
            carbs: null,
            fat: null,
            description: null
        }
    });

});