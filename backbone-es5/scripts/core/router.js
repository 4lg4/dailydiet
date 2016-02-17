/**
 * Created by alga on 1/27/16.
 */


define([
    'scripts/app'
],function(
    app
){

    return Backbone.Router.extend({

        // setup routes
        routes: {
            '': 'home',

            'dashboard': 'dashboard',

            'food': 'food',					// nao tirar dessa ordem
            'food/:id': 'food',			    // nao tirar dessa ordem
            'food/:id/:otherstuff': 'food',	// nao tirar dessa ordem

            'userMesure': 'userMesure',

            'foodUser': 'foodUser',    // nao tirar dessa ordem
            'foodUser/:id': 'foodUser', // nao tirar dessa ordem
            'foodUser/add': 'foodUserAdd', // nao tirar dessa ordem

            'user': 'user',					// nao tirar dessa ordem
            'user/:id': 'user',			    // nao tirar dessa ordem

            'mesure': 'mesure',					// nao tirar dessa ordem
            'mesure/:id': 'mesure',			    // nao tirar dessa ordem

            'eat': 'eat',					// nao tirar dessa ordem
            'eat/:id': 'eat'			    // nao tirar dessa ordem
        },

        // when a route is called always cross here
        execute: function(cb, args, name) {
            console.log('core:router:execute', name, args);

            cb.apply(this, args);
        },

        home: function () {
            console.log('core:router:home');

            //if (!wit.session.is()) {
            //    app.router.navigate("signin", {trigger: true});
            //    return true;
            //}
            //app.router.navigate('#' + app.session.user.get('urlDefault'), {trigger: true});
        },



        // put the routes function down here


        dashboard: function(id){
            console.log('core:router:dashboard', id);

            //alert(app.calcs.male.BMR(app.user.getWeight(),app.user.get('height'),app.user.get('birthyear')));

            require(['scripts/dashboard/initialize'], function(dashboard){
                app.m.dashboard = dashboard;
                app.m.dashboard.initialize();
            });
        },

        //foodUser: function(id){
        //    console.log('core:router:foodUser', id);
        //
        //    require(['scripts/foodUser/initialize'], function(foodUser){
        //        app.m.foodUser = foodUser;
        //        app.m.foodUser.initialize(id);
        //    });
        //},
        //
        //foodUserAdd: function(){
        //    console.log('core:router:foodUserAdd');
        //
        //    require(['scripts/foodUser/form'], function(form){
        //        if(app.m.foodUser){
        //            app.m.foodUser.form = form;
        //        } else {
        //            app.m.foodUser = {
        //                form: form
        //            };
        //        }
        //
        //        app.m.foodUser.form.add();
        //    });
        //},

        food: function(id,otherstuff){
            console.log('core:router:food', id, otherstuff);

            require(['scripts/food/initialize'], function(food){
                app.m.food = food;
                app.m.food.initialize();
            });
        },

        mesure: function(id){
            console.log('core:router:mesure', id);

            require(['scripts/mesure/initialize'], function(mesure){
                app.m.mesure = mesure;
                app.m.mesure.initialize(id);
            });
        },

        mesureAddFast: function(id){
            console.log('core:router:mesure', id);

            require(['scripts/mesure/form'], function(form){
                if(app.m.mesure){
                    app.m.mesure.form = form;
                } else {
                    app.m.mesure = {
                        form: form
                    };
                }

                app.m.mesure.form.addFast();
            });
        },

        eatAddFast: function(id){
            console.log('core:router:eat', id);

            require(['scripts/eat/form'], function(form){
                if(app.m.eat){
                    app.m.eat.form = form;
                } else {
                    app.m.eat = {
                        form: form
                    };
                }

                app.m.eat.form.addFast();
            });
        },

        eat: function(){
            console.log('core:router:eat');

            require(['scripts/eat/initialize'], function(eat){
                app.m.eat = eat;
                app.m.eat.initialize();
            });
        },

        user: function(id){
            console.log('core:router:user', id, app);

            require(['scripts/user/initialize'], function(user){
                app.m.user = user;
                app.m.user.initialize();
            });
        }

    });

});