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
            console.log('module:fooduser:initialize');

            this.model.on('change',this.render,this);

            this.render();

        },

        render: function(){
            console.log('module:fooduser:render');

            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        edit: function(){
            console.log('module:fooduser:show');
            app.m.food.formFoodCustom.edit(this.model);
        }
    });
});