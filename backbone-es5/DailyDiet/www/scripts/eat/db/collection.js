/**
 * Created by alga on 1/30/16.
 */


define([
      'scripts/app'
    , 'scripts/eat/db/model'
],function(
      app
    , Model
) {


    return Backbone.Collection.extend({
        model: Model,
        localStorage: new Backbone.LocalStorage('DailyDiet-eat'),

        //updatedDay: function() {
        //    console.log('module:eat:collection:updatedDay');
        //
        //    this.each(function (model) {
        //        model.set('createdAtDay', app.moment(model.get('createdAt')).format('YYYYMMDD'));
        //        model.save();
        //    }, this);
        //},

        dailySum: function(){
            console.log('module:eat:collection:dailySum');

            var dailyGroupSum = {}
            ,   bmr = app.user.get();

            _.each(this.groupBy('createdAtDay'), function(item,k){

                var calories = 0
                ,   carbs = 0
                ,   protein = 0
                ,   fat = 0
                ,   day = '';

                _.each(item, function(i){
                    var food = (i.get('food')) ? app.db.food.findWhere({id: i.get('food').id }) : app.db.foodUser.findWhere({id: i.get('foodUser').id });

                    calories += food.get('calories') * i.get('quantity');
                    carbs += food.get('carbs') * i.get('quantity');
                    protein += food.get('protein') * i.get('quantity');
                    fat += food.get('fat') * i.get('quantity');

                    day = i.get('createdAt');

                });

                dailyGroupSum[k] = {
                    sortKey: k,
                    date: day,
                    calories: calories.toFixed(2),
                    carbs: carbs.toFixed(2),
                    protein: protein.toFixed(2),
                    fat: fat.toFixed(2),
                    bmr: app.user.getBMR(day),
                    weight: app.user.getWeight(day),
                    proteinIntake: app.user.getProteinIntake(day).toFixed(2)
                };
            });

            return _.sortBy(dailyGroupSum,'sortKey').reverse();
        }
    });

});
