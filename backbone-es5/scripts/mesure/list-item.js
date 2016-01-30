/**
 * Created by alga on 1/28/16.
 */

define([
    'scripts/app',
    'text!scripts/mesure/tpl/list-item.html'
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
            console.log('module:mesure:initialize');

            this.model.on('sync',this.render,this);

            this.model.set('createdAtShow',app.moment(this.model.get('createdAt')).format('lll'));
            this.model.set('fatTotal', ((parseFloat(this.model.get('belly')) + parseFloat(this.model.get('leg')) + parseFloat(this.model.get('chest'))) / 3).toFixed(2));
            this.render();

        },

        render: function(){
            console.log('module:mesure:render');

            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        edit: function(){
            console.log('module:mesure:show');
            app.m.mesure.form.edit(this.model);
        }
    });
});