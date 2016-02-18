/**
 * Created by alga on 1/29/16.
 */

define([
      'scripts/app'
    , 'text!scripts/foodUser/tpl/form.html'
    , 'scripts/foodUser/db/model'
],function(
      app
    , tpl
    , Model
){

    var Form = Backbone.View.extend({
        template: _.template(tpl),

        events: {
            'click .btn-save': 'save'
        },

        initialize: function(){
            console.log('module:foodUser:form:initialize');

            this.model = new Model();
        },

        render: function(){
            console.log('module:foodUser:form:render');

            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },
        
        show: function(){
            console.log('module:foodUser:form:render');

            if(this.modal){
                this.modal.show();
            }
        },

        add: function(){
            console.log('module:foodUser:form:add');

            this.model = new Model();
            this.render();
            this.show();
        },

        edit: function(model){
            console.log('module:foodUser:form:edit');

            this.model = model;
            this.render();
            this.show();
        },

        save: function(){
            console.log('module:foodUser:form:save');

            this.model.set({
                name: this.$('input[name=name]').val(),
                quantity: this.$('input[name=quantity]').val(),
                unity: this.$('input[name=unity]').val(),
                calories: this.$('input[name=calories]').val(),
                protein: this.$('input[name=protein]').val(),
                description: this.$('textarea[name=description]').val()
            });

            app.db.foodUser.create(this.model);

            //this.model.save();
        }
    });

    var modal = new app.ui.modal({
        title:'Food Custom'
    });

    var form = new Form();
        form.modal = modal;

    modal.addBody(form.render().el);

    return form;
    //return {};
});