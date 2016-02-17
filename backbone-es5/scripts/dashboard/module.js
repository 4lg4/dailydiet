/**
 * Created by alga on 1/28/16.
 */

define([
      'scripts/app'
    , 'text!scripts/dashboard/tpl/module.html'
    , 'scripts/dashboard/item'
],function(
      app
    , tplModule
    , DashboardItem
){


    return Backbone.View.extend({
        template: _.template(tplModule),

        events: {
            'click .btn-iate': 'iate',
            'click .btn-scale': 'measured'
        },

        initialize: function(){
            console.log('module:dashboard:initialize');

            //app.db.dashboardUser.on('add',this.addDashboardCustomItem,this);

        },

        render: function(){
            console.log('module:dashboard:render');

            this.$el.html(this.template());

            this.getDashboard();

            return this;
        },

        iate: function(){
            console.log('module:dashboard:iate');

            app.router.eatAddFast();
        },

        measured: function(){
            console.log('module:dashboard:measured');

            app.router.mesureAddFast();
        },

        getDashboard: function(){
            console.log('module:dashboard:getDashboard');

            //app.db.dashboard.each(this.addDashboardItem,this);
            //app.db.dashboardUser.each(this.addDashboardCustomItem,this);
        },

        addDashboardItem: function(model){
            console.log('module:dashboard:addDashboardItem');

            this.$('.dashboard-list').append(new DashboardItem({ model: model }).el);
        },

        addDashboardCustomItem: function(model){
            console.log('module:dashboard:addDashboardCustomItem');

            this.$('.dashboard-custom-list').append(new DashboardCustomItem({ model: model }).el);
        },

        addDashboardCustom: function(){
            app.m.dashboard.formDashboardCustom.add();
        }

    });
});