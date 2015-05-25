/**
 * Created by Andrew on 25/05/2015.
 */
var UiSingleton = (function(){
    var instance;
    function createInstance(){
        var object =  new Ui();
        return object;
    }

    return {
        getInstance : function(){
            if(!instance){
                instance = createInstance();
            }
            return instance;
        }
    };


})();