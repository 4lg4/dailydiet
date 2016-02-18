/**
 * Created by alga on 1/28/16.
 */

define([
      'scripts/app'
    , 'text!scripts/dashboard/tpl/module.html'
    //, 'scripts/dashboard/weight-item'
    , 'scripts/dashboard/eat-item'
],function(
      app
    , tplModule
    //, WeightItem
    , EatItem
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

            this.listenTo(app.db.eat,'sync',this.getDashboard,this);
            this.listenTo(app.db.measure,'sync',this.getDashboard,this);

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

            app.router.measureAddFast();
        },

        getDashboard: function(){
            console.log('module:dashboard:getDashboard');

            this.$('.eat-list').empty();

            //app.db.eat.each(this.addEatItem,this);
            _.each(app.db.eat.dailySum(),this.addEatItem,this);
            //app.db.measure.each(this.addWeightItem,this);
            //app.db.measure.dailySum();
        },

        addEatItem: function(attr){
            console.log('module:dashboard:addEatItem');

            this.$('.eat-list').append(new EatItem({ model: new Backbone.Model(attr) }).el);
        },

        //addWeightItem: function(model){
        //    console.log('module:dashboard:addWeightItem');
        //
        //    this.$('.weight-list').append(new WeightItem({ model: model }).el);
        //},

    });
});