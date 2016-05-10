/**
 * Created by alga on 1/29/16.
 */

define([
      'scripts/app'
    , 'text!scripts/eat/tpl/form.html'
    , 'text!scripts/eat/tpl/form-fast.html'
    , 'scripts/eat/db/model'
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

            'click .btn-calendar': 'calendarClick',
            'click .btn-search': 'searchClick',
            'click .date-btn': 'dateSpecific'
        },

        initialize: function(){
            console.log('module:eat:form:initialize');
        },

        render: function(){
            console.log('module:eat:form:render');

            this.$el.html(this.template(this.model.toJSON()));

            //this.$('.createdAtShow').text(app.moment(this.model.get('createdAt')).format('lll'));
            this.calendarInitialize();
            this.foodListInitialize();
            this.groupDayPeriodInitialize();
            this.groupTypeInitialize();

            return this;
        },

        show: function(){
            console.log('module:eat:form:show');

            if(this.modal){
                this.modal.show();
            }
        },

        hide: function(){
            console.log('module:eat:form:hide');

            if(this.modal){
                this.modal.hide();
            }
        },

        addFast: function(){
            console.log('module:eat:form:addFast');

            this.model = new Model();
            this.render();

            if(this.model.isNew()){
                this.deleteHide();
            }

            this.show();
        },

        add: function(){
            console.log('module:eat:form:add');

            this.model = new Model();
            this.render();

            if(this.model.isNew()){
                this.deleteHide();
            }

            this.show();
        },

        groupDayPeriodInitialize: function() {
            console.log('module:eat:form:groupDayPeriodInitialize');

            this.$('.groupDayPeriodTitle').text(app.moment().format('lll'));

            this.groupDayPeriod = new app.ui.Radio({
                el: this.$('.groupDayPeriod'),
                items: app.db.dayperiod
            });

            var now;
            if(!this.model.isNew()) {
                now = app.moment();
                this.model.set('createdAt', now.toISOString());
                this.model.set('createdAtDay', now.format('YYYYMMDD'));
            } else {
                now = app.moment(this.model.get('createdAt'));
            }

            var period = app.db.dayperiod.getPeriodByHour(now.format('HHmm'));
            this.groupDayPeriod.val(period.id);
            this.model.set('groupPeriod',period.id);

            this.groupDayPeriod.on('select',this.groupDayPeriodVal,this);
        },

        groupDayPeriodVal: function() {
            console.log('module:eat:form:groupDayPeriodVal');

            //var now = app.moment();
            //this.model.set('createdAt', now.toISOString());
            //this.model.set('createdAtDay', now.format('YYYYMMDD'));

            var period = app.db.dayperiod.getPeriodByHour(now.format('HHmm'));
            this.groupDayPeriod.val(period.id);
            this.model.set('groupPeriod',period.id);
        },

        groupTypeInitialize: function() {
            console.log('module:eat:form:groupTypeInitialize');

            this.groupType = new app.ui.Radio({
                el: this.$('.groupType'),
                items: app.db.dayeattype
            });

            var type = app.db.dayeattype.findWhere({ period: this.model.get('groupPeriod') });
            this.groupType.val(type.id);
            this.model.set('groupType',type.id);

            this.groupType.on('select',this.groupTypeVal,this);
        },

        groupTypeVal: function() {
            console.log('module:eat:form:groupTypeVal');
            this.model.set('groupType',this.groupType.val());
        },

        foodListInitialize: function(){
            console.log('module:eat:form:foodListInitialize');

            var foods = _.union($app.db.food.toJSON(), _.map($app.db.foodUser.toJSON(), function(food){
                food.fromUser = true;
                return food;
            }));

            var food = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: foods
            });

            this.foodListField = this.$('input[name=food]').typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            }, {
                name: 'app-searchfield',
                display: 'name',
                source: food
            });

            if(this.model.get('food_id')){
                this.$('.unity').text(this.model.get('food_unity'));
                this.foodListField.val(this.model.get('food_name'));
            }

            this.foodListField.on('typeahead:select', _.bind(this.foodListSelect, this));
        },

        foodListSelect: function(evt,food){
            console.log('module:eat:form:foodListSelect');

            if(food.fromUser){
                this.model.set({
                    food : null,
                    foodUser: food
                });
            } else {
                this.model.set({
                    food : food,
                    foodUser: null
                });
            }

            this.$('.unity').text(food.unity);
            this.$('input[name=quantity]').focus();
        },

        calendarInitialize: function(){
            console.log('module:eat:form:calendarInitialize');

            var self = this;

            this.createdAt = this.$('input[name=createdAt]').datetimepicker({
                defaultDate: app.moment(this.model.get('createdAt')),
                sideBySide: true,
                showClose: true
            });

            this.$('input[name=createdAt]').on('dp.change', function(e){
                self.model.set('createdAt', e.date.toISOString());
                self.model.set('createdAtDay', e.date.format('YYYYMMDD'));

                self.createdAt.data().DateTimePicker.hide();
            });
        },

        calendarClick: function(){
            console.log('module:eat:form:calendarClick');

            this.$('input[name=createdAt]').focus();
        },

        dateSpecific: function(){
            console.log('module:eat:form:dateSpecific');

            this.$('.groupDayPeriod-container').hide();
            this.$('.date-btn').hide();
            this.$('.date-container').show();
        },

        searchClick: function(){
            console.log('module:eat:form:searchClick');

            this.$('input[name=food]').focus();
        },

        edit: function(model){
            console.log('module:eat:form:edit');

            this.template = tplForm;
            this.model = model;
            this.render();
            this.show();
        },

        save: function(){
            console.log('module:eat:form:save');

            this.model.set({
                quantity: this.$('input[name=quantity]').val()
            });

            if(this.model.isNew()) {
                app.db.eat.create(this.model);
            }

            this.model.save();
            this.hide();
        },

        deleteHide: function () {
            console.log('module:eat:form:deleteHide');

            this.$('.btn-delete').hide();
            this.$('.btn-delete-confirm-container').hide();
        },

        delete: function () {
            console.log('module:eat:form:save');

            this.$('.btn-delete').hide();
            this.$('.btn-save').hide();
            this.$('.btn-delete-confirm-container').show();
        },

        deleteConfirm: function () {
            console.log('module:eat:form:deleteConfirm',this.model);

            this.model.destroy();
            this.hide();
        }
    });

    var modal = new app.ui.modal({
        title:'Eat'
    });

    var form = new Form();
        form.modal = modal;

    modal.addBody(form.el);

    return form;
    //return {};
});
