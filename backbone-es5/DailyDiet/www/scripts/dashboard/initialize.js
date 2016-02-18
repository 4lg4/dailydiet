/**
 * Created by alga on 1/27/16.
 */


define([
      'scripts/app'
    , 'scripts/dashboard/module'
    //, 'scripts/dashboard/form'
],function(
      app
    , Module
    //, form
){

    return {
        initialize: function(){
            console.log('dashboard:initialize');

            this.module = new Module();
            app.ui.module.add(this.module.render().el);


            //this.form = form;

            app.menuActive('dashboard');

            return this.module;
        }
    };
});