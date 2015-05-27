/**
 * Created by Andrew on 26/05/2015.
 */
var LevelSingleton = (function(){
    var instance;
    function createInstance(){
        var object =  new Level();
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