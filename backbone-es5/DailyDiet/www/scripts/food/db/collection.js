/**
 * Created by alga on 1/30/16.
 */


define([
    'scripts/food/db/model'
],function(
    Model
) {


    return Backbone.Collection.extend({
        model: Model
    });

});
