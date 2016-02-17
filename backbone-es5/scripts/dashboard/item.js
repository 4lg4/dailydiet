/**
 * Created by alga on 1/28/16.
 */

define([
    'scripts/app',
    'text!scripts/dashboard/tpl/item.html'
],function(
    app,
    tplDashboard
){


    return Backbone.View.extend({
        tagName: 'tr',

        template: _.template(tplDashboard),

        events: {
            //'click .btn-save': 'save',
            'blur input': 'save'
            //'click .gender-radio': 'setGender'
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

        show: function(){
            console.log('module:user:show');

        },


        save: function(){
            console.log('module:user:save');

            this.model.set({
                name: this.$('input[name=name]').val(),
                email: this.$('input[name=email]').val(),
                height: this.$('input[name=height]').val(),
                birthyear: this.$('input[name=birthyear]').val()
            });

            this.model.save();
        }
    });
});