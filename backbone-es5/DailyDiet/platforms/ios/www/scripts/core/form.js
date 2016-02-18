/**
 * Created by alga on 1/29/16.
 *
 *
 *
 * using bootstrap for this
 * http://getbootstrap.com/javascript/#forms
 *
 *  Methods
 *  .form('options') (obj)
 *  .form('toggle')
 *  .form('toggle')
 *  .form('show')
 *  .form('hide')
 *  .form('handleUpdate')
 *
 *  Events
 *      show.bs.form    // at start
 *      shown.bs.form   // at end
 *      hide.bs.form    // at start
 *      hidden.bs.form  // at end
 */

define([
      'scripts/app'
    , 'scripts/core/modal'
    //, 'text!scripts/core/tpl/form.html'
],function(
      app
    , Modal
    //, tplForm
){


    var Form = Backbone.View.extend({
        defaults: {
            keyboard: true,
            closeOnBlurClick: true,
            showOnStart: false,
            title: '', // (string)
            size: 'md', // (xs|sm|md|lg)

            // internal options
            backdrop: true, // (boolean|static)
            show: false // (boolean)
        },

        template: _.template(tplForm),

        events: {

        },

        initialize: function(opt){
            console.log('core:form:initialize');

            this.defaults = _.extend(this.defaults,opt);
            if(!this.defaults.closeOnBlurClick){
                this.defaults.backdrop = 'static';
            }

            if(this.defaults.showOnStart){
                this.defaults.show = true;
            }

            //this.$el.addClass(this.defaults.title);

            this.render();
            app.ui.body.forms().append(this.el);
        },

        render: function(){
            console.log('core:form:render');
            this.$el.html(this.template(this.defaults));

            this.formItem = this.$('.app-form');

            return this;
        },

        show: function(){
            console.log('core:form:show');

            this.formItem.form('show');
        },

        // garbage collector
        destroy: function(){
            console.log('core:form:destroy');

            this.formItem.once('hidden.bs.form',function(){
                this.remove();
            },this);

            this.formItem.form('hide');
        },

        html: function(el){
            this.$el.html(el);
        },

        append: function(el){
            this.$el.append(el);
        },

        appendForm: function(){

        }
    });



    return Backbone.View.extend({
        initialize: function(){

        }
    });
});
