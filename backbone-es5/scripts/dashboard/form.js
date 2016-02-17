/**
 * Created by alga on 1/29/16.
 */

define([
      'scripts/app'
    , 'text!scripts/dashboard/tpl/form.html'
    , 'scripts/dashboard/db/model'
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
            console.log('module:dashboardUser:form:initialize');

            this.model = new Model();
        },

        render: function(){
            console.log('module:dashboardUser:form:render');

            this.$el.html(this.template(this.model.toJSON()));

            return this;
        },
        
        show: function(){
            console.log('module:dashboardUser:form:render');

            if(this.modal){
                this.modal.show();
            }
        },

        add: function(){
            console.log('module:dashboardUser:form:add');

            this.model = new Model();
            this.render();
            this.show();
        },

        edit: function(model){
            console.log('module:dashboardUser:form:edit');

            this.model = model;
            this.render();
            this.show();
        },

        save: function(){
            console.log('module:dashboardUser:form:save');

            this.model.set({
                name: this.$('input[name=name]').val(),
                quantity: this.$('input[name=quantity]').val(),
                unity: this.$('input[name=unity]').val(),
                calories: this.$('input[name=calories]').val(),
                protein: this.$('input[name=protein]').val(),
                description: this.$('textarea[name=description]').val()
            });

            app.db.dashboardUser.create(this.model);

            //this.model.save();
        }
    });

    var modal = new app.ui.modal({
        title:'Dashboard Custom'
    });

    var form = new Form();
        form.modal = modal;

    modal.addBody(form.render().el);

    return form;
    //return {};
});