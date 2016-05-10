/**
 * Created by alga on 1/28/16.
 */

define([
    'scripts/app',
    'text!scripts/dashboard/tpl/eat-item.html'
],function(
    app,
    tplItem
){


    return Backbone.View.extend({
        tagName: 'tr',
        className: 'clickable',

        template: _.template(tplItem),

        events: {
            'click': 'goToDay',
            'blur input': 'save'
            //'click .gender-radio': 'setGender'
        },

        initialize: function(){
            console.log('module:dashboard:eat-item:initialize');

            this.model.set('dateShow',app.moment(this.model.get('date')).format('ddd DD MMM'));

            if(!this.model.get('pound')){
                this.model.set('pound',null);
            }
            
            this.model.set('dangerCalories','');
            if(parseFloat(this.model.get('calories')) > parseFloat(this.model.get('bmr'))){
                this.model.set('dangerCalories','dangerCalories');
            }

            // color control for protein on dashboard
            this.model.set({
                warningProtein: null,
                dangerProtein: null
            });


            var protein = parseFloat(this.model.get('protein'))
            ,   proteinIntake = parseFloat(this.model.get('proteinIntake'))
            ,   proteinIntakeMax = parseFloat(this.model.get('proteinIntake')) * 1.5
            ,   proteinIntakeMin = parseFloat(this.model.get('proteinIntake')) / 1.5;

            //console.log('module:dashboard:eat-item:initialize', protein, proteinIntakeMin, proteinIntake, proteinIntakeMax, protein > proteinIntakeMax, protein < proteinIntakeMin);
            if(protein > 0) {
                if (
                       protein > proteinIntakeMax
                    || protein < proteinIntakeMin
                ) {
                    this.model.set({
                        warningProtein: null,
                        dangerProtein: 'dangerProtein'
                    });
                } else if (
                       (protein >= proteinIntakeMin && protein < proteinIntake)
                    || (protein <= proteinIntakeMax && protein > proteinIntake)
                ) {
                    this.model.set({
                        warningProtein: 'warningProtein',
                        dangerProtein: null
                    });
                }
            }

            this.render();

        },

        render: function(){
            console.log('module:dashboard:eat-item:render');

            this.$el.html(this.template(this.model.toJSON()));

            var weightToday = app.user.getWeight(this.model.get('date'));
            var weightYesterday = app.user.getWeight(app.moment(this.model.get('date')).subtract(1,'day'));

            if(weightYesterday > 0 && weightToday <= weightYesterday){
                this.$('.weight-down').show();
            } else if(weightYesterday > 0 && weightToday >= weightYesterday){
                this.$('.weight-up').show();
            }

            return this;
        },

        goToDay: function(){
            console.log('module:dashboard:eat-item:goToDay');

            app.ui.navbar['menu-eat']();
            app.router.navigate('eat',{trigger:true});
        }

    });
});
