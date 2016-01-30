/**
 * Created by alga on 1/28/16.
 */

define([
    'scripts/app',
    'text!scripts/foodUser/tpl/food-item.html'
],function(
    app,
    tplFood
){


    return Backbone.View.extend({
        tagName: 'tr',

        template: _.template(tplFood),

        events: {
            'click .btn-eye': 'edit'
        },

        initialize: function(){
            console.log('module:user:initialize');

            this.render();

        },

        render: function(){
            console.log('module:user:render');

            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        edit: function(){
            console.log('module:user:show');
            app.m.food.formFoodCustom.edit(this.model);
        }
    });
});