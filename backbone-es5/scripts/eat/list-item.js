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