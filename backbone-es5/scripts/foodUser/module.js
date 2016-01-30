/**
 * Created by alga on 1/28/16.
 */

define([
      'scripts/app'
    , 'text!scripts/food/tpl/module.html'
    , 'scripts/food/food-item'
],function(
      app
    , tplModule
    , FoodItem
){


    return Backbone.View.extend({
        template: _.template(tplModule),

        events: {
        },

        initialize: function(){
            console.log('module:food:initialize');

        },

        render: function(){
            console.log('module:food:render');

            this.$el.html(this.template());

            this.getFood();

            return this;
        },

        show: function(){
            console.log('module:food:show');

        },

        getFood: function(){
            console.log('module:food:getFood');

            app.m.foodUser.collection.each(this.addFoodItem,this);
        },

        addFoodItem: function(model){
            console.log('module:food:addFoodItem');

            this.$('.food-list').append(new FoodItem({ model: model }).el);
        }

    });
});