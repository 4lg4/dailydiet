/**
 * Created by alga on 1/28/16.
 */

define([
    'scripts/app',
    'text!scripts/food/tpl/food-item.html'
],function(
    app,
    tplFood
){


    return Backbone.View.extend({
        tagName: 'tr',

        template: _.template(tplFood),

        events: {
            //'click .btn-save': 'save',
            'blur input': 'save'
            //'click .gender-radio': 'setGender'
        },

        initialize: function(){
            console.log('module:food:initialize');

            this.model.on('change',this.render,this);
            
            this.render();

        },

        render: function(){
            console.log('module:food:render');

            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });
});