/**
 * Created by alga on 1/28/16.
 */


define([
      'moment'
    , 'json!scripts/db/unity.json'
    , 'json!scripts/db/food.json'
    , 'json!scripts/db/dayperiod.json'
    , 'json!scripts/db/dayeattype.json'
    , 'scripts/user/db/model'
    , 'scripts/food/db/collection'
    , 'scripts/foodUser/db/collection'
    , 'scripts/measure/db/collection'
    , 'scripts/eat/db/collection'
],function(
      moment
    , unit
    , food
    , dayperiod
    , dayeattype
    , UserModel
    , FoodCollection
    , FoodUserCollection
    , MeasureCollection
    , EatCollection
){

    // default content
    var foods = [];
    _.each(food,function(f,k,a){
        f.id = parseInt(k);
        return foods.push(f);
    });

    // default content
    var unity = [];
    _.each(unit,function(u,k,a){
        u.id = k;
        return unity.push(u);
    });

    // default content
    var dayperiods = [];
    _.each(dayperiod,function(u,k,a){
        u.id = k;
        return dayperiods.push(u);
    });

    // default content
    var dayeattypes = [];
    _.each(dayeattype,function(u,k,a){
        u.id = k;
        return dayeattypes.push(u);
    });

    var UnityCollection = Backbone.Collection.extend({});

    var DayPeriodsModel = Backbone.Model.extend({
        getMoment: function(hour){

        }
    });
    var DayPeriodsCollection = Backbone.Collection.extend({
        model: DayPeriodsModel,
        getPeriodByHour: function(hour){
            console.log('db:dayperiod:collection:getPeriodByHour');

            var period
            ,   hourClean = hour.replace(':','');

            this.each(function(model){
                if(model.get('begin').replace(':','') <= hourClean && model.get('end').replace(':','') >= hourClean) {
                    period = model;
                }
            });

            return period;
        }
    });
    var DayEatTypesCollection = Backbone.Collection.extend({});


    return {
        user: new UserModel(),
        unity: new UnityCollection(unity),
        food: new FoodCollection(foods),
        dayperiod: new DayPeriodsCollection(dayperiods),
        dayeattype: new DayEatTypesCollection(dayeattypes),
        foodUser: new FoodUserCollection(),
        measure: new MeasureCollection(),
        eat: new EatCollection()
    };


});