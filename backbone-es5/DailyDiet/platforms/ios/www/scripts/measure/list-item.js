/**
 * Created by alga on 1/28/16.
 */

define([
    'scripts/app',
    'text!scripts/measure/tpl/list-item.html'
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
            console.log('module:measure:list-item:initialize');

            this.model.on('change',this.render,this);
            this.model.on('remove',this.remove,this);

            this.render();

        },

        beforeRenderSum: function(){
            this.model.set('createdAtShow',app.moment(this.model.get('createdAt')).format('lll'));
            this.model.set('fatTotal', ((parseFloat(this.model.get('belly')) + parseFloat(this.model.get('leg')) + parseFloat(this.model.get('chest'))) / 3).toFixed(2));
        },

        render: function(){
            console.log('module:measure:list-item:render');

            this.beforeRenderSum();

            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },

        edit: function(){
            console.log('module:measure:list-item:show');
            app.m.measure.form.edit(this.model);
        }
    });
});