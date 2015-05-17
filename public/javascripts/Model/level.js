/**
 * Created by Drew on 14/05/2015.
 */
var level = {};

level = (function(){
    var stage;
    var gameWorld;
    var assetManagementLocal;
    //This function accepts an integer representing the level to be loaded.
    // It should modify the level array accordingly.
    // And maybe do the asset managment.

    function initialize(stageInit){
        gameWorld = new Array(15);
        var i = 0;
        stage = stageInit;
        for(i ; i<gameWorld.length ; i++){
            gameWorld[i] = new Array(10);
            for(var j = 0 ; j< gameWorld[i].length ; j++){
                gameWorld[i][j] = Object.create(null); //Might add prototype inheritence
                gameWorld[i][j].type = "highGround";
            }
        }
        changeLevel(1);
         var assetManagementLocal =  assetManagement;
        assetManagementLocal.start.load(stage,gameWorld);
    }

    function changeLevel(levelNumber){
        if(levelNumber == 1){
            console.log("level1 loading");
        }
        for(var j = 0 ; j<gameWorld[0].length ; j++){
            gameWorld[5][j].type = "lowGround";
        }
        gameWorld[2][2].tower="iceTower";
    }

    return {
        initialize : initialize
    }
}());