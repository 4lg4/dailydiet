/**
 * Created by alga on 1/28/16.
 */


define([
      'moment'
    , 'json!scripts/db/unity.json'
    , 'json!scripts/db/food.json'
    , 'scripts/user/db/model'
    , 'scripts/food/db/collection'
    , 'scripts/foodUser/db/collection'
    , 'scripts/measure/db/collection'
    , 'scripts/eat/db/collection'
],function(
      moment
    , unit
    , food
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

    var UnityCollection = Backbone.Collection.extend();


    return {
        user: new UserModel(),
        unity: new UnityCollection(unity),
        food: new FoodCollection(foods),
        foodUser: new FoodUserCollection(),
        measure: new MeasureCollection(),
        eat: new EatCollection()
    };


});