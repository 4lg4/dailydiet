/**
 * Created by alga on 1/28/16.
 */

define([
      'text!scripts/core/tpl/navbar.html'
    , 'scripts/app'
],function(
      tplNavbar
    , app
){


    return Backbone.View.extend({
        el: '.app-navbar',

        template: _.template(tplNavbar),

        events: {
            'click .app-menu-dashboard': 'menu-dashboard',
            'click .app-menu-foodUser': 'menu-foodUser',
            'click .app-menu-eatAdd': 'menu-eatAdd',
            'click .app-menu-userMeasure': 'menu-userMeasure',
            'click .app-menu-user': 'menu-user',
            'click .app-menu-food': 'menu-food',
            'click .app-menu-measure': 'menu-measure',
            'click .btn-iate': 'iate'
        },

        initialize: function(){
            console.log('core:navbar:initialize');

            this.render();
        },

        render: function(){
            console.log('core:navbar:render');

            this.$el.html(this.template());

            return this;
        },


        // menus
        menuActive: function(menu){
            console.log('core:navbar:menuActive');

            this['menu-'+ menu]();
        },

        menuUnActive: function(){
            console.log('core:navbar:menuUnActive');

            this.$('.app-menu').removeClass('active');
        },

        menuDropDownActive: function(){
            console.log('core:navbar:menuDropDownActive');

            this.$('.app-menu-dropdown').addClass('active');
        },



        'menu-dashboard': function(){
            console.log('core:navbar:menuDashboard');

            this.menuUnActive();
            this.$('.app-menu-dashboard').addClass('active');
        },

        'menu-foodUser': function(){

            console.log('core:navbar:menufoodUser',Backbone.history.fragment);

            this.menuUnActive();
            this.$('.app-menu-foodUser').addClass('active');

            //if(Backbone.history.fragment !== 'foodUser/add') {
            //    app.router.navigate('#foodUser/add');
            //} else {
            //   app.router.foodUserAdd();
            //}
        },

        'menu-eatAdd': function(){
            console.log('core:navbar:eatAdd');

            this.menuUnActive();
            this.$('.app-menu-eatAdd').addClass('active');

            app.router.eatAddFast();
        },

        'menu-userMeasure': function(){
            console.log('core:navbar:userMeasure');

            this.menuUnActive();
            this.$('.app-menu-userMeasure').addClass('active');

            app.router.measureAddFast();
        },

        'menu-user': function(){
            console.log('core:navbar:menuUser');

            this.menuUnActive();
            this.menuDropDownActive();
            this.$('.app-menu-user').addClass('active');
        },

        'menu-food': function(){
            console.log('core:navbar:menuFood');

            this.menuUnActive();
            this.menuDropDownActive();
            this.$('.app-menu-food').addClass('active');
        },

        'menu-measure': function(){
            console.log('core:navbar:menuMeasure');

            this.menuUnActive();
            this.menuDropDownActive();
            this.$('.app-menu-measure').addClass('active');
        },

        'menu-eat': function(){
            console.log('core:navbar:menuEat');

            this.menuUnActive();
            this.menuDropDownActive();
            this.$('.app-menu-eat').addClass('active');
        },




        iate: function(){
            console.log('module:dashboard:iate');

            app.router.eatAddFast();
        }


    });

});