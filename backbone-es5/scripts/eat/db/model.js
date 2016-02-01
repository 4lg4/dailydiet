/**
 * Created by alga on 1/29/16.
 */

define([
    'moment'
],function(
    moment
) {


    return Backbone.Model.extend({
        defaults: function() {
            return {
                createdAt: moment().toISOString(),
                food: null,
                foodUser: null,
                quantity:null
            }
        }
    });

});
