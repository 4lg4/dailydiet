/**
 * Created by alga on 1/28/16.
 */

define([
    'scripts/app'
    //, 'text!scripts/core/tpl/navbar.html'
],function(
    app
    //, tplNavbar
){


    return Backbone.View.extend({
        el: '.app-module',

        //template: _.template(tplNavbar),

        events: {

        },

        initialize: function(){
            console.log('core:module:initialize');

            this.render();
        },

        render: function(){
            console.log('core:module:render');

            //this.$el.html();

            return this;
        },

        add: function(el){
            console.log('core:module:add');

            this.$el.html(el);
        }

    });

});