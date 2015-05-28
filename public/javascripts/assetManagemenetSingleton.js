/**
 * Created by Andrew on 28/05/2015.
 */
var AssetManagementSingleton = (function(){
    var instance;
    function createInstance(){
        var object =  new AssetManagement();
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