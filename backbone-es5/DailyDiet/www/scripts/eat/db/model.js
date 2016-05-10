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
                createdAtDay: moment().format('YYYYMMDD'),
                food: null,
                foodUser: null,
                quantity: null,
                groupType: null,
                groupPeriod: null
            }
        }
    });

});
