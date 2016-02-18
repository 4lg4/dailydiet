/**
 * Created by alga on 1/27/16.
 */


define([
      'scripts/app'
    , 'scripts/foodUser/module'
    , 'scripts/foodUser/form'
],function(
      app
    , Module
    , form
){

    return {
        initialize: function(id){
            console.log('module:foodUser:initialize');

            this.collection = app.db.foodUser;

            this.form = form;

            this.module = new Module();
            app.ui.module.add(this.module.render().el);

            app.menuActive('food');


            if(id === 'add'){
                this.form.add();
            }

            return this.module;
        }
    };
});