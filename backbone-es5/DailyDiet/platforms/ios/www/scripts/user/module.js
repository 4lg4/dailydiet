/**
 * Created by alga on 1/28/16.
 */

define([
    'scripts/app',
    'text!scripts/user/tpl/module.html'
],function(
    app,
    tplModule
){


    return Backbone.View.extend({
        template: _.template(tplModule),

        events: {
            //'click .btn-save': 'save',
            'blur input': 'save'
            //'click .gender-radio': 'setGender'
        },

        initialize: function(){
            console.log('module:user:initialize');

        },

        render: function(){
            console.log('module:user:render');

            this.$el.html(this.template(this.model.toJSON()));

            this.genderToggle();

            return this;
        },

        show: function(){
            console.log('module:user:show');

        },

        genderToggle: function(){
            console.log('module:user:genderToggle');

            var self = this;
            this.$('.gender-radio').change(function() {
                self.setGender(this);
            });

            this.$('.gender-radio .gender-radio-'+ this.model.get('gender')).button('toggle');
        },

        setGender: function(toggle){
            console.log('module:user:setGender');

            if($(toggle).find('.gender-radio-male').hasClass('active')){
                this.model.set('gender','male');
            } else {
                this.model.set('gender','female');
            }

            this.save();
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