/**
 * Created by alga on 1/28/16.
 */


define([
      'moment'
    , 'json!scripts/db/food.json'
    , 'scripts/food/db/collection'
    , 'scripts/foodUser/db/collection'
    , 'scripts/mesure/db/collection'
],function(
      moment
    , food
    , FoodCollection
    , FoodUserCollection
    , MesureCollection
){

    // default content
    var foods = [];
    _.each(food,function(f,k,a){
        f.id = parseInt(k);
        return foods.push(f);
    });


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
        food: new FoodCollection(foods),
        foodUser: new FoodUserCollection(),
        mesure: new MesureCollection()

    };


});