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
            'click .btn-delete': 'delete',
            'click .btn-delete-confirm': 'deleteConfirm',
            'click .btn-delete-cancel': 'deleteCancel',

            'click .btn-calendar': 'calendarClick'
        },

        initialize: function(){
            console.log('module:measure:form:initialize');
        },

        render: function(){
            console.log('module:measure:form:render');

            this.$el.html(this.template(this.model.toJSON()));

            //this.$('.createdAtShow').text(app.moment(this.model.get('createdAt')).format('lll'));
            this.calendarInitialize();

            return this;
        },

        addFast: function(){
            console.log('module:measure:form:addFast');

            this.template = tplFormFast;
            this.model = new Model();
            this.model.set('createdAt', app.moment().toISOString());
            this.render();
            if(this.model.isNew()){
                this.deleteHide();
            }

            this.tabsToggleInitialize();

            this.show();
        },

        add: function(){
            console.log('module:measure:form:add');

            this.template = tplForm;
            this.model = new Model();
            this.model.set('createdAt', app.moment().toISOString());
            this.render();

            if(this.model.isNew()){
                this.deleteHide();
            }

            this.show();
        },


        calendarInitialize: function(){
            console.log('module:measure:form:calendarInitialize');

            var self = this;

            this.createdAt = this.$('input[name=createdAt]').datetimepicker({
                defaultDate: app.moment(this.model.get('createdAt')),
                sideBySide: true
            });

            this.$('input[name=createdAt]').on('dp.change', function(e){
                self.model.set('createdAt', e.date.toISOString());
                self.model.set('createdAtDay', e.date.format('YYYYMMDD'));

                self.createdAt.data().DateTimePicker.hide();
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

        edit: function(model){
            console.log('module:measure:form:edit');

            this.template = tplForm;
            this.model = model;
            this.render();
            this.show();
        },

        save: function(){
            console.log('module:measure:form:save');

            var lastMesured = app.db.measure.sortBy('createdAt').reverse()[0];

            this.model.set({
                weight: this.$('input[name=weight]').val(),
                belly: this.$('input[name=belly]').val() || lastMesured.get('belly'),
                chest: this.$('input[name=chest]').val() ||  lastMesured.get('chest'),
                leg: this.$('input[name=leg]').val() ||  lastMesured.get('leg')
            });

            if(this.model.isNew()) {
                app.db.measure.create(this.model);
            }

            this.model.save();
            this.hide();
        },

        deleteHide: function () {
            console.log('module:measure:form:deleteHide');

            this.$('.btn-delete').hide();
            this.$('.btn-delete-confirm-container').hide();
        },

        delete: function () {
            console.log('module:measure:form:save');

            this.$('.btn-delete').hide();
            this.$('.btn-save').hide();
            this.$('.btn-delete-confirm-container').show();
        },

        deleteConfirm: function () {
            console.log('module:measure:form:deleteConfirm',this.model);

            this.model.destroy();
            this.hide();
        },

        deleteCancel: function () {
            console.log('module:measure:form:deleteCancel');

            this.$('.btn-delete-confirm-container').hide();
            this.$('.btn-delete').show();
            this.$('.btn-save').show();
        },

        show: function(){
            console.log('module:measure:form:render');

            if(this.modal){
                this.modal.show();
            }
        },

        hide: function(){
            console.log('module:measure:form:hide');

            if(this.modal){
                this.modal.hide();
            }
        }
    });

    var modal = new app.ui.modal({
        title:'Measure'
    });

    var form = new Form();
        form.modal = modal;

    modal.addBody(form.el);

    return form;
    //return {};
});