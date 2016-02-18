/**
 * Created by alga on 1/28/16.
 */

define([
    'scripts/app',
    'text!scripts/eat/tpl/list-item.html'
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
            console.log('module:eat:initialize');

            this.model.on('change',this.render,this);
            this.model.on('remove',this.remove,this);

            this.render();
        },

        beforeRenderFixModel: function(){
            this.model.set('createdAtShow',app.moment(this.model.get('createdAt')).format('lll'));

            var food = (this.model.get('food')) ? app.db.food.findWhere({id: this.model.get('food').id }) : app.db.foodUser.findWhere({id: this.model.get('foodUser').id });

            this.model.set({
                food_id: food.get('id'),
                food_name: food.get('name'),
                food_unity: food.get('unity'),
                food_calories: food.get('calories'),
                food_caloriesTotal: (food.get('calories') * this.model.get('quantity')).toFixed(2)
            });
        },

        render: function(){
            console.log('module:eat:render');

            this.beforeRenderFixModel();

            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        edit: function(){
            console.log('module:eat:show');
            app.m.eat.form.edit(this.model);
        }
    });
});