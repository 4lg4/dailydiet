/**
 * Created by alga on 1/27/16.
 */


define([
      'scripts/app'
    , 'scripts/food/module'
    , 'scripts/foodUser/form'
],function(
      app
    , Module
    , form
){

    return {
        initialize: function(){
            console.log('food:initialize');

            this.module = new Module();
            app.ui.module.add(this.module.render().el);


            this.formFoodCustom = form;

            app.menuActive('food');

            return this.module;
        }
    };
});