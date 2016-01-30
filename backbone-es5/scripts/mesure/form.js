/**
 * Created by alga on 1/29/16.
 */

define([
      'scripts/app'
    , 'text!scripts/mesure/tpl/form.html'
    , 'scripts/mesure/db/model'
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
            console.log('module:mesure:form:initialize');

            this.model = new Model();
        },

        render: function(){
            console.log('module:mesure:form:render');

            this.$el.html(this.template(this.model.toJSON()));

            this.$('.createdAtShow').text(app.moment(this.model.get('createdAt')).format('lll'));

            return this;
        },
        
        show: function(){
            console.log('module:mesure:form:render');

            if(this.modal){
                this.modal.show();
            }
        },

        add: function(){
            console.log('module:mesure:form:add');

            this.model = new Model();
            this.render();
            this.show();
        },

        edit: function(model){
            console.log('module:mesure:form:edit');

            this.model = model;
            this.render();
            this.show();
        },

        save: function(){
            console.log('module:mesure:form:save');

            this.model.set({
                weight: this.$('input[name=weight]').val(),
                belly: this.$('input[name=belly]').val(),
                chest: this.$('input[name=chest]').val(),
                leg: this.$('input[name=leg]').val()
            });

            app.db.mesure.create(this.model);

            //this.model.save();
        }
    });

    var modal = new app.ui.modal({
        title:'Mesure'
    });

    var form = new Form();
        form.modal = modal;

    modal.addBody(form.render().el);

    return form;
    //return {};
});