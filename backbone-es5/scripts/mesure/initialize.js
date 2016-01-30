/**
 * Created by alga on 1/27/16.
 */


define([
      'scripts/app'
    , 'scripts/mesure/module'
    , 'scripts/mesure/form'
],function(
      app
    , Module
    , form
){

    return {
        initialize: function(){
            console.log('mesure:initialize');

            this.module = new Module();
            app.ui.module.add(this.module.render().el);

            this.form = form;

            app.menuActive('mesure');

            return this.module;
        }
    };
});