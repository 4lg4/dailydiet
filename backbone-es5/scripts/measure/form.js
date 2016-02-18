/**
 * Created by alga on 1/29/16.
 */

define([
      'scripts/app'
    , 'text!scripts/measure/tpl/form.html'
    , 'text!scripts/measure/tpl/form-fast.html'
    , 'scripts/measure/db/model'
],function(
      app
    , tpl
    , tplFast
    , Model
){

    var tplForm = _.template(tpl)
    ,   tplFormFast = _.template(tplFast);

    var Form = Backbone.View.extend({
        template: tplForm,

        events: {
            'click .btn-save': 'save',
            'click .btn-calendar': 'calendarClick'
        },

        initialize: function(){
            console.log('module:measure:form:initialize');

            this.model = new Model();
            this.model.set('createdAt', app.moment().toISOString());
        },

        render: function(){
            console.log('module:measure:form:render');

            this.$el.html(this.template(this.model.toJSON()));

            this.$('.createdAtShow').text(app.moment(this.model.get('createdAt')).format('lll'));

            return this;
        },
        
        show: function(){
            console.log('module:measure:form:render');

            if(this.modal){
                this.modal.show();
            }
        },

        addFast: function(){
            console.log('module:measure:form:addFast');

            this.template = tplFormFast;
            this.model = new Model();
            this.render();

            this.calendarInitialize();
            this.tabsToggleInitialize();

            this.show();
        },

        calendarInitialize: function(){
            console.log('module:measure:form:calendarInitialize');

            var self = this;

            this.$('input[name=createdAt]').datetimepicker({
                //format:'MM/DD/YYYY',
                defaultDate: app.moment(this.model.get('createdAt'))
            });

            this.$('input[name=createdAt]').on('dp.change', function(e){
                self.model.set('createdAt', e.date.toISOString());
            });
        },

        calendarClick: function(){
            console.log('module:measure:form:calendarClick');

            this.$('input[name=createdAt]').focus();
        },

        tabsToggleInitialize: function(){
            console.log('module:measure:form:tabsToggleInitialize');

            var self = this;
            this.$('.tabs').change(function() {
                self.tabsToggle(this);
            });
        },

        tabsToggle: function(toggle){
            console.log('module:measure:form:tabsToggle');

            if($(toggle).find('.tab-weight').hasClass('active')){
                this.$('.fat-container').hide();
                this.$('.weight-container').show();
            } else {
                this.$('.weight-container').hide();
                this.$('.fat-container').show();
            }
        },

        add: function(){
            console.log('module:measure:form:add');

            this.template = tplForm;
            this.model = new Model();
            this.render();
            this.show();
        },

        edit: function(model){
            console.log('module:measure:form:edit');

            this.template = tplForm;
            this.model = model;
            this.render();
            this.show();
        },

        save: function(){
            console.log('module:measure:form:save');

            this.model.set({
                weight: this.$('input[name=weight]').val(),
                belly: this.$('input[name=belly]').val() || 0,
                chest: this.$('input[name=chest]').val() || 0,
                leg: this.$('input[name=leg]').val() || 0
            });

            app.db.measure.create(this.model);

            //this.model.save();
        }
    });

    var modal = new app.ui.modal({
        title:'Measure'
    });

    var form = new Form();
        form.modal = modal;

    modal.addBody(form.render().el);

    return form;
    //return {};
});