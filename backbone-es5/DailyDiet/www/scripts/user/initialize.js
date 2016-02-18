/**
 * Created by alga on 1/28/16.
 */

define([
      'scripts/app'
    , 'scripts/user/module'
],function(
      app
    , Module
){

    return {
        initialize: function() {
            console.log('user:initialize');

            this.module = new Module({model: app.db.user});
            app.ui.module.add(this.module.render().el);

            app.menuActive('user');

            return this.module;
        }
    };
});