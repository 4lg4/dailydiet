/**
 * Created by alga on 1/27/16.
 */


define([
      'scripts/app'
    , 'scripts/measure/module'
    , 'scripts/measure/form'
],function(
      app
    , Module
    , form
){

    return {
        initialize: function(){
            console.log('measure:initialize');

            this.module = new Module();
            app.ui.module.add(this.module.render().el);

            this.form = form;

            app.menuActive('measure');

            return this.module;
        }
    };
});