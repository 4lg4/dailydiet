/**
 * Created by alga on 1/28/16.
 */


define([
      'moment'
    , 'json!scripts/db/unity.json'
    , 'json!scripts/db/food.json'
    , 'scripts/food/db/collection'
    , 'scripts/foodUser/db/collection'
    , 'scripts/mesure/db/collection'
    , 'scripts/eat/db/collection'
],function(
      moment
    , unit
    , food
    , FoodCollection
    , FoodUserCollection
    , MesureCollection
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

    var UnityCollection = Backbone.Collection.extend();

    // customer data
    var User = Backbone.Model.extend({
        defaults: function() {
            return {
                name: null,
                email: null,
                gender: null,
                height: null,
                birthyear: null,
                yearMin: 1900,
                yearMax: moment().get('year')
            };
        },

        getWeight: function(){
            return 113;
        },
        //
        //initialize: function() {
        //
        //}

        parse: function(attr){
            if(_.isArray(attr)){
                return attr[0];
            }

            return attr;
        },

        localStorage: new Backbone.LocalStorage('DailyDiet-user')
    });


    return {
        user: new User(),
        unity: new UnityCollection(unity),
        food: new FoodCollection(foods),
        foodUser: new FoodUserCollection(),
        mesure: new MesureCollection(),
        eat: new EatCollection()
    };


});