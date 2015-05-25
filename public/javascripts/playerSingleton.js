/**
 * Created by Andrew on 25/05/2015.
 */
var PlayerSingleton = (function(){
    var instance;
    function createInstance(){
        var object =  new Player();
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