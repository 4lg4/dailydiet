define([
      'backboneLocalStorage'
    , 'moment'
    , 'scripts/app'
], function (
      backboneLocalStorage
    , moment
    , app
) {

    // http://www.globalrph.com/protein-calculator.htm
    // http://exercise.about.com/cs/nutrition/a/protein_2.htm
    var calcs = {
        male: {
            BMR: function(weight,height,birthyear) {
                //The Basal Metabolic Rate (BMR)
                //BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) + 5   (man)
                return 10 * weight + 6.25 * height - 5 * (moment().get('year') - birthyear) + 5;
            },
            proteinIntake: function(weight,exercise){
                // 0.8grams of protein per kilogram
                // 1.5grams of protein per kilogram when exercises
                return weight * ((exercise) ? 1.5 : 0.8);
            }
        },
        female: {
            BMR: function(weight,height,birthyear) {
                //The Basal Metabolic Rate (BMR)
                //BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) - 161     (woman)
                return 10 * weight + 6.25 * height - 5 * (moment().get('year') - birthyear) -161;
            },
            proteinIntake: function(weight,exercise){
                // 0.6grams of protein per kilogram
                // 1.1grams of protein per kilogram when exercises
                return weight * ((exercise) ? 1.1 : 0.6);
            }
        }
    };

    return Backbone.Model.extend({
        defaults: function() {
            return {
                name: null,
                email: null,
                gender: null,
                height: null,
                birthyear: null,
                yearMin: 1900,
                yearMax: moment().get('year')
            };
        },

        getProteinIntake: function(date){
            console.log('module:user:model:getProteinIntake');

            if(!date){
                date = app.moment();
            }

            // TODO TODO_ add here exercise true if the person has done some exercise
            var exercise = false;

            return calcs[this.get('gender')].proteinIntake(app.db.measure.getWeightByDate(date),exercise);
        },

        getWeight: function(date){
            console.log('module:user:model:getWeight');

            if(!date){
                date = app.moment();
            }

            return app.db.measure.getWeightByDate(date);
        },

        getBMR: function(date){
            console.log('module:user:model:getBMR');

            if(!date){
                date = app.moment();
            }

            return calcs[this.get('gender')].BMR(app.db.measure.getWeightByDate(date),this.get('height'),this.get('birthyear'));
        },

        parse: function(attr){
            if(_.isArray(attr)){
                return attr[0];
            }

            return attr;
        },

        localStorage: new Backbone.LocalStorage('DailyDiet-user')
    });


});