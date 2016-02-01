/**
 * Created by alga on 1/28/16.
 */

define([
      'scripts/app'
    , 'text!scripts/eat/tpl/module.html'
    , 'scripts/eat/list-item'
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
            console.log('module:eat:initialize');

            app.db.eat.on('add',this.addListItem,this);

        },

        render: function(){
            console.log('module:eat:render');

            this.$el.html(this.template());

            this.getList();

            return this;
        },


        getList: function(){
            console.log('module:eat:getList');

            app.db.eat.each(this.addListItem,this);
        },

        addListItem: function(model){
            console.log('module:eat:addListItem');

            this.$('.list').append(new ListItem({ model: model }).el);
        },

        addForm: function(){
            app.m.eat.form.add();
        }

    });
});