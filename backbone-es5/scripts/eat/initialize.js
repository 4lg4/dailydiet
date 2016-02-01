/**
 * Created by alga on 1/27/16.
 */


define([
      'scripts/app'
    , 'scripts/eat/module'
    , 'scripts/eat/form'
],function(
      app
    , Module
    , form
){

    return {
        initialize: function(){
            console.log('eat:initialize');

            this.module = new Module();
            app.ui.module.add(this.module.render().el);

            this.form = form;

            app.menuActive('eat');

            return this.module;
        }
    };
});