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

            this.model.on('sync',this.render,this);

            this.model.set('createdAtShow',app.moment(this.model.get('createdAt')).format('lll'));

            if(this.model.get('food')){
                this.model.set({
                    food_id: this.model.get('food').id,
                    food_name: this.model.get('food').name,
                    food_unity: this.model.get('food').unity
                });
            } else {
                this.model.set({
                    food_id: this.model.get('foodUser').id,
                    food_name: this.model.get('foodUser').name,
                    food_unity: this.model.get('foodUser').unity
                });
            }


            this.render();
        },

        render: function(){
            console.log('module:eat:render');

            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        edit: function(){
            console.log('module:eat:show');
            app.m.eat.form.edit(this.model);
        }
    });
});