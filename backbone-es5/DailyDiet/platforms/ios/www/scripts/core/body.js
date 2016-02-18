define([
    'scripts/app',
    'text!scripts/core/tpl/body.html'
],function(
    app,
    tplBody
){


    return Backbone.View.extend({
        el: '.app-body',
        template: _.template(tplBody),

        events: {

        },

        initialize: function(){
            console.log('core:body:initialize');

            this.render();
        },

        render: function(){
            console.log('core:body:render');

            this.$el.html(this.template());

            return this;
        },

        modals: function(){
            console.log('core:body:modals',this.$('.app-modal'));

            return this.$('.app-modal');
        }
    });


});