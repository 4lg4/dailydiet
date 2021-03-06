/**
 * Created by alga on 1/28/16.
 */

define([
      'scripts/app'
    , 'text!scripts/measure/tpl/module.html'
    , 'scripts/measure/list-item'
],function(
      app
    , tplModule
    , ListItem
){


    return Backbone.View.extend({
        template: _.template(tplModule),

        events: {
            'click .btn-add': 'addForm'
        },

        initialize: function(){
            console.log('module:measure:initialize');

            app.db.measure.on('add',this.addListItem,this);

        },

        render: function(){
            console.log('module:measure:render');

            this.$el.html(this.template());

            this.getList();

            return this;
        },


        getList: function(){
            console.log('module:measure:getList');

            app.db.measure.each(this.addListItem,this);
        },

        addListItem: function(model){
            console.log('module:measure:addListItem');

            this.$('.list').append(new ListItem({ model: model }).el);
        },

        addForm: function(){
            app.m.measure.form.add();
        }

    });
});