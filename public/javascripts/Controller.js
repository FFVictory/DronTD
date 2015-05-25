/**
 * Created by Andrew on 13/05/2015.
 */

var controller = {};


controller.start = (function(){
    "use strict";
    var stage;
    var gameWorld;
    var assetManagementLocal;
    var uiSingleton;
    var uiLocal;
    var previous; //refactor mb
    $(document).ready(function(){

        stage = setupStage.canvasInit().stage;
        setupStage.ticker();
        uiLocal = UiSingleton.getInstance();
        gameWorld = new level.initialize(stage).gameWorld;
        assetManagementLocal = assetManagement.start;
        assetManagementLocal.load(stage,gameWorld);
        stage.getChildByName("buildCursor").on("click" , handleClick);

    });

    var handleClick = function(event){
        var x;
        var y;
        //the code below will build towers if you are in the build mode.
        if(uiLocal.buildMode == 1){ // instead of 1 uiLocal.buildMode
            x = Math.floor(event.stageX / 32);
            y = Math.floor(event.stageY / 32);
            if ((gameWorld[x][y].canBuildTower === true) && (gameWorld[x + 1][y].canBuildTower === true) && (gameWorld[x][y + 1].canBuildTower === true) && (gameWorld[x + 1][y + 1].canBuildTower === true)) {
                if(uiLocal.selected) {
                    level.addTower(x, y, uiLocal.selected);// WARNING : HARDCODE
                    assetManagementLocal.loadTower(x, y);
                }
            }
        }

    };
    var fake = function(){
        var level = new Array(10);
        var i = 0;
        for(i ; i<level.length ; i++){
            level[i] = new Array(10);
        }
        assetManagementLocal.load(stage,level);


    };



    var tick =  function(event){

        if(uiLocal.buildMode===1)
        {
            uiLocal.tileMouse(stage);
        }

        stage.update();
    };

    return {
        tick : tick

    };
})();