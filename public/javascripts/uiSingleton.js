/**
 * Created by Andrew on 25/05/2015.
 */
var UiSingleton = (function(){
    var instance;
    function createInstance(){
        instance = new Ui();
    }

    return {
        getInstance : function(){
            if(!instance){
                createInstance();
            }
            return instance;
        }
    };


})();