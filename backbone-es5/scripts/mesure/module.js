/**
 * Created by alga on 1/28/16.
 */

define([
      'scripts/app'
    , 'text!scripts/mesure/tpl/module.html'
    , 'scripts/mesure/list-item'
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
            console.log('module:mesure:initialize');

            app.db.mesure.on('add',this.addListItem,this);

        },

        render: function(){
            console.log('module:mesure:render');

            this.$el.html(this.template());

            this.getList();

            return this;
        },


        getList: function(){
            console.log('module:mesure:getList');

            app.db.mesure.each(this.addListItem,this);
        },

        addListItem: function(model){
            console.log('module:mesure:addListItem');

            this.$('.list').append(new ListItem({ model: model }).el);
        },

        addForm: function(){
            app.m.mesure.form.add();
        }

    });
});