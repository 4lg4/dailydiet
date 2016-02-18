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
                weight: null,
                chest: null,
                leg: null,
                belly: null
            }
        }
    });

});
