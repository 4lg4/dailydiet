/**
 * Created by alga on 1/30/16.
 */


define([
      'scripts/app'
    , 'scripts/measure/db/model'
],function(
      app
    , Model
) {


    return Backbone.Collection.extend({
        model: Model,
        localStorage: new Backbone.LocalStorage('DailyDiet-measure'),

        getWeightByDate: function(date){
            console.log('module:eat:collection:getWeightByDate');

            if(!date){
                date = app.moment();
            }

            var weight = _.max(
                _.map(this.where({ createdAtDay: app.moment(date).format('YYYYMMDD') }), function(m){
                    return parseFloat(m.get('weight'));
                })
            );

            return (isFinite(weight)) ? weight : 0;
        },

        getMaxWeight: function(){
            console.log('module:eat:collection:getMaxWeight');

            var weight = _.max(
                this.map(function(m){
                    return parseFloat(m.get('weight'));
                })
            );

            return (isFinite(weight)) ? weight : 0;
        },

        getMinWeight: function(){
            console.log('module:eat:collection:getMinWeight');

            var weight = _.min(
                this.map(function(m){
                    return parseFloat(m.get('weight'));
                })
            );

            return (isFinite(weight)) ? weight : 0;
        }

    });

});
