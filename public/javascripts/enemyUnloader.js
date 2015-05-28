/**
 * Created by Andrew on 28/05/2015.
 */
var enemyUnloader = (function(){
    var unloadEnemy = function(sprite,stage){
        var enemyContainer = stage.getChildByName("enemyContainer");
        enemyContainer.removeChild(enemyToRemove);

    };
    return {
        unloadEnemy : unloadEnemy
    }
});