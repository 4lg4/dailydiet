/**
 * Created by alga on 1/27/16.
 *
 *
 *
 * using bootstrap for this
 * http://getbootstrap.com/javascript/#modals
 *
 *  Methods
 *  .modal('options') (obj)
 *  .modal('toggle')
 *  .modal('toggle')
 *  .modal('show')
 *  .modal('hide')
 *  .modal('handleUpdate')
 *
 *  Events
 *      show.bs.modal    // at start
 *      shown.bs.modal   // at end
 *      hide.bs.modal    // at start
 *      hidden.bs.modal  // at end
 */

define([
    'scripts/app',
    'text!scripts/core/tpl/modal.html'
],function(
    app,
    tplModal
){


    return Backbone.View.extend({
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

        template: _.template(tplModal),

        events: {

        },

        initialize: function(opt){
            console.log('core:modal:initialize');

            this.defaults = _.extend(this.defaults,opt);
            if(!this.defaults.closeOnBlurClick){
                this.defaults.backdrop = 'static';
            }

            if(this.defaults.showOnStart){
                this.defaults.show = true;
            }

            //this.$el.addClass(this.defaults.title);

            this.render();
        },

        render: function(){
            console.log('core:modal:render');
            this.$el.html(this.template(this.defaults));

            this.modalItem = this.$('.app-modal');


            app.ui.body.modals().append(this.el);

            return this;
        },

        show: function(){
            console.log('core:modal:show');

            this.modalItem.modal('show');
        },

        // garbage collector
        destroy: function(){
            console.log('core:modal:destroy');

            this.modalItem.once('hidden.bs.modal',function(){
                this.remove();
            },this);

            this.modalItem.modal('hide');
        },

        addBody: function(el){
            console.log('core:modal:addBody');

            this.$('.modal-body').html(el);
        },

        addFooter: function(el){
            console.log('core:modal:addFooter');

            this.$('.modal-footer')
                .html(el)
                .show();

        }
    });
});
