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
            'click .btn-calendar': 'calendarClick'
        },

        initialize: function(){
            console.log('module:eat:form:initialize');

            this.model = new Model();
            this.model.set('createdAt', app.moment().toISOString());
        },

        render: function(){
            console.log('module:eat:form:render');

            this.$el.html(this.template(this.model.toJSON()));

            //this.$('.createdAtShow').text(app.moment(this.model.get('createdAt')).format('lll'));
            this.calendarInitialize();
            this.foodListInitialize();

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

            this.show();
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

            this.foodListField.on('typeahead:select', _.bind(this.foodListSelect, this));
        },

        foodListSelect: function(evt,food){
            console.log('module:eat:form:foodListSelect', food);

            if(food.fromUser){
                this.model.set('food',null);
                this.model.set('foodUser',food);
            } else {
                this.model.set('foodUser',null);
                this.model.set('food',food);
            }

            this.$('.unity').text(food.unity);
            this.$('input[name=quantity]').focus();
        },

        calendarInitialize: function(){
            console.log('module:eat:form:calendarInitialize');

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
            console.log('module:eat:form:calendarClick');

            this.$('input[name=createdAt]').focus();
        },

        add: function(){
            console.log('module:eat:form:add');

            this.model = new Model();
            this.render();
            this.show();
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

            console.log('module:eat:form:save', this.model.toJSON());

            app.db.eat.create(this.model);

            this.hide();
        }
    });

    var modal = new app.ui.modal({
        title:'Eat'
    });

    var form = new Form();
        form.modal = modal;

    modal.addBody(form.render().el);

    return form;
    //return {};
});