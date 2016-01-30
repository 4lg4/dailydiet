/**
 * Created by alga on 1/28/16.
 */

define([
    
],function(
    
) {


    var consoleOriginal = window.console;
    window.console = {
        log: function () {
            if (!isDev) {
                return true;
            }

            consoleOriginal.log.apply(consoleOriginal, arguments)
        }
        , warn: function () {
            if (!isDev) {
                return true;
            }

            consoleOriginal.warn.apply(consoleOriginal, arguments)
        }
        , error: function () {
            if (!isDev) {
                return true;
            }

            consoleOriginal.error.apply(consoleOriginal, arguments)
        }
    };
    
});