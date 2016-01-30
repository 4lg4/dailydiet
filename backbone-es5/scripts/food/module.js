/**
 * Created by alga on 1/28/16.
 */

define([
      'scripts/app'
    , 'text!scripts/food/tpl/module.html'
    , 'scripts/food/food-item'
    , 'scripts/foodUser/food-item'
],function(
      app
    , tplModule
    , FoodItem
    , FoodCustomItem
){


    return Backbone.View.extend({
        template: _.template(tplModule),

        events: {
            'click .btn-add-food-custom': 'addFoodCustom'
        },

        initialize: function(){
            console.log('module:food:initialize');

            app.db.foodUser.on('add',this.addFoodCustomItem,this);

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

            app.db.food.each(this.addFoodItem,this);
            app.db.foodUser.each(this.addFoodCustomItem,this);
        },

        addFoodItem: function(model){
            console.log('module:food:addFoodItem');

            this.$('.food-list').append(new FoodItem({ model: model }).el);
        },

        addFoodCustomItem: function(model){
            console.log('module:food:addFoodCustomItem');

            this.$('.food-custom-list').append(new FoodCustomItem({ model: model }).el);
        },

        addFoodCustom: function(){
            app.m.food.formFoodCustom.add();
        }

    });
});